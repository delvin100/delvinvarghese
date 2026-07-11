export interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  stack: string[];
  url?: string;
  status: 'deployed' | 'in-progress' | 'archived';
  type: 'ai' | 'systems' | 'product' | 'research';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  points: string[];
}

export interface ExperimentalWork {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
}

export interface Social {
  label: string;
  url: string;
  handle: string;
}

export const projects: Project[] = [
  {
    id: 'PRJ-001',
    year: '2025',
    title: 'Symptom-Based Disease Intelligence',
    description:
      'Advanced symptom-to-diagnosis classification system. Uses pre-trained XGBoost classification models to predict disease conditions from free-text descriptions and route patients to medical specialists.',
    tags: ['AI/ML', 'Healthcare', 'Tabular Models'],
    stack: ['Python', 'XGBoost', 'Flask', 'scikit-learn', 'Pandas'],
    url: 'https://github.com/albinjojo',
    status: 'deployed',
    type: 'ai',
  },
  {
    id: 'PRJ-002',
    year: '2025',
    title: 'EcoGrow Precision Agriculture',
    description:
      'Greenhouse environmental monitoring platform. Utilizes an ESP32 hardware layer to collect telemetry (Temp, Humidity, CO2) and processes it via a Random Forest model on Flask for real-time risk predictions.',
    tags: ['IoT', 'Precision Agriculture', 'ML Integration'],
    stack: ['Python', 'ESP32', 'Flask', 'MQTT', 'Socket.io', 'Random Forest'],
    url: 'https://github.com/albinjojo',
    status: 'deployed',
    type: 'systems',
  },
  {
    id: 'PRJ-003',
    year: '2025',
    title: 'Agrowbot QA Assistant',
    description:
      'Lightweight Retrieval-Augmented Generation (RAG) tool for crop pest guidance. Ingests pest-control PDF manuals, indexes embeddings with all-MiniLM-L6-v2 and FAISS, and provides OpenAI QA with voice support.',
    tags: ['RAG', 'Embeddings', 'AI Assistants'],
    stack: ['Python', 'FAISS', 'OpenAI API', 'all-MiniLM-L6-v2', 'SpeechRecognition'],
    url: 'https://github.com/albinjojo',
    status: 'deployed',
    type: 'product',
  },
  {
    id: 'PRJ-004',
    year: '2024',
    title: 'Fisheries Farm AI Voice Assistant',
    description:
      'Domain-specific RAG voice agent built for fisheries farms. Implements hands-free voice input/output support to allow farm workers to query operational guidelines and get formatted responses.',
    tags: ['RAG', 'Voice AI', 'Local NLP'],
    stack: ['Python', 'RAG', 'OpenAI', 'Text-to-Speech', 'SpeechRecognition'],
    url: 'https://github.com/albinjojo',
    status: 'deployed',
    type: 'product',
  },
];

export const experience: Experience[] = [
  {
    id: '01',
    role: 'AI Engineer Intern',
    company: 'Agrowtein Labs',
    period: 'June 2025 — Present',
    location: 'Kanjirappally, Kerala',
    type: 'Internship',
    points: [
      'Built and fine-tuned AI models for image processing and computer vision tasks using Python.',
      'Worked with diverse data types including images, text, and structured datasets to develop AI-driven solutions.',
      'Designed and evaluated AI systems with a focus on data preprocessing, model optimization, and performance tuning.',
      'Developed Retrieval-Augmented Generation (RAG) based chatbots to enable contextual and accurate information retrieval.',
      'Rapidly prototyped AI features aligned with real-world and product-oriented use cases.',
    ],
  },
  {
    id: '02',
    role: 'FOSS United Representative',
    company: 'FOSS United',
    period: '2024 — Present',
    location: 'Kanjirappally, Kerala',
    type: 'Community Lead',
    points: [
      'Organized and conducted technical events, hackathons, and open-source meetups in collaboration with student developers.',
      'Promoted open-source culture, helping peers contribute to repos and learn tools like Git, Python, and Linux.',
    ],
  },
];

export const experimentalWork: ExperimentalWork[] = [
  {
    id: 'EXP-001',
    title: 'NASA Space Apps Solution',
    description: 'Developed an innovative environmental/space analytics prototype using satellite datasets. Won the Best Project Award in the global NASA Space Apps Hackathon.',
    tags: ['Satellite Data', 'Data Science', 'Hackathon'],
    status: 'Award Winner',
  },
  {
    id: 'EXP-002',
    title: 'Astra Hackathon Prototype',
    description: 'Led a team to build an innovative rapid prototype under a 24-hour deadline at the Astra 2025 Hackathon, securing 2nd place overall.',
    tags: ['Rapid Prototyping', 'Team Lead', 'Astra 2025'],
    status: '2nd Place',
  },
  {
    id: 'EXP-003',
    title: 'Mastermind Exposition Project',
    description: 'Designed a technically advanced and impactful machine learning project presented at a college technology exposition, earning the Best Project Award.',
    tags: ['Expo Winner', 'Model Pipeline', 'MLOps'],
    status: 'Best Project',
  },
];

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/albinjojo', handle: 'albinjojo' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/albin-jojo/', handle: 'albin-jojo' },
];
