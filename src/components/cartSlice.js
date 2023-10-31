import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
    },
    removeSelectedItems: (state, action) => {
      state.items = state.items.filter((item, index) => !action.payload.includes(index));
    },
  },
});

export const { addItem, removeItem, removeSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;
