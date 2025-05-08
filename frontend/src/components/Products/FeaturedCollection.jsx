import React from 'react';
import { Link } from 'react-router-dom';
import featuredImage from '../../assets/comfort.jpg';

const FeaturedCollection = () => {
    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-gradient-to-r from-emerald-100 to-green-50 rounded-3xl shadow-lg overflow-hidden">
                {/* Left Side */}
                <div className="lg:w-1/2 p-8 text-center lg:text-left">
                    <h2 className="text-lg font-semibold text-emerald-600 mb-2 uppercase tracking-wide">
                        Comfort and Style
                    </h2>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Made for Your Everyday Life
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Explore our collection of comfortable and stylish clothing that fits your lifestyle.
                    </p>
                    <Link
                        to="/collections/all"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
                    >
                        Shop Now
                    </Link>
                </div>
                {/* Right Side */}
                <div className="lg:w-1/2">
                    <img
                        src={featuredImage}
                        alt="Featured Collection"
                        className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;