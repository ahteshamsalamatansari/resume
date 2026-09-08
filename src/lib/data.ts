/**
 * Centralised content. Every route, schema block and section reads from here.
 *
 * Detail pages are driven by the `slug` on each record — adding an entry here
 * automatically creates its page, its sitemap row and its JSON-LD.
 */

/* ------------------------------------------------------------------ */
/*  Shared prose type used by every long-form detail page              */
/* ------------------------------------------------------------------ */

export type Block = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  stack: string[];
  description: string;
  /** One-sentence answer to "what is this", written to stand alone. */
  summary: string;
  metric: string;
  metricLabel: string;
  body: Block[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'lead-intelligence-system',
    title: 'Lead Intelligence System',
    category: 'GenAI · RAG',
    year: '2025',
    stack: ['GPT-4', 'LangChain', 'Pinecone', 'Python', 'AWS'],
    description:
      'End-to-end retrieval-augmented generation workflow that qualifies and enriches B2B leads across a 50M+ record corpus with semantic search and prompt-engineered scoring.',
    summary:
      'A retrieval-augmented generation system that qualifies and enriches B2B leads across a corpus of more than 50 million records, improving qualification accuracy by 35% while cutting query latency from 3.2 seconds to 180 milliseconds.',
    metric: '35%',
    metricLabel: 'Accuracy improvement',
    body: [
      {
        heading: 'What it does',
        paragraphs: [
          'The Lead Intelligence System takes an inbound or sourced B2B company record and answers two questions automatically: is this lead worth pursuing, and what do we already know about them. It does this by retrieving the most relevant evidence from a corpus of more than 50 million records, then asking a language model to score and summarise that evidence against a fixed rubric.',
          'Before this system existed, both questions were answered by hand. An analyst would open a record, search several internal and external sources, form a judgement, and write a short note. The judgement was reasonable but it was slow, it varied between analysts, and it could not keep pace with the volume of records arriving.',
        ],
      },
      {
        heading: 'How it is built',
        paragraphs: [
          'Records are embedded and stored in Pinecone. At query time the system runs a hybrid retrieval step — dense vector similarity for semantic closeness, combined with keyword filtering on the structured fields that must match exactly, such as industry code, headcount band and region. Hybrid retrieval matters here because pure vector search happily returns a company that reads similarly but sits in the wrong segment entirely.',
          'The retrieved context is assembled into a scoring prompt built around an explicit rubric rather than an open question. The model is asked to fill a structured output — a score, the specific evidence supporting it, and an explicit list of what it could not determine. Requiring the model to declare its gaps turned out to be the single most useful change: it converts silent hallucination into a visible "unknown" that a human can act on.',
          'The orchestration layer is LangChain, the services are Python on AWS, and every scored record is written back with the retrieval set that produced it, so any score can be audited after the fact.',
        ],
        bullets: [
          'Hybrid retrieval — dense vectors for meaning, keyword filters for hard constraints',
          'Rubric-based structured scoring rather than free-form judgement',
          'Mandatory "what I could not determine" field to surface gaps instead of hiding them',
          'Full retrieval provenance stored alongside every score for auditing',
          'PII handling and GDPR/CCPA-aligned controls at the ingestion boundary',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'Qualification accuracy, measured against analyst-reviewed ground truth, improved by 35%. Manual research effort dropped by roughly 80% — analysts moved from researching every record to reviewing the subset the system flagged as uncertain. Query latency fell from 3.2 seconds to 180 milliseconds at P95, which is what made the system usable inside an interactive workflow rather than as an overnight batch job.',
          'The latency work is covered in detail in the write-up on cutting RAG latency, and the guardrail design in the write-up on production LLM agents.',
        ],
      },
    ],
  },
  {
    slug: 'real-time-data-pipeline',
    title: 'Real-Time Data Pipeline',
    category: 'Streaming',
    year: '2025',
    stack: ['Kafka', 'Spark', 'Kubernetes', 'Docker'],
    description:
      'Streaming system processing 50M data points per day with sub-second latency and automated quality controls.',
    summary:
      'A Kafka and Spark streaming pipeline that processes 50 million data points per day with sub-second latency, replacing a batch process whose runtime had grown to 6.5 hours.',
    metric: '50M',
    metricLabel: 'Data points / day',
    body: [
      {
        heading: 'The problem it replaced',
        paragraphs: [
          'The previous pipeline was a scheduled batch job. As data volume grew, its runtime grew with it — eventually reaching 6.5 hours. That number matters more than it looks: once a pipeline takes longer than the gap between decisions, the business is always acting on yesterday. Same-day decisions became impossible, and a single failed run pushed the data a full day late.',
        ],
      },
      {
        heading: 'The architecture',
        paragraphs: [
          'Events land on Kafka topics partitioned by source. Spark Structured Streaming consumes them, applies validation and enrichment, and writes to the serving layer. The services are containerised with Docker and run on Kubernetes, which is what makes the consumer group scale horizontally when a source spikes rather than falling behind.',
          'The important design decision was to make validation part of the stream rather than a separate downstream job. A record that fails validation is routed to a quarantine topic with the reason attached, instead of being silently dropped or silently accepted. That single change is most of where the error-rate improvement came from — the pipeline stopped producing confidently wrong output.',
        ],
        bullets: [
          'Kafka topics partitioned by source, with consumer groups scaled on Kubernetes',
          'Spark Structured Streaming for validation and enrichment in-flight',
          'Quarantine topic with attached failure reasons — no silent drops',
          'Automated QA checks running continuously rather than as a nightly job',
          'Caching tuned on the hot read path',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'Throughput reached 50 million data points per day at sub-second processing latency. Error rates fell 42%. Automated data quality moved from 78% to 94%. Where a comparable batch workload remained, its runtime dropped from 6.5 hours to 3.9 hours.',
        ],
      },
    ],
  },
  {
    slug: 'conversational-analytics-agent',
    title: 'Conversational Analytics Agent',
    category: 'LLM Agents',
    year: '2024',
    stack: ['Claude', 'LangChain', 'FastAPI', 'Postgres'],
    description:
      'Natural-language interface over structured warehouses — turns plain questions into verified SQL and narrative answers.',
    summary:
      'A natural-language interface over a structured data warehouse that converts plain questions into verified SQL and narrative answers, reducing time-to-insight by 60%.',
    metric: '60%',
    metricLabel: 'Faster insights',
    body: [
      {
        heading: 'What it does',
        paragraphs: [
          'A non-technical user asks a question in plain English. The agent translates it into SQL against the warehouse, runs it, checks the result, and answers in a sentence with the underlying figures attached. The generated SQL is always shown, never hidden.',
          'The goal was never to remove analysts. It was to remove the queue in front of them — the steady stream of "can you just pull me the number for X" requests that consume analyst time without using analyst skill.',
        ],
      },
      {
        heading: 'Making generated SQL trustworthy',
        paragraphs: [
          'A language model that writes SQL will eventually write SQL that runs cleanly and returns the wrong answer. That is the failure mode worth engineering against, because it is invisible. Several controls address it.',
          'The agent runs against a read-only role with a statement timeout, so no generated query can mutate data or run away. Generated SQL is parsed and validated against the actual schema before execution — a reference to a column that does not exist is caught before it reaches the database rather than after. The query is always displayed alongside the answer, so a user who knows the data can spot a wrong join. And results that fall outside expected bounds are flagged rather than narrated confidently.',
        ],
        bullets: [
          'Read-only database role with an enforced statement timeout',
          'Schema-aware validation of generated SQL before execution',
          'The generated query is always shown next to the answer',
          'Out-of-bounds results are flagged instead of narrated',
          'Every question, query and result retained for review',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'Time from question to answer fell by roughly 60% for the routine requests that made up most of the volume. The more valuable second-order effect was that analysts stopped being a lookup service and went back to analysis.',
        ],
      },
    ],
  },
  {
    slug: 'data-quality-engine',
    title: 'Data Quality Engine',
    category: 'Data Engineering',
    year: '2024',
    stack: ['Python', 'Airflow', 'SQL', 'Spark'],
    description:
      'Validation and monitoring framework that lifted automated dataset quality and slashed manual review overhead.',
    summary:
      'A validation and monitoring framework that raised automated dataset quality from 78% to 94% and cut manual review overhead by 70%.',
    metric: '94%',
    metricLabel: 'Quality score',
    body: [
      {
        heading: 'The idea',
        paragraphs: [
          'Data quality is usually treated as a cleanup task performed after the fact. This framework treats it as a contract enforced at the boundary. Every dataset declares what it promises — column types, null tolerances, uniqueness constraints, referential relationships, and plausible value ranges — and the framework enforces those promises on every run.',
          'When a promise is broken the framework does not just log it. It attributes the break to a specific upstream source and a specific rule, which is what turns "the data looks wrong" into a ticket someone can actually action.',
        ],
      },
      {
        heading: 'How it works',
        paragraphs: [
          'Validation rules are declared as configuration rather than written as bespoke code per dataset, so adding a new dataset means declaring its contract rather than writing a new validator. Airflow schedules the checks; Spark runs the heavy ones over large tables; results are written to a monitoring table that drives dashboards and alerting.',
          'Rules are tiered. A hard failure blocks promotion of the dataset. A soft failure lets the data through but records a quality deduction and raises an alert. Without that distinction, teams either block constantly on trivia or stop paying attention to the alerts entirely.',
        ],
        bullets: [
          'Declarative rules per dataset rather than bespoke validator code',
          'Tiered severity — hard failures block promotion, soft failures deduct and alert',
          'Failures attributed to a specific upstream source and rule',
          'Airflow-scheduled, Spark-executed for large tables',
          'Quality score tracked over time, not just at a point in time',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'Automated dataset quality rose from 78% to 94%. Manual processing and review effort fell by about 70%, because reviewers were directed to specific failed rules rather than asked to eyeball whole datasets.',
        ],
      },
    ],
  },
  {
    slug: 'ml-deployment-platform',
    title: 'ML Deployment Platform',
    category: 'MLOps',
    year: '2023',
    stack: ['MLflow', 'SageMaker', 'Terraform', 'GitHub Actions'],
    description:
      'CI/CD pipeline for model promotion from notebook to production with full lineage and rollback.',
    summary:
      'A CI/CD platform that moves models from notebook to production with full lineage and one-step rollback, cutting deployment time by 60%.',
    metric: '60%',
    metricLabel: 'Faster deploys',
    body: [
      {
        heading: 'The problem',
        paragraphs: [
          'Getting a model from a notebook into production was a manual, multi-day sequence of steps held mostly in one person\'s head. It was slow, it was inconsistent between models, and — the part that actually hurt — it was very hard to answer the question "which exact model version produced this prediction, and what data trained it".',
        ],
      },
      {
        heading: 'The platform',
        paragraphs: [
          'MLflow provides the model registry and experiment tracking, so every model version carries its parameters, its metrics and a pointer to the training data snapshot. GitHub Actions runs the promotion pipeline: on a tagged model version it runs validation, compares metrics against the currently deployed version, and refuses promotion on regression. Infrastructure is defined in Terraform so an environment can be rebuilt rather than repaired. Serving runs on SageMaker endpoints.',
          'Rollback was designed first rather than last. Because every deployed version is registered and its infrastructure is declarative, reverting is selecting a previous version rather than reconstructing one.',
        ],
        bullets: [
          'MLflow registry — every version carries params, metrics and data lineage',
          'Automated metric-regression gate before any promotion',
          'Terraform-defined infrastructure, rebuildable from source',
          'One-step rollback to any previously registered version',
          'GitHub Actions as the single promotion path — no manual deploys',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'Model deployment time fell by 60%. More importantly, lineage questions became answerable in seconds, and a bad deployment stopped being an incident and became a rollback.',
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Case studies                                                       */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  period: string;
  problem: string;
  approach: string;
  summary: string;
  results: { value: string; label: string }[];
  stack: string[];
  body: Block[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'bizprospex-genai-lead-qualification',
    client: 'BizProspex',
    title: 'GenAI Lead Qualification at Scale',
    period: '2025',
    problem:
      'Manual B2B lead research was slow, inconsistent, and impossible to scale across 50M+ records — yielding inconsistent qualification and 3.2s query latency.',
    approach:
      'Designed a RAG pipeline on GPT-4 + LangChain over Pinecone, with prompt-engineered scoring, semantic search, and guardrails for PII and GDPR/CCPA alignment.',
    summary:
      'At BizProspex, a retrieval-augmented generation pipeline replaced manual B2B lead research across a corpus of more than 50 million records, improving qualification accuracy by 35%, cutting manual research effort by 80%, and reducing query latency from 3.2 seconds to 180 milliseconds.',
    results: [
      { value: '+35%', label: 'Qualification accuracy' },
      { value: '-80%', label: 'Manual research effort' },
      { value: '180ms', label: 'Query latency (was 3.2s)' },
    ],
    stack: ['GPT-4', 'LangChain', 'Pinecone', 'AWS'],
    body: [
      {
        heading: 'The problem',
        paragraphs: [
          'BizProspex qualified B2B leads by hand. An analyst opened a company record, searched across internal data and external sources, formed a judgement about whether the lead was worth pursuing, and wrote a short justification. For a few hundred records a week this works well. Across a corpus of more than 50 million records it does not work at all.',
          'Three things were failing at once. Throughput was capped by analyst hours, so most of the corpus was simply never assessed. Consistency was poor, because two analysts given the same record would weight evidence differently and neither was wrong exactly. And the retrieval that supported the work was slow — 3.2 seconds per query, which is tolerable in a batch report and intolerable inside an interactive workflow where an analyst runs dozens of lookups an hour.',
        ],
      },
      {
        heading: 'Why retrieval-augmented generation, and not fine-tuning',
        paragraphs: [
          'The obvious alternative was to fine-tune a model on historical qualification decisions. It was rejected for two reasons that are worth stating plainly, because the same tradeoff comes up constantly.',
          'First, the underlying data changes continuously. Company records are updated, new records arrive, and segments shift. A fine-tuned model encodes a snapshot and starts decaying the moment it is trained, whereas a retrieval system reads current data on every query. Second, a fine-tuned model cannot show its work. When a qualification score is challenged — and it will be — a retrieval system can produce the exact records that produced the score. That auditability turned out to be a requirement, not a nice-to-have.',
        ],
      },
      {
        heading: 'The pipeline',
        paragraphs: [
          'Records are embedded and indexed in Pinecone. Retrieval is hybrid: dense vector search finds semantically similar companies, and keyword filters enforce the hard constraints — industry, size band, geography — that vector similarity is happy to ignore. This combination fixed a specific early failure where the system confidently retrieved a company that read almost identically but operated in a different market entirely.',
          'The retrieved evidence is assembled into a scoring prompt built on an explicit rubric. The model returns structured output rather than prose: a score, the evidence supporting each rubric dimension, and an explicit list of what it could not determine from the available context. Forcing that last field to exist was the highest-leverage prompt decision in the project. Without it, missing information was silently filled in with plausible invention. With it, missing information became a visible flag that routed the record to a human.',
          'Guardrails sit at the boundaries. PII is identified and handled at ingestion rather than filtered at output, and the whole pipeline was built to align with GDPR and CCPA obligations — which for this use case mostly means knowing exactly what personal data is held, why, and being able to remove it on request.',
        ],
        bullets: [
          'Hybrid retrieval: dense vectors for meaning, keyword filters for hard constraints',
          'Rubric-driven structured scoring instead of free-form judgement',
          'A mandatory "could not determine" field that routes uncertainty to humans',
          'Full provenance — every score retains the evidence set that produced it',
          'PII handled at ingestion; GDPR/CCPA-aligned controls; AES-256 encryption at rest',
        ],
      },
      {
        heading: 'Getting from 3.2 seconds to 180 milliseconds',
        paragraphs: [
          'The first working version was correct and far too slow. The fix was not one change, it was four, and the ordering mattered: measure first, then attack the largest component.',
          'Chunking strategy came first. The original chunks were too large, which meant more tokens retrieved, more tokens sent, and more time spent in the model. Tightening chunk size and adding overlap improved both latency and recall, which is unusual — most latency work costs you quality. Second, the retrieval set was reduced and reranked rather than simply truncated, so fewer documents reached the model without losing the ones that mattered. Third, embedding and query caching removed repeated work on the substantial fraction of lookups that recur. Fourth, the remaining independent calls were parallelised.',
          'The result was 180 milliseconds at P95 with recall slightly better than the 3.2-second version, not worse.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Qualification accuracy against analyst-reviewed ground truth improved 35%. Manual research effort fell by around 80%, with analysts moving to reviewing flagged-uncertain records rather than researching every record from scratch. Query latency fell from 3.2 seconds to 180 milliseconds. Alongside this work, GenAI systems shipped at BizProspex contributed to a 25% lift in pipeline conversion.',
          'The part worth carrying forward is not the stack. It is that the system was designed to say "I do not know" out loud, and to show its evidence on demand. Those two properties are what made it trusted enough to actually be used.',
        ],
      },
    ],
  },
  {
    slug: 'funnelbyte-real-time-pipeline-qa',
    client: 'FunnelByte',
    title: 'Real-Time Pipeline & QA Automation',
    period: '2021 — 2025',
    problem:
      'A growing data volume produced mounting error rates and inconsistent datasets, with 6.5h runtimes blocking same-day decisions.',
    approach:
      'Re-architected streaming on Kafka + Spark, added automated QA testing, and tuned caching — shipped in Dockerized services on Kubernetes.',
    summary:
      'At FunnelByte, re-architecting a 6.5-hour batch pipeline onto Kafka and Spark with automated QA reduced error rates by 42%, raised data quality from 78% to 94%, and cut runtime to 3.9 hours.',
    results: [
      { value: '-42%', label: 'Error rates' },
      { value: '78→94%', label: 'Data quality' },
      { value: '6.5→3.9h', label: 'Runtime' },
    ],
    stack: ['Kafka', 'Spark', 'Kubernetes', 'Airflow'],
    body: [
      {
        heading: 'The problem',
        paragraphs: [
          'FunnelByte\'s data pipeline had been built as a scheduled batch job and had grown with the business rather than being redesigned for it. By the time this work started, a full run took 6.5 hours. Error rates were climbing, datasets disagreed with each other, and nobody could say with confidence which numbers were current.',
          'The runtime figure is the one that actually mattered. A 6.5-hour pipeline means that if a run fails, the recovery lands the next day. It means no same-day decisions. And it means the pipeline is effectively untestable in production, because nobody wants to trigger a 6.5-hour job to check a hypothesis.',
        ],
      },
      {
        heading: 'Re-architecting to streaming',
        paragraphs: [
          'Events were moved onto Kafka topics partitioned by source, consumed by Spark Structured Streaming jobs that validate and enrich in flight. The services were containerised with Docker and deployed to Kubernetes so that consumer groups scale out when a particular source spikes, rather than the whole pipeline falling behind.',
          'This was deliberately not a rewrite-everything migration. Sources were moved onto the streaming path one at a time, with the batch path left running in parallel and the outputs compared. That comparison period is what caught the discrepancies that a big-bang cutover would have shipped straight to production.',
        ],
      },
      {
        heading: 'Quality as part of the stream',
        paragraphs: [
          'The more consequential change was making validation part of the pipeline instead of a job that ran afterwards. Previously a bad record flowed through and was found later, if at all. Now every record is validated in flight, and one that fails is routed to a quarantine topic with the failing rule attached.',
          'That design has a property that plain rejection does not: nothing is silently dropped and nothing is silently accepted. Every failed record is inspectable, attributed to a source and a rule, and countable. Most of the 42% error-rate reduction came from this, because the pipeline stopped producing confidently wrong output and started producing correct output plus a visible pile of problems.',
          'Automated QA frameworks were built around this in Python, with real-time monitoring dashboards so that a spike in quarantine volume from one source is visible immediately rather than discovered in a weekly review.',
        ],
        bullets: [
          'Source-by-source migration with parallel-run output comparison',
          'In-flight validation with a quarantine topic and attached failure reasons',
          'Python QA frameworks and real-time monitoring dashboards',
          'Caching tuned on the hot read path',
          'Documentation standards set across a team of 8+ analysts',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Error rates fell 42%. Automated data quality rose from 78% to 94%. The remaining batch workload dropped from 6.5 hours to 3.9 hours, and the streaming path made same-day decisions possible for the first time. Overall processing effort fell by roughly 70% through ETL automation.',
          'Alongside the technical work this involved leading a team of eight-plus analysts and establishing the documentation standards that kept the validation rules maintainable as the number of datasets grew.',
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Writing                                                            */
/* ------------------------------------------------------------------ */

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  /** ISO date for schema.org and the sitemap. */
  iso: string;
  readTime: string;
  body: Block[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cutting-rag-latency-3s-to-180ms',
    category: 'Engineering',
    title: 'Cutting RAG Latency from 3s to 180ms Without Losing Recall',
    excerpt:
      'A practical playbook on chunking, hybrid search, and caching tradeoffs that moved our GenAI pipeline from sluggish to sub-second.',
    date: 'Jun 2026',
    iso: '2026-06-15',
    readTime: '8 min',
    body: [
      {
        heading: 'Start by measuring, not guessing',
        paragraphs: [
          'A retrieval-augmented generation pipeline that takes 3.2 seconds feels like one slow thing. It is almost never one slow thing. Before changing anything, instrument every stage separately: query embedding, vector search, reranking, prompt assembly, model call, and post-processing. The distribution is usually lopsided in a way that contradicts your intuition.',
          'In our case the model call was not the dominant cost, which is where most people start optimising. Retrieval and prompt assembly together accounted for more of the budget, largely because we were retrieving far more context than the model needed and paying for it three times over — in retrieval, in transfer, and in tokens processed.',
          'Measure at P95, not at the mean. A mean latency of 900ms with a P95 of 3.2 seconds is a system that feels broken, because users remember the slow requests.',
        ],
      },
      {
        heading: 'Chunking is a latency decision, not just a quality one',
        paragraphs: [
          'Chunk size is usually discussed as a recall tradeoff. It is also the biggest single lever on latency, because chunk size multiplies through the entire pipeline: bigger chunks mean more tokens retrieved, more bytes moved, and more tokens the model must read before it can start generating.',
          'We had started with large chunks on the reasonable theory that more context is safer. It was not safer. Large chunks diluted the embedding — a chunk covering several topics embeds to the average of those topics, which sits near nothing in particular. Cutting chunk size and adding a modest overlap improved retrieval precision and cut latency at the same time.',
          'This is the rare optimisation that is free in both directions, and it is worth trying before anything more sophisticated. Sweep chunk size against your own evaluation set rather than adopting someone else\'s number — the right size depends heavily on how your documents are structured.',
        ],
        bullets: [
          'Instrument every pipeline stage separately before optimising any of them',
          'Track P95, not the mean — the mean hides the requests users actually notice',
          'Sweep chunk size against your own eval set; do not inherit a default',
          'Overlap costs storage, which is cheap, and buys recall, which is not',
        ],
      },
      {
        heading: 'Retrieve fewer documents, but pick them better',
        paragraphs: [
          'The instinct when recall is imperfect is to retrieve more documents. This is expensive and often counterproductive: past a certain point additional context measurably degrades answer quality, because the relevant passage is competing with more noise for the model\'s attention.',
          'The better move is to retrieve a wider candidate set cheaply, then rerank it and pass only the top few forward. A reranking step adds its own latency, so it only pays if it lets you cut the number of documents sent to the model substantially — which in our case it did.',
          'Hybrid retrieval helped here too. Pure dense vector search returns things that read similarly, which is not the same as things that qualify. Adding keyword filters on the fields that must match exactly removed a whole class of confidently-wrong retrievals, and shrinking the candidate set that way made everything downstream faster.',
        ],
      },
      {
        heading: 'Cache the things that actually repeat',
        paragraphs: [
          'Caching in a RAG system has several distinct layers and they are worth treating separately. Embedding caches are almost pure profit: the same query text always produces the same vector, so there is no invalidation problem and no correctness risk. Retrieval result caches are more delicate, because the underlying corpus changes and a stale retrieval set produces a stale answer that looks fresh. Full response caches are the fastest and the most dangerous for the same reason.',
          'We used aggressive embedding caching, time-bounded retrieval caching tied to corpus update frequency, and no full-response caching at all. That last decision cost some latency and was still correct — a confidently stale answer is worse than a slow one.',
        ],
        bullets: [
          'Embedding cache: safe, high hit rate, no invalidation problem',
          'Retrieval cache: bound its TTL to how often the corpus actually changes',
          'Response cache: fastest and most dangerous — we skipped it deliberately',
        ],
      },
      {
        heading: 'Parallelise what is genuinely independent',
        paragraphs: [
          'After the structural work, what remained was sequencing. Several calls were running one after another purely because they had been written that way, not because they depended on each other. Running independent retrievals concurrently and overlapping prompt assembly with the tail of retrieval removed the remaining fixed overhead.',
          'This is the least interesting optimisation and usually the last one worth doing, because it makes the code harder to read and it cannot fix an architecture that retrieves too much in the first place.',
        ],
      },
      {
        heading: 'Where we landed',
        paragraphs: [
          'The final pipeline runs at 180 milliseconds at P95 with recall slightly better than the 3.2-second version. The order of operations was the important part: measure, fix chunking, retrieve less but rank better, cache the safe layers, and only then parallelise.',
          'The trap to avoid is starting with the model — swapping to a smaller model, or trimming the system prompt. Those are visible changes that feel productive and, in our case, would have cost answer quality to solve a problem that was not in the model call.',
        ],
      },
    ],
  },
  {
    slug: 'guardrails-for-production-llm-agents',
    category: 'Architecture',
    title: 'Designing Guardrails for Production LLM Agents',
    excerpt:
      'How we built deterministic safety layers, structured outputs, and PII controls around GPT-4 agents at scale.',
    date: 'May 2026',
    iso: '2026-05-12',
    readTime: '12 min',
    body: [
      {
        heading: 'The failure mode that matters is confident and wrong',
        paragraphs: [
          'An agent that crashes is a good outcome. You see it, you fix it. The failure worth engineering against is the agent that returns a well-formatted, plausible, completely incorrect answer — because nothing downstream knows to distrust it, and a human reviewing it has no signal that anything went wrong.',
          'Every guardrail described here exists to convert silent wrongness into visible wrongness. That is the whole design goal. Not to make the model never wrong, which is not achievable, but to make its wrongness detectable by something other than a user noticing months later.',
        ],
      },
      {
        heading: 'Structured output is a guardrail, not a convenience',
        paragraphs: [
          'Asking a model for prose and then parsing it is fragile in a way that is easy to underestimate. Asking for a schema-constrained structure and validating it is not merely tidier — it changes what failures are possible.',
          'When the model must return a defined object, a malformed response fails at the validation boundary instead of flowing downstream as a string that looks fine. More usefully, the schema itself constrains the reasoning: a scoring field with an enumerated set of allowed values cannot return a creative fourth option.',
          'The highest-value field we added was not a data field at all. It was a required list of what the model could not determine from the provided context. Making that field mandatory converted the most common failure — quietly inventing a missing value — into an explicit declaration that routes the record to a human. If you take one thing from this piece, take that.',
        ],
        bullets: [
          'Validate against a schema at the boundary; reject rather than coerce',
          'Enumerate allowed values wherever the answer space is genuinely closed',
          'Require an explicit "could not determine" field and act on it',
          'Treat a schema violation as an incident signal, not just a retry trigger',
        ],
      },
      {
        heading: 'Deterministic checks around a non-deterministic core',
        paragraphs: [
          'The model is the only part of the system that should be probabilistic. Everything around it should be ordinary, boring, testable code.',
          'Concretely: validate that referenced entities exist rather than trusting the model that they do. Check numeric outputs against plausible bounds derived from the data, and flag rather than narrate anything outside them. Where the agent generates a query, parse and validate that query against the real schema before executing it, and execute it under a read-only role with a statement timeout so that a wrong query is slow-and-caught rather than destructive.',
          'None of this is sophisticated. That is the point. The deterministic layer is where you want your confidence to live, because it is the layer you can unit-test.',
        ],
      },
      {
        heading: 'PII belongs at the boundary, not the output',
        paragraphs: [
          'A common pattern is to let personal data flow through the system and filter it at the point of output. This is the wrong boundary. Once personal data is in a prompt it has been transmitted to the model provider, it may be in logs, and it may be in a cache. Filtering the output does not undo any of that.',
          'Identify and handle personal data at ingestion instead. Know what you hold, why you hold it, and be able to remove it on request — which is most of what GDPR and CCPA compliance amounts to in practice for a system like this. Encrypt at rest; we used AES-256. And be deliberate about what reaches logs, because prompt logging is enormously useful for debugging and is also the easiest way to accidentally build a shadow copy of your sensitive data.',
        ],
        bullets: [
          'Handle PII at ingestion, before it can reach a prompt, a log or a cache',
          'Maintain a real inventory: what is held, why, and how it is removed',
          'Encrypt at rest (AES-256) and be deliberate about prompt logging',
          'Design for deletion requests from the start — retrofitting them is painful',
        ],
      },
      {
        heading: 'Make every answer auditable',
        paragraphs: [
          'For a retrieval-based agent, store the retrieval set alongside the answer. Not a summary of it — the actual documents that were passed in. When an answer is challenged, and answers are challenged, being able to reproduce exactly what the model saw is the difference between a diagnosis and a shrug.',
          'This has a cost in storage and a cost in discipline. It is worth both. It is also what makes the system defensible when someone asks why a particular record was scored the way it was, which for anything touching business decisions is a question that will eventually be asked by someone senior.',
        ],
      },
      {
        heading: 'Fail loudly and degrade honestly',
        paragraphs: [
          'When a guardrail trips, the system should say so rather than silently retrying until something passes validation. Silent retry loops hide systematic problems — if a particular input class consistently fails schema validation, three retries that eventually produce a marginal answer will hide that fact for months.',
          'Degrade honestly. An agent that says "I could not determine this from the available data" is more useful than one that guesses, provided the surrounding workflow actually routes that response to a human. Guardrails without a human path attached just produce a different kind of dead end.',
        ],
      },
      {
        heading: 'What this buys you',
        paragraphs: [
          'None of these controls make the model more capable. They make the system trustworthy enough to deploy, which is a different and more important property. In our lead qualification pipeline, the guardrail layer — structured scoring, the mandatory uncertainty field, retrieval provenance, and boundary PII handling — is what allowed the system to be used for real decisions rather than treated as a suggestion engine.',
          'Build the guardrails first. Retrofitting them onto a system that people have already learned not to trust is much harder than shipping them from the start.',
        ],
      },
    ],
  },
  {
    slug: 'data-quality-playbook-78-to-94',
    category: 'Data',
    title: 'From 78% to 94%: A Data Quality Playbook',
    excerpt:
      'The validation, monitoring, and ownership patterns that actually moved the needle on automated dataset quality.',
    date: 'Apr 2026',
    iso: '2026-04-08',
    readTime: '6 min',
    body: [
      {
        heading: 'Define quality before you try to improve it',
        paragraphs: [
          '"Data quality" is not a number until you say what it measures. Ours is the proportion of records passing a declared set of validation rules, weighted by rule severity. That definition is arguable — most are — but it is precise, it is computed the same way every run, and it can be tracked over time.',
          'A quality metric that people cannot reconstruct from first principles gets ignored the first time it disagrees with someone\'s intuition. Publish the definition alongside the number.',
        ],
      },
      {
        heading: 'Rules as configuration, not code',
        paragraphs: [
          'The fastest way to stall a data quality effort is to require an engineer to write a bespoke validator for every dataset. Adoption dies at the queue.',
          'Declare rules as configuration instead: column types, null tolerance, uniqueness, referential relationships, allowed value sets, and plausible numeric ranges. Onboarding a new dataset becomes writing its contract rather than writing code, which means the people who actually understand the data can do it.',
        ],
        bullets: [
          'Types, null tolerance, uniqueness, referential integrity, value sets, ranges',
          'Declared per dataset as config that a domain expert can edit',
          'Versioned alongside the data, reviewed like code',
        ],
      },
      {
        heading: 'Tier your severities or people stop listening',
        paragraphs: [
          'A single failure level forces an impossible choice: block the pipeline on every trivial violation, or let everything through and watch the alerts get muted. Both outcomes end with the rules being ignored.',
          'Two tiers were enough for us. A hard failure blocks promotion — the dataset does not move forward. A soft failure lets the data through, records a deduction against the quality score, and raises an alert. The distinction keeps the blocking category small enough that a block is actually taken seriously.',
        ],
      },
      {
        heading: 'Attribute every failure to a source and a rule',
        paragraphs: [
          'The single highest-leverage feature was not a validation rule. It was attribution. "This dataset is 84%" produces no action. "Source B failed the referential-integrity rule on 12,000 records this run, up from 400 last run" produces a ticket someone can pick up.',
          'Route failures somewhere inspectable rather than dropping them. In our streaming pipeline that meant a quarantine topic carrying the failing rule with each record — nothing silently dropped, nothing silently accepted, and every failure countable by source.',
        ],
      },
      {
        heading: 'Track the trend, alert on the delta',
        paragraphs: [
          'A point-in-time quality score tells you very little. The derivative tells you almost everything. A dataset sitting stable at 91% is fine; one that fell from 96% to 91% overnight is an incident, and the two are indistinguishable from a single reading.',
          'Write every run\'s results to a monitoring table, dashboard the trend per dataset and per source, and alert on the change rather than the level. This is also what catches upstream schema changes on the day they happen rather than the week someone notices the numbers look odd.',
        ],
        bullets: [
          'Persist every run — quality is a time series, not a reading',
          'Alert on change, not on absolute level',
          'Dashboard per source, since sources fail independently',
        ],
      },
      {
        heading: 'Ownership is the part that is not technical',
        paragraphs: [
          'Every dataset needs a named owner who receives its alerts. Rules without an owner become noise within about two weeks, regardless of how good the tooling is.',
          'Documentation standards matter for the same reason. When a validation rule fails and the person on call cannot tell what the rule was protecting against, they will suppress it. Writing down the intent behind each rule is what keeps the rule set alive as the team changes.',
          'Across the framework, this combination — declarative rules, tiered severity, attributed failures, trend alerting and named ownership — moved automated dataset quality from 78% to 94% and cut manual review effort by about 70%, because reviewers were pointed at specific failed rules instead of asked to inspect whole datasets.',
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

export type Experience = {
  role: string;
  company: string;
  period: string;
  /** ISO dates for schema.org. */
  start: string;
  end?: string;
  impact: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: 'AI Engineer',
    company: 'BizProspex',
    period: '2025 — Now',
    start: '2025-01',
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
    start: '2025-01',
    end: '2025-12',
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
    start: '2021-01',
    end: '2025-01',
    impact: [
      'Reduced error rates 42% through automated QA testing frameworks.',
      'Led a team of 8+ analysts and set documentation standards.',
      'Built Python validation scripts and real-time monitoring dashboards.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Skills, metrics, contact                                           */
/* ------------------------------------------------------------------ */

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

/** Flat list for schema.org knowsAbout. */
export const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.items);

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
  locality: 'India',
  countryCode: 'IN',
  name: 'Ahtesham Salamat Ansari',
  role: 'AI Engineer',
};

/* ------------------------------------------------------------------ */
/*  FAQ — answer-shaped content for AEO                                */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'Who is Ahtesham Salamat Ansari?',
    a: 'Ahtesham Salamat Ansari is an AI Engineer based in India with over three years of experience building production generative AI, retrieval-augmented generation systems and large-scale data pipelines. He currently works at BizProspex, where he has shipped GenAI systems contributing to a 25% lift in pipeline conversion.',
  },
  {
    q: 'What does Ahtesham Ansari build?',
    a: 'He builds production AI systems rather than prototypes: retrieval-augmented generation pipelines over corpora of 50 million or more records, LLM agents with deterministic guardrails, real-time streaming data pipelines on Kafka and Spark, and MLOps platforms that move models from notebook to production with full lineage and one-step rollback.',
  },
  {
    q: 'What is his experience with RAG systems?',
    a: 'He designed and shipped a retrieval-augmented generation pipeline at BizProspex using GPT-4 and LangChain over Pinecone, covering more than 50 million records. It improved lead qualification accuracy by 35%, reduced manual research effort by 80%, and cut query latency from 3.2 seconds to 180 milliseconds at P95 through chunking changes, hybrid retrieval, reranking and layered caching.',
  },
  {
    q: 'What technology stack does he work in?',
    a: 'Generative AI with GPT-4, Claude, Llama, LangChain, RAG and fine-tuning; vector and retrieval with Pinecone, Weaviate, ChromaDB, pgvector and hybrid search; cloud and MLOps with AWS SageMaker, Lambda, MLflow, Docker, Kubernetes, Terraform and GitHub Actions; and data engineering with Python, SQL, Kafka, Spark and Airflow.',
  },
  {
    q: 'Is Ahtesham Ansari available for hire?',
    a: 'Yes. He is open to remote AI engineering roles in generative AI, data intelligence and production machine learning, working from India (GMT+5:30) with any time zone. He can be reached at ahteshamsalamat@gmail.com and typically replies within a day.',
  },
  {
    q: 'What measurable results has he delivered?',
    a: 'Across recent work: a 35% improvement in lead qualification accuracy, query latency reduced from 3.2 seconds to 180 milliseconds, more than 50 million records processed, data quality raised from 78% to 94%, error rates reduced by 42%, model deployment time cut by 60%, and pipeline runtime reduced from 6.5 hours to 3.9 hours.',
  },
  {
    q: 'Does he have experience with data privacy and compliance?',
    a: 'Yes. He has implemented GDPR and CCPA-aligned systems with AES-256 encryption at rest, handling personally identifiable information at the ingestion boundary rather than filtering it at output, so that personal data never reaches prompts, logs or caches unhandled.',
  },
];

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

/** Real routes — these build the internal link graph crawlers follow. */
export const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Deep Dives', href: '/case-studies' },
  { label: 'Writing', href: '/writing' },
  { label: 'Résumé', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];
