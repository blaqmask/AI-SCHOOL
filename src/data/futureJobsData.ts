import { FutureJobProfile } from '../types';

export const FUTURE_JOBS_SA: FutureJobProfile[] = [
  {
    id: 'job-agri-ai',
    title: 'Smart Agriculture & Drone AI Specialist',
    localIndustry: 'Agri-Tech & Water Management (Free State, Limpopo, Western Cape)',
    description:
      'Designs autonomous drone flight routes and computer-vision algorithms to assess crop health, predict drought stress, optimize drip irrigation, and detect citrus black spot disease across South African commercial and smallholder farms.',
    averageSalaryZAR: 'R480,000 – R850,000 / year',
    highSchoolSubjects: ['Mathematics (CAPS)', 'Physical Sciences or Agricultural Sciences', 'Coding & Robotics'],
    requiredSkills: ['Computer Vision (YOLO/PyTorch)', 'IoT Soil Moisture Sensors', 'Drone Flight Piloting', 'Python'],
    qualificationRoute: 'BSc Agricultural Engineering / Data Science (Stellenbosch, UP, UKZN) or TVET Agri-Tech Diploma',
    demandLevel: 'Critical Shortage',
  },
  {
    id: 'job-fintech-ai',
    title: 'Fintech & Mobile Credit Algorithm Engineer',
    localIndustry: 'Banking & Financial Technology (Sandton, Cape Town Silicon Cape)',
    description:
      'Builds fraud detection neural networks, real-time banking transaction security, and alternative credit-scoring algorithms that expand financial inclusion to unbanked informal traders and township spaza shops.',
    averageSalaryZAR: 'R650,000 – R1,250,000 / year',
    highSchoolSubjects: ['Mathematics (min 70%)', 'Information Technology (IT)', 'Accounting or Business Studies'],
    requiredSkills: ['SQL & Data Warehousing', 'XGBoost & Fraud Classifiers', 'API Security (POPIA Compliant)', 'Python/Java'],
    qualificationRoute: 'BSc Computer Science / Financial Mathematics (Wits, UCT, UJ) + Cloud AI Certifications',
    demandLevel: 'High Growth',
  },
  {
    id: 'job-mining-robotics',
    title: 'Autonomous Mining & Industrial Robotics Engineer',
    localIndustry: 'Mining & Mineral Extraction (Rustenburg, Mpumalanga, Northern Cape)',
    description:
      'Programs autonomous robotic haulage trucks, underground hazardous gas sensors, and AI vision systems to conduct deep-level inspection in platinum and gold mines without putting human miners in danger.',
    averageSalaryZAR: 'R720,000 – R1,400,000 / year',
    highSchoolSubjects: ['Mathematics', 'Physical Sciences', 'Technical Sciences / Robotics'],
    requiredSkills: ['ROS (Robot Operating System)', 'Edge Computing (NVIDIA Jetson)', 'Embedded C++', 'Safety Audits'],
    qualificationRoute: 'BEng Mechatronics / Electrical Engineering (Wits, NWU, CPUT) or Mining Automation Cert',
    demandLevel: 'Critical Shortage',
  },
  {
    id: 'job-nlp-indigenous',
    title: 'Indigenous Language & Voice AI Engineer',
    localIndustry: 'Telecommunications & Public Services (National / SABC / Telkom / MTN / Vodacom)',
    description:
      'Develops automatic speech recognition (ASR) and large language model fine-tuning for all 11 official South African languages, ensuring hospital triage, mobile voting, and legal documents are accessible in isiZulu, Sesotho, Xhosa, and Afrikaans.',
    averageSalaryZAR: 'R550,000 – R1,050,000 / year',
    highSchoolSubjects: ['Home Language (e.g. isiZulu, isiXhosa, Afrikaans)', 'Mathematics', 'Information Technology'],
    requiredSkills: ['Transformer Tokenization', 'Phonetics & Audio DSP', 'Hugging Face & Gemini Fine-Tuning', 'Python'],
    qualificationRoute: 'BSc Computer Science & African Linguistics (UKZN, Rhodes, UNISA, UCT)',
    demandLevel: 'Emerging Frontier',
  },
  {
    id: 'job-cybersecurity-popia',
    title: 'AI Cyber Defense & POPIA Compliance Auditor',
    localIndustry: 'Enterprise Security, Healthcare & Government (Pretoria, Johannesburg)',
    description:
      'Protects critical national infrastructure and hospital databases from cyber attacks while ensuring automated AI decision-making complies with South Africa\'s Protection of Personal Information Act (POPIA).',
    averageSalaryZAR: 'R600,000 – R1,150,000 / year',
    highSchoolSubjects: ['Mathematics', 'Information Technology (IT) / CAT', 'English'],
    requiredSkills: ['Penetration Testing', 'Model Red-Teaming', 'POPIA & GDPR Regulatory Compliance', 'Network Security'],
    qualificationRoute: 'BCom / BSc Information Systems or CompTIA Security+ & Certified Information Systems Auditor (CISA)',
    demandLevel: 'High Growth',
  },
  {
    id: 'job-cloud-ai-ops',
    title: 'Green Cloud Infrastructure & Solar Grid AI Manager',
    localIndustry: 'Renewable Energy & Cloud Datacenters (Eskom Grid, Northern Cape Solar, Western Cape Wind)',
    description:
      'Applies machine learning to predict solar and wind power output, balances microgrids during load management, and optimizes massive cloud data centers for carbon neutrality.',
    averageSalaryZAR: 'R580,000 – R980,000 / year',
    highSchoolSubjects: ['Mathematics', 'Physical Sciences', 'Coding & Robotics'],
    requiredSkills: ['Linux & Docker', 'Kubernetes & Cloud Scaling', 'Time-Series Forecasting (ARIMA / LSTM)', 'Energy Tech'],
    qualificationRoute: 'BSc Electrical & Computer Engineering / TVET Renewable Energy Diploma',
    demandLevel: 'High Growth',
  },
];
