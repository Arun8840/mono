"use client"
import React, { useRef, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

const FLAIR_IMAGES = [
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
]

function playAnimation(shape: Element) {
  const tl = gsap.timeline()
  tl.fromTo(
    shape,
    { opacity: 0, scale: 0 },
    { opacity: 1, scale: 1, ease: "elastic.out(1, 0.3)" },
  )
    .to(shape, { rotation: "random([-360, 360])" }, "<0.5")
    .to(shape, { y: "120vh", ease: "back.in(.4)", duration: 1 }, 0)
}

function Banner() {
  const cardRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)
  const leftArrowRef = useRef<HTMLDivElement>(null)
  const rightArrowRef = useRef<HTMLDivElement>(null)
  const flairContainerRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: false })
      tl.fromTo(
        shimmerRef.current,
        {
          opacity: 0,
          x: -200,
          y: -100,
        },
        {
          opacity: 1,
          x: 600,
          y: 100,
          delay: 1,
          repeat: -1,
          duration: 2,
          repeatDelay: 4,
        },
      )
      tl.fromTo(
        cardRef.current,
        {
          y: 0,
        },
        {
          y: 1000,
          scale: 0.8,
          duration: 0.7,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top",
            end: "bottom",
            scrub: 1,
            onLeave: () => {
              gsap.to([leftArrowRef.current, rightArrowRef.current], {
                opacity: 1,
                duration: 0.5,
                stagger: 0.4,
              })
            },
            onEnterBack: () => {
              gsap.to([leftArrowRef.current, rightArrowRef.current], {
                opacity: 0,
                duration: 0.3,
                stagger: 0.1,
              })
            },
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

  useEffect(() => {
    const banner = bannerRef.current
    if (!banner) return

    const flair = document.querySelectorAll<HTMLImageElement>(".flair")
    if (flair.length === 0) return

    const gap = 100
    let index = 0
    const wrapper = gsap.utils.wrap(0, flair.length)
    const mousePos = { x: 0, y: 0 }
    let lastMousePos = { x: 0, y: 0 }

    gsap.defaults({ duration: 1 })

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX
      mousePos.y = e.clientY
    }

    banner.addEventListener("mousemove", handleMouseMove)

    function animateImage() {
      const wrappedIndex = wrapper(index)
      const img = flair[wrappedIndex]
      if (!img) return

      gsap.killTweensOf(img)
      gsap.set(img, { clearProps: "all" })
      gsap.set(img, {
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
      })

      playAnimation(img)
      index++
    }

    const tickerCallback = () => {
      const travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y,
      )

      if (travelDistance > gap) {
        animateImage()
        lastMousePos = { x: mousePos.x, y: mousePos.y }
      }
    }

    gsap.ticker.add(tickerCallback)

    return () => {
      banner.removeEventListener("mousemove", handleMouseMove)
      gsap.ticker.remove(tickerCallback)
    }
  }, [])

  const createRightArrow = () => {
    return (
      <div ref={rightArrowRef} className="hidden lg:flex flex-1 opacity-0">
        <div className="flex justify-start">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-20 text-yellow-500"
          >
            <path
              d="M10 50 C 25 45, 40 55, 70 50 L 90 50"
              strokeDasharray="3 3"
            />
            <path d="M82 42 L 91 50 L 82 58" fill="none" strokeWidth="4" />
          </svg>
        </div>

        <p className="text-muted-foreground  text-center">
          I build clean, maintainable systems where high-performance code meets
          intentional design. I thrive on bridging the gap between developers
          and designers to craft seamless, high-fidelity user experiences.
        </p>
      </div>
    )
  }
  const createLeftArrow = () => {
    return (
      <div
        ref={leftArrowRef}
        className="hidden lg:flex flex-col justify-end items-end flex-1 opacity-0"
      >
        <div className="flex justify-end">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-20 text-amber-500 rotate-180"
          >
            <path
              d="M10 80 C 30 70, 50 80, 70 40 L 80 20"
              strokeDasharray="2 4"
            />
            <path d="M72 23 L 81 19 L 83 29" fill="none" strokeWidth="4" />
          </svg>
        </div>
        <p className="text-muted-foreground text-center p-2 font-sans leading-relaxed">
          A frontend developer with
          <span className="text-primary bg-primary/20 p-1 -skew-y-4 mx-2 inline-block">
            4 years
          </span>
          of professional experience at
          <span className="text-primary">Zetta Stack Systems Pvt</span>. Ltd.
          I&apos;m passionate about creating responsive, interactive, and
          user-friendly web applications.
        </p>
      </div>
    )
  }
  return (
    <section
      ref={bannerRef}
      className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-8 lg:p-20 bg-black relative"
    >
      <div
        ref={flairContainerRef}
        className="fixed inset-0 pointer-events-none z-50"
      >
        {FLAIR_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="flair"
            className="flair absolute size-12 object-contain"
            style={{ opacity: 0, position: "fixed" }}
          />
        ))}
      </div>
      <div className="absolute size-full grid place-items-center ">
        <div className="w-full overflow-hidden whitespace-nowrap p-2">
          <div ref={marqueeRef} className="inline-block">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] uppercase font-extrabold inline-block text-white/10">
              Frontend Developer&nbsp;&nbsp;&nbsp;&nbsp;
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] uppercase font-extrabold inline-block text-white/10">
              Frontend Developer&nbsp;&nbsp;&nbsp;&nbsp;
            </h1>
          </div>
        </div>
      </div>

      <div
        ref={cardRef}
        className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8 z-1"
      >
        {createLeftArrow()}
        <div className="flex-1 self-center w-full max-w-sm p-3 rounded-lg flex flex-col gap-2 bg-primary z-10 relative overflow-hidden">
          <div className="w-20 h-3 rounded-full mx-auto mb-2 bg-white" />
          <div className="w-full sm:w-50 h-48 sm:h-60 mx-auto mb-2 relative">
            <Image
              src={"/bannerprofile.png"}
              alt="bannerprofile"
              fill
              className="object-cover"
              loading="lazy"
            />
            <div className="w-2 h-2 bg-lime-200 absolute -top-1 -left-1" />
            <div className="w-2 h-2 bg-lime-200 absolute -top-1 -right-1" />
            <div className="w-2 h-2 bg-lime-200 absolute -bottom-1 -left-1" />
            <div className="w-2 h-2 bg-lime-200 absolute -bottom-1 -right-1" />
          </div>

          <div className="flex-1 text-muted-foreground">
            <code className="text-center text-lg font-sans text-white">
              <pre>P.Arun</pre>
            </code>
            <code className="text-center text-sm font-sans font-thin text-white">
              <pre>[Frontend developer]</pre>
            </code>

            <div className="flex flex-wrap justify-center gap-2 py-3 font-medium">
              <span className="bg-lime-200 rounded-full px-2 text-xs">
                React
              </span>
              <span className="bg-lime-200 rounded-full px-2 text-xs">
                Next Js
              </span>
              <span className="bg-lime-200 rounded-full px-2 text-xs">
                TypeScript
              </span>
            </div>
          </div>

          <div className="border-t w-full border-dashed border-lime-200 my-3 sm:my-5 relative after:absolute after:-top-3.5 after:-left-3 after:w-3 after:h-7 after:bg-white after:rounded-r-full after:content-[''] before:absolute before:-top-3.5 before:-right-3 before:w-3 before:h-7 before:bg-white before:rounded-l-full before:content-['']" />

          <div className="hidden sm:flex items-center justify-center gap-1 overflow-hidden">
            {[
              0.5, 2.2, 1.4, 3, 0.2, 2.1, 1.8, 1, 2.4, 0.8, 3, 1.2, 2, 1.5, 0.2,
              2.6, 3, 1.1, 2.2, 1, 0.4, 2, 1.3, 3, 1, 2.5, 1.2, 0.2, 2, 1.7,
              1.1, 1, 2.8, 1.4, 0.2, 2.2, 1, 1.6, 2, 1.2, 3, 1.5, 2.1, 1, 0.2,
              2.4, 3, 1.2, 2.3, 1, 0.5, 2.1, 1.4, 3, 1.1, 2.7, 1.3, 0.2, 2.5,
            ].map((width, i) => (
              <div
                key={i}
                style={{ width: `${width}px` }}
                className="h-8 bg-lime-200"
              />
            ))}
          </div>

          <div className="p-4 flex justify-between items-center">
            <code>
              <pre className=" text-xs text-lime-200">CODE BY ARUN</pre>
            </code>

            <code>
              <pre className=" text-xs text-lime-200">2026</pre>
            </code>
          </div>

          <div
            ref={shimmerRef}
            className="bg-linear-30 from-white to-white w-20 h-full absolute -z-1 left-0 top-0 blur-2xl rotate-3"
          />
        </div>
        {createRightArrow()}
      </div>
    </section>
  )
}

export default Banner
