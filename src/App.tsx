import NavBar from './Components/NavBar'
import Hero from './Components/Hero'
import Services from './Components/Services'
import Projects from './Components/Projects'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import About from './Components/About'

function App() {
  return (
    <>
      <div className="max-w-[80%] mx-auto">
        <NavBar/>
        <Hero/>
        <About/>
        <Services/>
        <Projects/>
        <Contact/>
      </div>
      <Footer/>  
    </>
  )
}

export default App