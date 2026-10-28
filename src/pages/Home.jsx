import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

import { ClearCart } from "../redux/cartSlice";

import Nav from "../components/Nav";
import HeroSection from "../components/HeroSection";
import Categories from "../Category";
import Card from "../components/Card";
import Card2 from "../components/Card2";
import Footer from "../components/Footer";

import { food_items } from "../food";
import { dataContext } from "../context/UserContext";

function Home() {
  const { cate, setCate, input, showCart, setShowCart } =
    useContext(dataContext);

  // Redux cart
  const items = useSelector((state) => state.cart.items) || [];
  const dispatch = useDispatch();

  // Ensure the displayed food list is an array
  const displayedItems = Array.isArray(cate) ? cate : [];

  // Calculate cart subtotal
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.qty || 0),
    0,
  );

  // Calculate delivery fee, taxes, and total
  const deliveryFee = items.length > 0 ? 20 : 0;
  const taxes = (subtotal * 0.5) / 100;
  const total = Math.floor(subtotal + deliveryFee + taxes);

  // Place order
  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Clear the Redux cart
    dispatch(ClearCart());

    // Close the shopping cart
    setShowCart(false);

    // Display confirmation
    toast.success("🎉 Order placed successfully!");
  };

  // Scroll to a section when a URL hash is present
  useEffect(() => {
    const scrollToSection = () => {
      const sectionId = window.location.hash.slice(1);

      if (!sectionId) return;

      window.setTimeout(() => {
        const section = document.getElementById(sectionId);

        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY - 85;

          window.scrollTo({
            top: Math.max(0, top),
            behavior: "smooth",
          });
        }
      }, 150);
    };

    scrollToSection();

    window.addEventListener("hashchange", scrollToSection);

    return () => {
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, []);

  // Show all food items
  const handleShowAllFood = () => {
    setCate(food_items);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FFDBB6]">
      {/* Navbar */}
      <Nav />

      {/* Hero Section */}
      {!input.trim() && <HeroSection />}

      {/* Categories */}
      {!input && (
        <section
          id="categories"
          className="scroll-mt-24 px-3 py-4 sm:px-5 sm:py-6 md:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <Categories />
          </div>
        </section>
      )}

      {/* Food Menu */}
      <section
        id="menu"
        className="scroll-mt-24 px-3 pb-10 pt-5 sm:px-5 sm:pb-14 sm:pt-8 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Menu Heading */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
            <div>
              <span className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                Fresh & Delicious
              </span>

              <h2 className="text-2xl font-extrabold tracking-tight text-gray-800 sm:text-3xl">
                {input ? "Search Results" : "Popular Right Now"}
              </h2>

              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                {input
                  ? `Results for "${input}"`
                  : "Discover delicious food made just for you."}
              </p>
            </div>
          </div>

          {/* Food Cards */}
          {displayedItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {displayedItems.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  name={item.food_name}
                  image={item.food_image}
                  price={item.price}
                  type={item.food_type}
                />
              ))}
            </div>
          ) : (
            /* Empty Search or Category State */
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-orange-100 bg-white/70 px-4 py-10 text-center shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                🍽️
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                No dishes found
              </h3>

              <p className="mt-2 max-w-sm text-sm text-gray-500">
                We couldn't find any matching dishes. Try another search or
                explore our full menu.
              </p>

              <button
                type="button"
                onClick={handleShowAllFood}
                className="mt-5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-orange-600 hover:to-red-600 active:scale-95"
              >
                Show All Food
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cart Backdrop */}
      {showCart && (
        <button
          type="button"
          aria-label="Close shopping cart"
          className="fixed inset-0 z-50 cursor-default bg-black/50 backdrop-blur-[2px]"
          onClick={() => setShowCart(false)}
        />
      )}

      {/* Shopping Cart Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[60] flex h-screen h-dvh w-full flex-col overflow-y-auto bg-white p-4 shadow-2xl transition-transform duration-300 sm:p-6 md:w-[450px] md:max-w-[90vw] ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        aria-hidden={!showCart}
        inert={!showCart ? "" : undefined}
      >
        {/* Cart Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
              Your Cart
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close shopping cart"
            onClick={() => setShowCart(false)}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <RxCross2 className="h-6 w-6 text-gray-600" />
          </button>
        </header>

        {/* Cart Contents */}
        {items.length > 0 ? (
          <>
            <div className="flex w-full flex-1 flex-col gap-3 py-5">
              {items.map((item) => (
                <Card2
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  qty={item.qty}
                />
              ))}
            </div>

            {/* Price Summary */}
            <div className="mt-auto shrink-0 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between py-2 text-sm sm:text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-800">
                  Rs {subtotal.toFixed(2)}/-
                </span>
              </div>

              <div className="flex items-center justify-between py-2 text-sm sm:text-base">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold text-gray-800">
                  Rs {deliveryFee.toFixed(2)}/-
                </span>
              </div>

              <div className="flex items-center justify-between py-2 text-sm sm:text-base">
                <span className="text-gray-600">Taxes (0.5%)</span>
                <span className="font-semibold text-gray-800">
                  Rs {taxes.toFixed(2)}/-
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-dashed border-gray-300 py-4">
                <span className="text-lg font-bold text-gray-800">Total</span>

                <span className="text-xl font-bold text-orange-600">
                  Rs {total}/-
                </span>
              </div>

              {/* Working Place Order Button */}
              <button
                type="button"
                className="mb-2 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:from-orange-600 hover:to-red-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handlePlaceOrder}
                disabled={items.length === 0}
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          /* Empty Cart */
          <div className="flex flex-1 flex-col items-center justify-center py-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
              🛍️
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">
              Your cart is empty
            </h3>

            <p className="mt-2 text-center text-sm text-gray-500">
              Add your favorite dishes to get started.
            </p>

            <button
              type="button"
              onClick={() => setShowCart(false)}
              className="mt-5 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
