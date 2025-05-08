import storeFrontImg from "../../assets/shoppingFront.jpg";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={storeFrontImg}
        alt="Rabbit"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black flex items-center justify-center">
        <div className="text-center text-white p-6 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase mb-6 leading-tight">
            Discover! <br /> Your Style
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Shop the latest trends and vacation-ready outfits with fast shipping.
          </p>
          <Link
            to="/collections/all"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;