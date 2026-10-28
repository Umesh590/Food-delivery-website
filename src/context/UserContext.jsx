import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { food_items } from "../food";
import {
  LoadUserCart,
  saveCartForUser,
  loadCartForUser,
} from "../redux/cartSlice";
export const dataContext = createContext();

function UserContext({ children }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [cate, setCate] = useState(food_items);
  const [input, setInput] = useState("");
  const [showCart, setShowCart] = useState(false);

  const getSavedUser = () => {
    try {
      const savedUser =
        localStorage.getItem("foodieUser") ||
        sessionStorage.getItem("foodieUser");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getSavedUser);

  const getUserKey = (userData) =>
    userData?.email ? userData.email.trim().toLowerCase() : "guest";

  const activeUserKey = useRef(getUserKey(getSavedUser()));

  // Load the current user's cart on initial mount.
  useEffect(() => {
    const initialUser = getSavedUser();
    const userKey = getUserKey(initialUser);

    activeUserKey.current = userKey;

    dispatch(
      LoadUserCart({
        userKey,
        items: loadCartForUser(userKey),
      }),
    );
  }, [dispatch]);

  // Synchronize login/logout changes made in another browser tab.
  useEffect(() => {
    const syncUser = () => {
      const nextUser = getSavedUser();
      const nextUserKey = getUserKey(nextUser);

      if (nextUserKey !== activeUserKey.current) {
        // Preserve the cart that was active before switching.
        saveCartForUser(activeUserKey.current, cartItems);

        // Load the next user's cart without an intermediate ClearCart.
        dispatch(
          LoadUserCart({
            userKey: nextUserKey,
            items: loadCartForUser(nextUserKey),
          }),
        );

        activeUserKey.current = nextUserKey;
        setShowCart(false);
      }

      setUser(nextUser);
    };

    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
    };
  }, [cartItems, dispatch]);

  const loginUser = (userData, rememberMe = false) => {
    const email = userData.email.trim().toLowerCase();

    const loginSession = {
      name: userData.name,
      email,
      loggedIn: true,
    };

    const nextUserKey = email;

    // Save the previous account's cart before switching.
    saveCartForUser(activeUserKey.current, cartItems);

    localStorage.removeItem("foodieUser");
    sessionStorage.removeItem("foodieUser");

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("foodieUser", JSON.stringify(loginSession));

    // Load the new user's cart in one Redux action.
    dispatch(
      LoadUserCart({
        userKey: nextUserKey,
        items: loadCartForUser(nextUserKey),
      }),
    );

    activeUserKey.current = nextUserKey;

    setUser(loginSession);
    setShowCart(false);
  };

  const logoutUser = () => {
    // Save the logged-in user's cart before logging out.
    saveCartForUser(activeUserKey.current, cartItems);

    localStorage.removeItem("foodieUser");
    sessionStorage.removeItem("foodieUser");

    // Load the guest cart without overwriting the user's saved cart.
    dispatch(
      LoadUserCart({
        userKey: "guest",
        items: loadCartForUser("guest"),
      }),
    );

    activeUserKey.current = "guest";

    setUser(null);
    setShowCart(false);
  };

  const data = {
    input,
    setInput,
    cate,
    setCate,
    showCart,
    setShowCart,
    user,
    setUser,
    loginUser,
    logoutUser,
  };

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export default UserContext;
