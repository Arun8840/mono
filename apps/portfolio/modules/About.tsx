"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import React, { useRef } from "react"

function About() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const pigRefs = useRef<(HTMLImageElement | null)[]>([])
  const paperClipRefs = useRef<(HTMLImageElement | null)[]>([])
  const paperPinRefs = useRef<(HTMLImageElement | null)[]>([])
  const pigPositions = [
    { top: "30%", left: "35%" },
    { top: "30%", left: "65%" },
    { top: "90%", left: "50%" },
  ]
  const paperClips = [
    { top: "40%", left: "25%" },
    { top: "30%", left: "55%" },
    { top: "80%", left: "35%" },
  ]
  const paperPins = [
    { top: "65%", left: "25%" },
    { top: "55%", left: "70%" },
    { top: "85%", left: "55%" },
  ]

  const tl = gsap.timeline({ paused: false })

  useGSAP(
    () => {
      tl.fromTo(
        aboutRef.current,
        {
          opacity: 0,
        },
        {
          y: -50,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 50%",
            end: "bottom 20%",
            scrub: 1,
          },
        },
      )

      pigRefs.current.forEach((pig, i) => {
        if (pig) {
          gsap.fromTo(
            pig,
            {
              scale: 0,
              opacity: 0,
              rotation: -180,
            },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 1,
              ease: "elastic.out(1, 0.4)",
              delay: 1.5 + i * 0.3,
            },
          )

          gsap.to(pig, {
            y: -15,
            duration: 2 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 3 + i * 0.3,
          })
        }
      })

      paperClipRefs.current.forEach((clip, i) => {
        if (clip) {
          gsap.fromTo(
            clip,
            {
              scale: 0,
              opacity: 0,
              rotation: 180,
            },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: 1.8 + i * 0.25,
            },
          )

          gsap.to(clip, {
            rotation: 10,
            duration: 1.5 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "50% 50%",
            delay: 2.5 + i * 0.3,
          })
        }
      })

      paperPinRefs.current.forEach((pin, i) => {
        if (pin) {
          gsap.fromTo(
            pin,
            {
              scale: 0,
              opacity: 0,
              rotation: -90,
            },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(2)",
              delay: 2 + i * 0.2,
            },
          )

          gsap.to(pin, {
            y: -10,
            rotation: 5,
            duration: 1.8 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 3 + i * 0.3,
          })
        }
      })
    },
    { scope: aboutRef },
  )

  return (
    <section className="min-h-screen flex flex-col gap-4 p-10 lg:p-20 relative overflow-hidden">
      <p
        ref={aboutRef}
        className="text-2xl lg:text-4xl font-medium text-center lg:px-20 z-10"
      >
        Creates impactful digital experiences through design and frontend
        development, evolving from a foundation in design into specialized
        modern frontend solutions that transform wireframes into refined,
        performance-driven experiences.
      </p>

      {pigPositions.map((pos, i) => (
        <Image
          ref={(el) => {
            pigRefs.current[i] = el
          }}
          key={`pig-${i}`}
          src={"/golderpig.avif"}
          width={80}
          height={80}
          alt="golden pig"
          className="absolute z-20"
          style={pos}
        />
      ))}

      {paperClips.map((pos, i) => (
        <Image
          ref={(el) => {
            paperClipRefs.current[i] = el
          }}
          key={`clip-${i}`}
          src={"/paperclip.avif"}
          width={150}
          height={150}
          alt="paperclip"
          className="absolute z-10"
          style={pos}
        />
      ))}

      {paperPins.map((pos, i) => (
        <Image
          ref={(el) => {
            paperPinRefs.current[i] = el
          }}
          key={`pin-${i}`}
          src={"/paperpin.avif"}
          width={70}
          height={70}
          alt="paper pin"
          className="absolute z-15"
          style={pos}
        />
      ))}
    </section>
  )
}

export default About
