import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./src/components/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
