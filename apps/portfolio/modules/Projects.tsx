"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import React, { useRef } from "react"

const projectsItems = [
  {
    id: 1,
    title: "Static Company Website",
    description:
      "Developed a fully static company website using React and Next.js for high performance and SEO optimization.Designed a clean and professional layout to effectively showcase company services and team profiles.Implemented responsive design using Tailwind CSS to ensure compatibility across all devices.Integrated static content management using Markdown for easy updates by non-technical team members.Deployed the site on Vercel for seamless hosting and fast load times.Enhanced site accessibility by adhering to WCAG standards for inclusive user experience.",
    image:
      "https://images.unsplash.com/photo-1506744038136-49a8b38d2bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "https://zetta-stackpvt.vercel.app/",
  },
  {
    id: 2,
    title: "Jira Clone",
    description:
      "Developed a comprehensive component library using Next.js, Hono.js, Zod, and ShadCN UI.Integrated essential components including buttons, modals, and dropdowns to ensure a cohesive UI experience.Streamlined the library for seamless integration across various sections of the Jira clone project.Privately deployed the package to facilitate team collaboration within the project.Accelerated development cycles by leveraging reusable components across different features and functionalities.",
    image:
      "https://images.unsplash.com/photo-1506744038136-49a8b38d2bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "https://jira-clone-two-sigma.vercel.app/",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Built a personal portfolio website to showcase projects and skills.Utilized Tailwind CSS for modern design and responsiveness.Deployed on Vercel with custom domain integration.",
    image:
      "https://images.unsplash.com/photo-1506744038136-49a8b38d2bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "https://my-portfolio-mu-one-77.vercel.app/",
  },
  {
    id: 4,
    title: "Reusable Components Library",
    description:
      "Created a reusable component library using React and `simple-react-components` npm package.Implemented components such as buttons, modals, and dropdowns for consistent UI design.Optimized the library for easy integration across multiple projects.Published the package privately for use in team projects.Improved development speed by reusing pre-built components across applications.",
    image:
      "https://images.unsplash.com/photo-1506744038136-49a8b38d2bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "#",
  },

  {
    id: 5,
    title: "Site Builder",
    description:
      "A professional-grade visual engine featuring a drag-and-drop canvas, real-time property editing, and a type-safe backend architecture using ElysiaJS and Drizzle ORM.",
    image: "/projects/site-builder-preview.png",
    link: "https://apis-ten-sepia.vercel.app/",
    status: "In Progress",
    tags: ["ElysiaJS", "Neon DB", "Shadcn UI", "Drizzle"],
  },
]

function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(
    () => {
      if (!containerRef.current) return
      gsap.fromTo(
        containerRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.5,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom",
          },
        },
      )
    },
    { scope: containerRef },
  )
  return (
    <section className="min-h-screen flex flex-col lg:p-10">
      <h1 className="text-4xl font-bold p-5 lg:p-10 font-sans text-center text-gray-700">
        My Works
      </h1>
      <div
        ref={containerRef}
        className="flex-1 flex flex-col gap-4 p-4 divide-y"
      >
        {projectsItems?.map((pro, proIdx) => {
          return (
            <div
              key={`${pro?.id}-${pro?.title}_${proIdx}`}
              className="flex justify-center gap-4 w-full max-w-5xl mx-auto"
            >
              <h1 className="text-xl flex-1">
                <span className="text-primary text-xl font-caveat">
                  {proIdx + 1}.&nbsp;
                </span>
                <span className="text-gray-700"> {pro?.title}</span>
              </h1>

              <div className="space-y-2 pb-2">
                <p className="w-full max-w-md text-muted-foreground pb-2 text-sm">
                  {pro?.description}
                </p>
                <Link
                  href={pro?.link}
                  className="text-primary text-sm hover:underline"
                >
                  {pro?.link}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
