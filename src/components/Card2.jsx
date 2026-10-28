import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { DecrementQty, IncrementQty, RemoveItem } from "../redux/cartSlice";

function Card2({ name, id, price, image, qty }) {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full items-center gap-3 border-b border-gray-200 py-4">
      {/* Food Image */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-20 sm:w-20">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
        />
      </div>

      {/* Food Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 sm:text-base">
          {name}
        </h3>

        {/* Quantity Controls */}
        <div className="flex h-8 w-24 overflow-hidden rounded-lg border border-red-200">
          <button
            type="button"
            onClick={() => dispatch(DecrementQty(id))}
            className="flex flex-1 items-center justify-center text-red-500 transition hover:bg-red-50"
            aria-label={`Decrease quantity of ${name}`}
          >
            -
          </button>

          <span className="flex flex-1 items-center justify-center bg-red-50 text-sm font-semibold text-red-600">
            {qty}
          </span>

          <button
            type="button"
            onClick={() => dispatch(IncrementQty(id))}
            className="flex flex-1 items-center justify-center text-red-500 transition hover:bg-red-50"
            aria-label={`Increase quantity of ${name}`}
          >
            +
          </button>
        </div>
      </div>

      {/* Price and Delete */}
      <div className="flex shrink-0 flex-col items-end justify-between gap-4 self-stretch">
        <span className="text-sm font-semibold text-red-500 sm:text-base">
          ₹{(Number(price) * Number(qty)).toFixed(2)}
        </span>

        <button
          type="button"
          onClick={() => dispatch(RemoveItem(id))}
          className="text-red-400 transition hover:text-red-600"
          aria-label={`Remove ${name} from cart`}
        >
          <RiDeleteBin6Line className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Card2;
