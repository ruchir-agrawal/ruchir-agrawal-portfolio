export const projects = [
  {
    id: 1,
    slug: 'anvesha',
    num: '01',
    name: 'Anvesha',
    description: "A student career guidance and mentor platform that helps students choose their path based on their niche and mindset rather than market hype.",
    tags: ['Guidance', 'React', 'AI'],
    fullDescription: 'Anvesha is designed to be a true companion for students, moving away from generic advice and focusing on individual potential. It uses psychometric insights to guide students toward stages of life and career choices that align with their specific talents.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    links: [
      { label: 'Live Demo', url: '#' },
      { label: 'GitHub', url: '#' }
    ],
    deepDive: {
      problem: 'Students often follow the "buzz and hype" of current trends, leading to career dissatisfaction and burnout when it doesnt match their innate niche.',
      solution: 'A personalized mentorship portal that prioritizes mental alignment and interest-based mapping over popular demand.',
      challenges: [
        'Mapping diverse career paths to specific personality traits.',
        'Creating an interface that feels encouraging yet professional for young students.'
      ],
      outcome: 'A platform that provides high-clarity decision support for students at critical life stages.'
    }
  },
  {
    id: 2,
    slug: 'electronics-hub',
    num: '02',
    name: 'Auto-Bot & Hardware',
    description: 'A suite of electronics projects including autonomous line-following, obstacle avoidance, and long-range wireless cars.',
    tags: ['Electronics', 'C++', 'Sensors'],
    fullDescription: 'Extensive hands-on experience in electronics and sensor integration. This collection includes a line-following car, a high-speed wireless car with long-range capabilities, and obstacle-avoidance robots.',
    techStack: ['Arduino', 'ESP32', 'C++', 'Motor Drivers', 'Ultrasonic Sensors'],
    links: [
      { label: 'Project Video', url: '#' }
    ],
    deepDive: {
      problem: 'Developing reliable real-time responsiveness in low-compute hardware for autonomous movement.',
      solution: 'Built custom PID controllers for line followers and implemented optimized sensor-polling logic for obstacle avoidance.',
      challenges: [
        'Ensuring signal stability for long-range wireless communication.',
        'Optimizing battery life and motor torque for high-speed performance.'
      ],
      outcome: 'Successfully built 3+ distinct robotic platforms with 100% autonomous navigation success rates in controlled environments.'
    }
  },
  {
    id: 3,
    slug: 'pravaha',
    num: '03',
    name: 'Pravaha',
    description: 'A robust blogging platform features post management for admins and interactive reading for users.',
    tags: ['Fullstack', 'Next.js', 'Auth'],
    fullDescription: 'Pravaha is a full-featured blogging ecosystem. It allows administrators to seamlessly manage posts while providing users with a fast, search-optimized reading experience with commenting functionality.',
    techStack: ['React', 'Next.js', 'Prisma', 'PostgreSQL', 'NextAuth'],
    links: [
      { label: 'Live Site', url: '#' }
    ],
    deepDive: {
      problem: 'Most blogging platforms are either too complex for simple use or lack proper administrative controls for small teams.',
      solution: 'Built a lightweight but powerful CMS-like interface that prioritizes reading speed and management simplicity.',
      challenges: [
        'Implementing an efficient full-text search across thousands of characters.',
        'Designing a secure role-based access system for editors and readers.'
      ],
      outcome: 'A fast, secure, and intuitive blogging platform with real-time commenting and streamlined post editing.'
    }
  },
  {
    id: 4,
    slug: 'polink',
    num: '04',
    name: 'PoLink',
    description: 'AI LinkedIn Post Generator crafted to mirror individual professional voices using Gemini API.',
    tags: ['AI', 'React', 'Gemini API'],
    fullDescription: 'PoLink is a specialized AI content tool that helps professionals maintain an active LinkedIn presence. By leveraging the Google Gemini API, it crafts posts that match a users specific voice, industry, and intended audience.',
    techStack: ['React', 'TypeScript', 'Gemini API', 'Tailwind CSS'],
    links: [
      { label: 'GitHub', url: 'https://github.com/ruchir-agrawal' }
    ],
    deepDive: {
      problem: 'Generic LLM outputs often lack the specific professional nuances and voice required for high-engagement LinkedIn content.',
      solution: 'Implemented a multi-stage prompt engineering pipeline that extracts user voice parameters and industry contexts before generating the final post.',
      challenges: [
        'Fine-tuning the model to avoid common AI-isms.',
        'Ensuring the generated content feels authentic to the user voice.'
      ],
      outcome: 'Enabled professionals to instantly craft personalized, high-engagement LinkedIn posts tailored to their unique voice.'
    }
  },
  {
    id: 5,
    slug: 'closetmate',
    num: '05',
    name: 'ClosetMate',
    description: 'AI-powered wardrobe manager that suggests weather-appropriate outfits using real-time data.',
    tags: ['AI', 'Mobile-First', 'TypeScript'],
    fullDescription: 'ClosetMate is a responsive web application that turns your closet into a digital library. It integrates the Gemini API and real-time weather data to automatically generate personalized, weather-appropriate outfit recommendations.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'Weather API'],
    links: [
      { label: 'GitHub', url: 'https://github.com/ruchir-agrawal' }
    ],
    deepDive: {
      problem: 'The "nothing to wear" dilemma despite a full closet, often leading to repetitive outfit choices.',
      solution: 'A weather-aware recommendation engine that cross-references daily forecasts with users digitized items.',
      challenges: [
        'Developing a fast, mobile-optimized image upload system.',
        'Implementing real-time weather synchronization.'
      ],
      outcome: 'Automatically generate personalized, weather-appropriate daily outfit recommendations reducing decision fatigue.'
    }
  },
  {
    id: 6,
    slug: 'sahaj-ai',
    num: '06',
    name: 'SAHAJ.AI',
    description: 'Multilingual Civic OS simplifying government services through voice-first AI automation.',
    tags: ['Civic Tech', 'Multilingual', 'AI'],
    fullDescription: 'SAHAJ.AI is a robust civic operating system designed to simplify government services for Indian citizens. It leverages React and the Gemini API to implement voice-first automation and document intelligence across 7 languages.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Google Gemini API'],
    links: [
      { label: 'GitHub', url: 'https://github.com/ruchir-agrawal' }
    ],
    deepDive: {
      problem: 'Complex bureaucracy and language barriers prevent millions of citizens from accessing government services effectively.',
      solution: 'Built a voice-first multilingual OS with AI-driven document intelligence and agentic form-filling.',
      challenges: [
        'Maintaining high accuracy in legal translations across diverse regional dialects.',
        'Structuring agentic flows for accurate form-filling.'
      ],
      outcome: 'Significantly improved accessibility across 7 different languages for civic engagement.'
    }
  },
  {
    id: 7,
    slug: 'ternaryviz',
    num: '07',
    name: 'TernaryViz',
    description: 'High-resolution ternary diagram generator utilizing D3.js for complex mathematical rendering.',
    tags: ['Dataviz', 'D3.js', 'Research'],
    fullDescription: 'TernaryViz is a React and TypeScript application that allows researchers to generate, customize, and export high-resolution ternary diagrams. It uses D3.js for complex mathematical SVG rendering.',
    techStack: ['React', 'TypeScript', 'D3.js', 'Vite'],
    links: [
      { label: 'GitHub', url: 'https://github.com/ruchir-agrawal' }
    ],
    deepDive: {
      problem: 'Scientific software for ternary plotting is often legacy, expensive, or lacks modern export capabilities.',
      solution: 'Built a reactive SVG canvas using D3.js with a robust data processing pipeline supporting CSV/XLSX uploads.',
      challenges: [
        'Implementing complex coordinate transformations for equilateral triangles.',
        'Creating a real-time data grid editor for high-performance syncing.'
      ],
      outcome: 'Allows researchers and analysts to generate, customize, and export high-resolution ternary diagrams instantly.'
    }
  }
];
