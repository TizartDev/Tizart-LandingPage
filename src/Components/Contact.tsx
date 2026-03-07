
import { FaInstagramSquare } from "react-icons/fa";
import { MdFacebook , MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";


const Contact = () => {
  return (
    <section className='py-16'>
        <div className='text-center mb-10'>
            <span className='text-black text-sm font-semibold uppercase tracking-widest'>
            Contact
            </span>
            <h1 className='text-4xl font-bold text-[#00DED9] mt-2'>Get in Touch</h1>
            <p className='text-gray-400 mt-3 max-w-xl mx-auto'>
            Let's discuss your project and bring your ideas to life.
            </p>
      </div>
      <section className='bg-white flex flex-initial justify-between p-10 rounded-2xl'>
        <section className='flex flex-col items-center gap-4 w-50'>
                    <div className='bg-[#00DED9] p-6 rounded-full'>
                        <FaInstagramSquare className='h-20 w-auto text-white'/>
                    </div>
                    <span className='text-black text-lg font-bold uppercase tracking-widest'>
                        Instagram
                    </span>
                    <p className='text-gray-400 mt-3 max-w-xl mx-auto'>
                        <a href="#">Tizart-Agency</a>
                    </p>
        </section>
        <section className='flex flex-col items-center gap-4 w-50'>
                    <div className='bg-[#00DED9] p-6 rounded-full'>
                        <MdFacebook className='h-20 w-auto text-white'/>
                    </div>
                    <span className='text-black text-lg font-bold uppercase tracking-widest'>
                        Facebook
                    </span>
                    <p className='text-gray-400 mt-3 max-w-xl mx-auto'>
                        <a href="#">Tizart-Agency</a>
                    </p>
        </section>
        <section className='flex flex-col items-center gap-4 w-50'>
                    <div className='bg-[#00DED9] p-6 rounded-full'>
                        <IoCall className='h-20 w-auto text-white'/>
                    </div>
                    <span className='text-black text-lg font-bold uppercase tracking-widest'>
                        Calls
                    </span>
                    <p className='text-gray-400 mt-3 max-w-xl mx-auto'>
                        +213 5 62 74 31 35
                    </p>
        </section>
        <section className='flex flex-col items-center gap-4 w-50'>
                    <div className='bg-[#00DED9] p-6 rounded-full'>
                        <MdEmail className='h-20 w-auto text-white'/>
                    </div>
                    <span className='text-black text-lg font-bold uppercase tracking-widest'>
                        Email
                    </span>
                    <p className='text-gray-400 mt-3 max-w-xl mx-auto'>
                        - contact@tizart.dev
                    </p>
        </section>
      </section>
    </section>
  )
}

export default Contact
