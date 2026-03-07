export default function Hero() {
  return (
    <section className="flex flex-initial items-center justify-center  min-h-screen gap-30">
      <div className="p-8 flex flex-col gap-5">
            <h1 className="text-7xl font-bold text-[#00DED9]">Turn your Idea into Reality!</h1>
            <h1 className="text-3xl font-medium text-[#00303d]">Tizart a Platform for building Startups</h1>
        <p className="text-gray-500 text-lg max-w-xl">
            Tizart Agency is a modern digital agency specialized in web development, 
            mobile app development, UI/UX design, and AI-powered solutions. 
            We help startups, businesses, and entrepreneurs transform their ideas into scalable, 
            high-performance digital products.
        </p>
        <div className="flex gap-4">
            <button className="bg-[#00303d] text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg">
            Get Started
            </button>
            <button className="bg-[#00DED9] text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg">
            View Portfolio
            </button>
        </div>
        
      </div>
      <img src="./src/Pictures/Logo.png" className="h-120 w-auto" alt="logo" />
    </section>
  );
}