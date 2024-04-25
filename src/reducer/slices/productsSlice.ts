import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchSingleProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
    createProduct: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
      state.loading = false;
      state.error = null;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id? {...product,...action.payload } : product
      );
      state.selectedProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product) => product?.id?.toString() !== action.payload);
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fetchProducts, fetchSingleProduct, createProduct, updateProduct, deleteProduct, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;