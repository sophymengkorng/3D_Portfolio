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
    image: "/projects/student-assistant-dashboard.png",
    imageAlt: "Student Assistant dashboard showing classes, tasks, documents, and schedule overview",
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
    title: "Pokemon\nEcommerce",
    shortTitle: "Pokemon Ecommerce Project",
    description: "A responsive Pokémon ecommerce storefront with product discovery, Search, Filtering, Favorites, Cart management, And a simulated checkout flow.",
    technologies: ["HTML", "CSS", "JavaScript", "PokeAPI"],
    category: "E-commerce",
    className: "commerce",
    image: "/projects/pokemon-marketplace.png",
    imageAlt: "Homepage of the Pokemon ecommerce project",
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
];

export const projectCategories = ["All", "Full Stack", "Frontend", "E-commerce"] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
