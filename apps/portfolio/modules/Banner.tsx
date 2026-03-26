"use client"
import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

function Banner() {
  const cardRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: false })
      tl.fromTo(
        cardRef.current,
        {
          y: -100,
        },
        {
          y: 0,
          duration: 1,
        },
      )
      tl.fromTo(
        cardRef.current,
        {
          y: 0,
        },
        {
          y: 900,
          scale: 0.9,
          duration: 0.7,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top",
            end: "bottom",
            scrub: 1,
          },
        },
      )
      const marquee = marqueeRef.current
      if (!marquee) return

      gsap.set(marquee, { x: 0 })
      gsap.to(marquee, {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      })
    },
    { scope: cardRef },
  )

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-5 bg-white lg:p-20 relative">
      <div className="absolute size-full grid place-items-center ">
        <div className="w-full overflow-hidden whitespace-nowrap  p-2">
          <div ref={marqueeRef} className="inline-block">
            <h1 className="text-[10rem] uppercase font-extrabold inline-block text-muted">
              Frontend Developer&nbsp;&nbsp;&nbsp;&nbsp;
            </h1>
            <h1 className="text-[10rem] uppercase font-extrabold inline-block text-muted">
              Frontend Developer&nbsp;&nbsp;&nbsp;&nbsp;
            </h1>
          </div>
        </div>
      </div>

      <div
        ref={cardRef}
        className="self-center w-full max-w-sm p-3  rounded-lg flex flex-col gap-2 bg-primary z-10 relative overflow-hidden"
      >
        {/* // card tag */}
        <div className="w-20 h-3 rounded-full mx-auto mb-2 bg-white" />
        {/* // card image */}
        <div className="w-50 h-60 border border-dashed border-lime-300 mx-auto mb-2 relative">
          {/* // resize handler */}
          <Image
            src={"/bannerprofile.jpeg"}
            alt="bannerprofile"
            fill
            className="object-cover"
            loading="lazy"
          />
          <div className="w-2 h-2 bg-lime-200  absolute -top-1 -left-1" />
          <div className="w-2 h-2 bg-lime-200  absolute -top-1 -right-1" />
          <div className="w-2 h-2 bg-lime-200  absolute -bottom-1 -left-1" />
          <div className="w-2 h-2 bg-lime-200  absolute -bottom-1 -right-1" />
        </div>

        {/* //* title */}
        <div className="flex-1 text-white">
          <h1 className="text-center text-lg font-sans">P.Arun</h1>
          <h2 className="text-center text-sm font-sans font-thin">
            [Frontend developer]
          </h2>

          <div className="flex justify-center gap-2 py-3 text-black font-medium">
            <span className="bg-lime-200 rounded-full px-2 text-xs">Rect</span>
            <span className="bg-lime-200 rounded-full px-2 text-xs">
              Next Js
            </span>
            <span className="bg-lime-200 rounded-full px-2 text-xs">
              TypeScript
            </span>
          </div>
        </div>

        {/* // separator */}
        <div className="border-t w-full border-dashed border-lime-200 my-5 relative after:absolute after:-top-3.5 after:-left-3 after:w-3 after:h-7 after:bg-white after:rounded-r-full after:content-[''] before:absolute before:-top-3.5 before:-right-3 before:w-3 before:h-7 before:bg-white before:rounded-l-full before:content-['']" />

        {/* // bar code design */}
        <div className="flex items-center justify-center gap-1">
          {[
            0.5, 2.2, 1.4, 3, 0.2, 2.1, 1.8, 1, 2.4, 0.8, 3, 1.2, 2, 1.5, 0.2,
            2.6, 3, 1.1, 2.2, 1, 0.4, 2, 1.3, 3, 1, 2.5, 1.2, 0.2, 2, 1.7, 1.1,
            1, 2.8, 1.4, 0.2, 2.2, 1, 1.6, 2, 1.2, 3, 1.5, 2.1, 1, 0.2, 2.4, 3,
            1.2, 2.3, 1, 0.5, 2.1, 1.4, 3, 1.1, 2.7, 1.3, 0.2, 2.5,
          ].map((width, i) => (
            <div
              key={i}
              style={{ width: `${width}px` }}
              className="h-8 bg-lime-200"
            />
          ))}
        </div>

        {/* rights */}
        <div className="p-4 flex justify-between items-center">
          <code>
            <pre className=" text-xs text-lime-200">CODE BY ARUN</pre>
          </code>

          <code>
            <pre className=" text-xs text-lime-200">2026</pre>
          </code>
        </div>
      </div>
    </section>
  )
}

export default Banner
