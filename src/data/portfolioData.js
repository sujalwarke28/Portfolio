export const personalInfo = {
  name: "Sujal Pradeep Warke",
  handle: "sujalwarke28",
  positioning: "Computer Science Undergraduate building intelligent, secure software systems",
  tagline: "Building intelligent systems. Learning how they work. Making them trustworthy.",
  subtitle: "Computer Science undergraduate exploring AI, software engineering, secure systems and research.",
  location: "Mumbai, Maharashtra, India",
  status: "Exploring AI Security, RAG Systems & Intelligent Physical Systems",
  availability: "Open for Engineering Internships & Research Collaborations",
  gpa: "9.16",
  bio: "I started by learning how to build software. Then I became fascinated by how software could become intelligent. Now I'm interested in how intelligent systems can become reliable, secure, and useful.",
  philosophyQuote: "If work is going to consume a significant part of your life, become exceptionally good at something valuable and use that capability to create freedom, independence and a life worth living."
};

export const resumeData = {
  fullName: "Sujal Pradeep Warke",
  roleTitle: "Computer Science Undergraduate | AI & Systems Builder",
  phone: "+91 8169613561",
  primaryEmail: "warke.sujal281106@gmail.com",
  eduEmail: "2024.sujalw@isu.ac.in",
  location: "Mumbai, Maharashtra, India",
  linkedin: "linkedin.com/in/sujalwarke",
  github: "github.com/sujalwarke28",

  aboutMe: "I aspire to be a successful Engineer doing my Undergraduate at ITM Skills University. My interests include Machine Learning, Deep Learning, Web Development, and Quantum Computing. I communicate formally with high precision and clarity.",

  skills: [
    "Web Development (React, Next.js, Node.js)",
    "Python for Machine Learning & Deep Learning",
    "AI Prompting & LLM Engineering",
    "IoT & Factory Systems Architecture",
    "Inter-Personal Communication"
  ],

  education: [
    {
      period: "2024 - Present",
      institution: "ITM SKILLS UNIVERSITY, KHARGHAR",
      degree: "B.Tech Computer Science Engineering",
      grade: "1st Year GPA: 9.16 / 10.0"
    },
    {
      period: "2022 - 2024",
      institution: "PACE IIT SCIENCE JUNIOR COLLEGE, THANE",
      degree: "Junior College (HSC Science)",
      grade: "Score: 72%"
    }
  ],

  experience: [
    {
      period: "Dec 2024 - Jan 2025",
      role: "MARKETING ASSOCIATE INTERN",
      company: "LetsUpgrade",
      description: "Managed tech community outreach, growth campaigns, and developer workshop promotion."
    },
    {
      period: "Oct 2024 - Dec 2024",
      role: "OPEN SOURCE CONTRIBUTOR",
      company: "Girlscript Summer of Code (GSSoC)",
      description: "Contributed code fixes, feature additions, and documentation improvements across open-source software repositories."
    }
  ],

  achievements: [
    {
      date: "Aug 2024",
      title: "AUTOMATION CHALLENGE WINNER (NMIMS)",
      details: "Conveyor System Identification and Optimization — Built automated hardware telemetry and speed optimization algorithms."
    },
    {
      date: "July 2024",
      title: "HSC BOARDS ELECTRICAL MAINTENANCE TOPPER",
      details: "Achieved Perfect 200/200 score in Electrical Maintenance HSC Board Examination."
    }
  ]
};

/**
 * Four-tier status vocabulary (per the portfolio's content-accuracy rules):
 * experienced | learning | exploring | research-interest
 */
export const skillEvolutionEpochs = [
  {
    epoch: "01",
    id: "foundation",
    title: "FOUNDATION",
    subtitle: "Core Programming & Algorithmic Thinking",
    description: "Building mental models for computer science, logic, memory, and structured algorithms.",
    skills: [
      { name: "Programming Principles", status: "experienced", note: "Control flow, OOP, functional basics" },
      { name: "Python", status: "experienced", note: "Scripting, data structures, automation" },
      { name: "JavaScript (ESNext)", status: "experienced", note: "Async execution, event loop, closure mechanics" },
      { name: "Dart", status: "experienced", note: "Strong static typing & mobile object patterns" },
      { name: "Data Structures & Algorithms", status: "learning", note: "Trees, graphs, dynamic programming, space-time complexity" },
      { name: "C++", status: "experienced", note: "Pointers, memory management, low-level constructs" }
    ]
  },
  {
    epoch: "02",
    id: "building",
    title: "BUILDING",
    subtitle: "Full-Stack Software Architecture",
    description: "Designing end-to-end web software systems, API interfaces, and state management.",
    skills: [
      { name: "HTML & CSS Systems", status: "experienced", note: "Responsive layouts, animations, design tokens" },
      { name: "React", status: "experienced", note: "Component lifecycle, hooks, composition patterns" },
      { name: "Node.js & Express", status: "experienced", note: "RESTful API design, middleware, async event loop" },
      { name: "MongoDB & Firestore", status: "experienced", note: "Document store schema modeling & indexing" },
      { name: "Firebase & Realtime DB", status: "experienced", note: "Authentication & real-time websockets" }
    ]
  },
  {
    epoch: "03",
    id: "deployment",
    title: "DEPLOYMENT",
    subtitle: "DevOps & Cloud Infrastructure",
    description: "Transitioning code from local development into production cloud infrastructure.",
    skills: [
      { name: "Git & GitHub", status: "experienced", note: "Version control, branching, PR review workflows" },
      { name: "AWS EC2 & GCP", status: "learning", note: "Virtual machines, cloud storage, edge functions" },
      { name: "Vercel, Netlify & Render", status: "experienced", note: "Continuous deployment CI/CD integration" },
      { name: "NeonDB & MongoDB Atlas", status: "experienced", note: "Serverless relational DBs & cloud clusters" }
    ]
  },
  {
    epoch: "04",
    id: "intelligence",
    title: "INTELLIGENCE",
    subtitle: "Machine Learning & Neural Foundations",
    description: "Moving from deterministic programming to probabilistic learning models.",
    skills: [
      { name: "Python ML Ecosystem", status: "experienced", note: "NumPy, Pandas, Matplotlib, SciPy" },
      { name: "Scikit-Learn", status: "experienced", note: "Classification, regression, clustering algorithms" },
      { name: "PyTorch & TensorFlow", status: "learning", note: "Deep learning neural network architectures" },
      { name: "Computer Vision & OCR", status: "learning", note: "Image processing, OpenCV, Tesseract text extraction" },
      { name: "NLP Foundations", status: "learning", note: "Tokenization, TF-IDF, word embeddings" }
    ]
  },
  {
    epoch: "05",
    id: "generative-ai",
    title: "GENERATIVE AI",
    subtitle: "LLMs, Vector Embeddings & RAG",
    description: "Harnessing large language models, semantic vector search, and tool-calling agents.",
    skills: [
      { name: "LLM Integration (Gemini, Llama, OpenAI)", status: "experienced", note: "API orchestration, prompt structuring, streaming" },
      { name: "Vector Embeddings & RAG", status: "learning", note: "Cosine similarity, chunking, semantic retrieval" },
      { name: "Document Intelligence", status: "learning", note: "Parsing PDFs, extraction, context grounding" },
      { name: "Tool Calling & Function Execution", status: "learning", note: "Structured JSON schema output & function execution" },
      { name: "Local Models (Ollama)", status: "exploring", note: "Running quantized LLMs on local hardware" }
    ]
  },
  {
    epoch: "06",
    id: "secure-ai",
    title: "SECURE AI SYSTEMS",
    subtitle: "Authorization, Guardrails & Trustworthy Architecture",
    description: "Enforcing security boundaries so AI agents operate safely without exceeding permissions.",
    skills: [
      { name: "Role-Based Access Control (RBAC)", status: "learning", note: "Project-level authorization & policy enforcement" },
      { name: "AI Tool Permissions", status: "learning", note: "Pre-execution authorization gates for AI agents" },
      { name: "Human-in-the-loop Gates", status: "learning", note: "Required human approval for destructive database actions" },
      { name: "AI Threat Modeling", status: "exploring", note: "Prompt injection defense, data leakage prevention" },
      { name: "VAPT Concepts", status: "exploring", note: "Vulnerability assessment & penetration testing fundamentals" }
    ]
  },
  {
    epoch: "07",
    id: "research-frontier",
    title: "RESEARCH / NEXT FRONTIER",
    subtitle: "Emerging Technical Horizons",
    description: "Investigating the boundaries of robust AI, explainability, financial ML, and intelligent physical hardware.",
    skills: [
      { name: "Robust AI Systems", status: "research-interest", note: "Evaluating LLM stability under perturbed inputs" },
      { name: "Explainable AI (XAI)", status: "research-interest", note: "Interpretable model decisions & confidence bounds" },
      { name: "AI in Financial Systems", status: "research-interest", note: "Financial NLP, risk modeling, market sentiment" },
      { name: "Robotics & IoT Telemetry", status: "research-interest", note: "ESP32 sensors, physical automation, predictive maintenance" }
    ]
  }
];

export const skillStatusMeta = {
  "experienced": { label: "Experienced", order: 0 },
  "learning": { label: "Learning", order: 1 },
  "exploring": { label: "Exploring", order: 2 },
  "research-interest": { label: "Research Interest", order: 3 }
};

export const labCaseStudies = [
  {
    id: "industrial-predictive-maintenance",
    featured: true,
    title: "Titanminds: IoT Factory Management System",
    category: "IoT & Industrial Intelligent Systems",
    tagline: "Sensor Telemetry & Machine Failure Prediction",
    summary: "An industrial IoT platform collecting multi-sensor hardware data (temperature, sound, motion) via ESP32 microcontrollers to move factory maintenance from reactive to predictive.",
    problem: "Unscheduled factory machine breakdowns mean lost production time and manual inspection overhead that could often be anticipated from sensor trends.",
    whyItMattered: "This was my first project connecting a physical system to a software/ML pipeline end-to-end — it's where 'intelligent systems' stopped meaning 'a chatbot' and started meaning 'something touching real hardware.'",
    corePrinciple: "Connect physical hardware sensors to a backend and prediction layer so anomalies are flagged before they become failures, not after.",
    approach: "Stream sensor readings from ESP32 nodes to a backend ingestion API, persist telemetry, and apply threshold/pattern-based checks that escalate to a maintenance alert.",
    architecture: [
      "1. Hardware Sensors → ESP32 Microcontrollers (Temp, Sound, Motion)",
      "2. Ingestion Gateway → Node.js Express Backend API (Render)",
      "3. Telemetry Storage → PostgreSQL Database",
      "4. Predictive Engine → Failure Hazard Scoring",
      "5. Operator Dashboard → React Interface (Vercel)"
    ],
    implementation: "The ingestion endpoint persists every sensor read and runs a lightweight anomaly check inline, dispatching a maintenance alert when temperature or vibration crosses a defined threshold.",
    challenges: "Getting reliable telemetry off ESP32 hardware over an unstable network was a bigger problem than the prediction logic — retry handling and sane defaults for dropped readings mattered as much as the ML.",
    result: "A live dashboard and alerting pipeline running end-to-end from sensor to UI.",
    whatILearned: "Physical systems fail in messier ways than clean datasets suggest — noisy sensor data and network drops are the real engineering problem, not the model.",
    highlights: [
      "ESP32 Hardware Telemetry Ingestion",
      "Live Backend API on Render",
      "Threshold-Based Maintenance Alerts",
      "Vercel React Dashboard"
    ],
    demoUrl: "https://titanminds.vercel.app/",
    githubUrl: "https://github.com/sujalwarke28/Titanminds-Factory-Management-System",
    codeSnippet: `// Machine Sensor Ingestion & Anomaly Trigger
export async function handleSensorTelemetry(req, res) {
  const { machineId, tempC, vibrationIndex, soundDb } = req.body;

  // Persist sensor read
  await db.query(
    'INSERT INTO telemetry (machine_id, temp_c, vibration, sound_db, read_at) VALUES ($1, $2, $3, $4, NOW())',
    [machineId, tempC, vibrationIndex, soundDb]
  );

  // Failure probability threshold check
  if (tempC > 85.0 || vibrationIndex > 7.5) {
    await triggerMaintenanceAlert({ machineId, severity: 'HIGH', cause: 'Thermal/Vibration Anomaly' });
  }

  res.status(200).json({ status: 'INGESTED' });
}`
  },
  {
    id: "secure-db-copilot",
    title: "Secure Database Copilot",
    category: "AI Systems & Security Case Study",
    tagline: "Enforcing Strict Authorization Guardrails on AI Database Agents",
    summary: "An AI-powered database copilot designed around a fundamental security principle: the LLM must never be the authorization authority. Every tool call and data request passes through an independent RBAC engine before SQL executes.",
    problem: "Generic AI database assistants are vulnerable to cross-project data leakage, prompt injection attacks, and unintended destructive executions when granted direct DB credentials — the model itself ends up deciding what a user can touch.",
    whyItMattered: "As soon as an AI agent can write to a database, the interesting engineering problem stops being 'can it generate correct SQL' and becomes 'can it be stopped from doing the wrong thing.' That reframing is what pulled me from chatbot-style AI work toward AI systems security.",
    corePrinciple: "The LLM generates a candidate query, but an independent authorization layer verifies project boundaries, RBAC permissions, and requires explicit human confirmation on destructive operations (DELETE / DROP) — deterministically, outside the model's context.",
    approach: "Treat the LLM strictly as a query proposer, never as a decision-maker about access. Route every proposed tool call through a policy engine that has no dependency on anything the model said about the user's identity or permissions.",
    architecture: [
      "1. User Query → Sanitize Input & Extract Metadata",
      "2. LLM Engine → Generates Candidate SQL & Tool Calling Payload",
      "3. Policy Guardrail Engine → Validates User RBAC Token & Project Isolation Boundary",
      "4. Gatekeeper → Requires Explicit Human Confirmation for Mutative Operations",
      "5. DB Executor → Runs Authorized SQL & Returns Audited Result Stream"
    ],
    implementation: "The guardrail engine sits between the LLM's tool-call output and the database driver as a hard dependency — the executor function simply refuses to run without a passing authorization context, so there's no code path where a clever prompt can skip the check.",
    challenges: "The hardest part wasn't the RBAC logic itself — it was resisting the temptation to let the LLM 'help' with authorization decisions (e.g. asking it to judge intent). Any place the model's output influences the access decision reopens the vulnerability the whole design exists to close.",
    result: "A working pattern where destructive operations always stop at a human-confirmation gate and cross-project access is structurally impossible rather than just prompted against.",
    whatILearned: "Security in AI systems has to be an architectural property, not a prompting strategy. 'Please don't access other projects' in a system prompt is not a security boundary.",
    highlights: [
      "Deterministic Cross-Project Isolation",
      "Immutable RBAC Pre-Execution Check",
      "Human-in-the-Loop Destructive Gate",
      "Full Audit Trail Logging"
    ],
    codeSnippet: `// Security Guardrail: Pre-Execution Authorization Check
export async function executeCopilotToolCall(userToken, targetProject, sqlPayload) {
  // 1. Verify User Session & Project Authorization BEFORE LLM payload runs
  const authContext = await verifyRBACPermission(userToken, targetProject.id);
  if (!authContext.hasAccess) {
    throw new SecurityError('DENIED: User is not authorized for target project');
  }

  // 2. Inspect query intent for destructive operations
  const isDestructive = /\\b(DELETE|DROP|TRUNCATE|ALTER)\\b/i.test(sqlPayload);
  if (isDestructive && !userToken.isConfirmedByHuman) {
    return { status: 'REQUIRES_HUMAN_APPROVAL', prompt: 'Destructive action detected' };
  }

  // 3. Execute query within scoped tenant transaction
  return await db.scopedTransaction(targetProject.id, sqlPayload);
}`
  },
  {
    id: "document-copilot",
    title: "Document Copilot",
    category: "RAG & Document Intelligence",
    tagline: "Grounded Retrieval Over Large Technical Documents",
    summary: "A document-grounded AI system using chunking, vector embeddings, and semantic retrieval to answer questions over dense technical documentation instead of relying on the model's unaided memory.",
    problem: "Standard LLMs hallucinate when asked detailed questions about specific documents — the source text doesn't fit in context, and the model fills gaps with plausible-sounding but ungrounded answers.",
    whyItMattered: "This is where I first had to engineer around a hard constraint (the context window) instead of just prompting around it — it forced actual systems thinking about chunking strategy, retrieval quality, and how to make an answer traceable back to a source.",
    corePrinciple: "Ground every response strictly in retrieved vector chunks with citation pointers, rather than trusting the model to 'remember' the document correctly.",
    approach: "Split documents with overlapping windows so no answer-relevant sentence gets cut at a chunk boundary, embed each chunk, and retrieve by similarity before the model ever sees the question paired with source text.",
    architecture: [
      "1. Document Ingestion → PDF/Text Extraction & Structural Parsing",
      "2. Chunking Engine → Overlapping Sliding Window Chunking",
      "3. Embedding Pipeline → Generates Dense Vector Index",
      "4. Semantic Query Engine → Vector Similarity Search",
      "5. Prompt Assembler → Inject Grounded Chunks → Stream Cited Answer"
    ],
    implementation: "The prompt assembler explicitly instructs the model to say 'not found in document' when retrieval confidence is low, rather than letting it default to a confident guess — the retrieval step is a hard gate on what the model is allowed to talk about.",
    challenges: "Chunk size is a genuine tradeoff: too small and retrieval loses surrounding context; too large and irrelevant text dilutes the match. Tuning that, plus handling documents with tables and multi-column layouts, took more iteration than the retrieval logic itself.",
    result: "A retrieval pipeline that keeps answers traceable to a specific page/chunk instead of an opaque model claim.",
    whatILearned: "Reducing hallucination is less about prompting and more about not giving the model room to hallucinate in the first place — constrain what it can see and say.",
    highlights: [
      "Sliding Window Chunking Strategy",
      "Source Document Citations",
      "Vector Similarity Retrieval",
      "Explicit 'Not Found' Fallback"
    ],
    codeSnippet: `// Semantic Retrieval & Grounded Context Assembly
export async function queryDocumentCopilot(userQuery, documentId) {
  const queryEmbedding = await generateEmbedding(userQuery);

  // Vector search over document chunks
  const relevantChunks = await vectorStore.query({
    vector: queryEmbedding,
    filter: { documentId },
    topK: 4
  });

  const groundedContext = relevantChunks.map(c => \`[Page \${c.page}]: \${c.text}\`).join('\\n---\\n');

  return await llmStream({
    systemPrompt: "Answer strictly using the provided context. If unsure, state 'Not found in document'.",
    context: groundedContext,
    prompt: userQuery
  });
}`
  },
  {
    id: "reom-co",
    title: "ReOm.Co: Retail Operations Management System",
    category: "Enterprise Retail Operations",
    tagline: "Multi-Store Stock Sync & POS Engine",
    summary: "A retail operations suite for point-of-sale transactions, multi-store inventory sync, supplier ordering, and analytics.",
    problem: "Multi-branch retail stores suffer from inventory desynchronization and slow POS checkout during peak business hours.",
    whyItMattered: "Working on a system with genuine concurrency pressure (many stores writing to shared inventory) was a useful contrast to AI-focused work — it's a caching and consistency problem, not a modeling one.",
    corePrinciple: "Decouple store inventory reads from the source of truth with caching so checkout latency doesn't depend on live database contention.",
    approach: "Cache per-store inventory state and reconcile deltas against the primary store on write, so reads stay fast during traffic bursts.",
    architecture: [
      "1. POS Terminal → React Frontend",
      "2. API Gateway → Query Batching",
      "3. Hot Cache → Redis Store Inventory State",
      "4. ORM Layer → Prisma ORM + PostgreSQL"
    ],
    implementation: "Inventory reads check Redis first and fall back to Postgres on a cache miss, repopulating the cache with a short TTL to bound staleness.",
    challenges: "Balancing cache TTL against staleness risk — too long and stores could oversell shared stock, too short and the cache stops helping under load.",
    result: "A functioning multi-store POS and inventory sync flow with a caching layer in front of the primary database.",
    whatILearned: "Caching correctness is mostly about deciding what staleness you can tolerate, not about the cache mechanism itself.",
    highlights: [
      "Multi-Store Inventory Delta Sync",
      "Redis Caching Layer",
      "Prisma + PostgreSQL",
      "Dockerized Deployment"
    ],
    githubUrl: "https://github.com/sujalwarke28/ReOm.Co",
    codeSnippet: `// Multi-Store Inventory Delta Sync Handler
export async function syncStoreInventoryDelta(storeId, itemSkus) {
  const cacheKey = \`inventory:store:\${storeId}\`;
  const cachedInventory = await redis.get(cacheKey);

  if (cachedInventory) {
    return calculateInventoryDelta(JSON.parse(cachedInventory), itemSkus);
  }

  const liveData = await prisma.inventory.findMany({ where: { storeId } });
  await redis.setex(cacheKey, 60, JSON.stringify(liveData));
  return liveData;
}`
  }
];

export const researchQuestions = [
  {
    id: "q1",
    question: "How robust are language models when financial information is deliberately perturbed?",
    area: "Financial AI & Robustness",
    hypothesis: "Standard LLMs likely make quantitative reasoning errors when numerical digits or financial table structures are subtly perturbed, which would argue for dedicated structural verification layers rather than trusting raw model output."
  },
  {
    id: "q2",
    question: "How can AI systems explain decisions without creating misleading confidence?",
    area: "Explainable & Trustworthy AI",
    hypothesis: "A verbal explanation generated after an answer doesn't guarantee the model actually reasoned that way — real trustworthiness probably needs calibrated uncertainty and verifiable evidence pointers, not just fluent justification."
  },
  {
    id: "q3",
    question: "How can intelligent systems remain useful while respecting strict access boundaries?",
    area: "AI Systems & Security",
    hypothesis: "Pre-execution authorization gates and deterministic policy engines should be able to constrain what an agent can do without collapsing its problem-solving usefulness — that's the balance the Secure Database Copilot work is testing."
  },
  {
    id: "q4",
    question: "How can AI move safely from a chatbot into a system that interacts with real infrastructure?",
    area: "Intelligent Physical & Cloud Systems",
    hypothesis: "Bridging AI to real infrastructure probably needs deterministic rollback, sandboxed execution, and hardware telemetry loops as first-class design constraints, not afterthoughts."
  }
];

/**
 * The Minds I Borrow From — real-world figures and fictional archetypes,
 * each tied to the principle Sujal actually takes from them (not fandom).
 */
export const influencesData = {
  realWorld: [
    {
      figure: "Steve Jobs",
      principle: "Simplicity & Product Obsession",
      application: "Great software isn't a feature count — it's how much you cared about the details the user never consciously notices."
    },
    {
      figure: "Jamie Dimon",
      principle: "Long-Term Judgment & Discipline",
      application: "Understanding a system well enough to make disciplined calls under pressure, and owning the outcome either way."
    },
    {
      figure: "Cristiano Ronaldo",
      principle: "Relentless, Daily Improvement",
      application: "Talent without unglamorous, repeated daily work doesn't turn into performance. Consistency compounds."
    },
    {
      figure: "Xerxes Desai",
      principle: "Building Things That Last",
      application: "Optimize for institutions and standards that outlive the initial excitement of building them, not for a quick launch."
    }
  ],
  fiction: [
    {
      figure: "Harvey Specter",
      source: "Suits",
      principle: "Confidence & Decisiveness",
      application: "Know what you're actually good at, and act on it without hedging."
    },
    {
      figure: "Mike Ross",
      source: "Suits",
      principle: "Learning Velocity",
      application: "Absorb unfamiliar material fast and stay adaptable rather than over-specializing early."
    },
    {
      figure: "Louis Litt",
      source: "Suits",
      principle: "Preparation & Intensity",
      application: "Being over-prepared is what makes confidence earned instead of performed."
    },
    {
      figure: "Bobby Axelrod",
      source: "Billions",
      principle: "Strategic, Incentive-Aware Thinking",
      application: "Understand what actually drives the people and systems you're working with, not just the stated rules."
    },
    {
      figure: "Dollar Bill Stern",
      source: "Billions",
      principle: "Execution & Follow-Through",
      application: "A good plan that doesn't get executed is worth nothing — ship the thing."
    },
    {
      figure: "Patrick Jane",
      source: "The Mentalist",
      principle: "Observation & Pattern Recognition",
      application: "The bug or the design flaw is usually visible before it's understood — the skill is noticing what's actually in front of you."
    },
    {
      figure: "Thomas Shelby",
      source: "Peaky Blinders",
      principle: "Composure Under Pressure",
      application: "Think several moves ahead and make calculated calls instead of reactive ones — without glorifying how the character gets there."
    },
    {
      figure: "Neal Caffrey",
      source: "White Collar",
      principle: "Adaptability & Systems Thinking",
      application: "Understanding how a system actually works is more valuable than following its documentation."
    },
    {
      figure: "Spider-Man",
      source: "Marvel",
      principle: "Responsibility & Resilience",
      application: "Capability comes with an obligation to use it carefully, and setbacks aren't a reason to stop."
    },
    {
      figure: "Iron Man",
      source: "Marvel",
      principle: "Engineering Imagination",
      application: "Build the thing that doesn't exist yet, break it, and iterate — the prototype is part of the process, not a failure of it."
    }
  ]
};

/**
 * How I Think — the operating principles behind the engineering decisions,
 * not a mission-statement wall.
 */
export const philosophyThemes = [
  { title: "Mastery over mediocrity", desc: "Being good at a lot of things is worth less than being genuinely good at a few." },
  { title: "Build rather than merely consume", desc: "Understanding a concept means being able to build something with it, not just recognize it." },
  { title: "Learn fast", desc: "Speed of learning compounds more than any single skill learned." },
  { title: "Think several steps ahead", desc: "Most engineering mistakes are visible two steps earlier than where they get caught." },
  { title: "Stay curious", desc: "The interesting question is usually 'why does this actually work,' not 'does it work.'" },
  { title: "Take responsibility", desc: "Systems you build carry consequences whether or not you accounted for them." },
  { title: "Compete with yourself", desc: "The relevant comparison is what I built last year, not what someone else built this week." },
  { title: "Build things that matter", desc: "Optimize for problems worth solving, not just problems that are easy to demo." },
  { title: "Value freedom", desc: "Skill is worth building because it creates options, not just income." },
  { title: "Make technology useful", desc: "A clever system that doesn't help anyone is a demo, not an achievement." },
  { title: "Keep improving", desc: "There's no finished state — just the next version." }
];

export const terminalCommands = {
  help: `SUJAL WARKE DIGITAL LAB TERMINAL (v3.0.0)
Available Commands:
  - bio          : Print engineering thesis & profile summary
  - evolution    : Display the 7 skill evolution epochs
  - lab          : List deep architectural case studies
  - research     : Print active research inquiries
  - influences   : Display core figures & engineering principles
  - resume       : Print formal credentials & GPA
  - contact      : Display direct contact channels
  - sudo hire    : Trigger fast-track inquiry dialog
  - clear        : Clear terminal console`,

  bio: `[ENGINEERING THESIS]
Sujal Pradeep Warke — Computer Science Undergraduate
Focus: Intelligent Systems, AI Security & Trustworthy Software Architecture
"I started by learning how to build software. Then I became interested in how software could become intelligent. Now I'm interested in how intelligent systems can become reliable, secure, and useful."`,

  evolution: `[7 SKILL EVOLUTION EPOCHS]
  01. FOUNDATION        - Python, JS, C++, Data Structures & Algorithms
  02. BUILDING          - React, Node.js, Express, MongoDB, REST
  03. DEPLOYMENT        - Git, GitHub, AWS, GCP, Vercel, Render, NeonDB
  04. INTELLIGENCE      - Machine Learning, PyTorch, TensorFlow, Vision, NLP
  05. GENERATIVE AI     - LLMs, Gemini, Llama, Ollama, RAG, Tool Calling
  06. SECURE AI SYSTEMS - RBAC, AI Tool Permissions, Human Confirmation Gates
  07. RESEARCH FRONTIER - Robust AI, Explainable AI, Financial ML, Physical IoT`,

  lab: `[DEEP CASE STUDIES]
  1. Secure Database Copilot (AI RBAC Guardrails & Authorization Gates)
  2. Document Copilot (RAG & Semantic Vector Retrieval)
  3. Titanminds IoT Factory Management (https://titanminds.vercel.app/)
  4. ReOm.Co Retail Operations Management System`,

  research: `[QUESTIONS I'M CHASING]
  • How robust are language models when financial information is perturbed?
  • How can AI systems explain decisions without misleading confidence?
  • How can intelligent systems remain useful while respecting strict access boundaries?
  • How can AI move safely from chatbots to real physical infrastructure?`,

  influences: `[THE MINDS I BORROW FROM]
  Real World: Steve Jobs, Jamie Dimon, Cristiano Ronaldo, Xerxes Desai
  Fiction:    Harvey Specter, Mike Ross, Louis Litt, Bobby Axelrod,
              Dollar Bill Stern, Patrick Jane, Thomas Shelby,
              Neal Caffrey, Spider-Man, Iron Man`,

  resume: `[CREDENTIALS SUMMARY]
  • Degree: B.Tech Computer Science Engineering @ ITM Skills University (GPA: 9.16 / 10.0)
  • HSC Boards: Electrical Maintenance Topper (200 / 200 Score)
  • Competition: NMIMS Automation Challenge Winner (Conveyor System Identification)
  • Experience: Marketing Associate Intern @ LetsUpgrade, Contributor @ GSSoC`,

  contact: `[DIRECT CHANNELS]
  • Personal Email : warke.sujal281106@gmail.com
  • University Email: 2024.sujalw@isu.ac.in
  • Phone          : +91 8169613561
  • Location       : Mumbai, Maharashtra, India (IST)
  • GitHub         : https://github.com/sujalwarke28
  • LinkedIn       : https://linkedin.com/in/sujalwarke`
};
