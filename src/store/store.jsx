import { configureStore } from "@reduxjs/toolkit";
import movieoSlice from "./movieoSlice";

export const store = configureStore({
    reducer: {
        movieoData: movieoSlice
    }
})