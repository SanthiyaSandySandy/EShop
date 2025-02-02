import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import orderReducer from "./orderSlice";

const persistConfig = {
  key: "root",
  storage
};

const persistedOrderReducer = persistReducer(persistConfig, orderReducer);

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    categories: categoryReducer,
    orders: persistedOrderReducer
  }
});

export const persistor = persistStore(store);
export default store;
