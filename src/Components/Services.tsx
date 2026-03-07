import React from 'react'
import { MdOutlineDeveloperMode } from "react-icons/md";
import { TbDeviceMobileCode } from "react-icons/tb";
import { FaLaptop } from "react-icons/fa";

const Services = () => {
  return (
      <section className='flex flex-col gap-10 py-16'>
        <div className='text-center mb-10'>
            <span className='text-black text-sm font-semibold uppercase tracking-widest'>
            Services
            </span>
            <h1 className='text-4xl font-bold text-[#00DED9] mt-2'>What We Do?</h1>
            <p className='text-gray-400 mt-3 max-w-xl mx-auto'>
            We design and build modern websites and mobile applications tailored to your business needs.
            </p>
      </div>
        <section className='flex flex-initial justify-between p-4 gap-6'>

            {/* <section className=''>
                <img className='h-40 w-auto' src="./src/Pictures/web-dev.jpg" alt="" />
                <section className='flex flex-col justify-center items-center w-80 p-6 rounded-2xl border border-[#00DED9] shadow-[0_0_20px_rgba(61,191,174,0.3)] hover:shadow-[0_0_35px_rgba(61,191,174,0.6)] transition-shadow duration-300'>
                    <MdOutlineDeveloperMode className="text-5xl text-[#00DED9] mb-3" />
                    <h1 className='text-black font-bold text-lg mb-2'>Web Development</h1>
                    <p className="text-gray-500 text-sm text-center leading-relaxed">
                    We build powerful web applications using modern technologies like React and Node.js —
                    secure, scalable, and tailored to turn your idea into a real business.
                    </p>
                </section>
            </section> */}
            <section className='flex flex-col w-80 rounded-2xl border border-[#00DED9] shadow-[0_0_20px_rgba(61,191,174,0.3)] hover:shadow-[0_0_35px_rgba(61,191,174,0.6)] transition-all duration-300 overflow-hidden group'>
  
                    {/* Image with overlay + floating icon */}
                    <div className='relative w-full h-44 overflow-hidden'>
                        <img
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        src='./src/Pictures/web-dev.jpg'
                        alt='Web development'
                        />
                        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90' />
                        <div className='absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md border border-[#00DED9]/30'>
                        <MdOutlineDeveloperMode className='text-4xl text-[#00DED9]' />
                        </div>
                    </div>

                    {/* Text content */}
                    <div className='flex flex-col items-center p-6 pt-4 text-center'>
                        <h1 className='text-black font-bold text-lg mb-2'>Web Development</h1>
                        <p className='text-gray-500 text-sm leading-relaxed'>
                        We build powerful web applications using modern technologies like React and Node.js —
                        secure, scalable, and tailored to turn your idea into a real business.
                        </p>
                    </div>

                </section>
            

            <section className='flex flex-col w-80 rounded-2xl border border-[#00DED9] shadow-[0_0_20px_rgba(61,191,174,0.3)] hover:shadow-[0_0_35px_rgba(61,191,174,0.6)] transition-all duration-300 overflow-hidden group'>
                <div className='relative w-full h-44 overflow-hidden'>
                    <img
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    src='./src/Pictures/mob-dev.jpg'
                    alt='Mobile development'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90' />
                    <div className='absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md border border-[#00DED9]/30'>
                    <TbDeviceMobileCode className='text-4xl text-[#00DED9]' />
                    </div>
                </div>
                <div className='flex flex-col items-center p-6 pt-4 text-center'>
                    <h1 className='text-black font-bold text-lg mb-2'>Mobile Development</h1>
                    <p className='text-gray-500 text-sm leading-relaxed'>
                    We craft smooth, responsive mobile apps for iOS and Android using React Native —
                    delivering a native experience with a single codebase.
                    </p>
                </div>
                </section>

                <section className='flex flex-col w-80 rounded-2xl border border-[#00DED9] shadow-[0_0_20px_rgba(61,191,174,0.3)] hover:shadow-[0_0_35px_rgba(61,191,174,0.6)] transition-all duration-300 overflow-hidden group'>
                <div className='relative w-full h-44 overflow-hidden'>
                    <img
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    src='./src/Pictures/ui-dev.jpg'
                    alt='UI UX design'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90' />
                    <div className='absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md border border-[#00DED9]/30'>
                    <FaLaptop className='text-4xl text-[#00DED9]' />
                    </div>
                </div>
                <div className='flex flex-col items-center p-6 pt-4 text-center'>
                    <h1 className='text-black font-bold text-lg mb-2'>UI / UX Design</h1>
                    <p className='text-gray-500 text-sm leading-relaxed'>
                    We design clean, intuitive interfaces that users love — focused on usability,
                    visual harmony, and creating experiences that keep people coming back.
                    </p>
                </div>
                </section>

        </section>
      </section>
  )
}

export default Services