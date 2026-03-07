import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { GrLinkedin } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className='bg-[#00303d] border-t border-gray-800 mt-20 py-12 p-10'>

      <div className='grid grid-cols-3 gap-10 mb-10'>

        {/* Brand */}
        <div className='flex flex-col gap-4'>
          <img src="./src/Pictures/tizart.png" className='h-10 w-40' alt="Tizart Logo" />
          <p className='text-gray-300 text-sm leading-relaxed'>
            Tizart Agency is a modern digital agency helping startups and businesses
            build scalable, high-performance digital products.
          </p>
        </div>

        {/* Links */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-white font-semibold uppercase tracking-widest text-sm'>Navigation</h3>
          <a href="#" className='text-gray-300 hover:text-[rgb(61,191,174)] transition-colors text-sm'>Home</a>
          <a href="#" className='text-gray-300 hover:text-[rgb(61,191,174)] transition-colors text-sm'>About</a>
          <a href="#" className='text-gray-300 hover:text-[rgb(61,191,174)] transition-colors text-sm'>Services</a>
          <a href="#" className='text-gray-300 hover:text-[rgb(61,191,174)] transition-colors text-sm'>Projects</a>
          <a href="#" className='text-gray-300 hover:text-[rgb(61,191,174)] transition-colors text-sm'>Contact</a>
        </div>

        {/* Contact */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-white font-semibold uppercase tracking-widest text-sm'>Contact</h3>
          <p className='text-gray-300 text-sm'>📧 contact@tizart.dev</p>
          <p className='text-gray-300 text-sm'>📞 +213 5 62 74 31 35</p>
          <p className='text-gray-300 text-sm'>📍 Constantine, Algeria</p>

          <div className='flex gap-3 mt-2'>
            <a href="#" className='w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-white hover:border-[rgb(61,191,174)] hover:text-[rgb(61,191,174)] transition-colors'>
                <FaInstagram size={16} />
            </a>
            <a href="#" className='w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-white hover:border-[rgb(61,191,174)] hover:text-[rgb(61,191,174)] transition-colors'>
                <CiFacebook size={16} />
            </a>
            <a href="#" className='w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-white hover:border-[rgb(61,191,174)] hover:text-[rgb(61,191,174)] transition-colors'>
                <GrLinkedin size={16} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800 pt-6 flex justify-between items-center'>
        <p className='text-gray-400 text-sm'>© 2026 Tizart Agency. All rights reserved.</p>
        <p className='text-gray-400 text-sm'>Built in Algeria</p>
      </div>

    </footer>
  )
}

export default Footer