// src/data/roadmap/roles.ts
import type { CareerRole } from "@/types";

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "python-dev",
    title: "Python Developer",
    shortTitle: "Python Dev",
    headline: "Generalist Software Engineer building tools, CLI apps, and backend services.",
    description: "Master clean core Python, OOP patterns, package publishing, database access, CLI tooling, and foundational API development.",
    icon: "🐍",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing",
      "13-iterators-generators", "14-decorators", "15-context-managers", "16-typing", "17-git-github",
      "spec-sql-databases", "spec-http-rest", "spec-fastapi",
      "prod-docker-containers", "job-ready-python-dev", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "CLI Task Manager", description: "Rich terminal app with subcommands, local SQLite storage, and color formatting.", difficulty: "beginner", skills: ["CLI", "SQLite", "argparse"] },
      { title: "Automated File Organizer", description: "Background filesystem watcher that parses extensions and archives documents.", difficulty: "beginner", skills: ["pathlib", "os", "automation"] },
      { title: "RESTful Inventory API", description: "FastAPI CRUD service with SQLite/PostgreSQL, Pydantic validation, and pytest suite.", difficulty: "intermediate", skills: ["FastAPI", "SQLAlchemy", "pytest"] },
      { title: "Production Python Package", description: "PyPI package published with pyproject.toml, GitHub Actions CI/CD, and 100% test coverage.", difficulty: "intermediate", skills: ["Packaging", "CI/CD", "Testing"] }
    ],
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    shortTitle: "Backend",
    headline: "Build high-throughput APIs, database schemas, and microservice architectures.",
    description: "Specialize in HTTP/REST protocols, PostgreSQL schema design, SQLAlchemy ORM, JWT authentication, Redis caching, and async backends.",
    icon: "⚡",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing",
      "13-iterators-generators", "14-decorators", "15-context-managers", "16-typing", "17-git-github",
      "spec-sql-databases", "spec-http-rest", "spec-fastapi", "spec-pydantic-auth",
      "prod-async-python", "prod-docker-containers", "prod-caching-redis", "prod-api-security-jwt",
      "job-ready-backend-fastapi", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "E-Commerce REST API", description: "Multi-tenant ordering API with JWT authentication, Stripe payments, and PostgreSQL transactions.", difficulty: "intermediate", skills: ["FastAPI", "PostgreSQL", "JWT"] },
      { title: "Distributed Task Queue", description: "Async worker service processing background video transformations using Redis and Celery.", difficulty: "advanced", skills: ["Redis", "Asyncio", "Docker"] },
      { title: "Real-time Notification Service", description: "WebSocket and SSE backend pushing live updates to tens of thousands of active connections.", difficulty: "advanced", skills: ["WebSockets", "FastAPI", "ASGI"] }
    ],
  },
  {
    id: "fastapi-dev",
    title: "FastAPI Developer",
    shortTitle: "FastAPI",
    headline: "Build modern, ultra-fast asynchronous Python APIs and microservices.",
    description: "Deep-dive into Pydantic V2 schemas, FastAPI dependency injection (`Depends`), async database pooling, and automated OpenAPI documentation.",
    icon: "🚀",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing",
      "13-iterators-generators", "14-decorators", "15-context-managers", "16-typing", "17-git-github",
      "spec-http-rest", "spec-fastapi", "spec-pydantic-auth", "spec-sql-databases",
      "prod-async-python", "prod-docker-containers", "prod-api-security-jwt",
      "job-ready-backend-fastapi", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "Async High-Throughput API", description: "FastAPI microservice handling 10k requests/sec with asyncpg connection pooling.", difficulty: "advanced", skills: ["FastAPI", "asyncpg", "Uvicorn"] },
      { title: "Production Auth & RBAC Service", description: "OAuth2 password bearer authentication with refresh tokens, password hashing, and role scopes.", difficulty: "intermediate", skills: ["OAuth2", "JWT", "Pydantic"] }
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    shortTitle: "Data Analyst",
    headline: "Transform messy raw datasets into actionable business intelligence & visual dashboards.",
    description: "Master NumPy, Pandas data wrangling, exploratory data analysis (EDA), SQL queries, statistical measures, and data visualization.",
    icon: "📊",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "17-git-github",
      "spec-numpy", "spec-pandas", "spec-eda-stats", "spec-data-viz", "spec-sql-databases",
      "job-ready-data-ai", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "E-Commerce Customer Insights", description: "Comprehensive analysis of 500k transactions identifying churn segments and lifetime values.", difficulty: "intermediate", skills: ["Pandas", "Seaborn", "SQL"] },
      { title: "Interactive Business Dashboard", description: "Executive dashboard visualizing revenue trends, cohort retention, and regional metrics.", difficulty: "intermediate", skills: ["Matplotlib", "Streamlit", "EDA"] }
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    shortTitle: "Data Scientist",
    headline: "Build predictive models, statistical experiments, and machine learning pipelines.",
    description: "Combine rigorous statistics, feature engineering, and Scikit-Learn machine learning algorithms to uncover predictive patterns in complex data.",
    icon: "🔬",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "16-typing", "17-git-github",
      "spec-numpy", "spec-pandas", "spec-eda-stats", "spec-data-viz", "spec-scikit-learn",
      "prod-docker-containers", "job-ready-data-ai", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "Customer Churn Prediction", description: "End-to-end ML model using gradient boosting with cross-validation and SHAP interpretability.", difficulty: "intermediate", skills: ["Scikit-Learn", "Feature Engineering", "SHAP"] },
      { title: "Real Estate Valuation Model", description: "Multi-variable regression model with automated data cleaning pipeline and outlier detection.", difficulty: "intermediate", skills: ["Pandas", "Regression", "Evaluation"] }
    ],
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    shortTitle: "ML Engineer",
    headline: "Take machine learning models from prototype to scalable production serving.",
    description: "Bridge data science and software engineering with PyTorch model training, FastAPI low-latency inference endpoints, Docker containers, and MLOps pipelines.",
    icon: "🤖",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing", "16-typing", "17-git-github",
      "spec-numpy", "spec-pandas", "spec-scikit-learn", "spec-deep-learning", "spec-fastapi",
      "prod-docker-containers", "prod-mlops-serving", "job-ready-data-ai", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "Real-Time Fraud Detection API", description: "Sub-10ms inference API running optimized ONNX models inside containerized FastAPI services.", difficulty: "advanced", skills: ["FastAPI", "ONNX", "Docker"] },
      { title: "Automated Training Pipeline", description: "Reproducible MLOps pipeline tracking model artifacts, dataset versions, and drift metrics.", difficulty: "advanced", skills: ["MLflow", "PyTorch", "Docker"] }
    ],
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    shortTitle: "AI Engineer",
    headline: "Build LLM applications, retrieval augmented generation (RAG), and autonomous AI agents.",
    description: "Harness modern AI: embedding models, vector databases, prompt engineering, RAG pipelines, tool-calling agents, and production LLM evaluation.",
    icon: "🧠",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing", "16-typing", "17-git-github",
      "spec-numpy", "spec-deep-learning", "spec-llms-rag", "spec-ai-agents", "spec-fastapi",
      "prod-async-python", "prod-docker-containers", "job-ready-data-ai", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "Enterprise RAG Document Q&A", description: "Production RAG service using hybrid vector search, chunking strategies, and re-ranking.", difficulty: "advanced", skills: ["Vector DB", "Embeddings", "RAG"] },
      { title: "Multi-Agent Research Assistant", description: "Autonomous agent system equipped with web search, code execution, and structured reasoning.", difficulty: "advanced", skills: ["Tool Calling", "Agents", "FastAPI"] }
    ],
  },
  {
    id: "automation-engineer",
    title: "Automation Engineer",
    shortTitle: "Automation",
    headline: "Eliminate manual work with scrapers, scheduled scripts, and automated workflows.",
    description: "Master filesystem automation with `pathlib`, web scraping with `BeautifulSoup`/`Requests`, Excel/PDF manipulation, and cron job scheduling.",
    icon: "⚙️",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing", "17-git-github",
      "spec-automation", "spec-web-scraping", "spec-linux-shell",
      "job-ready-python-dev", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "Intelligent Web Scraper", description: "Resilient multi-threaded scraper extracting real-time pricing data with proxy rotation.", difficulty: "intermediate", skills: ["Requests", "BeautifulSoup", "Regex"] },
      { title: "Automated Invoice & PDF Processor", description: "Batch processor extracting table data from thousands of PDF invoices into structured CSVs.", difficulty: "intermediate", skills: ["pypdf", "openpyxl", "pathlib"] }
    ],
  },
  {
    id: "qa-sdet",
    title: "QA / SDET (Software Development Engineer in Test)",
    shortTitle: "QA / SDET",
    headline: "Design robust automated testing frameworks and CI verification pipelines.",
    description: "Master unit, integration, and end-to-end testing with pytest, custom test fixtures, API mocks, Playwright web automation, and CI pipelines.",
    icon: "🧪",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing", "16-typing", "17-git-github",
      "spec-pytest-fixtures", "spec-api-automation", "spec-playwright",
      "prod-cicd-github-actions", "job-ready-devops-qa", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "Enterprise API Test Framework", description: "Scalable test harness using pytest, parameterized test suites, and automated HTML reporting.", difficulty: "intermediate", skills: ["pytest", "Fixtures", "Allure"] },
      { title: "E2E Web Automation Suite", description: "Cross-browser test suite simulating user checkout flows using Playwright and Page Object Model.", difficulty: "advanced", skills: ["Playwright", "POM", "CI/CD"] }
    ],
  },
  {
    id: "devops-platform",
    title: "DevOps / Platform Engineer",
    shortTitle: "DevOps",
    headline: "Build cloud infrastructure tooling, deployment CLIs, and monitoring systems.",
    description: "Harness Python for infrastructure as code, container management, Linux system administration, GitHub Actions automation, and log monitoring.",
    icon: "☁️",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing", "17-git-github",
      "spec-linux-shell", "spec-automation",
      "prod-docker-containers", "prod-cicd-github-actions",
      "job-ready-devops-qa", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "Cloud Deployment CLI", description: "Command-line tool provisioning isolated cloud environments and validating health checks.", difficulty: "intermediate", skills: ["Click", "subprocess", "Docker"] },
      { title: "Real-Time System Log Monitor", description: "Daemon process streaming server logs, detecting anomaly spikes, and dispatching Slack alerts.", difficulty: "advanced", skills: ["os", "asyncio", "Webhooks"] }
    ],
  },
  {
    id: "fullstack-python",
    title: "Full Stack Python Developer",
    shortTitle: "Full Stack",
    headline: "Build complete end-to-end applications from database models to frontend UIs.",
    description: "Combine FastAPI backend APIs, PostgreSQL, and authentication with modern React / Next.js frontend interfaces.",
    icon: "🌐",
    nodeIds: [
      "00-setup", "01-syntax", "02-variables-types", "03-operators", "04-control-flow",
      "05-functions", "06-data-structures", "07-strings-regex", "08-file-handling",
      "09-exceptions", "10-modules-packages", "11-oop", "12-testing", "16-typing", "17-git-github",
      "spec-sql-databases", "spec-http-rest", "spec-fastapi", "spec-pydantic-auth", "spec-fullstack-frontend",
      "prod-docker-containers", "job-ready-backend-fastapi", "career-portfolio-milestone"
    ],
    capstoneProjects: [
      { title: "Full Stack SaaS Application", description: "Complete web app with FastAPI REST backend, Next.js frontend, Stripe billing, and PostgreSQL.", difficulty: "advanced", skills: ["FastAPI", "Next.js", "PostgreSQL"] },
      { title: "Collaborative Project Board", description: "Real-time task tracking board with drag-and-drop UI, WebSocket updates, and team permissions.", difficulty: "advanced", skills: ["WebSockets", "React", "SQLAlchemy"] }
    ],
  },
];

