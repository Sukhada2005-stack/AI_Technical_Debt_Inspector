# The AI Technical Debt Inspector
### Automated Code Quality & Refactoring System: Consolidated Project Plan

**Status:** Project plan / design stage. No code has been written, and nothing has been implemented or tested yet.

**Group No. 11**
Sabhya Shanti (7ACE44) · Sukhada Bhalerao (7ACE63) · Gauri Narlawar (7ACE16) · Tanvi Bhole (7ACE70)
**Guide:** Prof. Minakshi Getkar

*Source of this document: the project deck (13 slides), the project explainer and plan text, and the workflow diagram provided by the team. Nothing here is added from outside those materials, except where marked "to verify".*

---

## 1. Overview

The AI Technical Debt Inspector is a proposed system that continuously watches a GitHub repository, finds technical debt (duplicated logic, "God classes", hardcoded secrets, injection risks), explains in plain English what the problematic code is doing, and then writes a cleaner version and opens a Pull Request for a human to approve.

**One-line pitch:** a senior developer living in your GitHub repository, reading every commit, summarizing what it does, and politely offering to clean up messy code before it becomes a major problem.

### What is technical debt? (the college-project analogy)
Imagine a full-stack app (React frontend, Node.js backend, PostgreSQL database) with a deadline tomorrow. To get it working, the same database connection code is copy-pasted into five files, and the logic for registering a user, updating a profile, and sending an alert is crammed into one 500-line Express route. It works, and you get the grade, but adding a feature later becomes a nightmare. That messy, copy-pasted code is technical debt.

**Formal definition (deck):** the implied future cost, in terms of time, of choosing quick, short-term coding fixes over clean, long-term architecture.

---

## 2. Problem Statement

- **The reality:** tight deadlines push developers into copy-pasting logic, skipping error handling, and building monolithic "God classes".
- **The problem:** large codebases become unmaintainable, consuming nearly **25% of active developer time** *(deck figure; source to verify)*.
- **The AI paradox:** AI code-generation tools speed up output but increase duplication, with an **8x rise in repeated code across 211 million analyzed lines** *(deck figure; source to verify)*.

---

## 3. Objectives

1. **Continuous review:** build an automated AI system that acts as an inline senior developer, analyzing and cleaning repositories.
2. **Active remediation:** shift software maintenance from passive detection to active code comprehension and autonomous repair.
3. **CI/CD integration:** automatically generate step-by-step refactoring plans and ready-to-merge Pull Requests.
4. **Developer efficiency:** reduce the manual effort spent on code reviews and legacy refactoring.

---

## 4. Existing Systems and the Gap (Literature Survey)

| Limitation of existing tools (SonarQube, ESLint) | Detail |
|---|---|
| Rule-based limits | Rely on rigid regex/pattern matching that flags only surface issues. |
| Lack of context | Do not understand application intent, logic flow, or system architecture. |
| Manual overhead | Identify errors but leave developers to rewrite and test complex logic by hand. |
| Alert fatigue | High false-positive rates lead developers to ignore critical warnings. |

**The gap this project targets:** existing tools tell you *what* is wrong; they leave you to work out *how* to fix it. A normal tool only reports "Warning: function is too long". This system reads the intent of the code, explains it, and proposes the fix.

---

## 5. Proposed System: Multi-Agent Architecture

Instead of one monolithic AI, the system uses small, specialized agents (Python scripts, each powered by an LLM) with specific jobs. They follow the **Orchestrator-Worker pattern**: workers report to a central orchestrator, not to each other.

| # | Agent | Role | Input | Output |
|---|---|---|---|---|
| 1 | **Repository Scanner** (the Fetcher) | Ingestion & graphing: connects to GitHub, downloads code, parses it, maps how files connect ("File A imports File B") | Git repo URL / webhooks | ASTs, dependency graphs, raw code chunks |
| 2 | **Static Analysis Agent** (the Code Reviewer) | Code quality & structure: finds duplicated logic (including semantic duplication), complex control flow, God classes / poor architecture, dead code | AST, code chunks | Complexity scores, duplication flags, architectural anti-patterns |
| 3 | **Security Agent** (the Guard) | Vulnerability detection: hardcoded credentials, injection vulnerabilities, missing authorization checks, outdated libraries, OWASP Top 10 | Raw code, dependencies | Secret-exposure alerts, CVE matches, injection risks |
| 4 | **Refactoring Planner** (the Fixer) | Synthesis & action: combines both reports, prioritizes by severity and impact, writes the corrected code | Outputs of agents 2 and 3 | Step-by-step refactoring plans, automated Pull Requests |

*Naming note:* the IEEE outline used the names Scanner, Critic, Guard, Planner. The deck uses Static Analysis Agent and Security Agent. One set of names should be chosen for the paper.

### The main feature: the Comprehension Engine
Before changing any code, the system produces a plain-English summary of what it does. Example: *"This chunk of code in routes.js is currently registering a user, creating a token, and updating the Postgres database all at once."* Then it proposes a plan, for example splitting it into three separate files. This confirms functional intent before anything is modified.

---

## 6. Workflow (Commit to Pull Request)

```
[ Developer Commits Code ]
             │
      (GitHub Webhook)
             │
             ▼
[ Node.js / Express Backend ]
             │
             ▼
[ Python AI Orchestrator (LangChain) ] ──┐
             │                            │
             ▼                            │ (Worker agents report
  ┌─────────────────────────────┐         │  back to the orchestrator
  │   1. Repository Scanner     │         │  instead of peers)
  │  (Parses AST & code chunks) │         │
  └──────────┬──────────────────┘         │
             ▼                            │
  ┌─────────────────────────────┐         │
  │   PostgreSQL + pgvector     │         │
  │ (Stores Code Embeddings)    │         │
  └──────────┬──────────────────┘         │
             ▼                            │
  ┌─────────────────────────────┐         │
  │ 2. Static Analysis Agent    │◄────────┤
  │ 3. Security Agent           │◄────────┘
  │ (Detects flaws & risks)     │
  └──────────┬──────────────────┘
             ▼
  ┌─────────────────────────────┐
  │ 4. Refactoring Planner      │
  │ (Context Engine Synthesis)  │
  └──────────┬──────────────────┘
             ▼
[ Automated Pull Request with Clean Code ]
```

### Four-step working (from the deck)
1. **Trigger:** code commits to Git launch automated backend webhooks.
2. **Ingestion:** code is chunked, converted into vector embeddings, and indexed.
3. **Analysis:** the multi-agent system compares chunks against the vector database to identify structural flaws.
4. **Action:** the system generates an optimized Pull Request with clean, modular code.

### What triggers the pipeline: the GitHub webhook
1. **Registration:** when the Inspector is set up on a repo, it registers a webhook with GitHub for `push` and `pull_request` events.
2. **Event fires:** on `git push` (or opening/updating a PR), GitHub sends an HTTP POST to the Express backend's listening endpoint.
3. **Payload:** JSON metadata only: repo, branch, commit SHA(s), changed files, author. It does **not** include the full code.
4. **Backend reacts:** Express verifies authenticity (GitHub signs webhooks with a shared secret), then hands control to the Python orchestrator via a message queue or direct API call.
5. **Scanner takes over:** only now does the Scanner clone or pull the changed files and start parsing.

This webhook design makes the system feel "always-on" and mirrors how CI/CD tools like GitHub Actions or Jenkins already hook into commits.

### How the orchestrator coordinates the agents
1. **Shared state ("blackboard pattern"):** a central JSON state object starts as `{ commit_sha, changed_files }` and accumulates `ast`, then `issues[]`, then `vulnerabilities[]`, then `refactor_plan`. Each agent reads what it needs and writes its output back.
2. **Sequencing with parallelism:** the Scanner must finish first. Then the Static Analysis and Security Agents run concurrently (async), since they are independent.
3. **Structured outputs:** each agent returns a strict JSON schema (e.g. `{ "issue_type": "...", "file": "...", "line": 12, "severity": "high" }`) rather than prose, so results can be merged, filtered, and ranked programmatically.
4. **Retries and tools:** on failure, timeout, or malformed JSON the orchestrator retries or falls back to a simpler rule-based check. It also exposes tools to agents, e.g. `read_file(path)` for the Planner, so it pulls exact code rather than hallucinating.
5. **Routing decision:** if the fix is small and isolated, auto-generate a PR. If it is a large architectural change, create a Jira ticket instead. This logic lives in the orchestrator.

**Why orchestrator-worker:** *debuggability* (every result flows through one coordinator, so the full decision trail can be logged) and *extensibility* (a fifth agent, e.g. a Performance Agent, plugs into the dispatch logic without rewiring peer connections).

**Presentation analogy:** the orchestrator is like a relay-race baton, a single evolving context object passed from agent to agent.

**Key handoff:** the Scanner-to-pgvector step is where raw code becomes searchable code. This is what lets the Planner later find duplicated logic across files it has not directly looked at.

---

## 7. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js | Interactive dashboard: health metrics, debt score, dependency charts, review of proposed refactors |
| Backend | Node.js + Express.js | RESTful APIs and real-time GitHub webhooks |
| AI orchestration | Python + LangChain (AutoGen also mentioned) with LLMs (Gemini / OpenAI) | Agent orchestration, memory, and handoffs |
| Database | PostgreSQL + pgvector (Pinecone mentioned as an alternative) | Scan history, debt metrics, and code embeddings for semantic similarity detection |
| Code parsing | Tree-sitter (multi-language ASTs); SonarQube/ESLint as baseline metrics | Parsing and pre-LLM baseline *(mentioned in the plan text, not in the deck)* |

---

## 8. Implementation Phases

**Phase 1: Ingestion & Baseline (Repository Scanner)**
- Integrate with GitHub/GitLab APIs to clone or pull repositories.
- Set up webhooks so scanning runs on new commits or Pull Requests.
- Parse code into chunks and build a dependency graph so the AI understands how modules interact.

**Phase 2: Inspection & Contextualization (Analysis and Security Agents)**
- The Static Analysis Agent checks chunks against clean-code principles (SOLID, DRY) and finds God classes, high cyclomatic complexity, and dead/unreachable code.
- The Security Agent scans for hardcoded API keys, outdated libraries, and OWASP Top 10 vulnerabilities.
- *Crucial step:* the LLM agents read the context of the code instead of only running regex rules, to reduce false positives.

**Phase 3: Synthesis & Remediation (Refactoring Planner)**
- Consumes reports from both previous agents.
- Prioritizes debt by severity and impact (a critical security flaw before a minor duplication).
- Produces structured JSON containing the exact file and line numbers, an explanation of why the code is bad, and the rewritten, optimized snippet.

**Phase 4: Delivery & Action**
- Large architectural overhauls become automated Jira tickets.
- Small, isolated fixes (e.g. extracting a duplicated function) become an automated Pull Request for human review.

---

## 9. Expected Outcomes

*These are the intended outcomes stated in the deck's "Results and Discussion" slide. Because no system has been built, they are expectations to be validated, not measured results.*

- **Code transformation:** tightly coupled, complex functions reconstructed into clean, isolated modules.
- **Quality metrics:** lower cyclomatic complexity; higher maintainability and readability.
- **Automated discovery:** dead code paths, anti-patterns, and database bottlenecks found without manual checks.
- **Developer impact:** smoother PR approvals and fewer hours spent on technical debt.

---

## 10. Conclusion and Future Scope

**Conclusion**
- *Automation:* automates repetitive, manual software-maintenance workflows.
- *Architectural awareness:* moves beyond syntax linting to context-aware, repository-level comprehension.

**Future scope**
- **IDE extensions:** real-time plugins (e.g. VS Code) for instant feedback while typing.
- **Test generation:** extend the Refactoring Planner to auto-generate unit-test suites.
- **Enterprise automation:** continuous, background debt remediation in large pipelines.
- **Feature focus:** give engineering hours back to building new features.
- **Self-healing systems:** shift from passive issue reporting to active, self-healing codebases.

---

## 11. Presentation Strategy (Pitch Narrative)

1. **The hook:** the "slow-boiling frog". Technical debt does not ruin a project overnight; feature delivery slows from days to weeks to months.
2. **The flaw in current tools:** SonarQube and similar tools tell you what is wrong but leave you to figure out how to fix it.
3. **The AI advantage:** the multi-agent system understands the logic and writes the refactoring plan.
4. **The future vision:** "self-healing codebases", with the Inspector as an automated senior engineer pruning code in the background.

---

## 12. Planned Research Paper (IEEE Format)

**Structure:** Title and Authors → Abstract (150–250 words: problem, solution, result) → Introduction → Literature Review / Related Work → Proposed Methodology / System Architecture → Implementation Details → Results and Discussion → Conclusion and Future Scope → References.

**Formatting:** two-column layout; Times New Roman (10 pt body, 24 pt title); numbered citations in square brackets, e.g. [1]; IEEE-style reference list.

**Ground rules given by the team:** references must come from real research papers and blogs; no invented data; information must be correct. The only exception is the project's own methodology and design, taken from this plan.

**Implication of the plan-only status:** the paper should be written as a proposed-system/design paper. Its Results section should be framed as expected outcomes plus an evaluation plan, with limitations stated plainly.

---

## 13. References Listed in the Deck (need verification before IEEE use)

1. https://www.sciencedirect.com/science/article/abs/pii/S0164121226003018
2. https://www.sciencedirect.com/science/article/abs/pii/S0164121226002712
3. https://github.blog/engineering/ *(general blog index; needs a specific article)*
4. https://www.oreilly.com/live-events/reading-and-maintaining-code-with-generative-ai *(live-event page; needs a specific citable source)*

---

## 14. Open Items to Settle

- **Agent naming:** decide between Static Analysis/Security Agent and Critic/Guard for consistency.
- **Statistics:** confirm the source of the 25% developer-time figure and the 8x / 211-million-line finding before citing.
- **Scope:** decide whether Jira routing, Tree-sitter, and SonarQube/ESLint baselines are in the paper (they appear in the plan text but not in the deck).
- **Validation gap:** the Planner is meant to rewrite code "without disrupting original functionality", but test generation is listed as future work. State this as a limitation.
- **Diagram detail:** the dashed feedback loop in the diagram touches only the Security Agent, while the text says both workers report to the orchestrator.
- **Results:** no measured results exist. Decide whether to keep the paper design-level or build a small prototype to gather real data.
