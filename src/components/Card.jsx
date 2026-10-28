import React from "react";
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/cartSlice";
import { FaHeart, FaStar, FaPlus } from "react-icons/fa";

function Card({ name, image, id, price, type, rating = 4.8 }) {
  const dispatch = useDispatch();

  // Add food item to the cart
  const handleAddToCart = () => {
    if (
      !name ||
      !image ||
      id === undefined ||
      !Number.isFinite(Number(price))
    ) {
      console.error("Invalid food item:", {
        id,
        name,
        image,
        price,
      });
      return;
    }

    dispatch(
      AddItem({
        id,
        name,
        image,
        price: Number(price),
        type,
        qty: 1,
      }),
    );
  };

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Food Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={name || "Food item"}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(event) => {
              console.error(`Failed to load image for ${name}:`, image);
              event.currentTarget.style.visibility = "hidden";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Image unavailable
          </div>
        )}

        {/* Favourite Button */}
        <button
          type="button"
          aria-label={`Add ${name} to favourites`}
          onClick={() => {
            // Favourite functionality can be added later.
          }}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm transition hover:scale-110 hover:text-red-500"
        >
          <FaHeart className="text-sm" />
        </button>
      </div>

      {/* Food Details */}
      <div className="px-2 pb-3 pt-3 sm:px-3">
        {/* Food Type */}
        <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-gray-400 sm:text-[10px]">
          {type === "veg" ? "Vegetarian" : "Non Veg"}
        </p>

        {/* Food Name */}
        <h3
          className="truncate text-sm font-semibold text-gray-800 sm:text-base"
          title={name}
        >
          {name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1 text-xs">
          <FaStar className="shrink-0 text-amber-400" />
          <span className="font-medium text-gray-700">{rating}</span>
          <span className="truncate text-gray-400">• Popular</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-gray-900 sm:text-lg">
            ₹{Number(price).toFixed(2)}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition hover:scale-110 hover:bg-red-600 active:scale-95"
          >
            <FaPlus className="text-xs" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default Card;
