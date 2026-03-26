import { About, Banner } from "../modules"
import Skills from "../modules/Skills"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <About />
      <Skills />
    </div>
  )
}
