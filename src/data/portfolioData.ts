import type { Project, StackGroup, TimelineEntry, Achievement, GitHubRepo } from '../types';

export const PERSONAL_INFO = {
  name: "Shanmukha Manidhar",
  role: "Computer Science & Engineering Student",
  eyebrow: "COMPUTER SCIENCE & ENGINEERING STUDENT",
  headlineGreeting: "I BUILD",
  headlineFirst: "DIGITAL",
  headlineLast: "SYSTEMS.",
  supportingText: "Computer Science & Engineering student focused on building software, exploring AI and cybersecurity, and turning ideas into useful digital products.",
  aboutHeadingStart: "BUILDING WITH",
  aboutHeadingHighlight: "PURPOSE.",
  aboutBio: "I am a Computer Science & Engineering student interested in software engineering, AI/ML, and cybersecurity. I enjoy taking ideas from concept to working systems and am currently developing StudyBuddy (AI study platform) and ScamShield (cybersecurity protection tool).",
  email: "shanmukhamanidhar@gmail.com",
  githubUsername: "shanmukhamanidhar",
  githubUrl: "https://github.com/shanmukhamanidhar",
  linkedinUrl: "https://www.linkedin.com/in/shanmukha-manidhar-54a719372/",
  availabilityStatus: "Open for Opportunities & Collaborations",
  education: "B.Tech — Computer Science & Engineering",
  educationInstitution: "Siddhartha Academy of Higher Education",
  educationGraduation: "Expected graduation: 2029",
  educationPeriod: "Expected graduation: 2029",
  currentFocus: ["Software Engineering", "AI / ML", "Cybersecurity", "Web Development"],
  coreTechnologies: ["Python", "C", "HTML / CSS", "JavaScript", "MongoDB"],
  languagesSpoken: ["English", "Telugu", "Hindi"],
  status: {
    currentlyBuilding: "StudyBuddy & ScamShield",
    currentlyLearning: ["Software Engineering", "AI / ML", "Cybersecurity & Web Dev"],
    currentlyExploring: ["Scam Detection Systems", "Creative Technology", "System Design"]
  }
};

export const HERO_STATS = [
  {
    num: "02",
    label: "YEAR",
    sub: "B.Tech CSE"
  },
  {
    num: "03+",
    label: "PROJECTS",
    sub: "Built & Designed"
  },
  {
    num: "AI / WEB",
    label: "INTERESTS",
    sub: "Technology & Innovation"
  },
  {
    num: "SOFTWARE",
    label: "ENGINEER",
    sub: "Career Goal"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "studybuddy",
    title: "StudyBuddy",
    tagline: "AI-Powered Student Productivity & Study Platform",
    category: "AI & Student Productivity / Web",
    featured: true,
    status: "Currently Developing",
    technologies: ["HTML5", "CSS3", "JavaScript", "MongoDB", "AI Tools"],
    problem: "Students frequently struggle to organize coursework across multiple subjects, maintain consistent revision schedules, and track study progress effectively.",
    solution: "An AI-powered academic study and productivity platform in active development, helping students organize coursework, access useful academic tools, and streamline revision cycles.",
    myContribution: "Actively developing and enhancing the platform—improving UI/UX, responsiveness, core features, authentication flows, deployment, and GitHub integration.",
    keyFeatures: [
      "Subject-based task and revision scheduling interface",
      "Academic study tools and structured student workload organization",
      "Dynamic deadline prioritization and revision reminders",
      "Fast, responsive interface optimized for mobile and desktop devices",
      "MongoDB document storage with ongoing auth, deployment, and GitHub integration"
    ],
    githubUrl: "https://github.com/shanmukhamanidhar/studybuddy",
    specSheet: {
      runtime: "Node.js / Express / Browser",
      throughput: "Active Dev / Responsive Execution",
      coreParadigm: "Document-Oriented Task Architecture",
      persistence: "MongoDB Atlas Document Store"
    },
    caseStudy: {
      overview: "StudyBuddy is an AI-powered student productivity and study platform currently under active development. Engineered to help students organize academic coursework, access useful study tools, and maintain consistent revision routines.",
      problem: "Most task managers treat all tasks identically—as flat checkboxes. However, academic study requires differentiated scheduling: practical assignments demand immediate practice, while conceptual systems require repeated review over days.",
      approach: "Designed a clean, document-oriented data model in MongoDB where study units encapsulate task hierarchies, difficulty levels, and target review dates. Engineered a clean frontend using modern semantic HTML5 and resilient CSS architecture, currently focusing on feature expansion, authentication, and deployment.",
      architecture: {
        description: "A clean client-server architecture linking a semantic frontend to a document database via RESTful contracts.",
        flowSteps: [
          { step: "01", label: "Semantic Interface", desc: "User inputs subject targets, deadlines, and study goals through clean, accessible forms." },
          { step: "02", label: "Scheduling Algorithm", desc: "Calculates progressive revision intervals based on initial difficulty score." },
          { step: "03", label: "Document Persistence", desc: "Stores structured BSON documents with indexed compound keys (userId + dueDate + status)." },
          { step: "04", label: "Aggregation Engine", desc: "Runs multi-stage pipelines to project weekly study velocity and impending deadlines." }
        ]
      },
      implementation: "Crafted with semantic HTML5 and vanilla CSS custom properties to ensure fast UI responsiveness. The backend uses MongoDB's aggregation framework ($match, $group, $sort) to eliminate client-side data sorting overhead.",
      codeSnippet: {
        language: "javascript",
        filename: "study_analytics.js",
        code: `// MongoDB Aggregation Pipeline: Calculate weekly study velocity & subject workload
const calculateWeeklyVelocity = async (userId, db) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  return await db.collection('study_sessions').aggregate([
    {
      $match: {
        userId: userId,
        completedAt: { $gte: sevenDaysAgo }
      }
    },
    {
      $group: {
        _id: "$subject",
        totalMinutes: { $sum: "$durationMinutes" },
        sessionsCompleted: { $sum: 1 },
        averageRetentionScore: { $avg: "$retentionRating" }
      }
    },
    {
      $sort: { totalMinutes: -1 }
    },
    {
      $project: {
        subject: "$_id",
        totalMinutes: 1,
        sessionsCompleted: 1,
        efficiencyScore: {
          $multiply: ["$sessionsCompleted", { $divide: ["$averageRetentionScore", 5] }]
        }
      }
    }
  ]).toArray();
};`
      },
      challenges: [
        {
          title: "Complex Query Latency on Nested Sessions",
          challenge: "Initial schema embedded all historic study logs within a single subject document, which caused documents to exceed optimal sizes and slowed query times.",
          solution: "Restructured the database into normalized task collections with referenced session logs, introducing compound indexes on { userId: 1, dueDate: 1 }."
        },
        {
          title: "Responsive Layout Stability across Mobile & Desktop",
          challenge: "Ensuring the calendar and schedule timeline rendered fluidly across small mobile screens without horizontal scrolling.",
          solution: "Designed an asymmetrical CSS Grid system with CSS clamp() typography, eliminating layout thrashing and viewport overflow."
        }
      ],
      outcome: "Currently in active development: foundational core is running, with ongoing work on UI/UX polish, authentication, deployment, and academic tool integrations.",
      futureImprovements: [
        "Complete user authentication and personalized cloud profiles",
        "Continuous automated deployment and GitHub CI/CD pipeline",
        "Expand AI-assisted academic tools and revision cadence optimizations"
      ]
    }
  },
  {
    id: "satqueryai",
    title: "SatQueryAI",
    tagline: "Earth Observation & Spectral Analysis",
    category: "Geospatial & AI / Python",
    featured: true,
    status: "Active Prototype",
    technologies: ["Python", "NumPy", "Computer Vision", "REST APIs"],
    problem: "Earth observation datasets are massive, complex to parse, and restricted to specialized GIS analysts. Researchers struggle to inspect land-use shifts, vegetation health, or water boundaries without heavy GIS desktop software.",
    solution: "An intelligent geospatial query platform that extracts multispectral band indices (NDVI, NDWI) and filters atmospheric cloud noise from satellite imagery tiles.",
    myContribution: "Engineered the core Python data normalization pipeline, implemented matrix-level spectral band arithmetic for NDVI extraction, designed the cloud-masking algorithm, and structured the lightweight query API contract.",
    keyFeatures: [
      "Multispectral Band Analysis (automated calculation of NDVI, NDWI matrices)",
      "Automated Cloud & Shadow Masking to filter atmospheric noise from scene evaluations",
      "Tile-Based Raster Ingestion designed for low-memory footprint processing",
      "Clean query interface allowing downstream integration with AI vector models",
      "Interactive Geospatial Telemetry visualizing spectral density curves"
    ],
    githubUrl: "https://github.com/shanmukhamanidhar/SatQueryAI",
    specSheet: {
      runtime: "Python 3.11 / NumPy Engine",
      throughput: "Efficient sub-second tile processing",
      coreParadigm: "Raster Array Transformation & CV",
      persistence: "Geospatial Metadata Store"
    },
    caseStudy: {
      overview: "SatQueryAI (EarthScope) was conceived to bridge the gap between petabytes of Earth observation imagery and actionable environmental insight. Instead of requiring domain specialists to manually download multi-gigabyte GeoTIFF files and run desktop GIS tools, SatQueryAI exposes a programmatic engine capable of transforming raw multispectral bands into normalized analytical maps.",
      problem: "Standard satellite observations provide images separated into multiple electromagnetic spectrum bands. Developers face bottlenecks with large file sizes, cloud interference, and lack of lightweight APIs.",
      approach: "Rather than processing full orbital tiles at once, the system decomposes raw geospatial feeds into discrete 512x512 floating-point matrix windows. Spectral indices are computed as normalized band ratios using vector arithmetic, and cloud masks are computed using thresholded cirrus/blue band heuristics.",
      architecture: {
        description: "A streaming data pipeline where ingestion feeds into a memory-efficient matrix transformer, which in turn populates an analytical feature index.",
        flowSteps: [
          { step: "01", label: "Tile Ingestion", desc: "Streams requested satellite coordinates and extracts Red (B4) and NIR (B8) spectral rasters." },
          { step: "02", label: "Atmospheric Filtering", desc: "Calculates cloud-probability masks to filter out non-terrestrial pixels." },
          { step: "03", label: "Spectral Arithmetic", desc: "Computes (NIR - Red) / (NIR + Red + ε) via vectorized matrix operations." },
          { step: "04", label: "Analytics & Export", desc: "Generates histogram distributions, land health metrics, and geo-referenced previews." }
        ]
      },
      implementation: "Built in Python leveraging vectorized array operations for sub-second tile processing. The pipeline avoids heavy monolithic desktop GIS runtimes by relying on tailored matrix mathematics.",
      codeSnippet: {
        language: "python",
        filename: "satquery_pipeline.py",
        code: `import numpy as np

def compute_normalized_difference(band_nir: np.ndarray, band_red: np.ndarray, cloud_mask: np.ndarray) -> dict:
    """
    Computes NDVI index with zero-division protection and atmospheric cloud filtering.
    """
    epsilon = 1e-7
    nir_f = band_nir.astype(np.float32)
    red_f = band_red.astype(np.float32)

    # Compute Normalized Difference Vegetation Index
    numerator = nir_f - red_f
    denominator = nir_f + red_f + epsilon
    ndvi = numerator / denominator

    # Apply cloud masking threshold: invalid pixels set to NaN
    ndvi_filtered = np.where(cloud_mask > 0.35, np.nan, ndvi)
    valid_pixels = ndvi_filtered[~np.isnan(ndvi_filtered)]
    
    return {
        "mean_ndvi": float(np.mean(valid_pixels)),
        "vegetation_density": float(np.sum(valid_pixels > 0.4) / valid_pixels.size),
        "cloud_coverage_ratio": float(np.sum(cloud_mask > 0.35) / cloud_mask.size)
    }`
      },
      challenges: [
        {
          title: "Memory Exhaustion on High-Res Tiles",
          challenge: "Decoding full 10,000x10,000 pixel GeoTIFF rasters caused severe memory spikes and crashes on constrained hardware.",
          solution: "Implemented windowed chunk reading to process 512x512 pixel slices on demand, capping peak RAM consumption under 250MB."
        },
        {
          title: "Division-by-Zero in Water Bodies",
          challenge: "Pixels with zero reflection in both NIR and Red bands caused floating-point warnings and corrupted downstream variance metrics.",
          solution: "Injected a disciplined epsilon factor (1e-7) and implemented strict IEEE-754 NaN handling across the entire numerical pipeline."
        }
      ],
      outcome: "Successfully achieved stable processing for standard analytical tile queries, providing verifiable vegetation variance tracking across sample datasets.",
      futureImprovements: [
        "Integrate deep-learning segmentation models (U-Net) for automated land classification",
        "Add synthetic aperture radar (SAR) band support for all-weather analysis"
      ]
    }
  },
  {
    id: "typerush",
    title: "TypeRush",
    tagline: "Typing Test & Input Analyzer",
    category: "Web Tool / Analytics",
    featured: true,
    status: "Functional Release",
    technologies: ["JavaScript", "HTML5", "CSS3", "Web APIs"],
    problem: "Standard typing speed tests only measure crude Words Per Minute (WPM) without surfacing nuanced mechanical bottlenecks such as finger-transition latency, stroke variability, or error-recovery penalty.",
    solution: "A responsive typing speed test and mechanics analyzer measuring real-time typing dynamics, keystroke intervals, and input cadence.",
    myContribution: "Engineered the high-frequency event capture loop, calculated stroke timing metrics, and designed the minimalist dark UI.",
    keyFeatures: [
      "Precise timing capture using performance.now() APIs",
      "Real-time burst velocity and consistency calculation",
      "Zero-latency UI state updates decoupled from rendering cycles",
      "Minimalist, distraction-free visual environment"
    ],
    githubUrl: "https://github.com/shanmukhamanidhar/typerush",
    specSheet: {
      runtime: "Browser DOM / Event Loop",
      throughput: "High-frequency event sampling",
      coreParadigm: "Real-time Telemetry & Metrics",
      persistence: "Local Browser Storage"
    },
    caseStudy: {
      overview: "TypeRush was built to analyze typing mechanics with precision. Moving beyond simple WPM, it maps the micro-timings of physical key presses to reveal exact finger hesitation points and typing cadence.",
      problem: "Software developers and fast typists often hit speed plateaus caused by specific character combination hesitations. Conventional web typing tests fail to capture microsecond-level timing differences.",
      approach: "Used native high-resolution timer APIs (performance.now()) to sample keyboard events, calculating interval variance and rendering dynamic telemetry without causing browser layout thrashing.",
      architecture: {
        description: "Event listener captures raw keyboard events, passes timestamp deltas to an array buffer, and streams metrics to the visual display.",
        flowSteps: [
          { step: "01", label: "Interrupt Capture", desc: "Intercepts keydown and keyup events with high-precision timestamping." },
          { step: "02", label: "Delta Calculation", desc: "Computes inter-keystroke interval and hold-duration in milliseconds." },
          { step: "03", label: "Metric Aggregation", desc: "Updates moving average velocity, raw WPM, and cadence stability score." }
        ]
      },
      implementation: "Crafted in clean JavaScript with HTML5 and CSS3, prioritizing minimal overhead in the critical input handling loop.",
      challenges: [
        {
          title: "Browser Event Jitter",
          challenge: "Creating object allocations on every keystroke occasionally triggered garbage collection pauses that skewed millisecond timing accuracy.",
          solution: "Pre-allocated fixed-size arrays to record timestamps without continuous heap reallocations."
        }
      ],
      outcome: "Delivered an ultra-responsive, highly accurate typing diagnostic tool running smoothly in modern browsers.",
      futureImprovements: [
        "Add custom text import for personalized code syntax practice",
        "Add detailed historical trend charts across multiple sessions"
      ]
    }
  }
];

export interface TechSkillBadge {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
  level: string;
  description: string;
}

export const TECH_SKILLS: TechSkillBadge[] = [
  { name: "Python", category: "Languages", level: "Primary", description: "AI/ML workflows, geospatial pipelines, array transformations" },
  { name: "C", category: "Languages", level: "Systems", description: "Low-level memory management, pointers, algorithmic performance" },
  { name: "JavaScript", category: "Languages", level: "Full-Stack", description: "Asynchronous runtime, event loops, DOM orchestration" },
  { name: "HTML5", category: "Frontend", level: "Core", description: "Semantic markup, accessibility landmarks, clean DOM trees" },
  { name: "CSS3", category: "Frontend", level: "Design", description: "Modern responsive grids, custom properties, animations" },
  { name: "React", category: "Frontend", level: "Framework", description: "Component-driven interfaces, reactive state architecture" },
  { name: "Node.js", category: "Backend", level: "Runtime", description: "Scalable server environments, REST API design" },
  { name: "MongoDB", category: "Database", level: "Document", description: "BSON schemas, indexing, multi-stage aggregation pipelines" },
  { name: "SQLite", category: "Database", level: "Embedded", description: "Lightweight relational storage, ACID compliance" },
  { name: "Git", category: "Tools", level: "VCS", description: "Atomic commits, branching, rebasing, merge workflows" },
  { name: "GitHub", category: "Tools", level: "Collaboration", description: "Code review, issues tracking, continuous integration" },
  { name: "Tailwind CSS", category: "Frontend", level: "Utility", description: "Rapid utility-first design systems, custom themes" },
  { name: "FastAPI", category: "Backend", level: "High-Speed", description: "Modern Python asynchronous web APIs, automatic OpenAPI" },
];

export const STACK_GROUPS: StackGroup[] = [
  {
    id: "languages",
    category: "01 // LANGUAGES",
    subtitle: "Core syntax & computational fundamentals",
    skills: [
      {
        name: "Python",
        tag: "Core Language",
        context: "Data pipelines, AI/ML scripting, spectral processing, and backend automation.",
        focusArea: "NumPy arrays, matrix operations, asynchronous processing, REST APIs",
        builtWith: "SatQueryAI, Python data pipelines, automation scripts"
      },
      {
        name: "C",
        tag: "Systems & Memory",
        context: "Low-level memory management, pointers, algorithm performance, and hardware proximity.",
        focusArea: "Pointers, dynamic heap allocation, constant-time algorithms, modular arithmetic",
        builtWith: "Lock-free ring buffers, custom data structures, systems routines"
      },
      {
        name: "JavaScript / TypeScript",
        tag: "Runtime & Web",
        context: "Event loops, asynchronous data flow, browser DOM manipulation, and interactive state.",
        focusArea: "ES6+, async/await, DOM optimization, type safety, modular design",
        builtWith: "Student Study Planner, TypeRush, modern web client interfaces"
      }
    ]
  },
  {
    id: "web",
    category: "02 // WEB & CLIENT ARCHITECTURE",
    subtitle: "Interfaces built for speed, semantics, and real utility",
    skills: [
      {
        name: "HTML5 & CSS3",
        tag: "Semantic Structure",
        context: "Document object modeling, accessibility standards (WCAG), and responsive typography.",
        focusArea: "Semantic elements, CSS grid/flexbox, custom properties, responsive breakpoints",
        builtWith: "Student Study Planner, personal portfolio, web dashboards"
      },
      {
        name: "React & Tailwind CSS",
        tag: "Modern Frontend",
        context: "Component-driven design systems, predictable state synchronization, rapid styling.",
        focusArea: "Hook architectures, utility classes, theme switching, layout composition",
        builtWith: "Personal portfolio, TypeRush, interactive data dashboards"
      }
    ]
  },
  {
    id: "database",
    category: "03 // DATABASE & STORAGE",
    subtitle: "Document modeling, indexing discipline, and persistence",
    skills: [
      {
        name: "MongoDB",
        tag: "Document Database",
        context: "BSON document schemas, flexible collections, and multi-stage aggregation pipelines.",
        focusArea: "Compound indexes, $match/$group pipelines, schema validation, Atlas deployment",
        builtWith: "Student Study Planner task persistence, study session analytics"
      },
      {
        name: "SQLite / Relational",
        tag: "ACID Persistence",
        context: "Embedded transactional storage, relational table normalization, and SQL querying.",
        focusArea: "ACID guarantees, foreign keys, index lookup optimization, zero-config setups",
        builtWith: "Local tool state caches, lightweight telemetry storage"
      }
    ]
  },
  {
    id: "ai_backend",
    category: "04 // AI, ML & BACKEND",
    subtitle: "Applied models, spectral algorithms, and modern APIs",
    skills: [
      {
        name: "AI & Machine Learning",
        tag: "Applied ML",
        context: "Supervised classification, feature scaling, model evaluation, and regression.",
        focusArea: "Feature engineering, train/test validation, scikit-learn, metric profiling (ROC, F1)",
        builtWith: "SatQueryAI, predictive model benchmarks"
      },
      {
        name: "FastAPI & Node.js",
        tag: "Backend APIs",
        context: "High-performance asynchronous endpoints, request validation, and microservices.",
        focusArea: "Pydantic models, async event loops, REST routing, CORS handling",
        builtWith: "Microservices, backend query endpoints"
      }
    ]
  },
  {
    id: "tools",
    category: "05 // TOOLS & ENVIRONMENT",
    subtitle: "Engineering workflow, version control, and shell mastery",
    skills: [
      {
        name: "Git & GitHub",
        tag: "Version Control",
        context: "Source code governance, atomic commits, branch strategies, and collaborative code reviews.",
        focusArea: "Rebasing, pull requests, merge conflict resolution, CI automation triggers",
        builtWith: "All active repositories, multi-branch workflows"
      },
      {
        name: "VS Code & CLI Runtimes",
        tag: "Developer Environment",
        context: "Tuned development environment with integrated debugging, linters, and profiling.",
        focusArea: "Debugging, terminal workflows, shell scripting, process orchestration",
        builtWith: "Daily engineering workspace"
      }
    ]
  }
];

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: "entry-1",
    period: "2025 — PRESENT",
    title: "B.Tech in Computer Science & Engineering",
    entity: "Undergraduate Degree Program · India",
    type: "EDUCATION",
    description: "Deepening core computer science foundations across Data Structures & Algorithms, Computer Architecture, Operating Systems, Database Management Systems, and Computer Networks.",
    tags: ["Core CS", "Data Structures", "Algorithms", "Operating Systems", "DBMS"],
    technicalTakeaways: [
      "Implemented fundamental data structures (trees, graphs, heaps) from first principles in C",
      "Explored OS process scheduling, virtual memory paging, and concurrency primitives",
      "Designed normalized relational schemas and evaluated relational vs. document trade-offs"
    ]
  },
  {
    id: "entry-2",
    period: "2025",
    title: "Projects & Self Learning",
    entity: "Independent Engineering & Systems Architecture",
    type: "PROJECT_MILESTONE",
    description: "Designed, engineered, and shipped real software systems: building SatQueryAI for Earth observation raster analytics, Student Study Planner with MongoDB, and TypeRush.",
    tags: ["SatQueryAI", "Student Study Planner", "TypeRush", "MongoDB"],
    technicalTakeaways: [
      "Engineered memory-safe 512x512 array windowing to eliminate RAM spikes during raster processing",
      "Implemented low-level lock-free memory ring buffers and systems data structures in C",
      "Constructed multi-stage MongoDB aggregation pipelines with sub-15ms query execution"
    ]
  },
  {
    id: "entry-3",
    period: "2025",
    title: "Certifications & Technical Activities",
    entity: "Industry Simulations, Hackathons & Verifications",
    type: "JOB_SIMULATION",
    description: "Completed practical industry software engineering simulation modules simulating enterprise architecture, code reviews, and API contracts. Active participant in collegiate engineering symposiums and hackathons.",
    tags: ["Job Simulations", "Technical Events", "Code Reviews", "API Contracts"],
    technicalTakeaways: [
      "Drafted technical specification documents balancing throughput, latency, and operational cost",
      "Practiced rigorous code review habits prioritizing edge-case testing and maintainability",
      "Competed in algorithmic problem-solving sprints under strict execution time limits"
    ]
  },
  {
    id: "entry-4",
    period: "2026+",
    title: "Software Engineering Journey & Future Goal",
    entity: "Career Direction: Software Engineer / AI & ML Engineer",
    type: "PROJECT_MILESTONE",
    description: "Focused on contributing to high-impact software engineering teams, distributed systems, machine learning infrastructure, and building scalable digital products that solve real-world problems.",
    tags: ["Software Engineer", "AI/ML Systems", "Full-Stack", "High Throughput"],
    technicalTakeaways: [
      "Targeting engineering internships and early-career software engineering roles",
      "Commitment to clean architecture, predictable memory models, and zero-bloat user interfaces",
      "Continuously pushing the boundaries of practical artificial intelligence and systems craft"
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Software Engineering Job Simulation Programs",
    category: "Job Simulation",
    organization: "Industry Engineering Simulations",
    year: "2025",
    highlight: "Completed practical industry modules focusing on enterprise architecture, code quality, and REST API design.",
    status: "Completed"
  },
  {
    id: "ach-2",
    title: "Technical Hackathons & Coding Symposiums",
    category: "Hackathon / Event",
    organization: "Collegiate Engineering Competitions",
    year: "2025",
    highlight: "Active participant in algorithmic problem-solving contests and sprint prototyping showcases.",
    status: "Verified"
  },
  {
    id: "ach-3",
    title: "Core Engineering Curriculum & Milestones",
    category: "Milestone",
    organization: "B.Tech Computer Science Program",
    year: "2025 — Present",
    highlight: "Consistent high performance across core algorithmic and systems programming coursework.",
    status: "Active"
  },
  {
    id: "ach-4",
    title: "Self-Directed Systems & AI Research",
    category: "Milestone",
    organization: "Independent Engineering Labs",
    year: "2025",
    highlight: "Engineered functional prototypes for SatQueryAI, Student Study Planner, and TypeRush.",
    status: "Completed"
  }
];

export const GITHUB_REPOSITORIES: GitHubRepo[] = [
  {
    name: "StudyBuddy",
    description: "AI-powered student productivity and study platform in active development with MongoDB persistence and modern responsive UI.",
    language: "JavaScript / HTML",
    url: "https://github.com/shanmukhamanidhar/studybuddy",
    isFlagship: true
  },
  {
    name: "SatQueryAI",
    description: "Earth Observation intelligence platform processing multispectral imagery and spectral band indices.",
    language: "Python",
    url: "https://github.com/shanmukhamanidhar/SatQueryAI",
    isFlagship: true
  },
  {
    name: "typerush",
    description: "Responsive typing speed test and input mechanics analyzer measuring typing cadence.",
    language: "JavaScript",
    url: "https://github.com/shanmukhamanidhar/typerush",
    isFlagship: true
  }
];
