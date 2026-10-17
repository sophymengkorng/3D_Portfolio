export const skillGroups = [
  { label: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Angular"] },
  { label: "Programming", items: ["C#", "C++", "Python"] },
  { label: "UI & Data", items: ["Bootstrap", "Responsive Design", "REST API", "Supabase", "JSON"] },
  { label: "Tools", items: ["Git", "GitHub", "VS Code", "Vercel", "Figma"] },
  { label: "Productivity", items: ["Microsoft Word", "Microsoft PowerPoint", "Microsoft Excel", "Microsoft Access"] },
] as const;

export const learningTopics = [
  "Object-Oriented Programming",
  "Software Architecture",
  "Software Design & Development",
  "Modern Web Development",
  "Relational Database Design",
  "SQL Database Management",
  "Network Fundamentals",
  "Git & GitHub Workflows",
  "Data Structures & Algorithms",
] as const;

export const coreStrengths = ["Problem Solving", "Database Design", "Research", "Teamwork", "Communication", "Thoughtful Design"] as const;

export const languages = [
  { name: "Khmer", level: "Native", progress: 100 },
  { name: "English", level: "Developing professional proficiency", progress: 72 },
] as const;

export const careerInterests = ["Software Development", "Information Systems", "Database Management", "Web Development", "System Analysis & Design", "Technology Innovation"] as const;

export const experience = [
  {
    period: "OCT 2025 - FEB 2026",
    title: "Data Entry Intern",
    organization: "Scholarar",
    description: "Supported accurate education-data entry and verification while developing stronger research, Organization, And quality-control habits.",
    tags: ["Data Entry", "Research", "Accuracy", "Teamwork"],
  },
] as const;

export const education = [
  {
    period: "2025 - PRESENT",
    title: "Bachelor's Degree in Management Information System",
    organization: "SETEC Institute",
    level: "Year 2 · Semester 2",
    description: "Currently completing Year 2, Semester 2 with coursework spanning advanced web development, C# programming, Networking, Database server applications, And multimedia design.",
    courses: [
      "Networking II",
      "C# Programming III",
      "Web Development III",
      "Drawing Skills for Multimedia",
      "Database Server Application II",
      "Studio Multimedia I",
      "3D Graphic Design",
      "Studio Photography II",
      "Applied Computer Design",
    ],
  },
  {
    period: "2024 - 2025",
    title: "Intensive English for Academic Purposes",
    organization: "Paññāsāstra University of Cambodia",
    description: "Completed Core English and Writing Skills through the Intensive English for Academic Purposes program.",
  },
  {
    period: "2021 - 2023",
    title: "High School",
    organization: "Hun Sen Khcao High School",
    description: "Completed high school education with a strong academic foundation and growing interest in technology.",
  },
  {
    period: "2018 - 2020",
    title: "Secondary School",
    organization: "Hun Sen Khcao Secondary School",
    description: "Completed secondary school education and developed the learning foundation for further academic study.",
  },
  {
    period: "2012 - 2017",
    title: "Primary School",
    organization: "Thlock Chrov Primary School",
    description: "Completed primary education and established a strong foundation for continued learning.",
  },
] as const;

export const achievements = [
  {
    number: "01",
    title: "Academic English Program",
    detail: "Completed the Intensive English for Academic Purposes program at PUC in 2025.",
  },
  {
    number: "02",
    title: "Student Management System",
    detail: "Built a Python and JSON application for creating, Retrieving, Updating, And organizing student records.",
  },
  {
    number: "03",
    title: "Bank Account System",
    detail: "Created a C++ program for account creation, Deposits, Withdrawals, Transfers, And balance management.",
  },
] as const;

export const contactLinks = [
  { label: "EMAIL", value: "sophymengkorng@gmail.com", href: "mailto:sophymengkorng@gmail.com" },
  { label: "TELEGRAM", value: "@sophymengkorng", href: "https://t.me/sophymengkorng" },
  { label: "GITHUB", value: "github.com/sophymengkorng", href: "https://github.com/sophymengkorng" },
  { label: "FACEBOOK", value: "Sophy Mengkorng", href: "https://www.facebook.com/sophymengkorng168" },
] as const;
