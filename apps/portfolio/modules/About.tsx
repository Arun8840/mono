"use client"

import React, { useRef } from "react"

function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  return (
    <section className="min-h-screen flex flex-col gap-4 p-10 lg:p-20 relative overflow-hidden">
      <p
        ref={aboutRef}
        className="text-2xl lg:text-4xl font-medium text-center lg:px-20 z-10 text-gray-700"
      >
        Creates impactful digital experiences through design and frontend
        development, evolving from a foundation in design into specialized
        modern frontend solutions that transform wireframes into refined,
        performance-driven experiences.
      </p>
    </section>
  )
}

export default About
