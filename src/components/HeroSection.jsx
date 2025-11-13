
import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/heroimg.png"; // ✅ Make sure image path is correct

const HeroSection = () => {
  return (
    <section className="bg-[#FFDBB6] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 md:py-16">
      
      {/* Left Text Section */}
      <motion.div
        className="text-center md:text-left max-w-lg space-y-5 mt-6 md:mt-0"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Delicious <span className="text-red-600">Food</span> <br /> Delivered
          Fast
        </h1>

        <p className="text-gray-700 text-base md:text-lg">
          Fresh meals, quick delivery, and unbeatable taste. Order from your
          favorite restaurants right now!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
            Order Now 🍕
          </button>
          <button className="border border-red-500 text-red-600 font-semibold py-3 px-8 rounded-full hover:bg-red-50 transition-all duration-300">
            Explore Menu
          </button>
        </div>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        className="mt-4 md:mt-0 w-full md:w-1/2 flex justify-center items-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Delicious Food"
          className="w-64 sm:w-80 md:w-[480px] lg:w-[550px] drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
