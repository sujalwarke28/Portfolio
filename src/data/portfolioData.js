export const personalInfo = {
  name: "Sujal Warke",
  handle: "sujalwarke",
  role: "Full-Stack Architect & Software Systems Engineer",
  tagline: "Building high-throughput web applications, distributed cloud microservices, and AI-driven interactive experiences.",
  location: "Silicon Valley / Remote",
  status: "Available for High-Impact Roles & Consulting",
  availability: "🟢 Active for Full-Time / Lead Contracts",
  experienceYears: 4,
  coffeeConverted: "1,450+ Liters",
  commitsThisYear: "3,482",
  uptime: "99.99%",
  avgLatency: "14ms",
  bio: "Passionate software engineer focused on robust software design, low-latency API architecture, beautiful user interfaces, and automated cloud deployments. I bridge the gap between high-level UI elegance and low-level system efficiency.",
};

export const metricsHUD = [
  { label: "Code Commits", value: "3,482+", change: "+18% this month", icon: "GitCommit" },
  { label: "System Uptime", value: "99.99%", change: "Zero Downtime", icon: "ShieldCheck" },
  { label: "Avg API Response", value: "14ms", change: "-4ms optimization", icon: "Zap" },
  { label: "Build Pipeline Speed", value: "42s", change: "Parallelized", icon: "Cpu" },
];

export const skillCategories = [
  {
    id: "languages",
    name: "Languages & Core",
    icon: "Code2",
    color: "#38bdf8",
    skills: [
      { name: "TypeScript", level: 96, exp: "4 yrs", mastery: "Expert", description: "Strict typing, generics, AST transformations & full-stack integration", benchmark: "100% Type Safety" },
      { name: "JavaScript (ESNext)", level: 98, exp: "5 yrs", mastery: "Master", description: "V8 engine mechanics, event loop optimization, async patterns", benchmark: "High Throughput" },
      { name: "Go (Golang)", level: 88, exp: "2.5 yrs", mastery: "Advanced", description: "Goroutines, channels, gRPC services, microservice architectures", benchmark: "2.1k req/sec" },
      { name: "Python", level: 90, exp: "4 yrs", mastery: "Advanced", description: "FastAPI, PyTorch model deployment, data processing scripts", benchmark: "Async Engine" },
      { name: "Rust", level: 78, exp: "1.5 yrs", mastery: "Intermediate", description: "Memory safety, memory borrowing, WebAssembly modules, CLI tools", benchmark: "Zero-Cost Abstractions" },
      { name: "SQL & Relational", level: 92, exp: "4 yrs", mastery: "Expert", description: "Query indexing, query plan analysis, ACID transactions", benchmark: "Sub-millisecond index hits" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & UI/UX",
    icon: "Layout",
    color: "#a855f7",
    skills: [
      { name: "React 19 & Next.js", level: 96, exp: "4 yrs", mastery: "Master", description: "Server Components, hooks, custom state engines, concurrent mode", benchmark: "60 FPS Render" },
      { name: "HTML5 Canvas & WebGL", level: 86, exp: "2 yrs", mastery: "Advanced", description: "Hardware-accelerated particle physics, shader math, 60fps renders", benchmark: "10k particles @ 60fps" },
      { name: "CSS Design Systems", level: 95, exp: "5 yrs", mastery: "Master", description: "Modern CSS grid/flexbox, custom animation engines, glassmorphism", benchmark: "Pixel Perfect" },
      { name: "Tailwind & Utility CSS", level: 94, exp: "3.5 yrs", mastery: "Expert", description: "Component tokens, responsive designs, dark/light themes", benchmark: "Minimal CSS Bundle" },
      { name: "State Management", level: 92, exp: "4 yrs", mastery: "Expert", description: "Zustand, Redux Toolkit, Context, signals, atomic state", benchmark: "Zero re-render leaks" },
      { name: "Web Audio API", level: 82, exp: "2 yrs", mastery: "Advanced", description: "Real-time sound synthesis, gain nodes, spatial sound effects", benchmark: "Sub-5ms Audio Latency" },
    ],
  },
  {
    id: "backend",
    name: "Backend & Systems",
    icon: "Server",
    color: "#22c55e",
    skills: [
      { name: "Node.js & Express", level: 95, exp: "4.5 yrs", mastery: "Master", description: "Stream processing, cluster mode, event-driven architectures", benchmark: "18k req/sec" },
      { name: "GraphQL & REST APIs", level: 92, exp: "4 yrs", mastery: "Expert", description: "Schema design, dataloader batching, OpenAPI specifications", benchmark: "N+1 Problem Solved" },
      { name: "gRPC & Protocol Buffers", level: 84, exp: "2 yrs", mastery: "Advanced", description: "Bi-directional streaming, binary serialization, low payload size", benchmark: "5x smaller than JSON" },
      { name: "Redis Caching", level: 90, exp: "3 yrs", mastery: "Expert", description: "Pub/Sub streams, memory cache strategies, distributed locks", benchmark: "0.8ms Read Latency" },
      { name: "PostgreSQL & Prisma", level: 92, exp: "4 yrs", mastery: "Expert", description: "Complex joins, migration pipelines, Connection pooling", benchmark: "P99 < 8ms" },
      { name: "Kafka & Message Queues", level: 82, exp: "2 yrs", mastery: "Advanced", description: "Event streaming, topic partitions, backpressure handling", benchmark: "50k msg/sec throughput" },
    ],
  },
  {
    id: "cloud",
    name: "DevOps & Cloud",
    icon: "Cloud",
    color: "#f59e0b",
    skills: [
      { name: "Docker & Containerization", level: 94, exp: "3.5 yrs", mastery: "Expert", description: "Multi-stage builds, minimal image footprints, layer caching", benchmark: "Alpine 18MB Images" },
      { name: "Kubernetes & Orchestration", level: 82, exp: "2 yrs", mastery: "Advanced", description: "Deployment specs, ingress controllers, autoscaling HPA", benchmark: "Zero-Downtime Rolling Deploy" },
      { name: "GitHub Actions CI/CD", level: 95, exp: "3.5 yrs", mastery: "Expert", description: "Automated linting, matrix testing, Docker hub push, deployment triggers", benchmark: "Full CI in < 45s" },
      { name: "AWS & Cloud Infrastructure", level: 86, exp: "3 yrs", mastery: "Advanced", description: "S3, EC2, Lambda Serverless, CloudFront CDN, IAM security", benchmark: "Multi-Region Edge" },
      { name: "Terraform & IaC", level: 80, exp: "1.5 yrs", mastery: "Intermediate", description: "Declarative infrastructure, state management, module creation", benchmark: "Repeatable Provisioning" },
      { name: "Linux Administration", level: 90, exp: "4 yrs", mastery: "Expert", description: "Bash scripting, systemctl, network sockets, SSH hardening", benchmark: "Server Hardened" },
    ],
  },
  {
    id: "ai",
    name: "AI & Modern Tools",
    icon: "Cpu",
    color: "#ec4899",
    skills: [
      { name: "LLM Orchestration & OpenAI", level: 88, exp: "2 yrs", mastery: "Advanced", description: "Function calling, prompt engineering, structured JSON outputs", benchmark: "Real-time Stream" },
      { name: "Vector DBs (Pinecone/Chroma)", level: 85, exp: "1.5 yrs", mastery: "Advanced", description: "Semantic search, RAG pipelines, cosine similarity matching", benchmark: "< 30ms Vector Search" },
      { name: "Git & Version Control", level: 98, exp: "5 yrs", mastery: "Master", description: "Interactive rebase, cherry-pick, conflict resolution, bisect", benchmark: "Clean Git History" },
      { name: "Jest / Vitest / Playwright", level: 90, exp: "3.5 yrs", mastery: "Expert", description: "Unit tests, integration pipelines, E2E browser automation", benchmark: "94% Code Coverage" },
    ],
  },
];

export const benchmarkBattles = [
  {
    title: "Payload Serialization Speed & Size",
    candidateA: { name: "JSON over REST", speed: "14.2 ms", size: "2.4 KB", throughput: "4,200 req/s", rating: "Standard" },
    candidateB: { name: "Protobuf over gRPC", speed: "2.1 ms", size: "0.4 KB", throughput: "19,500 req/s", rating: "Blazing Fast ⚡" },
    verdict: "Protobuf is ~7x faster with 83% smaller network bandwidth overhead.",
  },
  {
    title: "Database Query Retrieval Strategy",
    candidateA: { name: "Unindexed Sequential Scan", speed: "240 ms", size: "Full Table Scan", throughput: "45 req/s", rating: "Slow ⚠️" },
    candidateB: { name: "B-Tree Indexed Lookup + Redis Cache", speed: "0.9 ms", size: "Index Pointer", throughput: "12,000 req/s", rating: "Instant 🚀" },
    verdict: "Composite indexing + Redis hot cache reduces DB load by 99.6%.",
  },
];

export const sprintTasks = [
  { id: "TASK-101", title: "Migrate Auth Service to Go gRPC for sub-5ms token verification", priority: "HIGH", tag: "Backend", status: "DONE" },
  { id: "TASK-102", title: "Implement WebGL 60FPS particle galaxy for skill matrix UI", priority: "URGENT", tag: "Frontend", status: "IN_PROGRESS" },
  { id: "TASK-103", title: "Configure Kubernetes HPA to auto-scale on 80% CPU threshold", priority: "MEDIUM", tag: "DevOps", status: "IN_REVIEW" },
  { id: "TASK-104", title: "Integrate vector embeddings for AI natural language search", priority: "HIGH", tag: "AI/ML", status: "BACKLOG" },
  { id: "TASK-105", title: "Setup Prometheus & Grafana alerting metrics dashboard", priority: "MEDIUM", tag: "DevOps", status: "DONE" },
];

export const ideFiles = [
  {
    name: "server.js",
    language: "javascript",
    icon: "FileCode",
    code: `// High-Performance Event-Driven API Server
import express from 'express';
import { createClient } from 'redis';

const app = express();
const redis = createClient({ url: process.env.REDIS_URL });

app.get('/api/v1/health', async (req, res) => {
  const start = performance.now();
  const cachedData = await redis.get('system:health');
  
  if (cachedData) {
    return res.json({ status: 'OK', cached: true, latencyMs: (performance.now() - start).toFixed(2) });
  }

  const payload = { status: 'OK', timestamp: Date.now(), uptime: process.uptime() };
  await redis.setEx('system:health', 30, JSON.stringify(payload));
  return res.json({ ...payload, cached: false, latencyMs: (performance.now() - start).toFixed(2) });
});

app.listen(8080, () => console.log('🚀 Server listening on port 8080'));`,
    output: `[SYSTEM LOG] Server compiled successfully in 12ms.
[REDIS] Connected to redis://cluster.internal:6379 (Ping: 0.4ms)
[HTTP] Listening on http://0.0.0.0:8080
GET /api/v1/health -> 200 OK (Cache HIT: 0.82ms)`
  },
  {
    name: "worker.go",
    language: "go",
    icon: "FileCode",
    code: `package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Job struct {
	ID    int
	Data  string
}

func Worker(id int, jobs <-chan Job, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()
	for job := range jobs {
		time.Sleep(10 * time.Millisecond) // Simulate work
		results <- fmt.Sprintf("Worker #%d processed Job #%d [%s]", id, job.ID, job.Data)
	}
}

func main() {
	jobs := make(chan Job, 100)
	results := make(chan string, 100)
	var wg sync.WaitGroup

	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go Worker(w, jobs, results, &wg)
	}

	for j := 1; j <= 5; j++ {
		jobs <- Job{ID: j, Data: "Payload stream"}
	}
	close(jobs)

	wg.Wait()
	close(results)

	for res := range results {
		fmt.Println(res)
	}
}`,
    output: `Worker #1 processed Job #1 [Payload stream]
Worker #2 processed Job #2 [Payload stream]
Worker #3 processed Job #3 [Payload stream]
Worker #1 processed Job #4 [Payload stream]
Worker #2 processed Job #5 [Payload stream]
[SUCCESS] 5 goroutines executed concurrently in 20.4ms.`
  },
  {
    name: "pipeline.yml",
    language: "yaml",
    icon: "FileText",
    code: `name: High-Speed Production CI/CD
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js & Go
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run Automated Unit Tests
        run: npm test -- --coverage

      - name: Build Docker Container
        run: docker build -t sujalwarke/api-service:v2.4 .

      - name: Deploy to Kubernetes Cluster
        run: kubectl rollout restart deployment/api-service-deployment`,
    output: `[CI/CD Engine] Triggered by push to main.
✓ Action: Checkout Repository (1.2s)
✓ Action: Setup Node.js & Go (2.4s)
✓ Action: Run Automated Unit Tests (14.1s) - 100% Passed
✓ Action: Build Docker Container (18.6s) - Image size: 24MB
✓ Action: Deploy to Kubernetes Cluster (4.2s) - Rolling update finished cleanly!
Status: SUCCESS 🚀`
  }
];

export const gitBranchHistory = [
  { hash: "a9f82d1", msg: "feat(auth): Add zero-trust JWT key rotation mechanism", branch: "main", author: "Sujal Warke", time: "2 hours ago" },
  { hash: "7c31e4b", msg: "perf(ui): Optimize WebGL renderer to 60fps with frame clamping", branch: "main", author: "Sujal Warke", time: "5 hours ago" },
  { hash: "b49e102", msg: "ci(github): Parallelize unit test matrix across 4 runners", branch: "feat/ci-speedup", author: "Sujal Warke", time: "1 day ago" },
  { hash: "5e201a9", msg: "fix(db): Add composite index on (tenant_id, created_at)", branch: "main", author: "Sujal Warke", time: "2 days ago" },
  { hash: "3d19f8c", msg: "refactor(api): Replace REST endpoint with gRPC bi-directional stream", branch: "main", author: "Sujal Warke", time: "3 days ago" }
];

export const prReviewSnippet = {
  title: "PR #142: Low-Latency Redis Pub/Sub Stream Engine",
  author: "Sujal Warke",
  status: "APPROVED & MERGED",
  diff: [
    { type: "removed", line: 42, text: "-  const result = await db.query('SELECT * FROM audit_logs WHERE user_id = $1', [userId]);" },
    { type: "added", line: 42, text: "+  const cached = await redis.get(`audit:${userId}`);" },
    { type: "added", line: 43, text: "+  if (cached) return JSON.parse(cached); // Sub-ms hot path cache hit" },
    { type: "added", line: 44, text: "+  const result = await db.query('SELECT * FROM audit_logs WHERE user_id = $1', [userId]);" },
    { type: "added", line: 45, text: "+  await redis.setEx(`audit:${userId}`, 300, JSON.stringify(result.rows));" }
  ],
  comments: [
    { user: "TechLead", avatar: "👨‍💻", comment: "Great change! This drops DB response time from 120ms to 0.9ms on repeated profile reads. Clean code!" }
  ]
};

export const cicdPipelineSteps = [
  { id: 1, name: "Lint & Format", cmd: "eslint --ext .js,.ts src/", duration: "3s", status: "success", detail: "0 errors, 0 warnings found." },
  { id: 2, name: "Unit & Integration Tests", cmd: "vitest run --coverage", duration: "12s", status: "success", detail: "48/48 tests passed (100% coverage)." },
  { id: 3, name: "Security Vulnerability Audit", cmd: "trivy image scan", duration: "5s", status: "success", detail: "0 critical CVE vulnerabilities." },
  { id: 4, name: "Multi-Stage Docker Build", cmd: "docker build --target release", duration: "18s", status: "success", detail: "Built slim container image (24.2 MB)." },
  { id: 5, name: "Kubernetes Rolling Deploy", cmd: "kubectl apply -f k8s/", duration: "6s", status: "success", detail: "3/3 pods updated with 0 downtime." }
];

export const systemArchitectureNodes = [
  { id: "client", label: "Client Browser / App", type: "frontend", icon: "Smartphone", status: "Online", latency: "12ms" },
  { id: "cdn", label: "Cloudflare Edge CDN", type: "edge", icon: "Globe", status: "Active", latency: "2ms" },
  { id: "gateway", label: "NGINX API Gateway", type: "gateway", icon: "Shield", status: "Active", latency: "1.4ms" },
  { id: "auth", label: "Auth Microservice (Go)", type: "service", icon: "Lock", status: "Active", latency: "2.1ms" },
  { id: "core", label: "Core API Engine (Node/TypeScript)", type: "service", icon: "Cpu", status: "Active", latency: "4.8ms" },
  { id: "ai", label: "AI Model Engine (Python)", type: "service", icon: "Brain", status: "Active", latency: "18ms" },
  { id: "redis", label: "Redis In-Memory Cache", type: "db", icon: "Zap", status: "Active", latency: "0.6ms" },
  { id: "postgres", label: "PostgreSQL Database Cluster", type: "db", icon: "Database", status: "Active", latency: "3.2ms" },
  { id: "kafka", label: "Kafka Async Event Bus", type: "queue", icon: "Layers", status: "Active", latency: "1.1ms" }
];

export const incidentDashboardData = {
  incidentName: "High Memory Warning on Pod #04",
  status: "RESOLVED AUTOMATICALLY",
  cpuUsage: "42%",
  memoryUsage: "68%",
  errorRate: "0.01%",
  logs: [
    { time: "14:22:01", level: "WARN", msg: "Heap memory usage reached 78% on pod-api-7b89" },
    { time: "14:22:03", level: "INFO", msg: "Triggering garbage collection sweep..." },
    { time: "14:22:05", level: "ACTION", msg: "HPA spun up duplicate worker node pod-api-7b90" },
    { time: "14:22:08", level: "SUCCESS", msg: "Traffic balanced. Memory stabilized back to 42%." }
  ]
};

export const featuredProjects = [
  {
    id: "titanminds-factory",
    title: "Titanminds: IoT Based Factory Management System",
    category: "IoT & Industrial Systems",
    description: "Comprehensive IoT-based industrial factory management system built for real-time telemetry monitoring, machine health sensors, production scheduling, and automated maintenance alert dispatch.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    tags: ["IoT Telemetry", "React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    metrics: { efficiency: "+34%", uptime: "99.9%", latency: "18ms" },
    architecture: "IoT Sensors → Express Backend (Render) → PostgreSQL Cluster → React Dashboard",
    codeSnippet: `// Factory Machine Telemetry & Maintenance Queue Dispatcher
export async function scheduleMachineMaintenance(machineId, telemetryData) {
  if (telemetryData.temperature > 85.0 || telemetryData.vibrationIndex > 7.5) {
    const ticket = await db.query(
      'INSERT INTO maintenance_tickets (machine_id, status, priority, triggered_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [machineId, 'URGENT', 'CRITICAL']
    );
    await dispatchAlertNotification(ticket.rows[0]);
    return ticket.rows[0];
  }
}`,
    demoUrl: "https://titanminds-backend.onrender.com/",
    githubUrl: "https://github.com/sujalwarke28/Titanminds-Factory-Management-System",
  },
  {
    id: "reom-co",
    title: "ReOm.Co: Retail Operations Management System",
    category: "Enterprise Retail Operations",
    description: "All-in-one retail operations management suite streamlining point-of-sale (POS) transactions, multi-store stock synchronization, supplier ordering pipelines, and analytics telemetry.",
    image: "https://images.unsplash.com/photo-1556742049-0a67e5720f6e?auto=format&fit=crop&w=800&q=80",
    tags: ["TypeScript", "Next.js", "GraphQL", "Redis", "Prisma ORM", "Docker"],
    metrics: { posSync: "Sub-second", storeSync: "100%", reqPerSec: "12.4k" },
    architecture: "Next.js POS App → GraphQL Gateway → Redis Caching Layer → Prisma ORM → PostgreSQL",
    codeSnippet: `// Multi-Store Inventory Delta Synchronization Handler
export async function syncStoreInventoryDelta(storeId, itemSkus) {
  const cacheKey = \`inventory:store:\${storeId}\`;
  const cachedInventory = await redis.get(cacheKey);
  
  if (cachedInventory) {
    const parsed = JSON.parse(cachedInventory);
    return calculateInventoryDelta(parsed, itemSkus);
  }

  const liveStoreData = await prisma.inventory.findMany({ where: { storeId } });
  await redis.setex(cacheKey, 60, JSON.stringify(liveStoreData));
  return liveStoreData;
}`,
    demoUrl: "https://github.com/sujalwarke28/ReOm.Co",
    githubUrl: "https://github.com/sujalwarke28/ReOm.Co",
  },
];

export const gitContributionData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (364 - i));
  const count = Math.floor(Math.random() * 12);
  let level = 0;
  if (count > 0) level = 1;
  if (count > 3) level = 2;
  if (count > 6) level = 3;
  if (count > 9) level = 4;
  return {
    date: date.toISOString().split("T")[0],
    count,
    level,
  };
});

export const terminalCommands = {
  help: `Available Commands:
  - skills       : Print full technical skill matrix
  - projects     : Display key software architecture projects
  - experience   : View work experience and system achievements
  - contact      : Show direct contact methods
  - matrix       : Toggle matrix digital rain effect
  - sudo hire    : Trigger instant contact highlight popup!
  - clear        : Clear terminal output
  - echo [text]  : Echo text to screen`,

  skills: `[SKILL MATRIX SUMMARY]
  • Languages: TypeScript (96%), JavaScript (98%), Go (88%), Python (90%), Rust (78%), SQL (92%)
  • Frontend: React 19, Next.js, HTML5 Canvas/WebGL, CSS Tokens, Tailwind, Zustand
  • Backend: Node.js, Express, Go gRPC, Redis Streams, PostgreSQL, GraphQL, Kafka
  • DevOps: Docker Containers, Kubernetes K8s, GitHub Actions CI/CD, AWS, Linux Admin`,

  projects: `[FEATURED REPOSITORIES]
  1. Titanminds Factory Management System (https://github.com/sujalwarke28/Titanminds-Factory-Management-System)
  2. ReOm.Co: Retail Operations Management System (https://github.com/sujalwarke28/ReOm.Co)`,

  experience: `[EXPERIENCE & IMPACT]
  • Senior Software Engineer | Distributed Systems & Web (2022 - Present)
    - Architected microservices serving 1.2M daily active requests with 99.99% SLA.
    - Reduced API response p99 from 140ms to 14ms using Redis hot caching & gRPC streaming.
  • Full-Stack Engineer | Cloud Systems (2020 - 2022)
    - Designed real-time visualizers, CI/CD pipeline automation, and React performance engines.`,

  contact: `[DIRECT CONTACT]
  • Email: sujalwarke.dev@gmail.com
  • GitHub: https://github.com/sujalwarke
  • LinkedIn: https://linkedin.com/in/sujalwarke
  • Status: 🟢 Open for Lead Software Engineering Roles!`,
};
