# KORNG - 3D Frontend Portfolio

A cinematic and responsive portfolio for **Sophy Mengkorng**, a frontend developer and Management Information Systems student based in Phnom Penh, Cambodia.

The project combines a black-and-violet editorial design with lightweight 3D animation, scroll-based storytelling, custom project artwork, and an animated profile presentation.

## Features

- Responsive desktop, tablet, and mobile layouts
- GSAP-powered 3D hero scene and scroll animations
- Animated 3D profile portrait
- Custom project artwork built with CSS
- About, Projects, Skills, Contact, and Footer sections
- Poppins typography optimized through `next/font`
- Custom application favicon
- Smooth anchor navigation and scroll progress indicator
- Reduced-motion accessibility support
- Performance-conscious mobile animations

## Technology Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [GSAP](https://gsap.com/)
- [Motion](https://motion.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- Custom CSS

## Project Setup Process

Follow these steps to install, configure, and run the portfolio locally.

### 1. Install the requirements

Install the following software before running the project:

- Node.js 20 or newer
- npm
- Git

Confirm the installed versions:

```bash
node --version
npm --version
git --version
```

### 2. Clone the repository

```bash
git clone <your-repository-url>
cd my_portfolio
```

If the project already exists on your computer, open a terminal inside the `my_portfolio` folder.

### 3. Install the dependencies

```bash
npm install
```

This installs Next.js, React, GSAP, Motion, Bootstrap, TypeScript, and the other required packages.

### 4. Configure the portfolio content

Open:

```text
components/PortfolioExperience.tsx
```

Update the following information:

- Name and professional title
- About description
- Project titles and descriptions
- Technology lists
- Skills
- Location
- Contact message
- Contact email address

Replace the placeholder email:

```tsx
href="mailto:your-email@example.com"
```

### 5. Configure the profile image

Replace the existing image while keeping this filename and location:

```text
public/profilev2.jpg
```

A transparent PNG works best with the animated 3D frame.

### 6. Configure the favicon

Replace the following file with a square PNG:

```text
app/icon.png
```

Recommended dimensions: `512 x 512` pixels.

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Changes update automatically during development.

### 8. Validate the project

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Both commands should complete without errors before deployment.

### 9. Preview the production build

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) again to test the optimized production version.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run lint` | Checks the project with ESLint |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Runs the production build |

## Project Structure

```text
my_portfolio/
|-- app/
|   |-- globals.css       # Styling, responsive layout, and 3D effects
|   |-- icon.png          # Browser favicon
|   |-- layout.tsx        # Metadata, Poppins font, and root layout
|   `-- page.tsx          # Home page entry point
|-- components/
|   `-- PortfolioExperience.tsx  # Content and animation logic
|-- public/
|   `-- profilev2.jpg     # Profile portrait
|-- package.json          # Dependencies and npm scripts
|-- package-lock.json     # Locked dependency versions
`-- README.md
```

## Design Customization

### Colors

The main design colors are CSS variables at the beginning of:

```text
app/globals.css
```

### Typography

Poppins is loaded and optimized in:

```text
app/layout.tsx
```

Responsive font sizes and weights are configured in `app/globals.css`.

### Animations

GSAP animation timelines and ScrollTrigger settings are located in:

```text
components/PortfolioExperience.tsx
```

When adding animations, prefer `transform` and `opacity` for smoother rendering. Keep continuous animations limited to avoid performance issues.

## Accessibility and Performance

- Semantic navigation and section landmarks
- Visible keyboard focus states
- Descriptive profile image alternative text
- `prefers-reduced-motion` support
- Transform-based animations
- Reduced 3D effects on smaller screens
- Optimized images through Next.js Image
- Self-hosted Poppins font through Next.js

## Deployment Process

### Deploy with Vercel

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com/).
3. Select **Add New Project**.
4. Import the portfolio repository.
5. Keep the default Next.js build settings.
6. Select **Deploy**.

Vercel will run `npm run build` and provide a public website URL when deployment finishes.

## Pre-Deployment Checklist

- Replace the placeholder contact email
- Confirm the profile image loads correctly
- Confirm the favicon appears in a new browser tab
- Test navigation links
- Test desktop, tablet, and mobile layouts
- Test with reduced-motion enabled
- Run `npm run lint`
- Run `npm run build`
- Check spelling and project information

## Author

**Sophy Mengkorng**

Frontend Developer | Phnom Penh, Cambodia
