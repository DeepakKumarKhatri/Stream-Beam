"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <main>{children}</main>
    </Provider>
  );
};

export default StoreProvider;
