"use client"
import React from "react"
import { categorizedSkills } from "../data/skills"
import { Button } from "@repo/ui/components"
interface SkillGroup {
  category: string
  items: string[]
}

function Skills() {
  return (
    <div className="w-full min-h-screen flex flex-col p-5 lg:p-20 relative">
      <div className="container mx-auto size-full flex flex-col text-center">
        {/* <h1 className="text-4xl font-bold py-2 font-sans">Skills</h1> */}
        <p className="text-3xl text-gray-700 ">
          <span className="font-sans font-semibold">
            Here are some of the &nbsp;
          </span>
          <span className="bg-lime-200 text-primary px-2 -skew-y-3 rotate-2 inline-block font-caveat">
            technologies
          </span>
          <span className="font-sans font-semibold">
            &nbsp; I have worked with:
          </span>
        </p>
      </div>
      {/* {createStickyNotes()} */}
      <svg
        className="mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="130"
        viewBox="0 0 100 130"
        fill="none"
      >
        <path
          d="M 30 0 C 50 20, 10 35, 50 55 C 70 65, 60 90, 50 110 C 45 120, 50 125, 50 125"
          stroke="blue"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 43 118 L 50 128 L 57 118"
          stroke="blue"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="lg:w-1/2 mx-auto relative flex-1 flex flex-col justify-between">
        <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-primary transform -translate-x-1/2" />

        {categorizedSkills.map((skillGroup, index) => (
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
                  <div
                    key={item?.name}
                    className="px-3 py-1 text-secondary-foreground font-medium rounded-full text-sm font-sans flex items-center"
                  >
                    <span className="mr-2"> {item?.icon} </span>
                    <span>{item?.name}</span>
                  </div>
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
