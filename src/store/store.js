import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import productDetailReducer from "./productDetailSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer:{
        products:productsReducer,
        productDetail:productDetailReducer,
        cart:cartReducer
    }
})