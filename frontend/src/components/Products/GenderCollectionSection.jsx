import React from "react";
import womenModelImg from "../../assets/womenModel.jpg";
import menModelImg from "../../assets/manModel.jpg";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="flex-1 relative group overflow-hidden rounded-lg shadow-lg">
          <img
            src={womenModelImg}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-3">Women's Collection</h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="flex-1 relative group overflow-hidden rounded-lg shadow-lg">
          <img
            src={menModelImg}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-3">Men's Collection</h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;