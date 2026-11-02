import { TextbookSubject, GradeLevel } from '../types';

export const CAPS_TEXTBOOKS: TextbookSubject[] = [
  // 1. Coding & Robotics (Grade 7 & Senior Phase)
  {
    id: 'tb-coding-robotics-g7',
    title: 'Coding & Robotics: Algorithms, Sensors & AI Foundations',
    shortCode: 'COD-G07',
    grade: 7,
    themeColor: 'from-blue-600 to-indigo-700',
    iconName: 'Cpu',
    capsCurriculumCode: 'DBE-CAPS-CDR-G07',
    synopsis:
      'Official CAPS-aligned Grade 7 curriculum introducing block-to-Python coding, microcontrollers, environmental sensors, and algorithmic machine learning logic.',
    chapters: [
      {
        id: 'cdr-g7-ch1',
        chapterNumber: 1,
        title: 'Algorithmic Thinking & Flowchart Architecture',
        term: 1,
        capsTopicCode: 'CAPS-CDR-07-T1-C01',
        estimatedMinutes: 20,
        pages: [
          {
            pageNumber: 1,
            title: '1.1 What is an Algorithm in Everyday Life?',
            content: `An **algorithm** is an unambiguous, step-by-step sequence of instructions designed to accomplish a specific task or solve a computational problem.

In our everyday South African lives, algorithms are everywhere:
- Brewing Rooibos tea with honey: Boil water -> Warm mug -> Steep bag for 3 mins -> Stir honey.
- Navigating a taxi route from Soweto to Johannesburg CBD: Board at rank -> Pay driver via row-relay -> Signal drop-off stop at Bree Street.

In computers, if an algorithm misses a single logical condition, the entire program crashes. In Artificial Intelligence, algorithms are trained to optimize themselves through feedback patterns rather than just fixed static commands.`,
            conceptDiagramPrompt: 'Flowchart showing Step 1 -> Decision Branch -> Step 2',
            diagramType: 'flowchart',
            vocabularyWord: {
              term: 'Algorithm',
              definition: 'A set of precise, ordered computational steps to solve a problem.',
              saTranslations: {
                zu: 'I-al-gorithimu (Uhlaka lwezinyathelo zokuxazulula inkinga)',
                xh: 'I-algorithm (Ulandelelwano lwemiyalelo yokusombulula ingxaki)',
                af: 'Algoritme (Stap-vir-stap instruksies)',
                st: 'Algorithm (Mohlophiso wa ditaelo tsa khomphutha)',
              },
            },
          },
          {
            pageNumber: 2,
            title: '1.2 Conditional Logic: IF-THEN-ELSE in Smart Systems',
            content: `Computers cannot guess intent; they rely on **conditional branching**.

Consider an automated greenhouse irrigation system in the Karoo:
\`\`\`python
# Smart Solar Irrigation Algorithm
soil_moisture = read_sensor_moisture()
solar_battery_level = read_battery_percent()

if soil_moisture < 30 and solar_battery_level > 20:
    activate_water_pump(duration_seconds=45)
    log_status("Crops irrigated successfully.")
elif soil_moisture >= 30:
    log_status("Soil moisture optimal. Conserving water.")
else:
    send_sms_alert("Low solar battery. Pump on standby.")
\`\`\`

By chaining logical operators (\`AND\`, \`OR\`, \`NOT\`), engineers build robust automated agents that adapt to environmental conditions.`,
            conceptDiagramPrompt: 'Code conditional logic branch',
            diagramType: 'code',
            vocabularyWord: {
              term: 'Conditional Logic',
              definition: 'Decision making in code based on whether a condition evaluates to True or False.',
              saTranslations: {
                zu: 'Ukunquma okunemibandela (Uma-Kungenjalo)',
                af: 'Voorwaardelike logika',
                xh: 'Ulwazi olusekelwe kwimeko',
              },
            },
          },
        ],
        practiceQuiz: {
          question: 'In the Karoo smart greenhouse code, what condition must be true for the water pump to turn ON?',
          options: [
            'Soil moisture > 30 OR battery < 20',
            'Soil moisture < 30 AND battery > 20',
            'Battery must be 100% full only',
            'Pump runs continuously regardless of moisture',
          ],
          correctIndex: 1,
          explanation: 'The logical operator "and" mandates that both conditions (moisture < 30 and battery > 20) are simultaneously satisfied before pumping.',
          capsMarks: 5,
        },
      },
      {
        id: 'cdr-g7-ch2',
        chapterNumber: 2,
        title: 'Sensors, Actuators & Microcontroller Hardware',
        term: 2,
        capsTopicCode: 'CAPS-CDR-07-T2-C02',
        estimatedMinutes: 25,
        pages: [
          {
            pageNumber: 1,
            title: '2.1 Inputs vs Outputs: How Computers Sense the Real World',
            content: `A microcontroller (such as an ESP32 or micro:bit) acts as a compact electronic brain. It cannot touch or taste, but it translates analog physical physics into digital zeros and ones.

1. **Sensors (Inputs)**:
   - Light Dependent Resistors (LDR): Measure sunlight levels.
   - Ultrasonic Distance Sensors: Emit 40kHz sound waves to measure proximity (used in self-parking cars).
   - DHT11 Temperature & Humidity Sensor: Monitors ambient atmospheric conditions.

2. **Actuators (Outputs)**:
   - Servo Motors: Rotate precisely between 0° and 180° to open security boom gates.
   - Piezo Buzzers: Produce audio alert frequencies.
   - OLED Displays: Render status metrics and battery readouts.`,
            diagramType: 'comparison',
            vocabularyWord: {
              term: 'Actuator',
              definition: 'A hardware component that converts an electrical signal into mechanical physical motion.',
              saTranslations: {
                zu: 'Isinyakazisi somshini (Actuator)',
                af: 'Aandrywer / Aktuator',
                xh: 'Isixhobo sokuhambisa oomatshini',
              },
            },
          },
        ],
        practiceQuiz: {
          question: 'Which of the following hardware devices is strictly an ACTUATOR (Output device)?',
          options: [
            'Ultrasonic Distance Sensor',
            'Light Dependent Resistor (LDR)',
            'Servo Motor controlling a boom gate',
            'DHT11 Temperature Sensor',
          ],
          correctIndex: 2,
          explanation: 'A servo motor receives electrical instructions and produces physical mechanical motion, making it an actuator/output device.',
          capsMarks: 5,
        },
      },
    ],
  },

  // 2. Mathematics (Grade 7 & Senior Phase)
  {
    id: 'tb-mathematics-g7',
    title: 'CAPS Mathematics: Numbers, Patterns, Data & Algebraic Thinking',
    shortCode: 'MAT-G07',
    grade: 7,
    themeColor: 'from-emerald-600 to-teal-700',
    iconName: 'Calculator',
    capsCurriculumCode: 'DBE-CAPS-MAT-G07',
    synopsis:
      'Complete Department of Basic Education CAPS syllabus: integers, fractions, algebraic equations, geometry of straight lines, and statistical data handling with real South African datasets.',
    chapters: [
      {
        id: 'mat-g7-ch1',
        chapterNumber: 1,
        title: 'Integers, Operations & Real-World Balances',
        term: 1,
        capsTopicCode: 'CAPS-MAT-07-T1-C01',
        estimatedMinutes: 25,
        pages: [
          {
            pageNumber: 1,
            title: '1.1 The Integer Number Line (Z)',
            content: `The set of **integers** (denoted by symbol ℤ) consists of all positive whole numbers, negative numbers, and zero:
$$\\mathbb{Z} = \\{..., -3, -2, -1, 0, 1, 2, 3, ...\\}$$

Real-world applications in South Africa:
1. **Temperature in Sutherland (Northern Cape)**: During winter, temperatures drop below freezing, such as $-6^\\circ\\text{C}$. When noon warms up to $+8^\\circ\\text{C}$, the net temperature rise is:
$$8 - (-6) = 8 + 6 = 14^\\circ\\text{C}$$
2. **Banking & Overdraft**: If a small spaza shop account holds R450 and a stock order of R600 is paid, the resulting bank balance is:
$$450 - 600 = -\\text{R}150\\text{ (in overdraft)}$$

**The Golden Rules of Signs**:
- $(+) \\times (+) = (+)$
- $(-) \\times (-) = (+)$
- $(+) \\times (-) = (-)$
- $(-) \\times (+) = (-)$`,
            diagramType: 'equation',
            vocabularyWord: {
              term: 'Integer',
              definition: 'Any whole number that can be positive, negative, or zero, with no decimal or fractional part.',
              saTranslations: {
                zu: 'Inani eliphelele (I-injiya)',
                af: 'Heelgetal',
                xh: 'Inani elipheleleyo',
                st: 'Palo e feletseng',
              },
            },
          },
          {
            pageNumber: 2,
            title: '1.2 Combining Signed Numbers',
            content: `When adding integers with different signs, subtract the smaller absolute value from the larger absolute value and keep the sign of the larger absolute value.

Example 1:
$$-15 + 9 = -6$$
(Since 15 is greater than 9, the answer remains negative).

Example 2 (Subtracting a negative):
$$12 - (-7) = 12 + 7 = 19$$
Subtracting a debt or negative deficit is logically equivalent to adding wealth.

In machine learning and neural networks, weights and biases are constantly adjusted using positive and negative integer and floating-point gradients to minimize mathematical error.`,
            diagramType: 'equation',
          },
        ],
        practiceQuiz: {
          question: 'Calculate: (-18) + (-12) - (-15) = ?',
          options: ['-15', '-45', '-12', '+15'],
          correctIndex: 0,
          explanation: '(-18) + (-12) = -30. Then -30 - (-15) = -30 + 15 = -15.',
          capsMarks: 5,
        },
      },
      {
        id: 'mat-g7-ch2',
        chapterNumber: 2,
        title: 'Data Handling: Mean, Median, Mode & AI Analytics',
        term: 2,
        capsTopicCode: 'CAPS-MAT-07-T2-C02',
        estimatedMinutes: 20,
        pages: [
          {
            pageNumber: 1,
            title: '2.1 Measures of Central Tendency',
            content: `In CAPS Grade 7, learners analyze sample datasets to identify central patterns:

1. **Mean (Average)**:
$$\\text{Mean} = \\frac{\\sum x}{n} = \\frac{\\text{Sum of all scores}}{\\text{Total number of observations}}$$

2. **Median (Middle Value)**:
The middle value when the dataset is sorted in ascending numerical order. If the count $n$ is even, the median is the mean of the two middle values.

3. **Mode (Most Frequent)**:
The value that appears most often in the dataset. A dataset can be unimodal, bimodal, or have no mode.

Example: Test marks of 7 Grade 7 learners:
$$[45, 52, 68, 68, 74, 85, 92]$$
- Mode = $68$
- Median = $68$ (the 4th value)
- Mean = $(45 + 52 + 68 + 68 + 74 + 85 + 92) \\div 7 = 484 \\div 7 \\approx 69.14\\%$`,
            diagramType: 'comparison',
            vocabularyWord: {
              term: 'Median',
              definition: 'The middle number in a sorted list of numbers.',
              saTranslations: {
                zu: 'Inani eliphakathi (I-mediani)',
                af: 'Mediaan',
                xh: 'Inani eliphakathi',
              },
            },
          },
        ],
        practiceQuiz: {
          question: 'What is the median of the dataset: 14, 8, 22, 10, 18?',
          options: ['10', '14', '18', '14.4'],
          correctIndex: 1,
          explanation: 'First sort the numbers in ascending order: [8, 10, 14, 18, 22]. The exact middle (3rd value) is 14.',
          capsMarks: 5,
        },
      },
    ],
  },

  // 3. Natural Sciences (Grade 7 Senior Phase)
  {
    id: 'tb-natural-sciences-g7',
    title: 'Natural Sciences: Life, Energy, Matter & Earth Systems',
    shortCode: 'NSC-G07',
    grade: 7,
    themeColor: 'from-amber-600 to-orange-700',
    iconName: 'FlaskConical',
    capsCurriculumCode: 'DBE-CAPS-NSC-G07',
    synopsis:
      'Covers CAPS Life and Living (biodiversity, human reproduction, ecosystems), Matter and Materials (acids, bases, periodic table), Energy and Change (sources of energy, electrical circuits), and Planet Earth and Beyond.',
    chapters: [
      {
        id: 'nsc-g7-ch1',
        chapterNumber: 1,
        title: 'Biosphere, Ecosystems & South African Biodiversity',
        term: 1,
        capsTopicCode: 'CAPS-NS-07-T1-C01',
        estimatedMinutes: 20,
        pages: [
          {
            pageNumber: 1,
            title: '1.1 The Biosphere and South Africa’s Biomes',
            content: `The **biosphere** is the zone of planet Earth where life naturally thrives. It encompasses:
- **Lithosphere**: The crust and upper mantle (soil, rocks).
- **Hydrosphere**: All liquid and frozen water bodies (oceans, rivers, dams).
- **Atmosphere**: The protective gaseous blanket surrounding Earth.

South Africa is the **third most biodiverse country on Earth**, containing spectacular biomes:
1. **Fynbos Biome** (Cape Floral Kingdom): Rich in proteas and ericas, uniquely adapted to periodic natural veldfires.
2. **Savanna Biome** (Bushveld): Covers one-third of South Africa, hosting elephants, acacia trees, and apex predators.
3. **Succulent Karoo**: World capital of arid succulent plants with high endemic biodiversity.`,
            diagramType: 'comparison',
            vocabularyWord: {
              term: 'Biosphere',
              definition: 'The global ecological system integrating all living beings and their relationships.',
              saTranslations: {
                zu: 'Indawo yempilo emhlabeni (I-biosphere)',
                af: 'Biosfeer',
                xh: 'Indawo yobomi emhlabeni',
                st: 'Sebaka sa bophelo lefatsheng',
              },
            },
          },
        ],
        practiceQuiz: {
          question: 'Which South African biome is world-famous for proteas, ericas, and extreme floral endemism?',
          options: ['Savanna Biome', 'Fynbos Biome', 'Grassland Biome', 'Desert Biome'],
          correctIndex: 1,
          explanation: 'The Fynbos biome in the Western and Eastern Cape makes up the Cape Floral Kingdom, boasting thousands of endemic protea species.',
          capsMarks: 5,
        },
      },
    ],
  },

  // 4. Economic & Management Sciences (EMS Grade 7)
  {
    id: 'tb-ems-g7',
    title: 'EMS: Entrepreneurship, Financial Literacy & The Economy',
    shortCode: 'EMS-G07',
    grade: 7,
    themeColor: 'from-purple-600 to-indigo-800',
    iconName: 'Coins',
    capsCurriculumCode: 'DBE-CAPS-EMS-G07',
    synopsis:
      'Teaches the economic cycle, needs vs wants, businesses and entrepreneurship, budgets, accounting equations, and how digital AI payment systems are modernizing South African townships and cities.',
    chapters: [
      {
        id: 'ems-g7-ch1',
        chapterNumber: 1,
        title: 'The Economic Cycle & Factors of Production',
        term: 1,
        capsTopicCode: 'CAPS-EMS-07-T1-C01',
        estimatedMinutes: 20,
        pages: [
          {
            pageNumber: 1,
            title: '1.1 Needs vs Wants & The 4 Factors of Production',
            content: `The fundamental economic problem facing any society is **scarcity**: human wants are unlimited, but resources are strictly finite.

1. **Needs**: Essential goods required for physiological survival (clean water, nutritious food, shelter, basic medical healthcare).
2. **Wants**: Desires that enhance quality of life but are not strictly vital to survival (latest smartphone, designer sneakers, gaming consoles).

To produce goods and services, an economy relies on the **4 Factors of Production**:
1. **Natural Resources (Land)**: Minerals, fertile soil, water (remunerated with *Rent*).
2. **Labour**: Human mental and physical effort (remunerated with *Wages/Salaries*).
3. **Capital**: Machinery, factories, digital infrastructure, computers (remunerated with *Interest*).
4. **Entrepreneurship**: The vision to combine land, labour, and capital while accepting commercial risk (remunerated with *Profit*).`,
            diagramType: 'comparison',
            vocabularyWord: {
              term: 'Scarcity',
              definition: 'The fundamental economic condition of having limited resources to fulfill unlimited wants.',
              saTranslations: {
                zu: 'Ukuswela kwemithombo (Scarcity)',
                af: 'Skaarsheid',
                xh: 'Ukunqongophala kwezixhobo',
              },
            },
          },
        ],
        practiceQuiz: {
          question: 'What is the correct financial remuneration earned by the factor of production "Entrepreneurship"?',
          options: ['Rent', 'Wages', 'Interest', 'Profit'],
          correctIndex: 3,
          explanation: 'Entrepreneurs take on business risks and combine land, labour, and capital; their earned remuneration is Profit.',
          capsMarks: 5,
        },
      },
    ],
  },

  // 5. English First Additional Language (Grade 7)
  {
    id: 'tb-english-g7',
    title: 'English FAL: Reading, Writing & AI Prompt Literacy',
    shortCode: 'ENG-G07',
    grade: 7,
    themeColor: 'from-rose-600 to-pink-700',
    iconName: 'BookMarked',
    capsCurriculumCode: 'DBE-CAPS-ENG-G07',
    synopsis:
      'Language in context, comprehension strategies, summarising, transactional writing, and crafting structured natural language prompts for digital intelligence.',
    chapters: [
      {
        id: 'eng-g7-ch1',
        chapterNumber: 1,
        title: 'Precision in Language: From Sentences to AI Prompts',
        term: 1,
        capsTopicCode: 'CAPS-ENG-07-T1-C01',
        estimatedMinutes: 20,
        pages: [
          {
            pageNumber: 1,
            title: '1.1 The Power of Clear Directives and Conjunctions',
            content: `Language is our primary tool for communicating meaning, whether to a human reader or an artificial neural network.

A poorly constructed request leads to misunderstandings:
- **Vague request**: *"Write something about solar panels."*
- **Structured, targeted prompt**: *"Write a 150-word persuasive summary explaining to a rural school principal in Limpopo why investing in rooftop solar panels reduces electricity costs during load shedding. Use professional yet accessible tone."*

Notice how clear **role assignment**, **target audience**, **geographic context**, and **constraints** transform ambiguous language into actionable output.`,
            diagramType: 'comparison',
            vocabularyWord: {
              term: 'Target Audience',
              definition: 'The specific group of readers or listeners for whom a piece of writing or speech is intended.',
              saTranslations: {
                zu: 'Izilaleli ezihlosiwe',
                af: 'Teikengehoor',
                xh: 'Abaphulaphuli abajoliswe kubo',
              },
            },
          },
        ],
        practiceQuiz: {
          question: 'Which prompt provides the best constraints and contextual clarity for an AI assistant?',
          options: [
            'Tell me about water.',
            'Explain water in South Africa quickly.',
            'Explain three practical water-saving tips for a Grade 7 household in Cape Town, using bullet points and under 100 words.',
            'Water advice now please.',
          ],
          correctIndex: 2,
          explanation: 'The third option defines the exact topic (water-saving tips), context (Cape Town household), format (bullet points), and word limit (under 100 words).',
          capsMarks: 5,
        },
      },
    ],
  },
];
