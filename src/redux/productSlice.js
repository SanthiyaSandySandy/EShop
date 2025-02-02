import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 101, name: "Laptop", categoryId: 1, stock: 5, price: 1000, description: "A high-end laptop are designed to be portable computers. They are smaller and lighter than desktops. The name connotes the user's ability to put the computer in their lap while they use it. Laptops have rechargeable batteries that can be used for a set period away from a power source", active: true , imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRAoUACkjoW2mzbgz_Eg9zdwUfE1JcPg2cPhG_D_33wxbSouB6H0IaEXpPuRjiM9Y6bE8An_9VKMVO7cz-gb6f7ZiX8daaBKfQ8OkGBbCKW3jjBXA4iN0sjYiTnugd6pR_Mb4ed4Xh4srQ&usqp=CAc"},
    { id: 102, name: "Phone", categoryId: 1, stock: 10, price: 500, description: "A smartphone is a device that uses either a system of wires along which electrical signals are sent or a system of radio signals to make it possible for you to speak to someone in another place who has a similar device: Just then, his phone rang. Could you answer the phone", active: true, imageUrl: "https://m.media-amazon.com/images/I/71kduvIxBVL._SX679_.jpg" },
    { id: 201, name: "T-shirt", categoryId: 2, stock: 20, price: 20, description: "A cotton T-shirt a lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garmen", active: true, imageUrl: "https://thebanyantee.com/cdn/shop/files/Black-T-shirt.jpg?v=1721380366&width=1100"},
  ]
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleProductStatus: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.active = !product.active;
      }
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      alert(index)
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload
        }
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateStock: (state, action) => {
      action.payload.forEach((orderItem) => {
        const product = state.products.find((p) => p.id === orderItem.id);
        if (product) {
          product.stock -= orderItem.quantity;
        }
      });
    }
  },
});

export const { toggleProductStatus, addProduct, updateProduct, deleteProduct, updateStock } = productSlice.actions;
export default productSlice.reducer;