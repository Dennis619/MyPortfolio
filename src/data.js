export const homeData = [
  {
    fName: "Dennis",
    lName: "Somba",
    facebook: "",
    instagram: "",
    linkedIn: "https://www.linkedin.com/in/dennis-somba/",
    github: "https://github.com/Dennis619",
    x: "",
    imageName: "Profile-Transparent.png",
    docName: "resume.pdf",
  },
];

export const services = [
  {
    title: "Full Stack Web Development",
    description:
      "Designing and building scalable, high-performance web applications using modern technologies like React, Node.js, Express, and PostgreSQL. I create responsive, optimized, and maintainable solutions for businesses and startups.",
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting user-centered interfaces that balance aesthetics with usability. From wireframes to interactive prototypes, I deliver digital experiences that are visually engaging and easy to navigate.",
  },
  {
    title: "Game Development",
    description:
      "Developing immersive games using Unreal Engine 5 and C++. I integrate 3D assets, animations, AI systems, and gameplay mechanics to bring stories and interactive worlds to life.",
  },
  {
    title: "Blockchain & Web3 Integration",
    description:
      "Building decentralized apps (DApps) and smart contract systems using Solidity and Motoko. I specialize in integrating blockchain features such as tokenization, voting systems, and group wallets into modern applications.",
  },
  {
    title: "ERPNext Development",
    description:
      "Customizing and implementing ERPNext solutions to automate workflows, manage business operations, and integrate modules like accounting, HR, projects, and CRM for enhanced productivity.",
  },
  {
    title: "API Design & Integration",
    description:
      "Creating secure and efficient RESTful and GraphQL APIs for seamless communication between front-end and back-end systems, ensuring smooth data exchange and scalability.",
  },
  {
    title: "SEO & Performance Optimization",
    description:
      "Enhancing website visibility, accessibility, and speed through technical SEO strategies and performance tuning to achieve higher engagement and better user retention.",
  },
];

export const skillsData = {
  frontend: [
    { name: "JavaScript (ES6+)", level: 95, icon: "⚡" },
    { name: "React.js", level: 92, icon: "⚛️" },
    { name: "Tailwind CSS", level: 90, icon: "💨" },
  ],
  backend: [
    { name: "Node.js & Express", level: 90, icon: "🟢" },
    { name: "PostgreSQL & MongoDb", level: 90, icon: "🐘" },
    { name: "RESTful API Design", level: 93, icon: "🔌" },
    { name: "Authentication & Security", level: 87, icon: "🔐" },
  ],
  game: [
    { name: "C++ (Unreal Engine)", level: 85, icon: "⚙️" },
    { name: "Unreal Engine 5", level: 88, icon: "🎮" },
    { name: "Blender", level: 82, icon: "🎭" },
  ],
  blockchain: [
    { name: "Solidity (Smart Contracts)", level: 78, icon: "⛓️" },
    { name: "Web3.js / Ethers.js", level: 80, icon: "🌐" },
  ],
  tools: [
    { name: "Git & GitHub", level: 95, icon: "📦" },
    { name: "ERPNext Customization", level: 85, icon: "📋" },
  ],
};

const CATEGORIES = {
  ALL: "all",
  WEB: "web",
  BLOCKCHAIN: "blockchain",
  GAME: "game",
};

export const projects = [
  {
    id: 1,
    title: "JobsCorner.org",
    category: CATEGORIES.WEB,
    type: "Job Application Platform",
    description:
      "A comprehensive job application platform connecting job seekers with employers. Features include job listings, events listings, career tips and advanced search filters.",
    technologies: ["React", "Node.js", "PostgreSQL", "Express"],
    image: "/projects/jobscorner.png", // Add your screenshots to public/projects/
    liveUrl: "https://jobscorner.org",
    githubUrl: "", // Optional
    featured: true, // Featured projects take up more space
    comingSoon: false,
  },
  {
    id: 2,
    title: "JS Collection",
    category: CATEGORIES.WEB,
    type: "E-Commerce Platform",
    description:
      "Modern e-commerce website for selling bags, table mats, and kitchen gloves etc. Built with WhatApp integration, inventory management, and responsive design.",
    technologies: ["React", "Node.js", "PostgresSQL"],
    image: "/projects/jscollection.png",
    liveUrl: "https://jscollection.co.ke",
    githubUrl: "",
    featured: false,
    comingSoon: false,
  },
  {
    id: 3,
    title: "IGA Accounting Firm",
    category: CATEGORIES.WEB,
    type: "Corporate Website",
    description:
      "Professional website for an accounting firm featuring service showcases, client testimonials, blog section, and contact forms with modern UI/UX design.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    image: "/projects/iga.png",
    liveUrl: "https://iga.co.ke",
    githubUrl: "",
    featured: false,
    comingSoon: false,
  },
  // Future Blockchain Projects
  {
    id: 4,
    title: "DeFi Dashboard",
    category: CATEGORIES.BLOCKCHAIN,
    type: "Blockchain Application",
    description:
      "Decentralized finance dashboard for tracking crypto assets, staking rewards, and portfolio management. Built on Ethereum with smart contracts.",
    technologies: ["React", "Solidity", "Web3.js", "Ethers"],
    image: "/projects/defi-dashboard.jpg",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    comingSoon: true, // Shows "Coming Soon" badge
  },
  {
    id: 5,
    title: "NFT Marketplace",
    category: CATEGORIES.BLOCKCHAIN,
    type: "Web3 Platform",
    description:
      "Decentralized NFT marketplace for buying, selling, and minting digital assets. Features include auction system, royalty distribution, and wallet integration.",
    technologies: ["React", "Motoko", "Internet Computer", "Web3"],
    image: "/projects/nft-marketplace.jpg",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    comingSoon: true,
  },
  // Future Game Projects
  {
    id: 6,
    title: "Epic Adventure",
    category: CATEGORIES.GAME,
    type: "3D Action Game",
    description:
      "Immersive 3D action-adventure game with stunning environments, character progression, and engaging gameplay mechanics built in Unreal Engine 5.",
    technologies: ["Unreal Engine 5", "C++", "Blender"],
    image: "/projects/epic-adventure.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    comingSoon: true,
  },
];

// How to add new projects:
// 1. Take a screenshot of your project (1920x1080 or 16:9 aspect ratio recommended)
// 2. Save it to public/projects/ folder
// 3. Add a new object to this array following the structure above
// 4. Set comingSoon: false when the project is ready
// 5. Add liveUrl and optionally githubUrl
