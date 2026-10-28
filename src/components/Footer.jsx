import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaUtensils,
  FaArrowRight,
  FaCheck,
  FaHeart,
  FaShippingFast,
} from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const linkClass =
    "block w-fit text-sm text-gray-400 transition duration-200 hover:translate-x-1 hover:text-orange-400";

  const headingClass = "text-base font-bold text-white";

  const goToSection = (sectionId) => {
    const scrollToSection = () => {
      const section = document.getElementById(sectionId);

      if (section) {
        const top = section.getBoundingClientRect().top + window.scrollY - 85;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scrollToSection, 350);
    } else {
      scrollToSection();
    }
  };

  const goHome = (event) => {
    event.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-gray-950 via-[#0c1020] to-[#160d12] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-4 md:gap-x-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="/"
              onClick={goHome}
              className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-orange-500"
            >
              <FaUtensils className="text-lg" />
              Foodie.
            </a>

            <p className="mt-2 text-sm font-semibold text-white">
              Good food. Great mood.
            </p>

            <p className="mt-1 max-w-xs text-sm leading-5 text-gray-400">
              Discover delicious meals and enjoy your favorite food, delivered
              fresh to your doorstep.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className={headingClass}>Explore</h3>

            <div className="mb-3 mt-2 h-1 w-10 rounded-full bg-orange-500" />

            <ul className="space-y-2.5">
              <li>
                <a href="/" onClick={goHome} className={linkClass}>
                  Home
                </a>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => goToSection("categories")}
                  className={linkClass}
                >
                  Categories
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => goToSection("menu")}
                  className={linkClass}
                >
                  Explore Menu
                </button>
              </li>

              <li>
                <Link to="/login" className={linkClass}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className={linkClass}>
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className={headingClass}>Customer Support</h3>

            <div className="mb-3 mt-2 h-1 w-10 rounded-full bg-orange-500" />

            <ul className="space-y-2.5">
              <li>
                <a href="mailto:support@example.com" className={linkClass}>
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@example.com?subject=Foodie%20Help"
                  className={linkClass}
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Compact Promotional Card */}
          <div className="col-span-2 rounded-xl border border-white/10 bg-gradient-to-br from-blue-950/70 to-gray-900/80 p-4 md:col-span-1 md:p-4">
            <h3 className="text-base font-bold text-white">
              Craving Something Delicious?
            </h3>

            <p className="mt-2 text-sm leading-5 text-gray-400">
              Find your next favorite meal.
            </p>

            <button
              type="button"
              onClick={() => goToSection("menu")}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore Menu
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 grid grid-cols-3 gap-2 border-b border-white/10 py-4 sm:gap-4">
          <div className="flex items-center justify-center gap-2">
            <FaCheck className="shrink-0 text-orange-500" />

            <span className="text-center text-[11px] font-semibold text-gray-300 sm:text-sm">
              Easy Ordering
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <FaShippingFast className="shrink-0 text-orange-500" />

            <span className="text-center text-[11px] font-semibold text-gray-300 sm:text-sm">
              Food Delivery
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <FaHeart className="shrink-0 text-orange-500" />

            <span className="text-center text-[11px] font-semibold text-gray-300 sm:text-sm">
              Food Lovers
            </span>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center justify-center gap-5 border-b border-white/10 py-4">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-lg text-gray-400 transition hover:scale-110 hover:text-orange-500"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-lg text-gray-400 transition hover:scale-110 hover:text-orange-500"
          >
            <FaFacebook />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-lg text-gray-400 transition hover:scale-110 hover:text-orange-500"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Foodie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
