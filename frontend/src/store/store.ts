import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product';
import paymentReducer from './slices/payment';

const store = configureStore({
  reducer: {
    product: productReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
