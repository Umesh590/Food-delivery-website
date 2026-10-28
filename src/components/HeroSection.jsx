import React from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import heroImage from "../assets/heroimg.png";

const HeroSection = () => {
  const navigate = useNavigate();

  // Navigate to Home if necessary, then scroll to the menu.
  const goToMenu = () => {
    const currentPath = window.location.pathname;

    const scrollToMenu = () => {
      const menuSection =
        document.getElementById("menu") ||
        document.getElementById("categories");

      if (menuSection) {
        const top =
          menuSection.getBoundingClientRect().top + window.scrollY - 75;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }
    };

    if (currentPath !== "/") {
      navigate("/");
      setTimeout(scrollToMenu, 300);
    } else {
      scrollToMenu();
    }
  };

  return (
    <section className="flex flex-col-reverse items-center justify-center gap-3 overflow-hidden bg-[#FFDBB6] px-4 py-5 sm:gap-5 sm:px-6 sm:py-8 md:flex-row md:justify-between md:gap-8 md:px-16 md:py-12 lg:py-16">
      {/* Left Text Section */}
      <motion.div
        className="mt-2 w-full max-w-lg space-y-3 text-center sm:space-y-4 md:mt-0 md:text-left"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-extrabold leading-tight text-gray-800 sm:text-3xl md:text-5xl lg:text-6xl">
          Delicious <span className="text-red-600">Food</span>
          <br />
          Delivered Fast
        </h1>

        <p className="mx-auto max-w-md text-xs leading-relaxed text-gray-700 sm:text-sm md:mx-0 md:text-base lg:text-lg">
          Fresh meals, quick delivery, and unbeatable taste. Order from your
          favorite restaurants right now!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row items-center justify-center gap-2 pt-1 sm:gap-3 md:justify-start">
          <button
            type="button"
            onClick={goToMenu}
            className="rounded-full bg-red-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition duration-300 hover:bg-red-600 active:scale-95 sm:px-6 sm:py-3 sm:text-sm md:px-7"
          >
            Order Now 🍕
          </button>

          <button
            type="button"
            onClick={goToMenu}
            className="rounded-full border border-red-500 px-4 py-2.5 text-xs font-semibold text-red-600 transition duration-300 hover:bg-red-50 active:scale-95 sm:px-6 sm:py-3 sm:text-sm md:px-7"
          >
            Explore Menu
          </button>
        </div>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        className="flex w-full items-center justify-center md:w-1/2 md:flex-shrink-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Delicious food including pizza, burgers, and fries"
          fetchPriority="high"
          className="h-auto w-44 max-w-full object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105 sm:w-60 md:w-[400px] lg:w-[500px]"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
