import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import orderReducer from "./orderSlice";

const productPersistConfig = { key: "product", storage };
const categoryPersistConfig = { key: "category", storage };
const orderPersistConfig = { key: "order", storage };


const persistedProductReducer = persistReducer(productPersistConfig, productReducer);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);
const persistedCategoryReducer = persistReducer(categoryPersistConfig, categoryReducer);

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: persistedProductReducer,
    categories: persistedCategoryReducer,
    orders: persistedOrderReducer
  }
});

export const persistor = persistStore(store);
export default store;
