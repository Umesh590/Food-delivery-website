import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { saveCartForUser } from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

let previousCart = store.getState().cart;

store.subscribe(() => {
  const currentCart = store.getState().cart;

  const userChanged = currentCart.userKey !== previousCart.userKey;
  const itemsChanged = currentCart.items !== previousCart.items;

  previousCart = currentCart;

  // On account switches, don't save the newly loaded cart
  // under the previous account's key.
  if (userChanged) return;

  if (itemsChanged) {
    saveCartForUser(currentCart.userKey, currentCart.items);
  }
});

export default store;
