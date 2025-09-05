import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import walletReducer from "./slices/walletSlice";
// import transactionReducer from "./slices/transactionSlice";
// import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // wallets: walletReducer,
    // transactions: transactionReducer,
    // categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // est une fonction de Redux qui retourne tout l’état global du store (par ex. { auth: {...}, wallets: {...}, ... }).
export type AppDispatch = typeof store.dispatch;
