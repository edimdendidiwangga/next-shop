import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';
import { useDispatch } from 'react-redux';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure
} from '../reducer/slices/productsSlice';

export const useProducts = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      dispatch(fetchProductsStart());
      try {
        const data = await fetchProducts();
        dispatch(fetchProductsSuccess(data));
        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch(fetchProductsFailure(error.message));
        } else {
          dispatch(fetchProductsFailure('An unknown error occurred'));
        }
        throw new Error('Fetching failed');
      }
    }
    // You may consider adding retry, staleTime, cacheTime, etc. here if needed.
  });
};
