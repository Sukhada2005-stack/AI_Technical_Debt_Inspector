# 📚 Reference Guide — AI Technical Debt Inspector
### Curated Resources for Every Topic in the Project

> These are real, publicly accessible references organized by the core topics of this project.  
> Use these to study, cite in your IEEE paper, or understand a concept more deeply.

---

## 📌 Quick Topic Index

| # | Topic Area | Jump To |
|---|---|---|
| 1 | Technical Debt (Theory & Research) | [Section 1](#1-technical-debt--theory--research) |
| 2 | Multi-Agent AI Systems & LangChain | [Section 2](#2-multi-agent-ai-systems--langchain) |
| 3 | LLM-Powered Code Analysis & Refactoring | [Section 3](#3-llm-powered-code-analysis--automated-refactoring) |
| 4 | Code Parsing — ASTs & Tree-sitter | [Section 4](#4-code-parsing--abstract-syntax-trees--tree-sitter) |
| 5 | Vector Databases & Semantic Code Search | [Section 5](#5-vector-databases--semantic-code-search-pgvector) |
| 6 | Security Vulnerabilities & OWASP | [Section 6](#6-security-vulnerabilities--owasp) |
| 7 | Software Architecture & Clean Code | [Section 7](#7-software-architecture--clean-code-principles) |
| 8 | GitHub API, Webhooks & CI/CD | [Section 8](#8-github-api-webhooks--cicd) |
| 9 | Tools — SonarQube, ESLint, Existing Solutions | [Section 9](#9-existing-tools--sonarqube-eslint-and-alternatives) |

---

## 1. Technical Debt — Theory & Research

These are the foundational academic and industry references for understanding what technical debt is and why it matters.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **IEEE Xplore — Technical Debt** | Academic Database | https://ieeexplore.ieee.org | Search: `"technical debt" AND "software engineering"` — filter by 2022–2024 |
| **International Conference on Technical Debt (TechDebt)** | Conference Proceedings | https://www.computer.org/csdl/proceedings/techdebt | Peer-reviewed papers specifically on TD detection and management |
| **Martin Fowler — "Technical Debt"** | Foundational Blog | https://martinfowler.com/bliki/TechnicalDebt.html | The original definition and the "debt quadrant" model — must-read for the intro section |
| **CMU Software Engineering Institute — Managing Technical Debt** | Industry Research | https://insights.sei.cmu.edu/blog/managing-technical-debt/ | Industrial-level perspective; good for the problem statement section |
| **ScienceDirect — TD in Software Systems (Paper 1)** | Research Paper | https://www.sciencedirect.com/science/article/abs/pii/S0164121226003018 | One of the project's own references — check full text |
| **ScienceDirect — TD in Software Systems (Paper 2)** | Research Paper | https://www.sciencedirect.com/science/article/abs/pii/S0164121226002712 | Second project reference — check full text |
| **ResearchGate — AI-Specific Technical Debt** | Research | https://www.researchgate.net | Search: `"self-admitted technical debt" machine learning` — taxonomies of debt in ML codebases |
| **arXiv — AI-Powered Technical Debt Detection** | Preprint Papers | https://arxiv.org | Search: `technical debt LLM detection 2024` — free, peer-reviewed preprints |
| **IEEE Software Journal** | Journal | https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=52 | Regularly publishes on software maintainability and AI analytics |

---

## 2. Multi-Agent AI Systems & LangChain

These resources cover the Orchestrator-Worker pattern, LangGraph, and how multi-agent systems are structured.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **LangChain Official Docs — Agents** | Official Documentation | https://docs.langchain.com/docs/components/agents/ | Core agent concepts, tool definitions, memory, and agent types |
| **LangGraph — Multi-Agent Systems** | Official Documentation | https://langchain-ai.github.io/langgraph/tutorials/multi_agent/multi-agent-collaboration/ | Orchestrator-worker implementation with `StateGraph`, `TypedDict`, and `Send()` |
| **LangChain — Orchestrator-Worker Pattern** | Official Guide | https://langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor/ | Direct implementation of the exact pattern used in this project |
| **freeCodeCamp — Build Multi-Agent Systems with LangGraph** | Tutorial | https://www.freecodecamp.org/news/langgraph-multi-agent-systems/ | Practical, step-by-step guide to graph-based agent coordination |
| **Medium — Orchestrator-Worker Pattern Explained** | Article | https://medium.com/@developer-xyz/orchestrator-worker-multi-agent | Design rationale, shared state, and parallel execution explained |
| **AutoGen (Microsoft) — Multi-Agent Framework** | Official Docs | https://microsoft.github.io/autogen/ | Alternative to LangChain for multi-agent systems; mentioned in this project |
| **GitConnected — Why Orchestrator-Worker Beats Swarms** | Article | https://levelup.gitconnected.com/orchestrator-worker-pattern | Debuggability and extensibility advantages of the hierarchical pattern |
| **LangSmith — Debugging & Tracing Agents** | Official Tool | https://docs.smith.langchain.com/ | Tracing and monitoring LLM agent calls in production |

---

## 3. LLM-Powered Code Analysis & Automated Refactoring

Resources on how Large Language Models are used for code review, static analysis, and generating fixes.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **O'Reilly — Reading and Maintaining Code with Generative AI** | Live Event / Book | https://www.oreilly.com/live-events/reading-and-maintaining-code-with-generative-ai | Directly referenced in the project — covers LLMs for code comprehension |
| **Sourcegraph Blog — AI Code Review Tools 2024** | Industry Blog | https://sourcegraph.com/blog/ai-code-review-tools | Comparison of deterministic vs. AI-powered code review; context-aware refactoring |
| **GitHub Blog — Engineering** | Official Blog | https://github.blog/engineering/ | Covers GitHub Actions, Copilot, code scanning — search for AI code review articles |
| **arXiv — LLMs for Code Review** | Research Preprints | https://arxiv.org/search/?searchtype=all&query=LLM+code+review+refactoring | Free academic papers on LLM-based code analysis |
| **CodeRabbit — AI Code Review** | Tool Reference | https://coderabbit.ai/docs | Real-world example of LLM-based PR review at scale |
| **CodeScene — Measuring Code Health** | Tool + Research | https://codescene.com/blog | Behavioral code analysis; measuring the impact of a refactor before doing it |
| **Dev.to — Prompt Engineering as Code** | Article | https://dev.to/search?q=prompt+engineering+code+review | Treating prompts as version-controlled code for consistent AI code reviews |

---

## 4. Code Parsing — Abstract Syntax Trees & Tree-sitter

These resources explain how to parse code into machine-readable structures that AI agents can reason about.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **Tree-sitter Official Documentation** | Official Docs | https://tree-sitter.github.io/tree-sitter/ | User guide: installation, parsing, tree traversal, query API |
| **Tree-sitter — Creating Parsers** | Official Guide | https://tree-sitter.github.io/tree-sitter/creating-parsers | How to write grammars for new languages |
| **Wikipedia — Abstract Syntax Tree** | Concept Reference | https://en.wikipedia.org/wiki/Abstract_syntax_tree | Clear definition of ASTs and how they differ from parse trees/CSTs |
| **Dev.to — Intro to Tree-sitter** | Tutorial | https://dev.to/search?q=tree-sitter+introduction | Hands-on beginner's guide to using Tree-sitter with Python or Node.js |
| **Medium — 5 Powerful Ways to Use Tree-sitter** | Article | https://medium.com/search?q=tree-sitter+code+analysis | Practical examples of extracting data from code trees |
| **Tree-sitter GitHub Repository** | Source Code + Examples | https://github.com/tree-sitter/tree-sitter | Bindings for Python (`py-tree-sitter`), Node.js, Rust, Go, and more |
| **krishnabiradar.com — AST Basics** | Blog Article | https://krishnabiradar.com | Named nodes vs. anonymous nodes; treating CST output like an AST |

---

## 5. Vector Databases & Semantic Code Search (pgvector)

These resources cover how vector embeddings enable semantic similarity search across a codebase.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **pgvector GitHub Repository** | Official Source | https://github.com/pgvector/pgvector | Installation, SQL usage, distance operators (`<=>`, `<->`, `<#>`) |
| **Supabase — pgvector Guide** | Tutorial | https://supabase.com/docs/guides/ai/vector-columns | Enabling the extension, storing embeddings, running similarity queries |
| **DataCamp — pgvector Tutorial** | Tutorial | https://www.datacamp.com/tutorial/pgvector-tutorial | Step-by-step with code examples for semantic search |
| **Medium — Semantic Code Search with pgvector** | Article | https://medium.com/search?q=pgvector+semantic+code+search | End-to-end example: embed code → store in PostgreSQL → query for duplicates |
| **Machine Learning Mastery — Vector Embeddings** | Concept Article | https://machinelearningmastery.com/what-are-word-embeddings/ | Foundational understanding of what vector embeddings are and why they work |
| **Milan Jovanovic — pgvector + .NET** | Tutorial | https://milanjovanovic.tech/blog/vector-search-in-postgres-with-pgvector | How to use HNSW indexing for fast vector search in PostgreSQL |
| **Pinecone Documentation** | Alternative Tool Docs | https://docs.pinecone.io/ | Managed vector database; the alternative to pgvector mentioned in the project |
| **dev.to — Hybrid Search with pgvector** | Article | https://dev.to/search?q=hybrid+search+pgvector | Combining SQL filters with vector similarity search — practical implementation |

---

## 6. Security Vulnerabilities & OWASP

References for the Security Agent's scope: injection attacks, hardcoded secrets, and the OWASP standard.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **OWASP Top 10:2021 (Official)** | Industry Standard | https://owasp.org/Top10/ | The definitive 10 categories of web app vulnerabilities — A03 (Injection), A05 (Misconfiguration), A07 (Auth Failures) |
| **OWASP SQL Injection Prevention Cheat Sheet** | Developer Guide | https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html | Parameterized queries, ORMs, input validation — with code examples |
| **OWASP Secrets Management Cheat Sheet** | Developer Guide | https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html | How to handle API keys, credentials, and secrets safely — avoid hardcoding |
| **OWASP API Security Top 10:2023** | Industry Standard | https://owasp.org/API-Security/editions/2023/en/0x00-header/ | API-specific vulnerabilities — relevant for webhook endpoint security |
| **CVE Database (MITRE)** | Vulnerability DB | https://cve.mitre.org/ | Common Vulnerabilities and Exposures — the Security Agent checks against this |
| **NVD — National Vulnerability Database** | Vulnerability DB | https://nvd.nist.gov/ | Full CVE details with severity scores (CVSS) — used for outdated library detection |
| **truffleHog / gitleaks** | Open Source Tool | https://github.com/trufflesecurity/trufflehog | Secret scanning tools — understand how secret detection works programmatically |
| **SAST vs DAST Explained** | Concept Guide | https://owasp.org/www-community/Vulnerability_Scanning_Tools | Static (SAST) vs. Dynamic (DAST) testing — the distinction mentioned in the project |

---

## 7. Software Architecture & Clean Code Principles

Understanding SOLID, DRY, cyclomatic complexity, and God classes — what the Static Analysis Agent looks for.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **Martin Fowler — Refactoring (Book Companion)** | Book + Website | https://refactoring.com/ | Catalog of refactoring patterns with before/after code examples |
| **Martin Fowler — Code Smells** | Blog | https://martinfowler.com/bliki/CodeSmell.html | What a "code smell" is — the technical term for what Static Analysis detects |
| **Wikipedia — SOLID Principles** | Concept Reference | https://en.wikipedia.org/wiki/SOLID | Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion |
| **Wikipedia — DRY Principle** | Concept Reference | https://en.wikipedia.org/wiki/Don%27t_repeat_yourself | Don't Repeat Yourself — the foundation for duplication detection |
| **Wikipedia — Cyclomatic Complexity** | Concept Reference | https://en.wikipedia.org/wiki/Cyclomatic_complexity | How complexity is measured — what the threshold flags mean |
| **Wikipedia — God Object / God Class** | Concept Reference | https://en.wikipedia.org/wiki/God_object | The anti-pattern where one class/file does everything — a primary detection target |
| **Clean Code — Robert C. Martin (Summary)** | Book Summary | https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29 | Practical clean code rules — what the Analysis Agent enforces |
| **freeCodeCamp — SOLID Principles in JavaScript** | Tutorial | https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/ | Plain-English explanation with JS code examples — very accessible |

---

## 8. GitHub API, Webhooks & CI/CD

How the system hooks into the development lifecycle — registering webhooks, creating PRs, verifying events.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **GitHub Docs — About Webhooks** | Official Documentation | https://docs.github.com/en/webhooks/about-webhooks | What webhooks are, how to register them, supported events |
| **GitHub Docs — Webhook Payloads** | Official Documentation | https://docs.github.com/en/webhooks/webhook-events-and-payloads | The exact JSON structure sent on `push` and `pull_request` events |
| **GitHub Docs — Securing Webhooks (HMAC-SHA256)** | Official Security Guide | https://docs.github.com/en/webhooks/using-webhooks/securing-your-webhooks | How to verify webhook authenticity using the shared secret |
| **GitHub Docs — Creating Pull Requests via API** | Official Documentation | https://docs.github.com/en/rest/pulls/pulls#create-a-pull-request | REST API call to programmatically open a PR — what the Refactoring Planner uses |
| **GitHub Docs — REST API Overview** | Official Documentation | https://docs.github.com/en/rest | Full reference for cloning files, accessing commit data, creating branches |
| **GitHub Actions — Official Documentation** | Official Docs | https://docs.github.com/en/actions | How CI/CD integrates with the commit lifecycle; comparison point for the project |
| **Express.js — Official Docs** | Official Documentation | https://expressjs.com/en/guide/routing.html | Building the webhook listener endpoint in Node.js/Express |
| **Node.js — HTTP Module** | Official Documentation | https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction | Understanding how the Express backend receives and processes webhook events |

---

## 9. Existing Tools — SonarQube, ESLint, and Alternatives

Understanding the competitive landscape — what these tools do and where they fall short.

| Resource | Type | URL | What to Read |
|---|---|---|---|
| **SonarQube — Official Documentation** | Official Docs | https://docs.sonarsource.com/sonarqube/ | Full feature documentation: rules, Quality Gates, GitHub integration |
| **SonarQube — GitHub Integration Guide** | Official Guide | https://docs.sonarsource.com/sonarqube/latest/devops-platform-integration/github-integration/ | Automated scans via GitHub Actions, PR decoration, SSO |
| **SonarQube — AI CodeFix** | Official Feature Page | https://www.sonarsource.com/products/sonarqube/features/ai-codefix/ | The modern AI layer on top of SonarQube — understand how it differs from rule-based scanning |
| **ESLint — Official Documentation** | Official Docs | https://eslint.org/docs/latest/ | JavaScript/TypeScript linter rules and configuration |
| **Semgrep — Documentation** | Official Docs | https://semgrep.dev/docs/ | Modern, pattern-based static analysis that works across languages |
| **CodeRabbit — AI PR Reviews** | Tool Documentation | https://coderabbit.ai/docs | Context-aware AI code review — the closest commercial competitor to this project |
| **Greptile — Codebase-aware AI** | Tool Website | https://www.greptile.com/ | AI that indexes the full repo for context-aware feedback |
| **Sourcegraph Cody** | Tool Documentation | https://sourcegraph.com/cody | AI code assistant with repository-wide understanding |
| **GitHub Code Scanning** | Official Feature | https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning | GitHub's native SAST integration — relevant comparison for the project |

---

## 🔍 How to Find IEEE Papers (Step-by-Step)

For your research paper, you'll need properly cited academic sources. Here's how to find them:

1. **Go to** [IEEE Xplore](https://ieeexplore.ieee.org)
2. **Search using these specific queries:**

| Search Query | What you'll find |
|---|---|
| `"technical debt" AND "artificial intelligence"` | Papers on AI approaches to TD detection |
| `"technical debt management" AND "software engineering"` | Frameworks and empirical studies |
| `"self-admitted technical debt" AND (2023 OR 2024)` | Recent studies on SATD in code comments and ML repos |
| `"code refactoring" AND "large language model"` | LLM-powered refactoring research |
| `"static analysis" AND "machine learning"` | ML-enhanced static analysis beyond rule-based tools |
| `"multi-agent system" AND "software maintenance"` | Agent-based approaches to software quality |

3. **Filter** by Year: 2021–2024 for the most current work
4. **Download** the `.bib` or copy the IEEE citation format directly from the paper page

---

## 📖 Recommended Reading Order

If you're new to some of these topics, here's a suggested order to build your understanding:

```
1. Martin Fowler — Technical Debt (martinfowler.com)
      ↓
2. SOLID Principles & Clean Code fundamentals (Wikipedia + freeCodeCamp)
      ↓
3. OWASP Top 10 — understand what the Security Agent looks for (owasp.org)
      ↓
4. Tree-sitter intro — how code becomes a parseable tree (tree-sitter.github.io)
      ↓
5. LangChain Agents documentation (docs.langchain.com)
      ↓
6. LangGraph — Orchestrator-Worker pattern (langchain-ai.github.io/langgraph)
      ↓
7. pgvector — how semantic similarity search works (github.com/pgvector/pgvector)
      ↓
8. GitHub Webhooks & REST API (docs.github.com)
      ↓
9. IEEE Xplore — academic papers for citation (ieeexplore.ieee.org)
```

---

*Reference guide compiled for Group No. 11 — AI Technical Debt Inspector | Final Year Project*
