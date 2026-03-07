import { useState } from 'react'
import Project from './Project'

const projectsData = [
  {
    title: "Tourism Platform",
    description: "Discover the beauty of nature through responsible travel experiences that protect the environment and support local communities.Explore eco-friendly destinations, sustainable tours, and adventures designed to preserve our planet for future generations.",
    client: "Wail Benoulha",
    year: "2025",
    role: "Full Stack",
    techStack: ['React', 'Django', 'Postgresql', 'Tailwind'],
    image: "./src/Pictures/eco-tourism.jpg"
  },
  {
    title: "E-Commerce Fashion Store",
    description: "A full-featured online fashion store with product catalog, shopping cart, secure payment integration, and an admin dashboard for managing inventory, orders, and customers in real time.",
    client: "Sara Meziani",
    year: "2024",
    role: "Full Stack",
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: "./src/Pictures/ecomm.jpg"
  },
  {
    title: "AI Resume Builder",
    description: "A smart resume builder powered by AI that helps users generate professional resumes in seconds. Users answer a few questions and the platform crafts a tailored, ATS-friendly resume.",
    client: "Karim Boudali",
    year: "2024",
    role: "Frontend",
    techStack: ['React', 'OpenAI', 'Tailwind', 'Firebase'],
    image: "./src/Pictures/ai-resume.jpg"
  },
]

const Projects = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState('')
  const [animating, setAnimating] = useState(false)

  const navigate = (dir: 'left' | 'right') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)

    setTimeout(() => {
      setCurrent(prev =>
        dir === 'right'
          ? (prev === projectsData.length - 1 ? 0 : prev + 1)
          : (prev === 0 ? projectsData.length - 1 : prev - 1)
      )
      setAnimating(false)
    }, 400)
  }

  const getAnimationClass = () => {
    if (!animating) return 'translate-x-0 opacity-100'
    return direction === 'right'
      ? '-translate-x-16 opacity-0'
      : 'translate-x-16 opacity-0'
  }

  return (
    <section className='py-16'>

      {/* Header */}
      <div className='text-center mb-10'>
        <span className='text-black text-sm font-semibold uppercase tracking-widest'>
          Portfolio
        </span>
        <h1 className='text-4xl font-bold text-[#00DED9] mt-2'>Our Projects</h1>
        <p className='text-gray-400 mt-3 max-w-xl mx-auto'>
          A selection of projects we've built for our clients.
        </p>
      </div>

      {/* Slider */}
      <div className='relative'>

        {/* Left Arrow */}
        <button
          onClick={() => navigate('left')}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#00DED9] hover:opacity-80 text-white w-10 h-10 text-2xl rounded-full flex items-center justify-center shadow-lg transition-opacity'
        >
          ‹
        </button>

        {/* Animated Project */}
        <div className={`transition-all duration-400 ease-in-out ${getAnimationClass()}`}>
          <Project {...projectsData[current]} />
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => navigate('right')}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[rgb(61,191,174)] hover:opacity-80 text-white w-10 h-10 text-2xl rounded-full flex items-center justify-center shadow-lg transition-opacity'
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className='flex justify-center gap-2 mt-6'>
        {projectsData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!animating) {
                setDirection(index > current ? 'right' : 'left')
                setAnimating(true)
                setTimeout(() => {
                  setCurrent(index)
                  setAnimating(false)
                }, 400)
              }
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === current ? 'bg-[rgb(61,191,174)]' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

    </section>
  )
}

export default Projects