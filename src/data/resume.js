// Single source of truth. Everything on the page reads from here.

export const profile = {
  name: 'Adeel Haider',
  role: 'Full stack developer',
  location: 'Kohat / Peshawar, Pakistan',
  email: 'adeelhaider3360@gmail.com',
  phone: '+92 322-9170014',
  phoneHref: '+923229170014',
  github: 'https://github.com/Adeel-Haider-03',
  githubHandle: 'Adeel-Haider-03',
  linkedin: 'https://linkedin.com/in/adeelhaider3360',
  linkedinHandle: 'adeelhaider3360',
  resumeFile: '/Adeel_Haider_Resume.pdf',
  headline: ['From schema to', 'the box it runs in.'],
  summary:
    'I work in the MERN stack and Python, and I am comfortable taking a project from the database schema all the way through to a Dockerised deployment sitting behind Nginx. I hold a CS degree from UET Peshawar, and I build and maintain WordPress sites for paying clients.',
  graduation: 'BS Computer Science, UET Peshawar',
  availability: 'Available now for full-time work',
}


// Order matters — this is the order they sit around the cylinder.
export const projects = [
  {
    id: 'codingbuddy',
    index: '01',
    name: 'CodingBuddy',
    tagline: 'Tinder for developers — matched on the skills you each lack.',
    body: 'Developers list what they know and what they want to learn, and the platform ranks everyone else by how well they fill the gap. Matched pairs get a chat room with typing indicators and read receipts. The whole thing ships as a Docker Compose stack behind Nginx.',
    stack: [
      'Node.js',
      'Express 5',
      'React 19',
      'MongoDB',
      'Socket.io',
      'Docker',
      'Nginx',
      'Gemini API',
    ],
    highlights: [
      {
        k: 'Ranking',
        v: 'A MongoDB aggregation pipeline scores skill overlap and returns matches pre-sorted, so the API does no ranking work of its own.',
      },
      {
        k: 'Real time',
        v: 'Socket.io chat with typing indicators and read receipts, proxied through Nginx with WebSocket upgrade handling, gzip and rate limiting.',
      },
      {
        k: 'Deployment',
        v: 'Multi-stage Dockerfile and a Compose stack that brings up the app, MongoDB and Nginx together.',
      },
      {
        k: 'Hardening',
        v: 'Helmet, CORS, bcrypt and rate-limited auth routes. JWT in HTTP-only cookies. Winston logging with file rotation, plus node-cron jobs for stale-request cleanup and daily stats.',
      },
      {
        k: 'AI features',
        v: 'Five features on Gemini 2.0 Flash: match analysis, a bio generator with three tones, an in-chat code explainer and debugger, a profile strength scorer, and project recommendations.',
      },
    ],
    image: '/codingBuddy.webp',
    live: 'https://coding-buddy-rust.vercel.app',
    code: '',
  },
  {
    id: 'researchsynthesis',
    index: '02',
    name: 'ResearchSynthesis AI',
    tagline: 'Ask questions across a stack of PDFs and get the source passage back with the answer.',
    body: 'Upload a set of papers and query them in plain language. Every answer carries a citation pointing at the passage it came from, so you can check the model rather than trust it. It will also read across the whole set and write a gap analysis — the questions the literature has not settled.',
    stack: ['React', 'Flask', 'Python', 'LangChain', 'ChromaDB', 'MongoDB', 'Gemini API'],
    highlights: [
      {
        k: 'Retrieval',
        v: 'PyPDF pulls the text, the text is chunked and embedded into a ChromaDB vector store, and similarity search finds the passages worth reading.',
      },
      {
        k: 'Citations',
        v: 'Each answer returns the source passage it was drawn from, so a claim can be traced back to the document.',
      },
      {
        k: 'Gap analysis',
        v: 'Reads across every uploaded paper and reports where the research is under-explored or contradicts itself, quoting the evidence from the source for each claim it makes.',
      },
      {
        k: 'API',
        v: 'Flask REST API with MongoDB holding chat history, per-project document sets, and the metadata used to filter retrieval.',
      },
      {
        k: 'Frontend',
        v: 'React, Vite and Tailwind, with an Axios wrapper that retries failed requests so one dropped call does not end the session.',
      },
    ],
    image: '/RAG.webp',
    live: '',
    code: 'https://github.com/Adeel-Haider-03/ResearchSynthesis-AI',
  },
  {
    id: 'oneclick',
    index: '03',
    name: 'OneClick',
    tagline: 'A Chrome extension that summarises the page you are on and explains code you highlight.',
    body: 'Select a block of code anywhere on the web and get it explained line by line, or summarise the whole article without leaving the tab. No framework, just the extension APIs and Gemini.',
    stack: ['JavaScript (ES6)', 'Chrome Extension APIs', 'Gemini API'],
    highlights: [
      {
        k: 'Injection',
        v: 'chrome.scripting injects into the active tab to read and act on page content.',
      },
      {
        k: 'State',
        v: 'chrome.storage persists preferences between sessions, and contextMenus puts the actions on right-click.',
      },
      {
        k: 'Popup',
        v: 'Loading and error states are handled explicitly, requests run async so the UI never blocks, and results copy straight to the clipboard.',
      },
    ],
    image: '/OneClick.webp',
    live: '',
    code: 'https://github.com/Adeel-Haider-03/OneClick-chrome_Extension',
  },
  {
    id: 'ats',
    index: '04',
    name: 'ATS Resume Checker',
    tagline: 'Scores a CV against a job description the way an applicant tracking system would.',
    body: 'Upload a résumé as a PDF, paste in the job description, and get a score out of 100 with the specific strengths and gaps behind it — keyword coverage, quantified achievements, project focus. Parsing runs in the browser at around 85% accuracy, and it has served 100+ users.',
    stack: ['React', 'Google Generative AI', 'React PDF to Text', 'React Markdown'],
    highlights: [
      {
        k: 'Parsing',
        v: 'PDF text extraction happens client-side at roughly 85% accuracy — no upload server, the file never leaves the browser.',
      },
      {
        k: 'Analysis',
        v: 'Google Generative AI reads the extracted text against the target role and returns actionable improvements, rendered from Markdown.',
      },
      {
        k: 'Output',
        v: 'Returns a numeric ATS score with the reasoning broken out into strengths and weaknesses rather than a bare number.',
      },
    ],
    image: '/ATS.webp',
    live: 'https://my-ats-resume-checker.vercel.app',
    code: '',
  },
  {
    id: 'github-finder',
    index: '05',
    name: 'GitHub User Finder',
    tagline: 'Type a username, get the profile and the numbers behind it.',
    body: 'Searches the GitHub REST API and renders the profile — followers, following, public repos, gists, join date — with a light and dark theme toggle.',
    stack: ['React', 'GitHub REST API', 'Vercel'],
    highlights: [
      {
        k: 'Data',
        v: 'Hits the GitHub users endpoint directly and handles the empty and not-found states rather than leaving a blank card.',
      },
      { k: 'Theming', v: 'Light and dark modes toggled at runtime.' },
    ],
    image: '/Github.webp',
    live: 'https://github-user-finder-react.vercel.app',
    code: '',
  },
  {
    id: 'blog',
    index: '06',
    name: 'Blog Platform',
    tagline: 'Sign up, write a post, read everyone else’s.',
    body: 'A multi-user blog on an Appwrite backend — authentication, database and file storage — with a rich-text editor for writing posts and Redux Toolkit holding the global state.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Appwrite', 'Redux Toolkit', 'React Router'],
    highlights: [
      {
        k: 'Backend',
        v: 'Appwrite handles authentication, the post database and file storage, so there is no server of my own to keep alive.',
      },
      {
        k: 'Writing',
        v: 'TinyMCE rich-text editor with HTML parsing and dynamic rendering, and React Hook Form validating the post form.',
      },
      {
        k: 'State',
        v: 'Redux Toolkit for global state and React Router for the page structure.',
      },
    ],
    image: '/Blog.webp',
    live: 'https://blog-website-react-app-write.vercel.app',
    code: '',
  },
]

export const experience = [
  {
    id: 'freelance',
    role: 'Freelance Web Developer',
    org: 'Self-employed',
    mode: 'Remote',
    start: 'Jan 2025',
    end: 'Present',
    current: true,
    points: [
      'Build and deploy WordPress sites for small businesses, working alongside one other developer. Clients include Farar Scents and Qari Fragrances, both local fragrance retailers.',
      'Handle the whole engagement: scoping requirements with the client, customising themes, configuring plugins, migrating content, testing, and supporting the site after launch.',
      'Fix the things that actually break on client sites, mostly slow page loads and layouts that fall apart on phones.',
    ],
  },
  {
    id: 'den',
    role: 'Web Developer Intern',
    org: 'Digital Empowerment Network',
    mode: 'Remote',
    start: 'Sep 2024',
    end: 'Oct 2024',
    current: false,
    points: [
      'Built five interactive browser tools in plain HTML, CSS and JavaScript, with no framework.',
      'Reworked DOM manipulation and event handling to cut unnecessary re-rendering, and fixed layout and rendering differences across Chrome, Firefox and Safari.',
      'Worked in a remote Agile team, shipping in short cycles with Git and GitHub pull requests for review.',
    ],
  },
]

export const stack = [
  {
    group: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'C++'],
  },
  {
    group: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'Redux Toolkit'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'Flask', 'REST APIs', 'Socket.io / WebSockets'],
  },
  {
    group: 'Databases',
    items: ['MongoDB', 'Mongoose', 'Aggregation pipelines', 'MySQL'],
  },
  {
    group: 'Infrastructure',
    items: ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions', 'Vercel', 'Git'],
  },
  {
    group: 'Also used',
    items: ['LangChain', 'ChromaDB', 'Google Gemini API', 'JWT', 'Postman', 'WordPress'],
  },
]

export const education = {
  school: 'University of Engineering and Technology, Peshawar',
  degree: 'BS Computer Science',
  cgpa: '3.77 / 4.0',
  rank: 'Top 10%',
  start: 'Oct 2022',
  end: 'Aug 2026', // completed — shown as "Graduated" on the page
  graduated: true,
  coursework: [
    'Data Structures & Algorithms',
    'Operating Systems',
    'Database Systems',
    'Computer Networks',
    'Object-Oriented Programming',
    'Software Engineering',
  ],
}

export const awards = [
  {
    title: '1st Place, Front-End Web Development Marathon',
    issuer: 'Decentral Developer',
    kind: 'Award',
    period: '',
  },
  {
    title: 'Deep Learning',
    issuer: '', // TODO: confirm issuer — the CV lists a Verify link but no provider
    kind: 'Certificate',
    period: 'Oct — Nov 2025',
  },
  {
    title: 'Machine Learning',
    issuer: '', // TODO: confirm issuer
    kind: 'Certificate',
    period: 'Jul — Aug 2025',
  },
  {
    title: 'IBM Full-Stack JavaScript Developer',
    issuer: 'Coursera',
    kind: 'Certificate',
    period: 'Feb — Jul 2025',
  },
  {
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Coursera',
    kind: 'Certificate',
    period: 'Oct 2024 — Feb 2025',
  },
]

export const sections = [
  { id: 'top', label: 'Start' },
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
]
