import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FaUtensils,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { dataContext } from "../context/UserContext";
import { food_items } from "../food";

function Nav() {
  const { input, setInput, setCate, setShowCart, user, logoutUser } =
    useContext(dataContext);

  const cartItems = useSelector((state) => state.cart.items) || [];
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.qty) || 0),
    0,
  );

  const handleSearch = (value) => {
    setInput(value);

    const searchValue = value.trim().toLowerCase();

    if (!searchValue) {
      setCate(food_items);
      return;
    }

    setCate(
      food_items.filter((item) =>
        item.food_name.toLowerCase().includes(searchValue),
      ),
    );
  };

  const handleSectionNavigation = (section) => {
    setMenuOpen(false);
    navigate("/");

    setTimeout(() => {
      if (section === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(section)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  const handleCartClick = () => {
    setMenuOpen(false);

    if (!user) {
      toast.info("Please log in to view your cart.");
      navigate("/login");
      return;
    }

    setShowCart(true);
  };

  const handleLogout = () => {
    logoutUser();
    setMenuOpen(false);

    toast.success("You have been logged out successfully!");
    navigate("/login", { replace: true });
  };

  const renderAccountLinks = (mobile = false) => {
    if (user) {
      return (
        <div
          className={`flex ${
            mobile ? "flex-col items-stretch" : "items-center"
          } gap-3`}
        >
          <div className="flex items-center gap-2 text-gray-700">
            <FaUserCircle className="text-xl text-orange-500" />
            <span className="text-sm font-medium">
              Welcome, {user.name || user.email}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className={`flex ${mobile ? "flex-col" : "items-center"} gap-3`}>
        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="rounded-full border border-orange-500 px-5 py-2 text-center text-sm font-medium text-orange-600 transition hover:bg-orange-500 hover:text-white"
        >
          Login
        </Link>

        <Link
          to="/register"
          onClick={() => setMenuOpen(false)}
          className="rounded-full bg-orange-500 px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-orange-600"
        >
          Register
        </Link>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      {/* Full-width navbar with reduced left and right spacing */}
      <div className="flex w-full items-center justify-between gap-3 px-3 py-3 sm:px-5 lg:px-6 xl:px-8">
        {/* Logo: close to the left edge */}
        <button
          type="button"
          onClick={() => handleSectionNavigation("home")}
          className="flex shrink-0 items-center gap-2"
          aria-label="Foodie Home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-lg text-white shadow-sm sm:h-10 sm:w-10">
            <FaUtensils />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-gray-800 sm:text-2xl">
            Food<span className="text-orange-500">ie</span>
          </span>
        </button>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 xl:flex">
          <button
            type="button"
            onClick={() => handleSectionNavigation("home")}
            className="text-sm font-semibold text-gray-700 transition hover:text-orange-500"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleSectionNavigation("categories")}
            className="text-sm font-semibold text-gray-700 transition hover:text-orange-500"
          >
            Categories
          </button>

          <button
            type="button"
            onClick={() => handleSectionNavigation("menu")}
            className="text-sm font-semibold text-gray-700 transition hover:text-orange-500"
          >
            Menu
          </button>
        </div>

        {/* Desktop search */}
        <div className="hidden max-w-sm flex-1 lg:flex xl:max-w-xs">
          <div className="flex w-full items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-orange-400 focus-within:bg-white">
            <FaSearch className="shrink-0 text-sm text-gray-400" />

            <input
              type="text"
              value={input}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search food..."
              aria-label="Search food"
              className="ml-2 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Desktop cart and account */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={handleCartClick}
            aria-label={`Open cart, ${cartCount} items`}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-lg text-orange-600 transition hover:bg-orange-100"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {renderAccountLinks()}
        </div>

        {/* Mobile and tablet controls */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={handleCartClick}
            aria-label={`Open cart, ${cartCount} items`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-lg text-orange-600"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-700 transition hover:bg-gray-100"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-5">
            {/* Mobile search */}
            <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-orange-400">
              <FaSearch className="text-sm text-gray-400" />

              <input
                type="text"
                value={input}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search food..."
                aria-label="Search food"
                className="ml-3 w-full bg-transparent text-sm outline-none"
              />
            </div>

            {/* Mobile navigation */}
            <button
              type="button"
              onClick={() => handleSectionNavigation("home")}
              className="text-left text-sm font-semibold text-gray-700 hover:text-orange-500"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleSectionNavigation("categories")}
              className="text-left text-sm font-semibold text-gray-700 hover:text-orange-500"
            >
              Categories
            </button>

            <button
              type="button"
              onClick={() => handleSectionNavigation("menu")}
              className="text-left text-sm font-semibold text-gray-700 hover:text-orange-500"
            >
              Menu
            </button>

            <div className="border-t border-gray-100 pt-4">
              {renderAccountLinks(true)}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
