/**
 * Portfolio content.
 *
 * Every fact here comes from Ahtesham's Upwork profile (overview, employment
 * history, portfolio titles, certifications). Figures are only included where
 * the profile states them. Do not add numbers that are not in the source.
 */

export type Service = {
  title: string;
  problem: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    title: "LLM Application Development",
    problem:
      "Your team wants to use GPT or Claude on its own data, but a chat window is not a product. It needs structured outputs, guardrails, and a place in an existing workflow.",
    deliverables: [
      "Applications built on OpenAI, Claude, and open-source models such as Llama",
      "Prompt design with structured, validated outputs",
      "LLM features connected to CRM and business data",
    ],
  },
  {
    title: "Retrieval-Augmented Generation (RAG)",
    problem:
      "Answers are buried in PDFs, documents, and knowledge bases, and people spend time searching instead of working.",
    deliverables: [
      "Document Q&A and assistants grounded in your own content",
      "Semantic search and retrieval pipelines with LangChain",
      "Vector databases: Pinecone, ChromaDB, Weaviate",
    ],
  },
  {
    title: "AI Agents, MCP & Workflow Automation",
    problem:
      "Repetitive research, outreach, and follow-up work moves between CRM, email, and spreadsheets by hand.",
    deliverables: [
      "Agents that call tools and APIs to finish tasks, not just answer questions",
      "MCP connections that let Claude and other LLMs act on business tools",
      "n8n and Airtable workflows with a control panel showing what ran and what failed",
    ],
  },
  {
    title: "Python Automation & Data Pipelines",
    problem:
      "Data arrives messy, duplicated, or scattered across websites, and someone cleans it manually every week.",
    deliverables: [
      "ETL pipelines in Python and Apache Airflow",
      "Web data collection with Playwright and Selenium",
      "Validation, deduplication, and enrichment with SQL and Python",
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  /** URL segment for /projects/[slug]. Changing it breaks indexed URLs. */
  slug: string;
  title: string;
  /** One-sentence summary; used as the page meta description. */
  summary: string;
  /** What the result meant in practice, stated only as far as the profile supports. */
  outcome: string;
  /** Titles from `services` this work demonstrates. */
  services: string[];
  context: string;
  problem: string;
  approach: string[];
  stack: string[];
  results: Metric[];
  mockup: "outreach" | "mcq" | "quality" | null;
};

export const projects: Project[] = [
  {
    id: "outreach",
    slug: "ai-outreach-drafting-system",
    title: "AI Outreach Drafting System",
    summary:
      "An n8n and Airtable MCP workflow that drafts personalized emails for 7,000 prospects and cut daily time on generic replies from 4 hours to 35 minutes.",
    outcome:
      "Generic replies that took about 4 hours a day now take 35 minutes, and every one of the 7,000 prospects gets a personalized draft. Runs are monitored from a custom control panel on a VPS, so failures are visible instead of silent.",
    services: ["AI Agents, MCP & Workflow Automation","LLM Application Development"],
    context: "BizProspex · AI Engineer",
    problem:
      "Replying to prospects with generic messages took hours every day, and every draft was written by hand.",
    approach: [
      "Built the workflow in n8n with Airtable connected through MCP as the prospect record.",
      "The system drafts a personalized email for each prospect instead of a template reply.",
      "Hosted on a VPS with a custom control panel to monitor each run and spot failures.",
    ],
    stack: ["n8n", "Airtable", "MCP", "LLM drafting", "VPS"],
    results: [
      { value: "7,000", label: "prospects with personalized drafts" },
      { value: "4 h → 35 min", label: "daily time on generic replies" },
    ],
    mockup: "outreach",
  },
  {
    id: "mcq",
    slug: "generative-mcq-pipeline",
    title: "Generative MCQ Pipeline",
    summary:
      "A Python pipeline that crawled source articles with Selenium and Playwright and generated 1.5 million school MCQs with answers using OpenAI, with quality checks.",
    outcome:
      "The pipeline produced 1.5 million multiple-choice questions with answers from crawled source articles, with quality checks built into the generation step rather than left to manual review.",
    services: ["LLM Application Development","Python Automation & Data Pipelines"],
    context: "BizProspex · AI Engineer",
    problem:
      "Producing school multiple-choice questions at scale by hand was not feasible, and generated content needed checks before use.",
    approach: [
      "Crawled source articles with Selenium and Playwright.",
      "Generated questions and answers from that source material with OpenAI.",
      "Added checks on output quality as part of the pipeline.",
    ],
    stack: ["Python", "OpenAI", "Selenium", "Playwright"],
    results: [{ value: "1.5M", label: "questions with answers generated" }],
    mockup: "mcq",
  },
  {
    id: "quality",
    slug: "b2b-data-validation-deduplication",
    title: "B2B Data Validation & Deduplication",
    summary:
      "A SQL-based validation, deduplication and enrichment framework that raised B2B dataset accuracy from 78% to 94%.",
    outcome:
      "Dataset accuracy rose from 78% to 94%, so lead lists built from the data started from cleaner, deduplicated records.",
    services: ["Python Automation & Data Pipelines"],
    context: "BizProspex · Data Intelligence Analyst",
    problem:
      "B2B datasets contained duplicates and inaccurate records, which weakened the lead lists built from them.",
    approach: [
      "Built a SQL-based validation framework for incoming records.",
      "Added deduplication and enrichment steps before data was delivered.",
    ],
    stack: ["SQL", "Python", "Data validation"],
    results: [{ value: "78% → 94%", label: "dataset accuracy" }],
    mockup: "quality",
  },
  {
    id: "etl",
    slug: "automated-etl-workflows",
    title: "Automated ETL Workflows",
    summary:
      "Python ETL workflows scheduled in Apache Airflow that cut manual data processing time by 70%.",
    outcome:
      "Manual data processing time dropped by 70%, freeing analyst time for work that needed judgment.",
    services: ["Python Automation & Data Pipelines"],
    context: "BizProspex · Data Intelligence Analyst",
    problem: "Recurring data processing was done manually and took significant analyst time.",
    approach: ["Automated the ETL steps with Python and scheduled them in Apache Airflow."],
    stack: ["Python", "Apache Airflow", "ETL"],
    results: [{ value: "70%", label: "less manual processing time" }],
    mockup: null,
  },
  {
    id: "research",
    slug: "competitive-intelligence-research",
    title: "Competitive Intelligence Research",
    summary:
      "Python research automation with BeautifulSoup and Selenium used to analyze 10,000+ B2B company profiles from LinkedIn Sales Navigator for ABM campaigns.",
    outcome:
      "More than 10,000 B2B company profiles were analyzed, and the insights supported ABM campaigns and go-to-market strategy.",
    services: ["Python Automation & Data Pipelines"],
    context: "BizProspex · Data Intelligence Analyst",
    problem:
      "ABM and go-to-market campaigns needed structured insight on a large set of target companies.",
    approach: [
      "Collected and analyzed company profiles from LinkedIn Sales Navigator with Python (BeautifulSoup, Selenium).",
    ],
    stack: ["Python", "BeautifulSoup", "Selenium"],
    results: [{ value: "10,000+", label: "B2B company profiles analyzed" }],
    mockup: null,
  },
  {
    id: "qa",
    slug: "automated-data-qa",
    title: "Automated Data QA & Team Lead",
    summary:
      "Automated testing and Python validation scripts that cut data error rates by 42%, built while leading a team of 8+ analysts.",
    outcome:
      "Error rates fell by 42%, and the team of 8+ analysts worked from shared documentation standards, data modeling practices and knowledge-transfer processes.",
    services: ["Python Automation & Data Pipelines"],
    context: "BizProspex · Data Quality Analyst & Team Lead",
    problem: "Data projects needed consistent quality checks across a growing analyst team.",
    approach: [
      "Implemented automated testing and Python validation scripts with quality-monitoring dashboards.",
      "Set documentation standards and knowledge-transfer processes for the team.",
    ],
    stack: ["Python", "Automated testing", "Dashboards"],
    results: [
      { value: "42%", label: "lower error rates" },
      { value: "8+", label: "analysts led" },
    ],
    mockup: null,
  },
];

/** Published items in the Upwork portfolio. Titles only; full write-ups live on Upwork. */
export const agentBuilds = [
  {
    title: "AI E-commerce Agent",
    summary: "Agent for store operations and marketing automation.",
  },
  {
    title: "AI Appointment Booking Agent",
    summary: "Agent for appointment booking and business task automation.",
  },
  {
    title: "Real-Time AI Voice Assistant",
    summary: "Voice assistant with speech handling and conversation memory.",
  },
];

export const skillGroups = [
  {
    title: "AI and LLM Engineering",
    skills: ["OpenAI API", "Claude", "Llama", "Hugging Face", "LangChain", "Prompt engineering", "Structured outputs", "Tool calling"],
  },
  {
    title: "RAG and Vector Databases",
    skills: ["Retrieval-Augmented Generation", "Semantic search", "Pinecone", "ChromaDB", "Weaviate"],
  },
  {
    title: "Agents and Automation",
    skills: ["n8n", "MCP", "Airtable", "API integration", "Webhooks", "HubSpot", "GoHighLevel", "Instantly", "Salesforce"],
  },
  {
    title: "Python and Data Engineering",
    skills: ["Python", "SQL", "Pandas", "NumPy", "Apache Airflow", "ETL / ELT", "Validation & deduplication"],
  },
  {
    title: "Web Data",
    skills: ["Playwright", "Selenium", "BeautifulSoup", "Browser automation"],
  },
  {
    title: "Deployment and Infrastructure",
    skills: ["AWS Lambda", "AWS SageMaker", "Docker", "MLflow", "CI/CD", "VPS hosting"],
  },
];

export const process = [
  {
    title: "Understand the problem",
    body: "Map the current process, the data it touches, and where the time goes. If a simple script or an existing tool solves it, that is the recommendation.",
  },
  {
    title: "Design the solution",
    body: "Choose the smallest architecture that works: which model, which retrieval or workflow steps, and how outputs get checked.",
  },
  {
    title: "Build and test",
    body: "Build a small working version on real data, review it, then extend it. Handle bad inputs and check outputs instead of trusting them.",
  },
  {
    title: "Deploy and document",
    body: "Deploy with visibility into what each workflow did and where it failed, and document it so the team can run it after handover.",
  },
];

export const career = [
  { role: "AI Engineer", org: "BizProspex", period: "Aug 2025 – Present" },
  { role: "Data Intelligence Analyst", org: "BizProspex", period: "Feb 2025 – Aug 2025" },
  { role: "Data Quality Analyst & Team Lead", org: "BizProspex", period: "Jun 2021 – Feb 2025" },
];

export const certifications = [
  { name: "Governing Zapier MCP", issuer: "Zapier", year: "2026" },
  { name: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
  { name: "Building LLM Applications With Prompt Engineering", issuer: "NVIDIA", year: "2025" },
  { name: "Full Stack Generative and Agentic AI with Python", issuer: "Udemy", year: "2025" },
];

export const education = {
  degree: "Bachelor's degree, Computer Science",
  school: "Devi Ahilya University",
  period: "2019 – 2023",
};

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
