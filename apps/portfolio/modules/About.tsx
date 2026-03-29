"use client"

import React, { useRef } from "react"

function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  return (
    <section className="min-h-screen flex flex-col gap-4 p-4 sm:p-8 lg:p-20 relative overflow-hidden">
      <p
        ref={aboutRef}
        className="text-base sm:text-lg md:text-xl lg:text-4xl font-medium text-center lg:px-20 text-gray-700 leading-relaxed sm:leading-normal"
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
