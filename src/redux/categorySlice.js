import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: 1, name: "Electronics", active: true , imageUrl:"https://www.agsdevices.com/wp-content/uploads/2024/05/electronic_components_hero_image.jpg.webp"},
    { id: 2, name: "Clothing", active: true, imageUrl:"https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?t=st=1738422805~exp=1738426405~hmac=297cf42a0816356ed77924424efcfecd38292e9daf83912e76c6c45e1e32ab77&w=900" },
  ],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleCategoryStatus: (state, action) => {
      const category = state.categories.find((c) => c.id === action.payload);
      if (category) {
        category.active = !category.active;
      }
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
    },
  },
});

export const { toggleCategoryStatus, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;