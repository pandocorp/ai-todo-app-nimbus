import { configureStore } from "@reduxjs/toolkit";
import HomePageReducer from "./features/HomePageSlice";

export const store = configureStore({
  
    reducer: {
        homePage: HomePageReducer,
    },
  });   