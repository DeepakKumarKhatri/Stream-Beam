"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { getToken } from "./features/userSlice";
import { usePathname } from "next/navigation";

const StoreProvider = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    const token = getToken();

    if (
      token == undefined &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/forgot-password" &&
      pathname !== "/reset-password" &&
      pathname !== "/verify-account"
    ) {
      window.location.href = "/login";
    }

    if (
      token &&
      (pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/forgot-password" ||
        pathname === "/reset-password" ||
        pathname === "/" ||
        pathname === "/verify-account")
    ) {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <Provider store={store}>
      <main>{children}</main>
    </Provider>
  );
};

export default StoreProvider;
