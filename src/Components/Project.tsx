

interface ProjectProps {
  title: string
  description: string
  client: string
  year: string
  role: string
  techStack: string[]
  image: string
}

const Project = ({ title, description, client, year, role, techStack, image }: ProjectProps) => {
  return (
    <section className='p-10'>
      <div className='grid grid-cols-2 rounded-2xl overflow-hidden shadow-2xl'>

        {/* Left - Image */}
        <section className='bg-linear-to-br from-[#00DED9] to-[#00303d] p-10 flex justify-center items-center'>
          <img
            className='rounded-2xl w-full object-cover shadow-xl hover:scale-105 transition-transform duration-500'
            src={image}
            alt={title}
          />
        </section>

        {/* Right - Content */}
        <section className='flex flex-col gap-5 p-10 bg-[#00303d]'>

          <span className='text-[rgb(61,191,174)] text-sm font-semibold uppercase tracking-widest'>
            Featured Project
          </span>

          <h1 className='font-bold text-4xl text-white leading-tight'>{title}</h1>

          <p className='text-gray-400 leading-relaxed'>{description}</p>

          <table className='w-full'>
            <thead><tr><th></th></tr></thead>
            <tbody className='divide-y divide-gray-700'>
              <tr>
                <td className="py-3 text-gray-500 text-sm uppercase tracking-wider w-24">Client</td>
                <td className="py-3 text-white font-medium">{client}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-500 text-sm uppercase tracking-wider">Year</td>
                <td className="py-3 text-white font-medium">{year}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-500 text-sm uppercase tracking-wider">Role</td>
                <td className="py-3 text-white font-medium">{role}</td>
              </tr>
            </tbody>
          </table>

          <div className='flex gap-2 flex-wrap'>
            {techStack.map(tech => (
              <span key={tech} className='px-3 py-1 text-xs rounded-full border border-[#00DED9] text-[#00DED9]'>
                {tech}
              </span>
            ))}
          </div>

          <div className='flex gap-3 mt-2'>
            <button className='bg-[#00DED9] text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity text-sm font-semibold'>
              Live Demo
            </button>
            <button className='border border-gray-600 text-white px-6 py-3 rounded-lg hover:border-[rgb(61,191,174)] hover:text-[rgb(61,191,174)] transition-colors text-sm font-semibold'>
              See on Github
            </button>
          </div>

        </section>
      </div>
    </section>
  )
}

export default Project