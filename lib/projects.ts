export type Project = {
  number: string;
  slug: string;
  type: string;
  title: string;
  shortTitle: string;
  description: string;
  technologies: string[];
  category: "Full Stack" | "Frontend" | "E-commerce";
  className: "commerce" | "portfolio" | "api";
  image: string;
  imageAlt: string;
  liveUrl: string;
  sourceUrl: string;
  role: string;
  challenge: string;
  approach: string;
  outcome: string;
  contribution: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "student-classwork-automation",
    type: "PRODUCTIVITY / FULL STACK",
    title: "Student\nAssistant",
    shortTitle: "Student Classwork Automation",
    description: "A secure student assistant for managing schedules, Tasks, Documents, Profiles, And deadline notifications in one responsive workspace.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    category: "Full Stack",
    className: "api",
    image: "/projects/classwork-management.png",
    imageAlt: "Login screen of the Student Classwork Automation application",
    liveUrl: "https://classworkmanagement.vercel.app",
    sourceUrl: "https://github.com/sophymengkorng/classworkmanagement",
    role: "Full-stack developer and interface designer",
    challenge: "Students need one dependable place to track classes, Assignments, Files, And approaching deadlines without mixing school information across multiple tools.",
    approach: "I structured the application around protected Next.js routes, Reusable feature modules, And Supabase services for authentication, Database records, And file storage.",
    outcome: "The result is a responsive student workspace with private user data, Practical task workflows, Document management, And deadline reminders.",
    contribution: "I designed and developed the application structure, Authentication flow, Dashboard, Task APIs, Document workflows, Profile management, And notification experience.",
    highlights: ["Supabase authentication and protected pages", "Task create, Edit, Complete, And delete workflows", "Document upload, Preview, Replacement, And download", "Deadline notifications with saved read status"],
  },
  {
    number: "02",
    slug: "genz-pokemon-marketplace",
    type: "COMMERCE / FRONTEND",
    title: "Pokémon\nMarketplace",
    shortTitle: "Genz Pokémon Marketplace",
    description: "A responsive trading-card storefront with product discovery, Search, Filtering, Favorites, Cart management, And a simulated checkout flow.",
    technologies: ["HTML", "CSS", "JavaScript", "PokeAPI"],
    category: "E-commerce",
    className: "commerce",
    image: "/projects/pokemon-marketplace.png",
    imageAlt: "Homepage of the Genz Pokémon card marketplace",
    liveUrl: "https://genzpokemonstore.vercel.app/",
    sourceUrl: "https://github.com/sophymengkorng/Ecommerce",
    role: "Frontend developer",
    challenge: "A product-heavy card marketplace needed clear discovery tools and persistent shopping interactions while remaining easy to use across desktop and mobile screens.",
    approach: "I built reusable JavaScript product rendering, URL-based category filtering, Local-storage favorites and cart state, And PokeAPI-powered product information.",
    outcome: "The project delivers a complete multi-page storefront demonstration with responsive navigation, Product details, Cart calculations, And checkout validation.",
    contribution: "I implemented the interface, Product catalog, Search and sorting tools, Favorites, Cart logic, API integration, Responsive navigation, And simulated checkout experience.",
    highlights: ["Search, Categories, Price filters, And sorting", "Persistent favorites and shopping cart", "PokeAPI product-detail integration", "Responsive multi-page checkout journey"],
  },
  {
    number: "03",
    slug: "mini-pos-product",
    type: "RETAIL / FRONTEND",
    title: "Mini POS\nSystem",
    shortTitle: "Mini POS Product System",
    description: "A responsive point-of-sale interface for managing products, Building customer orders, Calculating totals, And handling payments in USD or KHR.",
    technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
    category: "Frontend",
    className: "api",
    image: "/projects/mini-pos.png",
    imageAlt: "Product management dashboard of the Mini POS system",
    liveUrl: "https://miniposproduct.vercel.app/product_management.html",
    sourceUrl: "https://github.com/sophymengkorng/mini_pos_product",
    role: "Frontend developer",
    challenge: "A small retail workflow needed a clear way to manage inventory and process orders without requiring a complex backend or difficult interface.",
    approach: "I created connected product-management and checkout screens with browser-based storage, Search, Editable product records, Live order calculations, And responsive layouts.",
    outcome: "The finished system demonstrates an end-to-end point-of-sale workflow covering products, Orders, Currency conversion, Payment input, And change calculation.",
    contribution: "I developed the product dashboard, Create and edit workflows, Searchable catalog, Order controls, Total calculations, USD and KHR payment handling, And responsive interface.",
    highlights: ["Create, Edit, Search, And delete products", "Persistent browser-based product data", "Order quantity and total calculations", "USD and KHR payment and change handling"],
  },
  {
    number: "04",
    slug: "midterm-portfolio",
    type: "IDENTITY / FRONTEND",
    title: "Personal\nPortfolio",
    shortTitle: "Midterm Personal Portfolio",
    description: "A responsive personal website presenting my background, Education, Projects, Skills, And contact information through a clean Bootstrap interface.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    category: "Frontend",
    className: "portfolio",
    image: "/projects/midterm-portfolio.png",
    imageAlt: "Homepage of Sophy Mengkorng's midterm personal portfolio",
    liveUrl: "https://midtermportfolio.vercel.app/",
    sourceUrl: "https://github.com/sophymengkorng/midterm-portfolio",
    role: "Frontend developer and designer",
    challenge: "The project needed to organize personal, Academic, And technical information into a clear single-page experience that works across screen sizes.",
    approach: "I structured the page into reusable Bootstrap sections and combined custom CSS, Responsive navigation, Project cards, Skill groups, And contact links into one consistent interface.",
    outcome: "The result is an accessible introductory portfolio that communicates my MIS studies, Early programming work, Technical interests, And professional direction.",
    contribution: "I designed and built the full page, Including its navigation, Hero, Profile presentation, Education timeline, Project summaries, Skill cards, And contact section.",
    highlights: ["Responsive Bootstrap layout", "Education and background timeline", "Project and skill presentation", "Single-page anchor navigation"],
  },
  {
    number: "05",
    slug: "3d-portfolio",
    type: "IDENTITY / WEB",
    title: "3D\nPortfolio",
    shortTitle: "3D Developer Portfolio",
    description: "A cinematic personal portfolio combining editorial typography, Responsive layouts, Real project case studies, And performance-conscious 3D motion.",
    technologies: ["Next.js", "TypeScript", "GSAP", "Motion"],
    category: "Frontend",
    className: "portfolio",
    image: "/projects/portfolio-3d.png",
    imageAlt: "Hero section of Sophy Mengkorng's 3D developer portfolio",
    liveUrl: "https://korngportfolio.vercel.app/",
    sourceUrl: "https://github.com/sophymengkorng/3D_Portfolio",
    role: "Frontend developer and visual designer",
    challenge: "The portfolio needed a memorable identity while keeping projects readable, Navigation accessible, And animation responsive on different devices.",
    approach: "I combined a reusable Next.js structure with GSAP scroll timelines, Lightweight CSS 3D elements, Optimized images, Responsive breakpoints, And reduced-motion support.",
    outcome: "The result is a distinctive portfolio system that presents verified work, Technical skills, Education, And professional goals through one consistent visual language.",
    contribution: "I created the visual direction, Component structure, Project data model, Responsive interface, SEO system, And interactive motion behavior.",
    highlights: ["GSAP-powered scroll storytelling", "Responsive 3D hero and profile presentation", "Dynamic project case-study routes", "SEO, Sitemap, Social cards, And structured data"],
  },
];

export const projectCategories = ["All", "Full Stack", "Frontend", "E-commerce"] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
