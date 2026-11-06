import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({ limit: '100kb' }));

function getAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }
  return new GoogleGenAI({ apiKey });
}

async function callGeminiSafe(
  systemInstruction: string,
  promptText: string,
  fallbackText: string
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    return fallbackText;
  }
  try {
    const response = await getAIClient().models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
      },
    });
    return response.text || fallbackText;
  } catch (err) {
    console.warn('Gemini call error, using fallback:', err);
    return fallbackText;
  }
}

// Persistence path for user accounts
const USERS_FILE_PATH = path.join(__dirname, 'users_db.json');

interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  salt: string;
  grade: number;
  role: string;
  learnerNumber: string;
  isGradeLocked: boolean;
  gradeLockDate: string;
  gradeLockExpiryDate: string;
  academicTerm: number;
  dailyMinutesTarget: number;
  dailyMinutesCompleted: number;
  studyStreakDays: number;
  schoolName: string;
  province: string;
  preferredLanguage: string;
  parentGuardianEmail?: string;
  parentGuardianPhone?: string;
  avatar: any;
  earnedBadgeIds: string[];
  totalXP: number;
  completedModuleIds: string[];
  createdAt: string;
  sessionToken?: string;
  resetCode?: string;
  passwordHashIterations?: number;
}

// Initial demo user
const DEFAULT_AVATAR = {
  genderStyle: 'anime-boy',
  skinTone: '#a16207',
  hairStyle: 'afro-puff',
  hairColor: '#171717',
  eyeExpression: 'sparkle',
  eyeColor: '#451a03',
  clothing: 'school-blazer',
  clothingColor: '#1e3a8a',
  accessory: 'hacker-headphones',
  auraEffect: 'azure-cyber',
};

const PASSWORD_HASH_ITERATIONS = 210_000;

function hashPassword(
  password: string,
  salt: string,
  iterations = PASSWORD_HASH_ITERATIONS
): string {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
}

function loadUsers(): Record<string, StoredUser> {
  let existingUsers: Record<string, StoredUser> = {};
  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
      existingUsers = JSON.parse(data);
    }
  } catch (err) {
    console.warn('Could not load users file, initializing new store:', err);
  }

  // Remove accounts created by the old hard-coded demo seeding logic.
  // Keep every other account intact.
  if (existingUsers['sipho@fundai.ac.za']?.id === 'usr-demo-01') {
    delete existingUsers['sipho@fundai.ac.za'];
  }
  if (existingUsers['nthabiso019@gmail.com']?.id === 'usr-master-admin-01') {
    delete existingUsers['nthabiso019@gmail.com'];
  }

  // Sessions issued by the old build may have been exposed in the committed
  // database. Invalidate legacy sessions once; successful login upgrades hashes.
  for (const user of Object.values(existingUsers)) {
    if (!user.passwordHashIterations) {
      delete user.sessionToken;
    }
  }

  saveUsers(existingUsers);
  return existingUsers;
}

function saveUsers(users: Record<string, StoredUser>) {
  try {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save users file:', err);
  }
}

const usersDb = loadUsers();

function sanitizeUser(user: StoredUser) {
  const { passwordHash, salt, resetCode, sessionToken, ...safeUser } = user;
  return safeUser;
}

// ==================== AUTHENTICATION API ROUTES ====================

// Register Endpoint
app.post('/api/auth/register', (req: Request, res: Response) => {
  const {
    fullName,
    email,
    password,
    grade = 7,
    schoolName = 'FUNDAI Partner School',
    province = 'Gauteng',
    preferredLanguage = 'zu',
    parentGuardianEmail,
    parentGuardianPhone,
    parentConsent,
  } = req.body;

  if (typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
    return res.status(400).json({ error: 'Please enter your full name (at least 2 characters).' });
  }

  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (usersDb[cleanEmail]) {
    return res.status(400).json({ error: 'An account with this email address already exists. Please log in.' });
  }

  if (typeof password !== 'string' || password.length < 10 || password.length > 128) {
    return res.status(400).json({ error: 'Password must be between 10 and 128 characters.' });
  }

  const numGrade = Number(grade);
  if (!Number.isInteger(numGrade) || numGrade < 4 || numGrade > 12) {
    return res.status(400).json({ error: 'Grade must be a whole number from 4 to 12.' });
  }
  // POPIA & Child Safety Requirement: Under Grade 8 (< 8) requires parent/guardian contact
  if (numGrade < 8) {
    if (typeof parentGuardianEmail !== 'string' || !emailRegex.test(parentGuardianEmail.trim()) || parentConsent !== true) {
      return res.status(400).json({
        error: 'Learners in Grade 4 to 7 require a valid Parent / Guardian email for POPIA digital safety compliance.',
      });
    }
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const userId = `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const learnerNumber = `LRN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newUser: StoredUser = {
    id: userId,
    fullName: fullName.trim(),
    email: cleanEmail,
    passwordHash,
    passwordHashIterations: PASSWORD_HASH_ITERATIONS,
    salt,
    grade: numGrade,
    role: 'learner',
    learnerNumber,
    isGradeLocked: true,
    gradeLockDate: '2026-01-14',
    gradeLockExpiryDate: '2026-12-10',
    academicTerm: 1,
    dailyMinutesTarget: 45,
    dailyMinutesCompleted: 0,
    studyStreakDays: 1,
    schoolName: schoolName.trim(),
    province,
    preferredLanguage,
    parentGuardianEmail: parentGuardianEmail ? parentGuardianEmail.trim() : undefined,
    parentGuardianPhone: parentGuardianPhone ? parentGuardianPhone.trim() : undefined,
    avatar: DEFAULT_AVATAR,
    earnedBadgeIds: ['badge-multilingual-hero'],
    totalXP: 500,
    completedModuleIds: ['m01'],
    createdAt: new Date().toISOString(),
    sessionToken,
  };

  usersDb[cleanEmail] = newUser;
  saveUsers(usersDb);

  res.status(201).json({
    success: true,
    user: sanitizeUser(newUser),
    token: sessionToken,
    requiresAvatarSetup: true,
    message: 'Account created successfully! Welcome to FUNDAI Academy.',
  });
});

// Update Daily Study Time Endpoint
app.post('/api/user/study-time', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\\s+/i, '').trim();
  const user = Object.values(usersDb).find((candidate) => candidate.sessionToken === token);
  const minutesAdded = Number(req.body.minutesAdded ?? 1);

  if (!user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  if (!Number.isFinite(minutesAdded) || minutesAdded <= 0 || minutesAdded > 240) {
    return res.status(400).json({ error: 'Study time must be between 1 and 240 minutes.' });
  }

  user.dailyMinutesCompleted = (user.dailyMinutesCompleted || 0) + minutesAdded;
  if (user.dailyMinutesCompleted >= user.dailyMinutesTarget && !user.earnedBadgeIds.includes('badge-prompt-master')) {
    user.totalXP += 100;
  }

  saveUsers(usersDb);
  res.json({
    success: true,
    dailyMinutesCompleted: user.dailyMinutesCompleted,
    totalXP: user.totalXP,
  });
});

// Login Endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password, rememberMe = true } = req.body;

  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!cleanEmail || typeof password !== 'string' || !password) {
    return res.status(400).json({ error: 'Please enter both your email address and password.' });
  }

  const user = usersDb[cleanEmail];
  if (!user) {
    return res.status(401).json({ error: 'No account found with this email. Please check spelling or register.' });
  }

  const storedIterations = user.passwordHashIterations ?? 1000;
  const inputHash = hashPassword(password, user.salt, storedIterations);
  const expectedHash = Buffer.from(user.passwordHash, 'hex');
  const actualHash = Buffer.from(inputHash, 'hex');
  if (
    expectedHash.length !== actualHash.length ||
    !crypto.timingSafeEqual(expectedHash, actualHash)
  ) {
    return res.status(401).json({ error: 'Incorrect password. Please try again or use Forgot Password.' });
  }

  // Upgrade legacy password hashes after a successful login.
  if (storedIterations < PASSWORD_HASH_ITERATIONS) {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.passwordHash = hashPassword(password, user.salt);
    user.passwordHashIterations = PASSWORD_HASH_ITERATIONS;
  }

  const sessionToken = crypto.randomBytes(32).toString('hex');
  user.sessionToken = sessionToken;
  saveUsers(usersDb);

  res.json({
    success: true,
    user: sanitizeUser(user),
    token: sessionToken,
    message: `Welcome back, ${user.fullName}!`,
  });
});

// Current User Me Endpoint
app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  const user = Object.values(usersDb).find((u) => u.sessionToken === token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }

  res.json({ success: true, user: sanitizeUser(user) });
});

// Logout Endpoint
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (token) {
    const user = Object.values(usersDb).find((u) => u.sessionToken === token);
    if (user) {
      delete user.sessionToken;
      saveUsers(usersDb);
    }
  }

  res.json({ success: true, message: 'Logged out successfully.' });
});

// Password recovery is intentionally disabled until a verified email/SMS
// delivery provider is configured. Never return reset codes from this API.
app.post('/api/auth/forgot-password', (_req: Request, res: Response) => {
  res.status(503).json({
    success: false,
    error: 'Password recovery is not configured yet. Please contact your school administrator.',
  });
});

app.post('/api/auth/reset-password', (_req: Request, res: Response) => {
  res.status(503).json({
    success: false,
    error: 'Password recovery is not configured yet. Please contact your school administrator.',
  });
});

// Update Anime Avatar Endpoint
app.put('/api/user/avatar', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  const { avatar } = req.body;
  const user = Object.values(usersDb).find((candidate) => candidate.sessionToken === token);

  if (!user) {
    return res.status(401).json({ error: 'Not authenticated or user not found.' });
  }

  user.avatar = { ...user.avatar, ...avatar };
  saveUsers(usersDb);

  res.json({ success: true, avatar: user.avatar, user: sanitizeUser(user) });
});

// Unlock Badge Endpoint
app.post('/api/user/badges/unlock', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  const { badgeId, xp = 250 } = req.body;
  const user = Object.values(usersDb).find((candidate) => candidate.sessionToken === token);

  if (!user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  if (!user.earnedBadgeIds.includes(badgeId)) {
    user.earnedBadgeIds.push(badgeId);
    user.totalXP = (user.totalXP || 0) + Number(xp);
    saveUsers(usersDb);
  }

  res.json({
    success: true,
    earnedBadgeIds: user.earnedBadgeIds,
    totalXP: user.totalXP,
    user: sanitizeUser(user),
  });
});

// 1. AI Tutor Endpoint with South African Languages & Multi-Subject Support
app.post('/api/tutor', async (req: Request, res: Response) => {
  const {
    message,
    grade = 6,
    topic = 'General AI',
    language = 'en',
    subject = 'ai-digital',
  } = req.body;

  const saLanguageNames: Record<string, string> = {
    en: 'English (South Africa)',
    zu: 'isiZulu',
    xh: 'isiXhosa',
    af: 'Afrikaans',
    nso: 'Sepedi / Sesotho sa Leboa',
    tn: 'Setswana',
    st: 'Sesotho',
    ts: 'Xitsonga',
    ss: 'siSwati',
    ve: 'Tshivenḓa',
    nr: 'isiNdebele',
  };

  const chosenLang = saLanguageNames[language] || 'English (South Africa)';

  let subjectContext = '';
  if (subject === 'mathematics') {
    subjectContext = 'Focus on South African CAPS Mathematics (Algebra, Geometry, Probability, Functions). Use step-by-step Socratic guidance so the learner discovers the solution.';
  } else if (subject === 'physical-sciences') {
    subjectContext = 'Focus on South African CAPS Physical Sciences / Natural Sciences (Newtonian mechanics, electricity, chemistry, optics).';
  } else if (subject === 'life-sciences') {
    subjectContext = 'Focus on South African CAPS Life Sciences (cellular biology, genetics, ecosystems, human anatomy).';
  } else if (subject === 'coding-robotics') {
    subjectContext = 'Focus on South African CAPS Coding & Robotics (algorithms, Python code, microcontrollers, sensors, logic).';
  } else if (subject === 'ems-business') {
    subjectContext = 'Focus on South African CAPS Economics & Management Sciences / Business Studies (entrepreneurship, fintech, markets).';
  } else {
    subjectContext = 'Focus on Artificial Intelligence, digital literacy, prompt engineering, ethics, and future technology careers.';
  }

  let gradeStyle = '';
  if (grade <= 5) {
    gradeStyle = 'You are Fundi, an enthusiastic and friendly AI mentor for Grade 4–5 primary school learners in South Africa. Use vivid everyday analogies (like baking vetkoek, building with wire toys, pet animals, and soccer). Keep sentences clear, positive, and emphasize that humans are the creative thinkers.';
  } else if (grade <= 8) {
    gradeStyle = 'You are Fundi, an inspiring AI coach for Grade 6–8 middle school learners in South Africa. Introduce concepts clearly: patterns, datasets, algorithms, and practical Python logic. Encourage critical thinking about hallucinations and false facts.';
  } else if (grade <= 10) {
    gradeStyle = 'You are Fundi, an interactive AI instructor for Grade 9–10 high school students in South Africa. Connect concepts to computational logic, Python syntax, machine learning feature extraction, and real-world tools in South African industries (mining, agriculture, finance).';
  } else {
    gradeStyle = 'You are Fundi, an advanced AI technical advisor for Grade 11–12 matric students in South Africa preparing for university or tech careers. Discuss neural network math, vector embeddings, RAG, tool-calling agents, and POPIA privacy governance.';
  }

  const systemInstruction = `${gradeStyle}
Subject Focus: ${subjectContext}
CRITICAL LANGUAGE INSTRUCTION: The learner selected their preferred South African language: ${chosenLang}.
You must explain the concepts primarily in ${chosenLang} (or naturally code-switch with standard technical English terms in parentheses where appropriate for clear educational understanding in South African schools).
Keep explanations concise (2 to 4 paragraphs), highly structured with bullet points where helpful, and end with one thought-provoking check-for-understanding question.`;

  // Fallback responses in key SA languages if offline or missing API key
  let fallback = `Sawubona / Hello! I'm Fundi, your AI Academy tutor. You asked about "${topic}" in ${chosenLang}:\n\nArtificial Intelligence (Ubuhlakani Bokwenziwa / Kunsmatige Intelligensie) works by recognizing patterns in data. Just like you recognize a protea flower or an acacia tree by its leaves, an AI model learns patterns from thousands of examples!\n\nRemember: AI is a tool created by humans. Your human creativity, ethical thinking, and problem-solving are what make technology useful for South Africa.\n\nQuick Challenge: Can you name one everyday device or app in South Africa that might be using pattern recognition right now?`;

  if (language === 'zu') {
    fallback = `Sawubona! Ngingu-Fundi, uthisha wakho we-AI Academy. Ubuze nge-"${topic}":\n\nUbuhlakani Bokwenziwa (Artificial Intelligence) busebenza ngokubona amaphethini emininingwaneni eminingi. Njengoba nje ufunda ukubona imoto noma isilwane ngezimpawu zayo, i-AI ibheka izibonelo eziyizinkulungwane ukufunda!\n\nKhumbula: I-AI ayinawo umqondo womuntu. Wena ungumholi womcabango, kanti i-AI iyithuluzi elikusizayo ukuxazulula izinkinga eNingizimu Afrika.\n\nUmbuzo osheshayo: Yiliphi ithuluzi ekhaya noma esikoleni ocabanga ukuthi lisebenzisa ubuhlakani bokwenziwa?`;
  } else if (language === 'af') {
    fallback = `Goeiedag! Ek is Fundi, jou FUNDAI KI-tutor. Jy het gevra oor "${topic}":\n\nKunsmatige Intelligensie (KI) werk deur patrone in data te herken. Net soos jy geleer het om verskillende diere of plante aan hul eienskappe te herken, ontleed 'n rekenaar duisende voorbeelde om voorspellings te maak!\n\nOnthou: KI het nie regte menslike emosies nie. Jou kreatiwiteit, etiese oordeel en leierskap is altyd in beheer.\n\nVinnige uitdaging: Kan jy 'n voorbeeld noem van tegnologie in Suid-Afrika wat vandag patrone gebruik om mense te help?`;
  } else if (language === 'xh') {
    fallback = `Molo! Ndingu-Fundi, umcebisi wakho we-AI Academy. Ubuze malunga ne-"${topic}":\n\nUbukrelekrele Bokwenziwa (AI) busebenza ngokufumana iipateni kwiinkcukacha ezininzi. Njengokuba ufunda ukubona iintyatyambo okanye izilwanyana ngokweempawu zazo, i-AI ifunda ngemizekelo!\n\nKhumbula: I-AI ayinazimvakalelo zomntu. Nguwe ocingayo nowenza izigqibo ezifanelekileyo zokunceda uluntu lwaseMzantsi Afrika.\n\nUmbuzo: Yiyiphi i-app oyaziyo esebenzisa ubukrelekrele bokwenziwa?`;
  }

  try {
    const reply = await callGeminiSafe(systemInstruction, message, fallback);
    res.json({ reply, success: true, language: chosenLang });
  } catch {
    res.json({ reply: fallback, success: true, language: chosenLang });
  }
});

// 2. Prompt Engineering Evaluator
app.post('/api/evaluate-prompt', async (req: Request, res: Response) => {
  const { prompt, grade = 7, targetTask = 'Summarize a science article' } = req.body;

  const systemInstruction = `You are an expert AI Prompt Coach at FUNDAI Academy for Grade ${grade} students.
Analyze the user's prompt for the target task: "${targetTask}".
Evaluate based on 4 criteria:
1. Clarity & Intent (Is the goal unambiguous?)
2. Context & Background (Does the prompt provide relevant context?)
3. Constraints & Format (Does it specify tone, length, or structure?)
4. Responsible AI & Safety (Is it ethical and unbiased?)

Return a JSON object with:
{
  "clarityScore": number (0-100),
  "contextScore": number (0-100),
  "constraintsScore": number (0-100),
  "safetyScore": number (0-100),
  "overallScore": number (0-100),
  "strengths": [array of 2 short strings],
  "improvements": [array of 2 short actionable tips suitable for Grade ${grade}],
  "superchargedPrompt": "A dramatically improved version of their prompt applying role, task, context, and output constraints"
}`;

  const userQuery = `Student prompt to evaluate: "${prompt}"`;

  const fallbackResult = {
    clarityScore: 78,
    contextScore: 65,
    constraintsScore: 60,
    safetyScore: 95,
    overallScore: 74,
    strengths: [
      'Direct and clearly states the general intent',
      'Uses polite, unambiguous action verbs',
    ],
    improvements: [
      'Specify the exact persona or role for the AI (e.g. "Act as a middle-school science educator")',
      'Add concrete output constraints such as length (e.g. "in 3 bullet points") and target audience',
    ],
    superchargedPrompt: `You are an engaging science teacher. Please summarize the key ideas of "${targetTask}" into 3 bullet points suitable for a Grade ${grade} student. Include 1 real-world analogy and highlight 2 vocabulary terms.`,
  };

  if (!process.env.GEMINI_API_KEY) {
    res.json({ evaluation: fallbackResult, success: true });
    return;
  }

  try {
    const raw = await getAIClient().models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userQuery,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(raw.text || '{}');
    res.json({
      evaluation: {
        clarityScore: parsed.clarityScore || 75,
        contextScore: parsed.contextScore || 70,
        constraintsScore: parsed.constraintsScore || 65,
        safetyScore: parsed.safetyScore || 95,
        overallScore: parsed.overallScore || 76,
        strengths: parsed.strengths || fallbackResult.strengths,
        improvements: parsed.improvements || fallbackResult.improvements,
        superchargedPrompt: parsed.superchargedPrompt || fallbackResult.superchargedPrompt,
      },
      success: true,
    });
  } catch (err) {
    console.warn('Prompt eval failed, using fallback:', err);
    res.json({ evaluation: fallbackResult, success: true });
  }
});

// 3. Hallucination Spotter Lab
app.post('/api/hallucination-check', async (req: Request, res: Response) => {
  const { statement, context = '' } = req.body;

  const systemInstruction = `You are a Fact-Checking & AI Hallucination Analyst for FUNDAI Academy.
Analyze the following statement and evaluate if it contains factual errors, fabricated citations, impossible timeline paradoxes, or subtle AI hallucinations.
Return JSON:
{
  "isHallucination": boolean,
  "confidence": number (0-100),
  "analysis": "Short 2-sentence explanation of why it is fact or hallucination",
  "verificationStrategy": "How a human student can verify this with primary sources"
}`;

  const fallback = {
    isHallucination: statement.toLowerCase().includes('invented') || statement.toLowerCase().includes('moon') || statement.length > 50,
    confidence: 88,
    analysis: 'This statement combines verifiable historical facts with fabricated dates and claims typical of model hallucination.',
    verificationStrategy: 'Cross-reference with reputable encyclopedia entries, academic archives, or verified peer-reviewed articles.',
  };

  try {
    if (!process.env.GEMINI_API_KEY) {
      res.json(fallback);
      return;
    }
    const response = await getAIClient().models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Statement: "${statement}". Context: "${context}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });
    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch {
    res.json(fallback);
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`FUNDAI AI Academy server running on port ${port}`);
  });
}

startServer();
