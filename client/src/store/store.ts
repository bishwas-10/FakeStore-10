import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import productReducer from "./productSlice";
import customerReducer from "./customerSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import userReducer from "./userSlice";
import orderReducer from "./soldOrderSlice";
const rootReducer = combineReducers({
  product:productReducer,
  customer:customerReducer,
  cart:cartReducer,
  category:categoryReducer,
  user:userReducer,
  order:orderReducer
});

const persistConfig = {
  key: "admin",
  version: 1,
  storage,
  whitelist:['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
