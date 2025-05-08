import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setCanScrollLeft(scrollRef.current.scrollLeft);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = canScrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();

      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, [newArrivals]);

  return (
    <section className="py-16">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          New Arrivals
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Check out our latest products.
        </p>
        <div className="absolute right-4 bottom-[-30px] flex space-x-2 z-10">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full shadow-lg ${
              canScrollLeft
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-3 rounded-full shadow-lg ${
              canScrollRight
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="container mx-auto overflow-x-scroll flex space-x-6 relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product, index) => (
          <div
            key={product.id || product._id || index}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative group"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
            <div
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 text-white p-4 rounded-b-lg"
            >
              <Link to={`/product/${product.id || product._id}`} className="block">
                <h4 className="font-semibold text-lg group-hover:text-emerald-400 transition-colors duration-300">
                  {product.name}
                </h4>
                <p className="mt-1 text-sm">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;