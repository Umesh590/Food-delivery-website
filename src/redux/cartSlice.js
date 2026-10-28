import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_PREFIX = "foodieCart_";
const LEGACY_CART_KEY = "foodDeliveryCart";
const LEGACY_MIGRATED_KEY = "foodieLegacyCartMigrated";

export const getCartStorageKey = (userKey = "guest") =>
  `${CART_STORAGE_PREFIX}${encodeURIComponent(userKey)}`;

const normalizeCart = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => {
      const name = item?.name || item?.food_name;
      const image = item?.image || item?.food_image;

      return (
        item?.id !== undefined &&
        Boolean(name) &&
        Boolean(image) &&
        Number.isFinite(Number(item.price))
      );
    })
    .map((item) => ({
      ...item,
      name: item.name || item.food_name,
      image: item.image || item.food_image,
      price: Number(item.price),
      qty: Math.max(1, Number(item.qty) || 1),
    }));
};

// Save a user's cart outside Redux reducers.
export const saveCartForUser = (userKey, items) => {
  try {
    localStorage.setItem(
      getCartStorageKey(userKey),
      JSON.stringify(normalizeCart(items)),
    );
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

// Read a user's cart and migrate the old cart when necessary.
export const loadCartForUser = (userKey = "guest") => {
  try {
    const storageKey = getCartStorageKey(userKey);
    const savedCart = localStorage.getItem(storageKey);

    // An existing user-specific cart takes priority.
    if (savedCart !== null) {
      return normalizeCart(JSON.parse(savedCart));
    }

    // Never assign the legacy cart to the guest.
    if (userKey === "guest") {
      return [];
    }

    // Migrate the old cart only once.
    const alreadyMigrated = localStorage.getItem(LEGACY_MIGRATED_KEY);

    if (!alreadyMigrated) {
      const oldCart = localStorage.getItem(LEGACY_CART_KEY);

      if (oldCart !== null) {
        const migratedCart = normalizeCart(JSON.parse(oldCart));

        saveCartForUser(userKey, migratedCart);

        localStorage.setItem(LEGACY_MIGRATED_KEY, "true");

        return migratedCart;
      }
    }

    return [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

const getCurrentUserKey = () => {
  try {
    const savedUser =
      localStorage.getItem("foodieUser") ||
      sessionStorage.getItem("foodieUser");

    if (!savedUser) return "guest";

    const user = JSON.parse(savedUser);

    return user?.email ? user.email.trim().toLowerCase() : "guest";
  } catch {
    return "guest";
  }
};

const initialUserKey = getCurrentUserKey();

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: loadCartForUser(initialUserKey),
    userKey: initialUserKey,
  },

  reducers: {
    AddItem: (state, action) => {
      const newItem = action.payload;

      if (
        !newItem ||
        newItem.id === undefined ||
        !Number.isFinite(Number(newItem.price))
      ) {
        return;
      }

      const existingItem = state.items.find(
        (item) => String(item.id) === String(newItem.id),
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        const name = newItem.name || newItem.food_name;
        const image = newItem.image || newItem.food_image;

        if (!name || !image) return;

        state.items.push({
          ...newItem,
          name,
          image,
          price: Number(newItem.price),
          qty: 1,
        });
      }
    },

    RemoveItem: (state, action) => {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(action.payload),
      );
    },

    IncrementQty: (state, action) => {
      const item = state.items.find(
        (item) => String(item.id) === String(action.payload),
      );

      if (item) item.qty += 1;
    },

    DecrementQty: (state, action) => {
      const item = state.items.find(
        (item) => String(item.id) === String(action.payload),
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },

    ClearCart: (state) => {
      state.items = [];
    },

    // Switch the user and their cart in one action.
    // This prevents an empty cart from overwriting the old user's cart.
    LoadUserCart: (state, action) => {
      state.userKey = action.payload.userKey;
      state.items = action.payload.items;
    },
  },
});

export const {
  AddItem,
  RemoveItem,
  IncrementQty,
  DecrementQty,
  ClearCart,
  LoadUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;
