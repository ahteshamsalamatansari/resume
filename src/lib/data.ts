export type Project = {
  title: string;
  category: string;
  year: string;
  stack: string[];
  description: string;
  metric: string;
  metricLabel: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Lead Intelligence System',
    category: 'GenAI · RAG',
    year: '2025',
    stack: ['GPT-4', 'LangChain', 'Pinecone', 'Python', 'AWS'],
    description:
      'End-to-end retrieval-augmented generation workflow that qualifies and enriches B2B leads across a 50M+ record corpus with semantic search and prompt-engineered scoring.',
    metric: '35%',
    metricLabel: 'Accuracy improvement',
  },
  {
    title: 'Real-Time Data Pipeline',
    category: 'Streaming',
    year: '2025',
    stack: ['Kafka', 'Spark', 'Kubernetes', 'Docker'],
    description:
      'Streaming system processing 50M data points per day with sub-second latency and automated quality controls.',
    metric: '50M',
    metricLabel: 'Data points / day',
  },
  {
    title: 'Conversational Analytics Agent',
    category: 'LLM Agents',
    year: '2024',
    stack: ['Claude', 'LangChain', 'FastAPI', 'Postgres'],
    description:
      'Natural-language interface over structured warehouses — turns plain questions into verified SQL and narrative answers.',
    metric: '60%',
    metricLabel: 'Faster insights',
  },
  {
    title: 'Data Quality Engine',
    category: 'Data Engineering',
    year: '2024',
    stack: ['Python', 'Airflow', 'SQL', 'Spark'],
    description:
      'Validation and monitoring framework that lifted automated dataset quality and slashed manual review overhead.',
    metric: '94%',
    metricLabel: 'Quality score',
  },
  {
    title: 'ML Deployment Platform',
    category: 'MLOps',
    year: '2023',
    stack: ['MLflow', 'SageMaker', 'Terraform', 'GitHub Actions'],
    description:
      'CI/CD pipeline for model promotion from notebook to production with full lineage and rollback.',
    metric: '60%',
    metricLabel: 'Faster deploys',
  },
];

export type CaseStudy = {
  client: string;
  title: string;
  problem: string;
  approach: string;
  results: { value: string; label: string }[];
  stack: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'BizProspex',
    title: 'GenAI Lead Qualification at Scale',
    problem:
      'Manual B2B lead research was slow, inconsistent, and impossible to scale across 50M+ records — yielding inconsistent qualification and 3.2s query latency.',
    approach:
      'Designed a RAG pipeline on GPT-4 + LangChain over Pinecone, with prompt-engineered scoring, semantic search, and guardrails for PII and GDPR/CCPA alignment.',
    results: [
      { value: '+35%', label: 'Qualification accuracy' },
      { value: '-80%', label: 'Manual research effort' },
      { value: '180ms', label: 'Query latency (was 3.2s)' },
    ],
    stack: ['GPT-4', 'LangChain', 'Pinecone', 'AWS'],
  },
  {
    client: 'FunnelByte',
    title: 'Real-Time Pipeline & QA Automation',
    problem:
      'A growing data volume produced mounting error rates and inconsistent datasets, with 6.5h runtimes blocking same-day decisions.',
    approach:
      'Re-architected streaming on Kafka + Spark, added automated QA testing, and tuned caching — shipped in Dockerized services on Kubernetes.',
    results: [
      { value: '-42%', label: 'Error rates' },
      { value: '78→94%', label: 'Data quality' },
      { value: '6.5→3.9h', label: 'Runtime' },
    ],
    stack: ['Kafka', 'Spark', 'Kubernetes', 'Airflow'],
  },
];

export type BlogPost = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    category: 'Engineering',
    title: 'Cutting RAG Latency from 3s to 180ms Without Losing Recall',
    excerpt:
      'A practical playbook on chunking, hybrid search, and caching tradeoffs that moved our GenAI pipeline from sluggish to sub-second.',
    date: 'Jun 2026',
    readTime: '8 min',
  },
  {
    category: 'Architecture',
    title: 'Designing Guardrails for Production LLM Agents',
    excerpt:
      'How we built deterministic safety layers, structured outputs, and PII controls around GPT-4 agents at scale.',
    date: 'May 2026',
    readTime: '12 min',
  },
  {
    category: 'Data',
    title: 'From 78% to 94%: A Data Quality Playbook',
    excerpt:
      'The validation, monitoring, and ownership patterns that actually moved the needle on automated dataset quality.',
    date: 'Apr 2026',
    readTime: '6 min',
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  impact: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: 'AI Engineer',
    company: 'BizProspex',
    period: '2025 — Now',
    impact: [
      'Shipped GenAI systems driving a 25% lift in pipeline conversion.',
      'Cut model deployment time 60% with MLflow-based MLOps pipelines.',
      'Implemented GDPR/CCPA-aligned systems with AES-256 encryption.',
    ],
  },
  {
    role: 'Data Intelligence Analyst',
    company: 'BizProspex',
    period: '2025',
    impact: [
      'Analyzed 10,000+ B2B company profiles with competitive intelligence workflows.',
      'Lifted dataset quality from 78% to 94% via SQL validation.',
      'Reduced processing effort 70% through ETL automation.',
    ],
  },
  {
    role: 'Data Quality Analyst',
    company: 'FunnelByte',
    period: '2021 — 2025',
    impact: [
      'Reduced error rates 42% through automated QA testing frameworks.',
      'Led a team of 8+ analysts and set documentation standards.',
      'Built Python validation scripts and real-time monitoring dashboards.',
    ],
  },
];

export const SKILL_GROUPS = [
  {
    label: 'Generative AI',
    blurb: 'LLMs that hold up in production, not just demos.',
    items: ['GPT-4', 'Claude', 'Llama', 'LangChain', 'RAG', 'Fine-tuning', 'Prompt Engineering'],
  },
  {
    label: 'Vector & Retrieval',
    blurb: 'Sub-second semantic search over tens of millions of records.',
    items: ['Pinecone', 'Weaviate', 'ChromaDB', 'pgvector', 'Hybrid Search', 'Embeddings'],
  },
  {
    label: 'Cloud & MLOps',
    blurb: 'From notebook to production with lineage and rollback.',
    items: ['AWS SageMaker', 'Lambda', 'MLflow', 'GitHub Actions', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    label: 'Data Engineering',
    blurb: 'Pipelines measured in millions of events per day.',
    items: ['Python', 'SQL', 'Kafka', 'Spark', 'Airflow', 'ETL/ELT'],
  },
];

export const METRICS = [
  { value: '50M+', label: 'Records processed' },
  { value: '180ms', label: 'P95 query latency' },
  { value: '94%', label: 'Data quality score' },
  { value: '99.9%', label: 'Uptime achieved' },
];

export const CONTACT = {
  email: 'ahteshamsalamat@gmail.com',
  phone: '+91 74159 95966',
  phoneHref: 'tel:+917415995966',
  location: 'India · GMT+5:30',
  name: 'Ahtesham Salamat Ansari',
};

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Deep Dives', href: '#case-studies' },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];
