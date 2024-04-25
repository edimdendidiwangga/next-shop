import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../reducer/slices/productsSlice';
import cartReducer from '../reducer/slices/cartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
