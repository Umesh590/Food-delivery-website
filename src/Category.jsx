import React, { useContext, useMemo } from "react";
import { dataContext } from "./context/UserContext";
import { food_items } from "./food";

function Categories() {
  const { setCate } = useContext(dataContext);

  // Get unique categories and their representative food images
  const categories = useMemo(() => {
    const categoryMap = new Map();

    food_items.forEach((food) => {
      if (food.food_category && !categoryMap.has(food.food_category)) {
        categoryMap.set(food.food_category, food.food_image);
      }
    });

    return Array.from(categoryMap.entries()).map(([name, image]) => ({
      name,
      image,
    }));
  }, []);

  // Filter food items and smoothly scroll to the menu
  const handleCategoryClick = (categoryName) => {
    const filteredItems =
      categoryName === "All"
        ? food_items
        : food_items.filter((food) => food.food_category === categoryName);

    setCate(filteredItems);

    setTimeout(() => {
      const menuSection = document.getElementById("menu");

      if (menuSection) {
        const top =
          menuSection.getBoundingClientRect().top + window.scrollY - 85;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <section
      id="categories"
      className="my-6 w-full px-4 sm:my-8 sm:px-6 lg:my-10 lg:px-10"
    >
      {/* Section Heading */}
      <div className="mb-5 sm:mb-7">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          Explore <span className="text-orange-600">Categories</span>
        </h2>
      </div>

      {/* Responsive Horizontal Category List */}
      <div className="flex items-start gap-4 overflow-x-auto px-1 pb-4 sm:gap-6 md:gap-7 lg:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* All Category */}
        <button
          type="button"
          onClick={() => handleCategoryClick("All")}
          aria-label="Show all food items"
          className="group flex w-[68px] shrink-0 flex-col items-center gap-2 sm:w-[86px] lg:w-[112px]"
        >
          <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full border-[3px] border-[#f5b8a9] bg-[#e5392d] shadow-[0_0_0_3px_#fbe7e2] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md sm:h-[80px] sm:w-[80px] lg:h-[104px] lg:w-[104px]">
            <svg
              viewBox="0 0 48 48"
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 7L18 15C20 17 20 20 18 22L15 25L31 41" />
                <path d="M6 11L14 19" />
                <path d="M11 6L19 14" />
                <path d="M15 4L23 12" />
                <path d="M38 6C43 11 43 17 39 21C36 24 32 23 30 20C27 17 28 12 32 8L38 6Z" />
                <path d="M32 22L15 39" />
              </g>
            </svg>
          </div>

          <span className="text-xs font-semibold text-[#c44832] sm:text-sm lg:text-base">
            All
          </span>
        </button>

        {/* Dynamic Food Categories */}
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => handleCategoryClick(category.name)}
            aria-label={`Show ${category.name.replaceAll("_", " ")} items`}
            className="group flex w-[68px] shrink-0 flex-col items-center gap-2 sm:w-[86px] lg:w-[112px]"
          >
            {/* Category Image */}
            <div className="h-[64px] w-[64px] overflow-hidden rounded-full border-[3px] border-gray-100 bg-gray-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-orange-300 group-hover:shadow-md sm:h-[80px] sm:w-[80px] lg:h-[104px] lg:w-[104px]">
              <img
                src={category.image}
                alt={`${category.name.replaceAll("_", " ")} food`}
                loading="lazy"
                className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Category Name */}
            <span className="max-w-full text-center text-xs font-medium capitalize text-gray-500 transition-colors group-hover:text-orange-600 sm:text-sm lg:text-base">
              {category.name.replaceAll("_", " ")}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
