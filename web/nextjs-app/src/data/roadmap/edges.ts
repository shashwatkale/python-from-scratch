// src/data/roadmap/edges.ts
import type { RoadmapEdge } from "@/types";

export const ROADMAP_EDGES: RoadmapEdge[] = [
  // ─── Foundation Edges (Linear Spine 00 -> 05) ─────────────────
  { id: "e-00-01", from: "00-setup", to: "01-syntax" },
  { id: "e-01-02", from: "01-syntax", to: "02-variables-types" },
  { id: "e-02-03", from: "02-variables-types", to: "03-operators" },
  { id: "e-03-04", from: "03-operators", to: "04-control-flow" },
  { id: "e-04-05", from: "04-control-flow", to: "05-functions" },

  // ─── Foundation to Core Fan-Out ───────────────────────────────
  { id: "e-05-06", from: "05-functions", to: "06-data-structures" },
  { id: "e-05-07", from: "05-functions", to: "07-strings-regex" },
  { id: "e-05-08", from: "05-functions", to: "08-file-handling" },
  { id: "e-05-09", from: "05-functions", to: "09-exceptions" },

  // ─── Core Interconnections ────────────────────────────────────
  { id: "e-06-10", from: "06-data-structures", to: "10-modules-packages" },
  { id: "e-06-11", from: "06-data-structures", to: "11-oop" },
  { id: "e-06-13", from: "06-data-structures", to: "13-iterators-generators" },
  { id: "e-09-12", from: "09-exceptions", to: "12-testing" },
  { id: "e-11-14", from: "11-oop", to: "14-decorators" },
  { id: "e-11-15", from: "11-oop", to: "15-context-managers" },
  { id: "e-10-16", from: "10-modules-packages", to: "16-typing" },
  { id: "e-10-17", from: "10-modules-packages", to: "17-git-github" },

  // ─── Core to Specialization Branches ──────────────────────────
  // Automation / DevOps
  { id: "e-07-aut", from: "07-strings-regex", to: "spec-automation" },
  { id: "e-08-aut", from: "08-file-handling", to: "spec-automation" },
  { id: "e-aut-scr", from: "spec-automation", to: "spec-web-scraping" },
  { id: "e-aut-lin", from: "spec-automation", to: "spec-linux-shell" },
  { id: "e-lin-cicd", from: "spec-linux-shell", to: "prod-cicd-github-actions" },
  { id: "e-scr-cap", from: "spec-web-scraping", to: "job-ready-python-dev" },

  // Data / Analytics
  { id: "e-13-num", from: "13-iterators-generators", to: "spec-numpy" },
  { id: "e-num-pan", from: "spec-numpy", to: "spec-pandas" },
  { id: "e-pan-eda", from: "spec-pandas", to: "spec-eda-stats" },
  { id: "e-pan-viz", from: "spec-pandas", to: "spec-data-viz" },
  { id: "e-eda-cap", from: "spec-eda-stats", to: "job-ready-data-ai" },
  { id: "e-viz-cap", from: "spec-data-viz", to: "job-ready-data-ai" },

  // ML / AI
  { id: "e-num-skl", from: "spec-numpy", to: "spec-scikit-learn" },
  { id: "e-pan-skl", from: "spec-pandas", to: "spec-scikit-learn" },
  { id: "e-skl-dl", from: "spec-scikit-learn", to: "spec-deep-learning" },
  { id: "e-dl-rag", from: "spec-deep-learning", to: "spec-llms-rag" },
  { id: "e-rag-agt", from: "spec-llms-rag", to: "spec-ai-agents" },
  { id: "e-skl-mlp", from: "spec-scikit-learn", to: "prod-mlops-serving" },
  { id: "e-agt-cap", from: "spec-ai-agents", to: "job-ready-data-ai" },
  { id: "e-mlp-cap", from: "prod-mlops-serving", to: "job-ready-data-ai" },

  // Backend / FastAPI
  { id: "e-08-sql", from: "08-file-handling", to: "spec-sql-databases" },
  { id: "e-11-sql", from: "11-oop", to: "spec-sql-databases" },
  { id: "e-05-rst", from: "05-functions", to: "spec-http-rest" },
  { id: "e-rst-fa", from: "spec-http-rest", to: "spec-fastapi" },
  { id: "e-sql-fa", from: "spec-sql-databases", to: "spec-fastapi" },
  { id: "e-14-fa", from: "14-decorators", to: "spec-fastapi" },
  { id: "e-16-fa", from: "16-typing", to: "spec-fastapi" },
  { id: "e-fa-pyd", from: "spec-fastapi", to: "spec-pydantic-auth" },
  { id: "e-pyd-sec", from: "spec-pydantic-auth", to: "prod-api-security-jwt" },
  { id: "e-fa-asy", from: "spec-fastapi", to: "prod-async-python" },
  { id: "e-fa-red", from: "spec-fastapi", to: "prod-caching-redis" },
  { id: "e-pyd-cap", from: "spec-pydantic-auth", to: "job-ready-backend-fastapi" },
  { id: "e-sec-cap", from: "prod-api-security-jwt", to: "job-ready-backend-fastapi" },
  { id: "e-asy-cap", from: "prod-async-python", to: "job-ready-backend-fastapi" },
  { id: "e-red-cap", from: "prod-caching-redis", to: "job-ready-backend-fastapi" },

  // QA / SDET & Full Stack
  { id: "e-12-fix", from: "12-testing", to: "spec-pytest-fixtures" },
  { id: "e-fix-api", from: "spec-pytest-fixtures", to: "spec-api-automation" },
  { id: "e-fix-plw", from: "spec-pytest-fixtures", to: "spec-playwright" },
  { id: "e-fa-fs", from: "spec-fastapi", to: "spec-fullstack-frontend" },
  { id: "e-fs-cap", from: "spec-fullstack-frontend", to: "job-ready-backend-fastapi" },
  { id: "e-plw-cap", from: "spec-playwright", to: "job-ready-devops-qa" },
  { id: "e-api-cicd", from: "spec-api-automation", to: "prod-cicd-github-actions" },
  { id: "e-cicd-cap", from: "prod-cicd-github-actions", to: "job-ready-devops-qa" },

  // Docker Infrastructure Connections
  { id: "e-17-doc", from: "17-git-github", to: "prod-docker-containers" },
  { id: "e-doc-cap1", from: "prod-docker-containers", to: "job-ready-python-dev" },
  { id: "e-doc-cap3", from: "prod-docker-containers", to: "job-ready-backend-fastapi" },
  { id: "e-doc-cap4", from: "prod-docker-containers", to: "job-ready-devops-qa" },

  // Final Job Ready Milestones to Portfolio
  { id: "e-cap1-port", from: "job-ready-python-dev", to: "career-portfolio-milestone" },
  { id: "e-cap2-port", from: "job-ready-data-ai", to: "career-portfolio-milestone" },
  { id: "e-cap3-port", from: "job-ready-backend-fastapi", to: "career-portfolio-milestone" },
  { id: "e-cap4-port", from: "job-ready-devops-qa", to: "career-portfolio-milestone" },
];

