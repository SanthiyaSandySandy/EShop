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

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedOrderReducer = persistReducer(persistConfig, orderReducer);
const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    products: persistedProductReducer,
    categories: persistedCategoryReducer,
    orders: persistedOrderReducer
  }
});

export const persistor = persistStore(store);
export default store;
