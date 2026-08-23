// src/data/roadmap/projects.ts
import type { CapstoneProject, CareerRoleId } from "@/types";

export interface RoleProjectItem extends CapstoneProject {
  id: string;
  roleId: CareerRoleId;
  roleTitle: string;
}

export const CAPSTONE_PROJECTS: RoleProjectItem[] = [
  // Python Developer
  {
    id: "proj-cli-task",
    roleId: "python-dev",
    roleTitle: "Python Developer",
    title: "CLI Task Manager & Organizer",
    description: "Full-featured terminal task organizer with SQLite database, colored output, subcommands, and config files.",
    difficulty: "beginner",
    skills: ["argparse", "sqlite3", "pathlib", "pytest"],
  },
  {
    id: "proj-file-organizer",
    roleId: "python-dev",
    roleTitle: "Python Developer",
    title: "Autonomous File Organizer",
    description: "Daemon service watching download directories, parsing metadata, extracting archives, and categorizing files.",
    difficulty: "beginner",
    skills: ["pathlib", "os", "watchdog", "shutil"],
  },
  // Backend & FastAPI
  {
    id: "proj-ecommerce-api",
    roleId: "backend-dev",
    roleTitle: "Backend Developer",
    title: "Production E-Commerce Backend",
    description: "High-concurrency FastAPI service with PostgreSQL transactions, JWT auth, Stripe webhooks, and Redis caching.",
    difficulty: "advanced",
    skills: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "JWT"],
  },
  {
    id: "proj-auth-rbac",
    roleId: "fastapi-dev",
    roleTitle: "FastAPI Developer",
    title: "OAuth2 & RBAC Auth Microservice",
    description: "Stateless authentication service with refresh token rotation, bcrypt password hashing, and role-based permissions.",
    difficulty: "intermediate",
    skills: ["FastAPI", "OAuth2", "Pydantic", "Pytest"],
  },
  // Data Analyst & Scientist
  {
    id: "proj-sales-insights",
    roleId: "data-analyst",
    roleTitle: "Data Analyst",
    title: "E-Commerce Revenue & Cohort Insights",
    description: "Large-scale exploratory data analysis and interactive dashboard identifying churn segments and revenue drivers.",
    difficulty: "intermediate",
    skills: ["Pandas", "NumPy", "Seaborn", "Streamlit"],
  },
  {
    id: "proj-churn-model",
    roleId: "data-scientist",
    roleTitle: "Data Scientist",
    title: "Customer Churn Prediction Model",
    description: "Machine learning classifier with automated feature engineering, cross-validation, and SHAP model explainability.",
    difficulty: "intermediate",
    skills: ["Scikit-Learn", "Feature Engineering", "SHAP", "EDA"],
  },
  // ML & AI Engineer
  {
    id: "proj-ml-inference-api",
    roleId: "ml-engineer",
    roleTitle: "ML Engineer",
    title: "Low-Latency ML Inference API",
    description: "Production model serving pipeline with ONNX runtime, batched predictions, and Docker containerization.",
    difficulty: "advanced",
    skills: ["FastAPI", "ONNX", "Docker", "PyTorch"],
  },
  {
    id: "proj-rag-document-qa",
    roleId: "ai-engineer",
    roleTitle: "AI Engineer",
    title: "Enterprise RAG Intelligence System",
    description: "Multi-document question-answering system with hybrid vector search, semantic re-ranking, and streaming responses.",
    difficulty: "advanced",
    skills: ["Vector DB", "Embeddings", "RAG", "LLMs", "FastAPI"],
  },
  // Automation & QA
  {
    id: "proj-web-scraper-bot",
    roleId: "automation-engineer",
    roleTitle: "Automation Engineer",
    title: "Resilient Multi-Threaded Web Scraper",
    description: "High-speed scraping engine extracting live pricing data with proxy rotation, rate-limiting, and CSV export.",
    difficulty: "intermediate",
    skills: ["Requests", "BeautifulSoup", "ThreadPoolExecutor", "CSV"],
  },
  {
    id: "proj-qa-framework",
    roleId: "qa-sdet",
    roleTitle: "QA / SDET",
    title: "Enterprise Test Automation Framework",
    description: "Unified API & Web test automation framework with pytest, Playwright, CI GitHub Actions, and HTML reporting.",
    difficulty: "advanced",
    skills: ["pytest", "Playwright", "GitHub Actions", "Allure"],
  },
  // DevOps & Full Stack
  {
    id: "proj-devops-cli",
    roleId: "devops-platform",
    roleTitle: "DevOps Engineer",
    title: "Cloud Infrastructure Deployment CLI",
    description: "Automated provisioning CLI validating health checks, deploying Docker containers, and managing SSL certificates.",
    difficulty: "advanced",
    skills: ["Click", "Docker", "subprocess", "AWS/Cloud"],
  },
  {
    id: "proj-fullstack-saas",
    roleId: "fullstack-python",
    roleTitle: "Full Stack Python",
    title: "Full Stack SaaS Project Management App",
    description: "Complete modern web app: FastAPI REST backend, PostgreSQL, Next.js React frontend, and WebSocket updates.",
    difficulty: "advanced",
    skills: ["FastAPI", "Next.js", "React", "PostgreSQL", "Tailwind"],
  },
];

