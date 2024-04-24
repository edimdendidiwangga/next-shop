import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { useDispatch } from 'react-redux';
import {
  fetchProducts as fetchProductsAction,
  setLoading,
  setError
} from '../reducer/slices/productsSlice';
import { Product, ProductUpdate } from '../types/types';

interface UseProductsArgs {  
  offset?: number;
  limit?: number;
  title?: string;
}

export const useProducts = ({ offset, limit, title }: UseProductsArgs) => {
  const dispatch = useDispatch();

  return useQuery<Product[]>({
    queryKey: ['products', offset, limit, title],
    queryFn: async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchProducts({ offset, limit, title });
        dispatch(fetchProductsAction(data));
        return data;
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
        throw new Error('Fetching failed');
      }
    }
  });
};

export const useCreateProduct = () => {
  const dispatch = useDispatch();

  return useMutation<Product, Error, Product>({
    mutationFn: createProduct,
    onError: (error: Error) => {
      console.error('Error creating product:', error.message);
      dispatch(setError(error.message));
    },
    onSuccess: (data: Product) => {
      console.log('Product created successfully:', data);
      dispatch(fetchProductsAction([data]));
    }
  });
};

export const useUpdateProduct = () => {
  return useMutation<Product, Error, ProductUpdate>({
    mutationFn: (updatedProduct) => updateProduct(updatedProduct),
    onSuccess: (data) => {
      console.log('Product updated successfully:', data);
      // Additional success logic here
    },
    onError: (error: Error) => {
      console.error('Error updating product:', error.message);
      // Additional error handling logic here
    }
  });
};

export const useDeleteProduct = () => {
  return useMutation<void, Error, number>({
    mutationFn: deleteProduct,
    onSuccess: (_, productId) => {
      console.log('Product deleted successfully, ID:', productId);
    },
    onError: (error: Error, productId) => {
      console.error('Error deleting product:', error.message, 'Product ID:', productId);
    }
  });
};
