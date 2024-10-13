"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, getToken } from "./features/userSlice";

const ReduxContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();

    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return  children;
};

export default ReduxContextProvider;
