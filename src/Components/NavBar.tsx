
import { CiSearch } from "react-icons/ci";
import { FaDumbbell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { PiShoppingCartThin } from "react-icons/pi";

const NavBar = () => {
  return (
      <nav className="  px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      {/* <a href="/" className="text-xl font-bold text-indigo-600">
        MyApp
      </a> */}
      <img src="./src/Pictures/tizart.png" className="h-8 w-auto" alt="" />

      {/* Nav Links */}
      <ul className="flex gap-6 text-gray-600 font-medium">
        <li><a href="/" className="hover:text-blue-500 transition-colors">Home</a></li>
        <li><a href="/about" className="hover:text-blue-500 transition-colors">About</a></li>
        <li><a href="/services" className="hover:text-blue-500 transition-colors">Services</a></li>
        <li><a href="/contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
      </ul>

      {/* CTA Button */}
      <button className="bg-[#00303d] text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
        Order Now
      </button>
    </nav>
  )
}

export default NavBar
