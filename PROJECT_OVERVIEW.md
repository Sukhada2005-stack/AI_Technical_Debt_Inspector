# 🤖 AI Technical Debt Inspector
### Automated Code Quality & Refactoring System — Complete Project Overview

> **Group No. 11**  
> Sabhya Shanti (7ACE44) · Sukhada Bhalerao (7ACE63) · Gauri Narlawar (7ACE16) · Tanvi Bhole (7ACE70)  
> **Guide:** Prof. Minakshi Getkar  
> **Status:** Design & Planning Stage

---

## 📌 Table of Contents

1. [What is this Project?](#1-what-is-this-project)
2. [The Problem: Technical Debt](#2-the-problem-technical-debt)
3. [Why Existing Tools Fall Short](#3-why-existing-tools-fall-short)
4. [Our Solution: Multi-Agent AI System](#4-our-solution-multi-agent-ai-system)
5. [The 4 AI Agents — Roles & Responsibilities](#5-the-4-ai-agents--roles--responsibilities)
6. [System Architecture & Workflow](#6-system-architecture--workflow)
7. [How the Pipeline is Triggered](#7-how-the-pipeline-is-triggered)
8. [How the Orchestrator Coordinates Agents](#8-how-the-orchestrator-coordinates-agents)
9. [Technology Stack](#9-technology-stack)
10. [Implementation Phases](#10-implementation-phases)
11. [Expected Outcomes](#11-expected-outcomes)
12. [Advantages Over Existing Tools](#12-advantages-over-existing-tools)
13. [Future Scope](#13-future-scope)
14. [References](#14-references)

---

## 1. What is this Project?

The **AI Technical Debt Inspector** is a proposed intelligent system that continuously watches a GitHub repository, detects technical debt in the codebase, explains what the problematic code is doing in plain English, and then **writes a cleaner version of the code** — automatically opening a Pull Request for a human developer to approve.

> **One-line pitch:** *"A senior developer living in your GitHub repository — reading every commit, summarizing what it does, and politely offering to clean up messy code before it becomes a major problem."*

Unlike traditional code quality tools that simply flag issues, this system **understands intent**, **explains the problem**, and **proposes a working fix**.

---

## 2. The Problem: Technical Debt

### The College Project Analogy

Imagine building a full-stack web app — React frontend, Node.js backend, PostgreSQL database — with a deadline tomorrow. To get it working fast, you:

- Copy-paste the same database connection code into **five different files**
- Cram the logic for user registration, profile updates, and alert sending all into **one 500-line Express route**

It works. You get the grade. But that messy, duplicated code is **Technical Debt**.

When you later want to add a feature, every change ripples through five files. What takes 1 hour in clean code takes 3 days in debt-ridden code.

### Formal Definition
> *Technical Debt is the implied future cost, in terms of time and effort, of choosing quick short-term coding fixes over clean long-term architecture.*

### The Scale of the Problem

| Statistic | Impact |
|---|---|
| Technical debt consumes ~**25% of active developer time** | Massive productivity drain across teams |
| AI code-generation tools caused an **8x rise in code duplication** | Across 211 million analyzed lines of code |
| Teams slow down: shipping features shifts from **days to weeks to months** | The "slow-boiling frog" effect |

### Common Forms of Technical Debt

| Debt Type | Example |
|---|---|
| **Duplicated Logic** | Same database connection block copy-pasted into 5 files |
| **God Classes** | A single `utils.js` that does auth, routing, email, and DB queries |
| **Hardcoded Secrets** | `const DB_PASSWORD = "admin123"` in source code |
| **High Cyclomatic Complexity** | A 300-line function with 20 nested if/else blocks |
| **Dead Code** | Functions defined but never called anywhere |
| **Injection Vulnerabilities** | SQL queries built via string concatenation |
| **Outdated Libraries** | Dependencies with known CVEs never updated |

---

## 3. Why Existing Tools Fall Short

To understand the gap this project fills, it is important to first understand what the current leading tools actually do — and where they stop.

---

### SonarQube — A Practical Overview

SonarQube is currently one of the most widely adopted code quality platforms in the industry. Understanding its capabilities and limitations directly motivates the need for the AI Technical Debt Inspector.

#### What SonarQube Does

| Capability | Description |
|---|---|
| **Finds Bugs** | Detects logical flaws and errors that can cause a program to crash or fail |
| **Detects Vulnerabilities** | Locates security weaknesses (SAST — Static Application Security Testing) that hackers could exploit |
| **Identifies Code Smells** | Highlights messy, non-standard, or hard-to-maintain code patterns |
| **Measures Code Coverage** | Tracks unit testing metrics to show how much of the codebase is tested |

#### Key Features

| Feature | Detail |
|---|---|
| **Supports 40+ Languages** | Works with Java, Python, JavaScript, TypeScript, C#, C++, PHP, and more |
| **Quality Gates** | Enforces pass/fail rules to block bad code from reaching production |
| **CI/CD Integration** | Connects with tools like Jenkins, GitHub Actions, and GitLab CI |

#### Key Features of GitHub Integration

- **Automated Scans via GitHub Actions** — Trigger scans inside your CI/CD pipeline using the official SonarQube Scan GitHub Action.
- **Pull Request Decoration** — Posts analysis summaries and Quality Gate results (Pass/Fail) directly into GitHub PR comments, showing developers if their code is safe to merge. *(Requires Developer Edition or higher.)*
- **Single Sign-On (SSO)** — Developers can log in to the SonarQube server directly using their GitHub credentials.
- **Code Scanning Alerts** — Security vulnerabilities found by SonarQube can be displayed as alerts directly inside the native GitHub interface.

---

#### Common Disadvantages of SonarQube

These are the critical gaps that SonarQube — and tools like it — leave open:

| Disadvantage | What It Means |
|---|---|
| **False Positives & "Alert Fatigue"** | Frequently flags clean, functional code as broken or messy; developers spend time marking rules as false positives or won't-fix — eventually ignoring critical alerts altogether |
| **Resource Intensive (On-Premises)** | Self-hosting the open-core Server means full codebase scans can be CPU/memory intensive, requiring a dedicated database and maintenance overhead |
| **No Dynamic Testing (SAST Only)** | Checks code without running it — cannot detect runtime vulnerabilities, misconfigured environments, or live application flaws (those require a DAST tool) |
| **Steep Learning Curve** | Setting up Quality Profiles, custom rules across microservices, and debugging pipeline integrations can be hard for beginners and small teams |
| **Paywalled Features** | Native PR decoration, branch analysis, and advanced security patterns are locked behind paid Developer/Enterprise editions |
| **Slower Feedback Loop** | Scans typically run during build pipelines rather than as-you-type, which slows rapid development compared to IDE extensions |

---

#### Is SonarQube "Automated"? — The Important Distinction

SonarQube is an **automated** tool built on **deterministic, rules-based scanning** — but it now layers **generative AI features** on top to help fix what it finds. No human sits and manually reviews code line by line. However, the two layers are fundamentally different:

| Layer | Approach | Characteristics |
|---|---|---|
| **The Core: Automated & Deterministic** | Static Application Security Testing (SAST) | Scans code using strict, standardized rulesets — not guesswork. **Deterministic** (same bad code triggers the same flagged error every single time), **Rule-based** (relies on fixed logic patterns, not probabilistic generation), **No hallucination** (unlike generative AI, results are fully reproducible) |
| **The Modern AI Layer** | Generative AI on top of rule-based scanning | **AI CodeFix** — uses LLMs (e.g., GPT-4o) to offer one-click fixes in the dashboard or IDE. **AI Code Assurance** — a safety net that inspects code generated by AI assistants like Copilot or Cursor. **Hunter Agent** — advanced AI agents that reason across entire projects to catch deep, logic-level vulnerabilities |

> **The key caveat:** The only manual parts of SonarQube are the initial setup, adjusting rule preferences (e.g., changing strictness metrics), and reviewing flagged lines when developers need to triage whether an alert is a false positive. The AI CodeFix features are recent additions and not the core of the product.

---

### The Broader Landscape of Limitations

Beyond SonarQube, this applies to the entire class of existing static analysis tools (**ESLint**, **PMD**, **Checkstyle**, **Bandit**, etc.):

| Limitation | What it means in practice |
|---|---|
| **Rule-based only** | Rigid regex/pattern matching; catches surface-level symptoms, not root architectural causes |
| **No contextual understanding** | Does not understand *what* the code is trying to accomplish — only *how* it looks syntactically |
| **Detection without resolution** | Says *"Warning: function too long"* — leaves the developer to figure out how to restructure the logic |
| **Alert fatigue** | High false-positive rates cause developers to habitually ignore critical warnings |
| **No fix generation** | Zero code is rewritten automatically; every finding requires manual developer effort to resolve |
| **No semantic duplication detection** | Finds copy-pasted text, but cannot detect logically identical code written in a different way |
| **No cross-file architectural reasoning** | Cannot reason about how modules interact, or whether a pattern across 10 files constitutes a systemic design flaw |
| **No business-logic awareness** | Cannot distinguish between a function that is "too complex" by a rule and a function that is *intentionally* complex due to domain requirements |

### The Critical Gap

> **Existing tools tell you *what* is wrong. They leave you to work out *how* to fix it.**

A normal tool reports: *"Warning: function is too long."*

The AI Technical Debt Inspector reads the code's intent, explains it in plain English — *"This function in `routes.js` handles user registration, token creation, and database updates all at once"* — and then writes the corrected, modular version and opens a Pull Request for the developer to approve.

That is the gap this project fills.


---

## 4. Our Solution: Multi-Agent AI System

Instead of one giant, monolithic AI, the system uses **small, specialized Python scripts (Agents)**, each powered by an LLM, with very specific jobs. They collaborate through a **central Orchestrator** following the **Orchestrator-Worker pattern**.

### Why Orchestrator-Worker?

Workers **report findings back to the Orchestrator** — they never talk peer-to-peer. This gives two critical benefits:

- **Debuggability** — Every decision flows through one coordinator; the full trail can be logged and inspected in one place.
- **Extensibility** — Adding a 5th agent (e.g., a Performance Agent) means plugging into the orchestrator's dispatch logic without rewiring all existing agent connections.

---

## 5. The 4 AI Agents — Roles & Responsibilities

### Agent 1: Repository Scanner *(The Fetcher)*

| Attribute | Detail |
|---|---|
| **Role** | Ingestion & graphing |
| **Input** | Git repo URL / GitHub webhook event |
| **Output** | Abstract Syntax Trees (ASTs), dependency graphs, raw code chunks |
| **What it does** | Connects to GitHub, downloads changed code, parses each file into an AST, maps how files connect (`File A imports File B`) |

**Why it matters:** Transforms raw source files into structured, machine-readable representations. Without this, the LLM would be reading unstructured text with no understanding of code relationships.

---

### Agent 2: Static Analysis Agent *(The Code Reviewer)*

| Attribute | Detail |
|---|---|
| **Role** | Code quality & structure |
| **Input** | ASTs, code chunks from the Scanner |
| **Output** | Complexity scores, duplication flags, architectural anti-patterns |
| **Checks for** | Duplicated logic (including semantic duplication), God classes, high cyclomatic complexity, dead/unreachable code, SOLID and DRY violations |

**Key differentiator:** Uses an LLM to **read context** — catches logically identical code even when written differently, and avoids flagging legitimate patterns as false positives.

---

### Agent 3: Security Agent *(The Guard)*

| Attribute | Detail |
|---|---|
| **Role** | Vulnerability detection |
| **Input** | Raw code, dependency files (`package.json`, `requirements.txt`) |
| **Output** | Secret-exposure alerts, CVE matches, injection risks |
| **Checks for** | Hardcoded API keys/passwords, SQL injection, OWASP Top 10 vulnerabilities, outdated libraries with known CVEs, missing authorization checks |

**Key differentiator:** The LLM understands context — distinguishes a genuinely hardcoded password from a test-scaffolding placeholder.

---

### Agent 4: Refactoring Planner *(The Fixer)*

| Attribute | Detail |
|---|---|
| **Role** | Synthesis & action |
| **Input** | Combined reports from Agents 2 and 3 |
| **Output** | Step-by-step refactoring plans, rewritten code, automated PRs / Jira tickets |
| **What it does** | Prioritizes issues by severity → generates structured JSON with file/line info + explanation + corrected code → creates a PR or Jira ticket |

**The Comprehension Engine (Main Feature):**

Before changing any code, the system generates a plain-English summary:

> *"This chunk of code in `routes.js` is currently registering a user, creating a token, and updating the Postgres database — all at once. Here is a plan to split this into three separate files to improve readability and maintainability."*

This **confirms functional intent** before any modification.

---

## 6. System Architecture & Workflow

### Complete Data Flow: Commit → Pull Request

```
[ Developer Commits Code ]
             |
      (GitHub Webhook - HTTP POST)
             |
             v
[ Node.js / Express Backend ]
      (Authenticates webhook signature)
             |
             v
[ Python AI Orchestrator (LangChain) ] <-----------------+
             |                                           |
             v                                           | Worker agents report
   +---------------------------------+                   | findings back to the
   |   1. Repository Scanner        |                   | orchestrator (not peers)
   |  (Parses AST & code chunks)    |                   |
   +----------------+----------------+                   |
                    v                                    |
   +---------------------------------+                   |
   |   PostgreSQL + pgvector        |                   |
   |  (Stores Code Embeddings)      |                   |
   +----------------+----------------+                   |
                    v                                    |
   +---------------------------------+                   |
   |  2. Static Analysis Agent      |<------------------+
   |  3. Security Agent             |<------------------+
   |     (run concurrently)         |
   +----------------+----------------+
                    v
   +---------------------------------+
   |  4. Refactoring Planner        |
   |  (Context Engine Synthesis)    |
   +----------------+----------------+
                    v
         +----------+---------+
         v                    v
   [Auto Pull Request]   [Jira Ticket]
      (small fix)        (big refactor)
```

### Four-Step Summary

| Step | Name | What Happens |
|---|---|---|
| **1** | Trigger | A `git push` fires a GitHub webhook to the Express backend |
| **2** | Ingestion | Code is chunked, converted to vector embeddings, and indexed in pgvector |
| **3** | Analysis | The multi-agent system identifies structural flaws and vulnerabilities |
| **4** | Action | Refactoring Planner generates a Pull Request or Jira ticket |

---

## 7. How the Pipeline is Triggered

The system uses a **GitHub Webhook** — this is what makes it feel "always-on."

### Step-by-Step Trigger Flow

1. **Registration** — The Inspector registers a webhook with GitHub for `push` and `pull_request` events.

2. **Event fires** — On `git push`, GitHub sends an **HTTP POST** to the Express backend.

3. **Payload (metadata only, no source code):**
   ```json
   {
     "repository": "my-app",
     "branch": "main",
     "commit_sha": "a1b2c3d4",
     "changed_files": ["src/routes.js", "src/db.js"],
     "author": "dev@example.com"
   }
   ```

4. **Backend reacts** — Express verifies authenticity (HMAC-SHA256 signature), then hands control to the Python Orchestrator.

5. **Scanner takes over** — Only now does the Scanner clone the changed files and begin parsing.

> This webhook-driven design mirrors how CI/CD tools like GitHub Actions or Jenkins already hook into the commit lifecycle — zero friction for developers.

---

## 8. How the Orchestrator Coordinates Agents

The Orchestrator is the brain — it **never touches code directly**. Its job is coordination, state management, sequencing, and decision-making.

### 1. Shared State — The Blackboard Pattern

A central JSON state object starts empty and grows:

```json
// Initial state:
{ "commit_sha": "a1b2c3d4", "changed_files": ["routes.js"] }

// After Scanner:
{ ..., "ast": { ... }, "code_chunks": [...] }

// After Analysis + Security (run in parallel):
{ ..., "issues": [...], "vulnerabilities": [...] }

// After Refactoring Planner:
{ ..., "refactor_plan": { "file": "routes.js", "line": 42, "fix": "..." } }
```

### 2. Sequencing with Parallelism

- **Scanner** must complete first (both analysis agents need the AST)
- **Static Analysis** and **Security** run **concurrently** (async, independent)
- **Refactoring Planner** waits for both, then synthesizes

### 3. Structured Outputs — Not Free Text

Each agent returns strict JSON, not prose:
```json
{
  "issue_type": "god_class",
  "file": "src/routes.js",
  "line": 42,
  "severity": "high",
  "description": "Function handles auth, DB writes, and email — violates SRP"
}
```

### 4. Retries and Tool Access

- If an LLM call fails or times out, the orchestrator **retries or falls back** to a rule-based check
- The orchestrator gives agents **tool access** — e.g., `read_file(path)` for the Refactoring Planner, so it pulls exact code rather than hallucinating it

### 5. Routing Decision

```
Is the fix small and isolated?
    YES → Auto-generate a Pull Request
    NO  → Create a Jira ticket for sprint planning
```

> **Analogy:** The orchestrator is like a relay-race baton — a single evolving context object passed from agent to agent, each one adding their piece before handing it forward.

---

## 9. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React.js | Dashboard: debt score, dependency graphs, agent findings, PR review |
| **Backend** | Node.js + Express.js | RESTful APIs, GitHub webhook listener, message routing |
| **AI Orchestration** | Python + LangChain / AutoGen | Agent creation, LLM calls, memory, state management, handoffs |
| **LLM Models** | Gemini / OpenAI GPT | Intelligence powering each agent's analysis and code generation |
| **Database** | PostgreSQL | Scan history, debt metrics, issue logs |
| **Vector Database** | pgvector (or Pinecone) | Code embeddings for semantic similarity search |
| **Code Parsing** | Tree-sitter | Multi-language AST generation (JS, Python, TypeScript, etc.) |
| **Baseline Metrics** | SonarQube / ESLint | Pre-LLM baseline checks to ground AI analysis |
| **Issue Tracking** | Jira API | Automated ticket creation for large refactoring tasks |
| **Version Control** | GitHub API | Webhook registration, PR creation, file access |

### Why pgvector is Critical

pgvector enables **semantic code search** — every code chunk is embedded as a vector and stored. When the Refactoring Planner needs to find "all functions that perform the same DB write," it runs a **vector similarity search** across the entire codebase — even across files it hasn't directly read. This is what enables **cross-file duplicate detection**.

---

## 10. Implementation Phases

### Phase 1: Ingestion & Baseline *(Repository Scanner)*
- Integrate with GitHub/GitLab APIs to clone or pull repositories
- Register webhooks to trigger scanning on new commits or PRs
- Parse code into chunks using Tree-sitter (language-agnostic ASTs)
- Build a dependency graph mapping inter-module relationships
- Embed code chunks and store in pgvector for semantic search

### Phase 2: Inspection & Contextualization *(Analysis & Security Agents)*
- **Static Analysis Agent** checks against SOLID, DRY principles; detects God classes, high cyclomatic complexity, dead code
- **Security Agent** checks for hardcoded credentials, OWASP Top 10, CVEs, SQL injection, missing auth
- **Key:** LLM reads **context** (not just regex) to reduce false positives

### Phase 3: Synthesis & Remediation *(Refactoring Planner)*
- Consumes reports from both agents
- Prioritizes: **critical security flaw > high severity debt > minor duplication**
- Produces structured JSON with file/line numbers, explanation, and rewritten code

### Phase 4: Delivery & Action
- **Small fix** → Automated GitHub Pull Request (human review and approval)
- **Large overhaul** → Automated Jira ticket (sprint planning)

---

## 11. Expected Outcomes

> *Note: This is a design-stage project. These are intended outcomes to be validated — not measured results.*

| Outcome | Description |
|---|---|
| **Code Transformation** | Tightly coupled functions reconstructed into clean, isolated, modular code |
| **Quality Improvement** | Lower cyclomatic complexity; higher maintainability and readability |
| **Automated Discovery** | Dead code, anti-patterns, and DB bottlenecks found without manual checks |
| **Developer Impact** | Fewer hours spent on manual code reviews and legacy refactoring |
| **Before/After** | 500-line God route split into `auth.service.js`, `db.service.js`, `email.service.js` |

---

## 12. Advantages Over Existing Tools

### Head-to-Head Comparison

| Feature | SonarQube | ESLint / Checkstyle | **AI Technical Debt Inspector** |
|---|---|---|---|
| Detection method | Rule-based regex | Rule-based regex | LLM + semantic understanding |
| Understands code intent | No | No | **Yes** — explains in plain English |
| Semantic duplication detection | No | No | **Yes** — via vector embeddings |
| Generates fix code | No | No | **Yes** — writes the corrected version |
| Creates Pull Requests | No | No | **Yes** — automated PRs ready to merge |
| Context-aware (reduces false positives) | Limited | Limited | **Yes** — LLM reads context |
| Security + quality in one pipeline | Separate tools needed | No | **Yes** — unified multi-agent pipeline |
| Cross-file analysis | Partial | No | **Yes** — via pgvector similarity search |
| Auto-prioritizes by severity | Scores only | No | **Yes** — AI ranks and routes |
| Plain-English explanations | No | No | **Yes** — comprehension engine |
| Always-on webhook integration | Yes | Manual | **Yes** — webhook driven |
| Creates Jira tickets | Plugin required | No | **Yes** — built-in orchestrator routing |

### The Core Advantage in One Sentence

> **SonarQube says:** *"Warning: function is too long."*  
> **AI Inspector says:** *"This function in `routes.js` handles user registration, token creation, and DB updates. Here's how to split it into three cleaner modules — and here's the rewritten code in a Pull Request for your approval."*

### Why Multi-Agent Beats Monolithic AI

| Approach | Problem |
|---|---|
| Single monolithic AI | Context window limitations, no separation of concerns, harder to debug |
| **Multi-agent (this project)** | Each agent is an expert in one domain, results are traceable, new agents plug in without breaking existing ones |

---

## 13. Future Scope

| Feature | Description |
|---|---|
| **VS Code Extension** | Real-time debt detection and fix suggestions while the developer types |
| **Auto Test Generation** | Refactoring Planner auto-generates unit test suites for refactored code |
| **Enterprise Automation** | Continuous, background debt remediation in large mono-repo pipelines |
| **Performance Agent** | 5th agent detecting N+1 query problems, memory leaks, unnecessary re-renders |
| **Self-Healing Codebases** | Long-term vision: automated senior engineer pruning code continuously with no human trigger |
| **Multi-Language Expansion** | Deeper support for Go, Rust, Java, Swift, Kotlin beyond initial JS/Python/TS scope |

---

## 14. References

> *References listed in the project deck — must be verified before IEEE citation use.*

1. ScienceDirect — *[Technical Debt in Software Systems, Article 1](https://www.sciencedirect.com/science/article/abs/pii/S0164121226003018)*
2. ScienceDirect — *[Technical Debt in Software Systems, Article 2](https://www.sciencedirect.com/science/article/abs/pii/S0164121226002712)*
3. GitHub Engineering Blog — *[https://github.blog/engineering/](https://github.blog/engineering/)* *(specific article needed)*
4. O'Reilly — *Reading and Maintaining Code with Generative AI* *(specific citable version needed)*
5. M. Fowler — *"Technical Debt"* — martinfowler.com *(foundational reference)*
6. LangChain Documentation — *[https://docs.langchain.com](https://docs.langchain.com)* — Agent orchestration framework
7. Tree-sitter — *[https://tree-sitter.github.io](https://tree-sitter.github.io)* — Multi-language code parsing
8. OWASP Top 10 — *[https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)* — Security vulnerability standard
9. pgvector — *[https://github.com/pgvector/pgvector](https://github.com/pgvector/pgvector)* — Vector similarity search in PostgreSQL

---

## Quick Fact Sheet

| Property | Value |
|---|---|
| **Project Type** | Multi-agent AI system for automated code quality |
| **Core Pattern** | Orchestrator-Worker (Blackboard Pattern) |
| **Number of Agents** | 4 (Scanner, Static Analysis, Security, Refactoring Planner) |
| **Primary Input** | GitHub repository (via webhook on `git push`) |
| **Primary Output** | Automated Pull Requests with clean, refactored code |
| **Languages Supported** | JavaScript, Python, TypeScript (extensible via Tree-sitter) |
| **Key Differentiator** | Understands code intent → explains it → writes the fix |
| **AI Framework** | LangChain / AutoGen + Gemini / OpenAI |
| **Database** | PostgreSQL + pgvector |
| **Current Status** | Design & planning stage — no code written yet |

---

*Document prepared for Group No. 11 — AI Technical Debt Inspector | Final Year Project*
