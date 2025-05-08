import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        {/* Social Media Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-200 transition duration-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transition duration-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transition duration-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Announcement Text */}
        <div className="text-sm text-center flex-grow">
          <span className="font-medium">
            Free shipping on all U.S. orders over $50
          </span>
        </div>

        {/* Contact Info */}
        <div className="text-sm hidden md:block">
          <a href="tel:+1234567" className="hover:text-gray-200 transition duration-300">
            <span>Call us: 123-4567</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;