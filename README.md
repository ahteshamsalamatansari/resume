# 🚀 AI Engineer Portfolio — Ahtesham Ansari

A premium, interactive, and high-performance developer portfolio and landing page designed for an AI Engineer. Built using Next.js 14, React Three Fiber (WebGL/Three.js), Tailwind CSS, Framer Motion, and Lenis Scroll.

---

## 🎨 Project Overview & Design System

The portfolio is structured to showcase **production GenAI systems, RAG workflows, MLOps, and big data engineering** with a futuristic, cinematic feel:

- **Cinematic Texture:** Features an animated noise grain overlay.
- **Dynamic 3D Hero Scene:** Built using React Three Fiber to display a live-rendered neural/particle field in the background.
- **Ultra-Smooth Scrolling:** Powered by Lenis Scroll to deliver native-feeling inertia scroll.
- **Micro-Interactions:** Includes a custom magnetic cursor and hover states to enhance UX.
- **Harmonious Color Palette:**
  - `Dark` (`#0A0A0A`): Futuristic base background.
  - `Primary` (`#1F6F5F`): Deep emerald branding.
  - `Secondary` (`#2FA084`): Vibrant teal secondary accents.
  - `Accent` (`#6FCF97`): Bright mint accent for highlights and active dots.
  - `Paper` (`#EEEEEE`): High-contrast off-white text.

---

## ⚡ Key Sections & Features

1. **Hero Section:** Live WebGL neural field backdrop, strong positioning statement, and automated metric highlights (50M+ processed records, 180ms latency, etc.).
2. **About Section:** Quick summary of experience and engineering focus.
3. **Skills Matrix:** Organized categories covering Generative AI, Vector & Retrieval, Cloud/MLOps, and Big Data Engineering.
4. **Projects & Deep Dives:** Showcases impact-driven projects with exact metrics and tech stacks.
5. **Interactive Case Studies:** Expanded breakdown of BizProspex and FunnelByte workflows.
6. **Experience Timeline:** Highlights impact, MLOps metrics, and previous achievements.
7. **Writing / Blog:** Highlights deep-dives in engineering, RAG latency, and LLM guardrails.
8. **Navigation & Magnetic Controls:** Magnetic menu buttons and magnetic call-to-actions.

---

## 🛠️ Tech Stack

- **Core:** [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) via [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) & [`@react-three/drei`](https://github.com/pmndrs/drei)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine.

### 📋 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- **npm** (comes bundled with Node.js) or another package manager (e.g. yarn, pnpm)

### 📥 1. Clone the Repository

Clone the project from GitHub and navigate into the directory:

```bash
git clone https://github.com/ahteshamsalamatansari/resume.git
cd resume
```

### 📦 2. Install Dependencies

Install all required node modules:

```bash
npm install
```

### 💻 3. Run the Development Server

Start the local Next.js server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the site live.

### 🏗️ 4. Build for Production

To create an optimized production build of the project:

```bash
npm run build
```

To run the production-built application locally:

```bash
npm run start
```

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── globals.css      # Custom utility classes, animation keyframes, grain overlay
│   │   ├── layout.tsx       # Root layout, Google fonts definition, metadata definitions
│   │   └── page.tsx         # Main entry point importing layout sections
│   ├── components/
│   │   ├── sections/        # Section-specific components (Hero, About, Projects, etc.)
│   │   ├── three/           # WebGL/Three.js canvases, particle fields & custom shaders
│   │   ├── Cursor.tsx       # Custom mouse follower utility
│   │   ├── Magnetic.tsx     # Magnetic force hover wrapper
│   │   ├── Nav.tsx          # Smooth overlay navigation menu
│   │   ├── Preloader.tsx    # Entrance loader screen
│   │   ├── SectionHeading.tsx # Reusable section titles
│   │   ├── SmoothScroll.tsx # Lenis wrapper configuration
│   │   └── TextReveal.tsx   # Character/word slide-in animations
│   └── lib/
│       └── data.ts          # Centralized data file (Skills, Projects, Experience, Contacts)
├── public/                  # Static assets & PDF resume downloads
├── package.json             # Scripts & dependencies
├── tailwind.config.js       # Custom design system tokens
└── tsconfig.json            # TypeScript configuration
```

---

## ✍️ Updating Content

All text, statistics, skills, case studies, and contact details are driven by a centralized config file. To update any information on the portfolio:

1. Open the data file: [`src/lib/data.ts`](file:///D:/Main/1-January/portfolio/resume/src/lib/data.ts)
2. Edit the corresponding constants:
   - `PROJECTS`
   - `CASE_STUDIES`
   - `EXPERIENCE`
   - `SKILL_GROUPS`
   - `METRICS`
   - `CONTACT`
3. Save the changes. The dev server will hot-reload instantly.

---

## 📩 Contact & Socials

- **Developer:** Ahtesham Salamat Ansari
- **Email:** ahteshamsalamat@gmail.com
- **Phone:** +91 74159 95966
- **Location:** India (GMT+5:30)
