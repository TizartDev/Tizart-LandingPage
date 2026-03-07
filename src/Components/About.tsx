

const About = () => {
  return (
    <section className='py-16 rounded-2xl'>
        <div className='text-center mb-10'>
            <span className='text-black text-sm font-semibold uppercase tracking-widest'>
            About Us
            </span>
            <h1 className='text-4xl font-montserrat font-bold uppercase text-[#00DED9] mt-2'>Who we are?</h1>
            {/* <p className='text-gray-400 mt-3 max-w-xl mx-auto'>
            We are a digital agency focused on creating modern websites and mobile applications. 
            Our goal is to help businesses grow through innovative technology, user-friendly design, 
            and reliable development.
            </p> */}
      </div>
      <div className='flex flex-initial justify-center items-center gap-14 bg-[#00303d] rounded-2xl'>
        <img className='h-120 w-auto' src="./src/Pictures/business.jpg" alt="" />
        <section className='flex flex-col gap-8 m-4 items-center p-10'>
            <h1 className='text-4xl text-white font-bold'>Digital Expertises</h1>
            <p className='font-montserrat font-thin text-lg text-white'>
                We are a digital agency focused on creating modern websites and mobile applications.
                Our goal is to help businesses grow through innovative technology, user-friendly design,
                and reliable development.
            </p>
        </section>
      </div>
    </section>
  )
}

export default About
