/**
 * Service pages (/services/[slug]).
 *
 * The first three are Ahtesham's Upwork Project Catalog offers; titles, scope,
 * tiers and prices are copied from the catalog text he supplied on 2026-10-25.
 * The other three are scoped per project on Upwork and carry no prices.
 * Those three were chosen from Upwork's In-Demand Skills 2026 report (AI
 * integration +178%, AI chatbot development +71%) and match skills already
 * on his profile. Do not add results, clients or prices that no source states.
 */

export type Package = { name: string; price: string; delivery: string; includes: string };
export type Faq = { q: string; a: string };

export type ServicePage = {
  /** URL segment. Changing it breaks indexed URLs; add a redirect if you do. */
  slug: string;
  /** H1. Leads with the phrase clients search for. */
  name: string;
  /** Short label for cards and navigation. */
  shortName: string;
  metaTitle: string;
  /** About 150 characters; used as the meta description. */
  metaDescription: string;
  keywords: string[];
  /** The Upwork Project Catalog title, when this service is a catalog offer. */
  catalogTitle?: string;
  intro: string;
  /** Situations where the service fits. */
  forWho: string[];
  deliverables: string[];
  process: { title: string; body: string }[];
  /** Catalog tiers. Absent means scoped per project on Upwork. */
  packages?: Package[];
  stack: string[];
  /** Case-study slugs (from `projects`) that show related work. */
  proof: string[];
  faqs: Faq[];
};

/** Date the catalog prices were copied. Upwork always shows the current price. */
export const PRICES_AS_OF = "2026-10-25";

export const servicePages: ServicePage[] = [
  {
    slug: "ai-automation-audit",
    name: "AI Automation Audit and Workflow Action Plan",
    shortName: "AI automation audit",
    metaTitle: "AI Automation Audit: Workflow Review and Written Action Plan",
    metaDescription:
      "An AI automation audit of the process that takes your team the most time, with a written plan: what to automate with AI, n8n or Python, and which tools to use.",
    keywords: ["AI automation audit", "workflow automation consultant", "AI automation consultant", "business process automation"],
    catalogTitle: "You will get an AI automation audit of your workflow with a written action plan",
    intro:
      "Send me the process that takes your team the most time. I map how it works today, find the steps that can be automated with AI, n8n or Python, and deliver a written plan showing what to build, which tools to use, and the expected time saved. If a tool you already pay for can solve it, I will say so.",
    forWho: [
      "You know a process is slow but not which parts AI can safely take over.",
      "You want a plan and an estimate before committing to a larger build.",
      "Your team already pays for tools and you suspect one of them could do the job.",
    ],
    deliverables: [
      "A map of the workflow as it runs today, step by step",
      "The steps worth automating, and the ones that should stay manual",
      "Recommended tools: AI models, n8n, Python, or software you already have",
      "Expected time saved, and an effort estimate on the Standard and Advanced tiers",
    ],
    process: [
      { title: "You describe the process", body: "What happens, who does it, which tools and data it touches, and where the time goes." },
      { title: "I map and assess it", body: "Each step is checked for whether it can be automated reliably, and what would check the output." },
      { title: "You get the written plan", body: "What to build, with which tools, in what order, with the expected time saved." },
    ],
    packages: [
      { name: "Starter", price: "$100", delivery: "3 days", includes: "1 workflow reviewed, written action plan" },
      { name: "Standard", price: "$200", delivery: "4 days", includes: "Up to 3 workflows, plan plus effort estimate for each" },
      { name: "Advanced", price: "$350", delivery: "5 days", includes: "Up to 3 workflows, plan, estimates, and a 30-minute walkthrough call" },
    ],
    stack: ["n8n", "Python", "OpenAI", "Claude", "Airtable"],
    proof: ["ai-outreach-automation-platform", "automated-etl-workflows"],
    faqs: [
      {
        q: "What do I need to send for an AI automation audit?",
        a: "A description of the process: the steps, who does them, the tools and data involved, and roughly how long it takes. Screenshots or sample files help, with anything sensitive removed.",
      },
      {
        q: "Will the plan always recommend building something?",
        a: "No. If a tool you already pay for, or a simple script, solves the problem, the plan says so instead of recommending an AI system.",
      },
      {
        q: "Can you build what the plan recommends?",
        a: "Yes. The plan can be the scope for a follow-up build on Upwork, but there is no obligation to continue.",
      },
    ],
  },
  {
    slug: "ai-outreach-automation-n8n",
    name: "AI Outreach Automation with n8n and Airtable",
    shortName: "AI outreach automation",
    metaTitle: "AI Outreach Automation with n8n and Airtable: Personalized Email Drafts",
    metaDescription:
      "An n8n workflow that takes your prospect list from Airtable, drafts a personalized email for each prospect with AI, and holds every draft for review before sending.",
    keywords: ["AI outreach automation", "n8n automation expert", "AI email personalization", "n8n Airtable workflow", "AI cold email"],
    catalogTitle: "You will get an AI outreach system that drafts personalized emails with n8n and Airtable",
    intro:
      "I build an n8n workflow that takes your prospect list from Airtable, drafts a personalized email for each prospect with AI, and saves the drafts for review before sending. You get the working workflow, a short setup guide, and a handover so your team can run it.",
    forWho: [
      "Your prospect list lives in Airtable or a spreadsheet and every email is written by hand.",
      "Generic templates are not getting replies and you want each email to reference the prospect.",
      "Nothing should go out without a person reading it first.",
    ],
    deliverables: [
      "A working n8n workflow from prospect list to personalized draft",
      "A review step: drafts are saved for approval, not sent automatically",
      "Data enrichment and CRM sync on the Standard tier",
      "A monitoring panel and VPS hosting setup on the Advanced tier",
      "A short setup guide and a handover",
    ],
    process: [
      { title: "Connect your data", body: "Your Airtable base (or list) becomes the prospect record the workflow reads from and writes back to." },
      { title: "Build the drafting workflow", body: "Each prospect gets an AI-drafted email grounded in the facts you approve, saved for review." },
      { title: "Hand over", body: "Setup guide and handover so your team can run, review and adjust it." },
    ],
    packages: [
      { name: "Starter", price: "$250", delivery: "5 days", includes: "Draft generation for one prospect list, review step" },
      { name: "Standard", price: "$500", delivery: "8 days", includes: "Adds data enrichment and CRM sync" },
      { name: "Advanced", price: "$900", delivery: "14 days", includes: "Adds a monitoring panel and VPS hosting setup" },
    ],
    stack: ["n8n", "Airtable", "OpenAI", "Claude", "VPS"],
    proof: ["ai-outreach-automation-platform"],
    faqs: [
      {
        q: "Does the workflow send emails automatically?",
        a: "Not in this offer. Drafts are saved for review before sending, so a person approves what goes out.",
      },
      {
        q: "Which AI model writes the drafts?",
        a: "OpenAI or Claude models, chosen for the job and your budget. The workflow is built so the model can be changed later.",
      },
      {
        q: "Can it connect to my CRM?",
        a: "CRM sync is part of the Standard and Advanced tiers. Tell me which CRM you use before ordering so I can confirm it fits.",
      },
      {
        q: "How do you keep the AI from inventing facts in emails?",
        a: "The drafts are grounded in information you approve, and every draft is reviewed before it is sent. In the larger platform I built, figures and offers were also checked in code against an approved list.",
      },
    ],
  },
  {
    slug: "python-web-scraping-data-cleaning",
    name: "Python Web Scraping and Data Cleaning",
    shortName: "Web scraping and data cleaning",
    metaTitle: "Python Web Scraping and Data Cleaning: Clean, Deduplicated Datasets",
    metaDescription:
      "A Python scraper built with Playwright or Selenium for the public sources you need, with the data cleaned, validated and deduplicated, delivered as CSV, Sheets or Airtable.",
    keywords: ["Python web scraper", "web scraping service", "data cleaning and deduplication", "Playwright scraper", "Selenium scraping"],
    catalogTitle: "You will get a Python web scraper with a cleaned, deduplicated dataset",
    intro:
      "I build a Python scraper with Playwright or Selenium for the public sources you need, then clean, validate and deduplicate the data. You receive the dataset in CSV, Google Sheets or Airtable, plus the script so you can run it again.",
    forWho: [
      "You need data from public websites in a structured, usable form.",
      "Someone on your team copies and cleans this data by hand.",
      "Earlier datasets had duplicates or inconsistent fields.",
    ],
    deliverables: [
      "A Python scraper for your public sources (Playwright or Selenium)",
      "Cleaned, validated and deduplicated records",
      "Delivery as CSV, Google Sheets or Airtable",
      "The script, so you can run it again; scheduled runs on the Advanced tier",
    ],
    process: [
      { title: "Agree the sources and fields", body: "Which public sources, which fields, and what counts as a duplicate or invalid record." },
      { title: "Build and run the scraper", body: "Collection with Playwright or Selenium, then validation and deduplication in Python." },
      { title: "Deliver data and script", body: "The dataset in your chosen format, plus the script to run it again." },
    ],
    packages: [
      { name: "Starter", price: "$150", delivery: "3 days", includes: "1 source, up to 5,000 records, cleaned CSV" },
      { name: "Standard", price: "$350", delivery: "5 days", includes: "Up to 3 sources, validation and deduplication" },
      { name: "Advanced", price: "$700", delivery: "8 days", includes: "Up to 5 sources, scheduled runs, delivery to Sheets or Airtable" },
    ],
    stack: ["Python", "Playwright", "Selenium", "BeautifulSoup", "Pandas", "SQL"],
    proof: ["b2b-data-validation-deduplication", "competitive-intelligence-research", "generative-mcq-pipeline", "automated-data-qa"],
    faqs: [
      {
        q: "Which websites can you scrape?",
        a: "Public sources only. Send the sites before ordering so I can check they are publicly accessible and can be collected reliably.",
      },
      {
        q: "What does cleaning and deduplication include?",
        a: "Standardizing fields, removing duplicate records, and validating values against rules we agree, such as required fields and formats.",
      },
      {
        q: "Can I run the scraper again later?",
        a: "Yes. You get the script with every tier, and the Advanced tier adds scheduled runs.",
      },
    ],
  },
  {
    slug: "rag-chatbot-development",
    name: "RAG Chatbot Development: AI Assistants Grounded in Your Documents",
    shortName: "RAG chatbot development",
    metaTitle: "RAG Chatbot Development: AI Assistants Trained on Your Documents",
    metaDescription:
      "RAG chatbots and document Q&A assistants that answer from your own PDFs, documents and knowledge base, built with LangChain and vector databases.",
    keywords: ["RAG chatbot development", "AI chatbot for business", "chat with your documents", "document Q&A", "LangChain developer"],
    intro:
      "Answers are often buried in PDFs, documents and knowledge bases, and people spend time searching instead of working. I build retrieval-augmented generation (RAG) assistants that answer from your own content, so responses come from your documents rather than from what a model happens to remember.",
    forWho: [
      "Your team keeps asking the same questions that are answered somewhere in your documents.",
      "You want an assistant over internal content: policies, product docs, SOPs or a knowledge base.",
      "A general chatbot is not acceptable because answers must come from your material.",
    ],
    deliverables: [
      "Document ingestion and a retrieval pipeline built with LangChain",
      "A vector database: Pinecone, ChromaDB or Weaviate",
      "An assistant on OpenAI, Claude or an open-source model such as Llama",
      "Prompting that keeps answers grounded in the retrieved content",
      "Documentation so your team can add content and maintain it",
    ],
    process: [
      { title: "Scope the content and questions", body: "Which documents, who asks, and what a good answer looks like." },
      { title: "Build retrieval and the assistant", body: "Ingest, embed and index your content, then connect the model to it." },
      { title: "Test on real questions", body: "Check answers against your documents before handover." },
    ],
    stack: ["LangChain", "Pinecone", "ChromaDB", "Weaviate", "OpenAI", "Claude", "Llama", "Python"],
    proof: ["ai-outreach-automation-platform", "generative-mcq-pipeline"],
    faqs: [
      {
        q: "What is a RAG chatbot?",
        a: "A chatbot that retrieves relevant passages from your own documents and gives them to a language model to answer from. Answers are based on your content instead of only the model's training data.",
      },
      {
        q: "Which documents can it use?",
        a: "Text-based content such as PDFs, documents and knowledge-base articles. We confirm the formats and volume during scoping.",
      },
      {
        q: "How is the price set?",
        a: "RAG projects are scoped per project on Upwork, because cost depends on the content, the number of sources and where the assistant needs to run.",
      },
    ],
  },
  {
    slug: "ai-agent-mcp-development",
    name: "AI Agent Development with n8n and MCP",
    shortName: "AI agents and MCP",
    metaTitle: "AI Agent Development with n8n and MCP: Agents That Use Your Tools",
    metaDescription:
      "AI agents that call tools and APIs to finish tasks, MCP connections that let Claude and other LLMs act on your business tools, and n8n workflows to run them.",
    keywords: ["AI agent development", "MCP server development", "Model Context Protocol", "n8n AI agent", "AI workflow automation"],
    intro:
      "Repetitive research, outreach and follow-up work moves between CRM, email and spreadsheets by hand. I build AI agents that call tools and APIs to finish those tasks, not just answer questions, and MCP connections that let Claude and other LLMs act on your business tools.",
    forWho: [
      "A task needs several tools in sequence: look something up, decide, update a record, send a message.",
      "You want Claude or another LLM to work with your own tools and data through MCP.",
      "You need to see what an agent did and where it failed, not just the final answer.",
    ],
    deliverables: [
      "Agents that call tools and APIs to complete multi-step tasks",
      "MCP connections between LLMs and business tools",
      "n8n workflows that run the agent, with a view of what ran and what failed",
      "Guardrails where they matter: approval steps, validation and limits",
      "Documentation and handover",
    ],
    process: [
      { title: "Define the task and its limits", body: "What the agent may do on its own, what needs approval, and what it must never do." },
      { title: "Build tools and the agent", body: "Connect the APIs or MCP tools, then the agent logic and the checks around it." },
      { title: "Run, observe, hand over", body: "Test on real cases with each step visible, then document it for your team." },
    ],
    stack: ["n8n", "MCP", "Claude", "OpenAI", "LangChain", "Python", "Airtable", "HubSpot"],
    proof: ["ai-outreach-automation-platform"],
    faqs: [
      {
        q: "What is the difference between an AI agent and a chatbot?",
        a: "A chatbot answers questions. An agent can also take actions: it calls tools and APIs, such as looking up a record or updating a CRM, to complete a task.",
      },
      {
        q: "What is MCP?",
        a: "The Model Context Protocol is an open standard for connecting language models like Claude to external tools and data. An MCP server exposes your tools so an LLM can use them in a controlled way.",
      },
      {
        q: "Can I see agent builds you have done?",
        a: "Yes. My Upwork portfolio includes an AI e-commerce agent, an AI appointment booking agent and a real-time AI voice assistant, and the outreach platform case study on this site shows how I add approval gates and validation.",
      },
    ],
  },
  {
    slug: "llm-integration",
    name: "AI Integration: LLM Features in Your Existing Apps and CRM",
    shortName: "AI and LLM integration",
    metaTitle: "AI Integration Services: Add LLM Features to Your Apps, CRM and Data",
    metaDescription:
      "Add GPT, Claude or open-source LLM features to your existing apps, CRM and data, with structured, validated outputs instead of a separate chat window.",
    keywords: ["AI integration services", "LLM integration", "OpenAI API integration", "Claude API integration", "LLM application development"],
    intro:
      "Your team wants to use GPT or Claude on its own data, but a chat window is not a product. It needs structured outputs, guardrails, and a place in an existing workflow. I add LLM features to the apps, CRM and data pipelines you already run.",
    forWho: [
      "You want AI inside an existing tool or process, not as a separate app.",
      "Outputs need to be structured and checked before anything downstream uses them.",
      "You need to process content at volume, such as classification, extraction or generation.",
    ],
    deliverables: [
      "LLM features built on OpenAI, Claude or open-source models such as Llama",
      "Prompt design with structured, validated outputs",
      "Connections to your CRM, database or workflow tools",
      "Quality checks on generated output, and token and cost tracking where volume matters",
      "Documentation and handover",
    ],
    process: [
      { title: "Pick the job for the model", body: "Which step the LLM takes over, what its output must look like, and how it will be checked." },
      { title: "Build and validate", body: "Prompting, structured output and validation, connected to your system." },
      { title: "Measure and hand over", body: "Test on real data, check cost and quality, then document it." },
    ],
    stack: ["OpenAI API", "Claude", "Llama", "Hugging Face", "Python", "Structured outputs", "Tool calling"],
    proof: ["generative-mcq-pipeline", "ai-outreach-automation-platform"],
    faqs: [
      {
        q: "Which models do you work with?",
        a: "OpenAI and Claude models, and open-source models such as Llama through Hugging Face. The choice depends on the task, data sensitivity and budget.",
      },
      {
        q: "How do you make LLM output reliable enough to use?",
        a: "By asking for structured output and validating it in code before anything downstream uses it, rather than trusting the model's answer.",
      },
      {
        q: "Can this work with high volumes?",
        a: "Yes. The MCQ pipeline case study generated 1.5 million questions with answers, with quality checks built into the generation step.",
      },
    ],
  },
];

/** Questions answered on the home page and marked up as FAQPage. */
export const homeFaqs: Faq[] = [
  {
    q: "What does Ahtesham Salamat Ansari build?",
    a: "LLM applications, RAG chatbots, AI agents and MCP integrations, n8n workflow automation, and Python data pipelines and web scrapers, for teams that want repetitive research, outreach and data work automated.",
  },
  {
    q: "How do I hire you?",
    a: "Through Upwork. You can order a fixed-price service from my Upwork Project Catalog, or send me a project through my Upwork profile for anything that needs custom scope.",
  },
  {
    q: "Can we start with a small project?",
    a: "Yes. The AI automation audit starts at $100 and gives you a written plan for one workflow before you commit to a larger build.",
  },
  {
    q: "How do you keep AI output accurate?",
    a: "Outputs are checked rather than trusted: structured outputs validated in code, facts limited to approved sources, and human approval before anything important goes out.",
  },
  {
    q: "Do you work with the tools my team already uses?",
    a: "Usually. I work with n8n, Airtable, HubSpot, GoHighLevel, Salesforce and common APIs. If a tool you already pay for solves the problem, I will say so instead of building something new.",
  },
  {
    q: "What happens after delivery?",
    a: "You get documentation and a handover so your team can run the system, and workflows are built to show what ran and where something failed.",
  },
];

export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug);

/** Service pages that cite a case study as related work. */
export const servicesForProject = (projectSlug: string) => servicePages.filter((s) => s.proof.includes(projectSlug));
