"use client"
import React from "react"
interface SkillGroup {
  category: string
  items: string[]
}
function Skills() {
  const skills: SkillGroup[] = [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "HTML",
        "CSS",
        "JavaScript",
        "Tailwind CSS",
      ],
    },
    {
      category: "State Management",
      items: ["Zustand", "Redux"],
    },
    {
      category: "Animation & Design",
      items: ["GSAP", "Spline", "Aninix", "Figma"],
    },
    {
      category: "Backend & Database",
      items: [
        "Node.js",
        "Express.js",
        "Neon DB",
        "Drizzle",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo"],
    },
    {
      category: "Architecture & Tools",
      items: ["Turborepo", "Git", "Bun", "PNPM"],
    },
  ]
  return (
    <div className="w-full min-h-screen flex flex-col gap-y-5 p-5 lg:p-20 relative">
      <div className="container mx-auto size-full flex flex-col text-center  py-5">
        <h1 className="text-4xl font-bold py-2 font-sans">Skills</h1>
        <p className="text-3xl text-gray-600 font-caveat">
          Here are some of the technologies I have worked with:
        </p>
      </div>
      <svg
        className="absolute left-1/2 top-32 transform -translate-x-1/2"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="130"
        viewBox="0 0 100 130"
        fill="none"
      >
        <path
          d="M 30 0 C 50 20, 10 35, 50 55 C 70 65, 60 90, 50 110 C 45 120, 50 125, 50 125"
          stroke="blue"
          stroke-width="2.2"
          stroke-linecap="round"
        />
        <path
          d="M 43 118 L 50 128 L 57 118"
          stroke="blue"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div className="lg:w-1/2 mx-auto relative flex-1 flex flex-col justify-between">
        <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-primary transform -translate-x-1/2" />
        {skills.map((skillGroup, index) => (
          <div
            key={skillGroup.category}
            className="relative flex items-center mb-8 last:mb-0"
          >
            <div className="w-1/2 pr-3 text-right">
              <h3 className="font-sans font-semibold text-primary">
                {skillGroup.category}
              </h3>
            </div>
            <div className="w-1/2 pl-3">
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-secondary text-secondary-foreground font-medium rounded-full text-sm font-sans"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
