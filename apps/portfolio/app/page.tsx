import { About, Banner } from "../modules"
import Projects from "../modules/Projects"
import Skills from "../modules/Skills"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <About />
      <Skills />
      <Projects />
    </div>
  )
}
