export interface Skill {
  name: string
  color: string
  icon: React.ReactNode
}

export interface SkillGroup {
  category: string
  items: Skill[]
}

export const categorizedSkills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      {
        name: "React",
        color: "#61DAFB",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <circle cx="16" cy="16" r="3.2" fill="#61DAFB" />
            <ellipse
              cx="16"
              cy="16"
              rx="13"
              ry="5"
              stroke="#61DAFB"
              strokeWidth="1.4"
              fill="none"
            />
            <ellipse
              cx="16"
              cy="16"
              rx="13"
              ry="5"
              stroke="#61DAFB"
              strokeWidth="1.4"
              fill="none"
              transform="rotate(60 16 16)"
            />
            <ellipse
              cx="16"
              cy="16"
              rx="13"
              ry="5"
              stroke="#61DAFB"
              strokeWidth="1.4"
              fill="none"
              transform="rotate(120 16 16)"
            />
          </svg>
        ),
      },
      {
        name: "Next.js",
        color: "#000000",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect width="32" height="32" rx="3" fill="#000" />
            <path
              d="M8 22l2.4-9.6 5.6 7 5.6-7L24 22"
              stroke="#fff"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="11" r="1.8" fill="#fff" />
          </svg>
        ),
      },
      {
        name: "TypeScript",
        color: "#3178C6",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="2" y="2" width="28" height="28" rx="3" fill="#3178C6" />
            <path d="M17 22v-7h4v-2.6H11V15h4v7H17z" fill="#fff" />
            <path
              d="M24 19.5c0 1.4-1.1 2.8-3.4 2.8-2 0-3.3-1-3.9-2.4l2.2-.88c.36.84.96 1.22 1.72 1.22.72 0 1.1-.36 1.1-.86 0-.6-.48-.84-1.68-1.3-1-.38-2.32-.98-2.32-2.68 0-1.6 1.34-2.56 3.14-2.56 1.7 0 2.8.84 3.3 2.2l-2.06.84c-.26-.6-.72-.96-1.24-.96-.6 0-.96.28-.96.74 0 .48.46.72 1.56 1.14C22.94 17.22 24 17.9 24 19.5z"
              fill="#fff"
            />
          </svg>
        ),
      },
      {
        name: "HTML",
        color: "#E44D26",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <path d="M4 4l3.2 21L16 27l8.8-2L28 4H4z" fill="#E44D26" />
            <path d="M16 25l7.6-2.1L26 7H16v18z" fill="#F16529" />
            <path
              d="M16 13.4H11.8l-.3-2.8H16V8H8.6l.8 8H16v-2.6zm0 6.8v-2.6l-3.2-.88-.22-2.4H10l.4 4.6 5.58 1.56L16 20.2z"
              fill="#fff"
            />
            <path
              d="M16 13.4v2.6h3.4l-.34 3.84-3.06.84V23.4l5.56-1.56.66-7.4H16zm0-5.4v2.6H22l.22-2.6H16z"
              fill="#ebebeb"
            />
          </svg>
        ),
      },
      {
        name: "CSS",
        color: "#1572B6",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <path d="M4 4l3.2 21L16 27l8.8-2L28 4H4z" fill="#1572B6" />
            <path d="M16 25l7.6-2.1L26 7H16v18z" fill="#33A9DC" />
            <path
              d="M16 13.4H11.4l.22 2.8H16v-2.8zm0-5.4H8.6l.22 2.6H16V8zm0 11.6v2.6l-3.2-.88-.22-2.4H10l.4 4.6 5.58 1.56L16 25v-2.6z"
              fill="#fff"
            />
            <path
              d="M16 13.4v2.8h4.36l-.4 4.62-2.8.76V24.2l5.54-1.54.92-9.26H16zM16 8v2.6h6.44l.2-2.6H16z"
              fill="#ebebeb"
            />
          </svg>
        ),
      },
      {
        name: "JavaScript",
        color: "#F7DF1E",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect width="32" height="32" rx="3" fill="#F7DF1E" />
            <path
              d="M8 24.6l2.4-1.46c.46.82.9 1.52 1.9 1.52.98 0 1.6-.38 1.6-1.88V14h2.98v8.82c0 3.1-1.82 4.5-4.46 4.5-2.4 0-3.8-1.24-4.52-2.72zM18.8 24.3l2.4-1.4c.64 1.04 1.48 1.8 2.96 1.8 1.24 0 2.04-.62 2.04-1.48 0-1.02-.82-1.38-2.18-1.98l-.74-.32c-2.18-.92-3.62-2.08-3.62-4.52 0-2.26 1.72-3.98 4.4-3.98 1.92 0 3.3.66 4.28 2.42l-2.32 1.5c-.52-.92-1.08-1.28-1.96-1.28-.88 0-1.44.56-1.44 1.28 0 .9.56 1.26 1.88 1.82l.74.32c2.56 1.1 4 2.22 4 4.74 0 2.72-2.14 4.2-5 4.2-2.78 0-4.58-1.32-5.44-3.12z"
              fill="#000"
            />
          </svg>
        ),
      },
      {
        name: "Tailwind CSS",
        color: "#38BDF8",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <path
              d="M3 16C3 9 9 5 16 7.5 23 5 29 9 29 16 29 21 24.5 26.5 16 27 7.5 26.5 3 21 3 16z"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.4"
            />
            <path
              d="M7 12c2-1.5 5-2 9-1 4-1 7-.5 9 1M7 20c2 1.5 5 2 9 1 4 1 7 .5 9-1"
              stroke="#38BDF8"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M16 6v20"
              stroke="#38BDF8"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2 2"
            />
          </svg>
        ),
      },
    ],
  },
  {
    category: "State Management",
    items: [
      {
        name: "Zustand",
        color: "#FF6B35",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="3" y="3" width="26" height="26" rx="5" fill="#FF6B35" />
            <path
              d="M8 22c0-5 3.6-8.5 8-7 4.4-1.5 8 2 8 7H8z"
              fill="#fff"
              opacity="0.2"
            />
            <path
              d="M10 22c0-3.2 2.7-5.5 6-4.2 3.3-1.3 6 1 6 4.2H10z"
              fill="#fff"
            />
            <rect
              x="14.5"
              y="8"
              width="3"
              height="9"
              rx="1.5"
              fill="#fff"
              opacity="0.6"
            />
            <circle cx="16" cy="7" r="2.5" fill="#fff" />
          </svg>
        ),
      },
      {
        name: "Redux",
        color: "#764ABC",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="12" y="3" width="8" height="8" rx="1.5" fill="#764ABC" />
            <rect x="3" y="21" width="8" height="8" rx="1.5" fill="#764ABC" />
            <rect x="21" y="21" width="8" height="8" rx="1.5" fill="#764ABC" />
            <path
              d="M16 11v5M16 16L8 21M16 16l8 5"
              stroke="#764ABC"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },
  {
    category: "Animation & Design",
    items: [
      {
        name: "GSAP",
        color: "#0AE448",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="3" y="3" width="26" height="26" rx="5" fill="#0AE448" />
            <path
              d="M7 15.5h7M7 10h10M7 21h6"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M19 11.5l4.5 4-4.5 4"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        ),
      },
      {
        name: "Spline",
        color: "#1B4DFF",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="3" y="3" width="26" height="26" rx="5" fill="#1B4DFF" />
            <path
              d="M9 24l4-14 4 9 3-5 3 10"
              stroke="#fff"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        name: "Aninix",
        color: "#6D28D9",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="3" y="3" width="26" height="26" rx="5" fill="#6D28D9" />
            <circle
              cx="16"
              cy="16"
              r="5"
              stroke="#fff"
              strokeWidth="1.4"
              fill="none"
            />
            <circle cx="16" cy="16" r="2" fill="#fff" />
            <path
              d="M16 8V6M16 26v-2M8 16H6M26 16h-2M10.3 10.3L8.9 8.9M23.1 23.1l-1.4-1.4M10.3 21.7L8.9 23.1M23.1 8.9l-1.4 1.4"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ),
      },
      {
        name: "Figma",
        color: "#A259FF",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="3" y="3" width="11" height="11" rx="2.5" fill="#F24E1E" />
            <rect x="18" y="3" width="11" height="11" rx="2.5" fill="#FF7262" />
            <rect x="3" y="18" width="11" height="11" rx="5.5" fill="#A259FF" />
            <rect
              x="18"
              y="18"
              width="11"
              height="11"
              rx="2.5"
              fill="#1ABCFE"
            />
          </svg>
        ),
      },
    ],
  },
  {
    category: "Backend & Database",
    items: [
      {
        name: "Elysia.js",
        color: "#6EE7B7",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="2" y="2" width="28" height="28" rx="5" fill="#111" />
            <path
              d="M8 11h7c2.8 0 5 2.2 5 5s-2.2 5-5 5H8V11z"
              stroke="#6EE7B7"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 16h5"
              stroke="#6EE7B7"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="16" cy="16" r="2" fill="#6EE7B7" />
          </svg>
        ),
      },
      {
        name: "Neon DB",
        color: "#00E5BF",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <ellipse
              cx="16"
              cy="11"
              rx="10"
              ry="5"
              stroke="#00E5BF"
              strokeWidth="1.4"
              fill="none"
            />
            <path
              d="M6 11v5c0 2.76 4.48 5 10 5s10-2.24 10-5v-5"
              stroke="#00E5BF"
              strokeWidth="1.4"
              fill="none"
            />
            <path
              d="M6 16v5c0 2.76 4.48 5 10 5s10-2.24 10-5v-5"
              stroke="#00E5BF"
              strokeWidth="1.4"
              fill="none"
              opacity="0.4"
            />
          </svg>
        ),
      },
      {
        name: "Drizzle",
        color: "#C5F74F",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="2" y="2" width="28" height="28" rx="4" fill="#C5F74F" />
            <path
              d="M7 22V14l5 5 5-5v8M20 22v-8l5 4"
              stroke="#1a1a1a"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        name: "Better Auth",
        color: "#6C63FF",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="2" y="2" width="28" height="28" rx="5" fill="#18181B" />
            <path
              d="M8 20a8 8 0 1116 0"
              stroke="#6C63FF"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="16" cy="20" r="2.5" fill="#6C63FF" />
            <path
              d="M16 12V9M10 14l-2-2M22 14l2-2"
              stroke="#6C63FF"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ),
      },
      {
        name: "MongoDB",
        color: "#00684A",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <circle cx="16" cy="16" r="13" fill="#00684A" />
            <ellipse
              cx="16"
              cy="16"
              rx="5"
              ry="9"
              stroke="#00ED64"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M7 16h18"
              stroke="#00ED64"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M8 11.5c2 1 4.5 1.5 8 1.5s6-.5 8-1.5M8 20.5c2-1 4.5-1.5 8-1.5s6 .5 8 1.5"
              stroke="#00ED64"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
          </svg>
        ),
      },
      {
        name: "Node.js",
        color: "#339933",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <path
              d="M16 3l9 5.2v10.4L16 23.8 7 18.6V8.2L16 3z"
              fill="#339933"
            />
            <path
              d="M16 6.5l6.5 3.8v7.4L16 21.5l-6.5-3.8v-7.4L16 6.5z"
              fill="#fff"
            />
          </svg>
        ),
      },
      {
        name: "Express.js",
        color: "#000000",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect width="32" height="32" rx="3" fill="#000" />
            <text
              x="4"
              y="20"
              fill="#fff"
              fontFamily="sans-serif"
              fontWeight="bold"
              fontSize="10"
            >
              EX
            </text>
          </svg>
        ),
      },
      {
        name: "PostgreSQL",
        color: "#336791",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <path
              d="M16 4c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
              fill="#336791"
            />
          </svg>
        ),
      },
    ],
  },
  {
    category: "Mobile",
    items: [
      {
        name: "React Native",
        color: "#61DAFB",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect
              x="4"
              y="6"
              width="14"
              height="22"
              rx="2.5"
              fill="none"
              stroke="#61DAFB"
              strokeWidth="1.4"
            />
            <rect
              x="18"
              y="4"
              width="10"
              height="16"
              rx="2"
              fill="none"
              stroke="#61DAFB"
              strokeWidth="1.1"
              opacity="0.5"
            />
            <circle cx="11" cy="25" r="1.5" fill="#61DAFB" />
            <path
              d="M7 11h8M7 14.5h5M20 9h5M20 12h3"
              stroke="#61DAFB"
              strokeWidth="1.1"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ),
      },
      {
        name: "Expo",
        color: "#000020",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect width="32" height="32" rx="16" fill="#000020" />
            <path d="M16 8l8 14H8l8-14z" fill="#fff" />
          </svg>
        ),
      },
    ],
  },
  {
    category: "Architecture & Tools",
    items: [
      {
        name: "Git",
        color: "#F05032",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <circle cx="16" cy="16" r="13" fill="#F05032" />
            <path
              d="M10 19l1.6-7.2 4.4 5.4 4.4-5.4L22 19"
              stroke="#fff"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="11" r="2" fill="#fff" />
          </svg>
        ),
      },
      {
        name: "Turborepo",
        color: "#EF4444",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#EF4444" />
            <path d="M10 10l12 12M22 10L10 22" stroke="#fff" strokeWidth="2" />
          </svg>
        ),
      },
      {
        name: "Bun",
        color: "#F9F1E1",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <circle cx="16" cy="16" r="13" fill="#F9F1E1" />
            <path
              d="M12 14s1-2 4-2 4 2 4 2v6s0 2-4 2-4-2-4-2v-6z"
              fill="#000"
            />
          </svg>
        ),
      },
      {
        name: "PNPM",
        color: "#F69220",
        icon: (
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <rect x="6" y="6" width="8" height="8" fill="#F69220" />
            <rect x="18" y="6" width="8" height="8" fill="#F69220" />
            <rect x="6" y="18" width="8" height="8" fill="#F69220" />
            <rect x="18" y="18" width="8" height="8" fill="#F69220" />
          </svg>
        ),
      },
    ],
  },
]
