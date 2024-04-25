import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import {
  fetchProducts as fetchProductsAction,
  deleteProduct as deleteProductAction,
  setLoading,
  setError
} from '../reducer/slices/productsSlice';
import { Product, ProductUpdate, ProductCreate } from '../types/types';

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

  return useMutation<Product, Error, ProductCreate>({
    mutationFn: createProduct,
    onError: (error: Error) => {
      message.error(`Error deleting product: ${error.message}`);
      dispatch(setError(error.message));
    },
    onSuccess: (data: Product) => {
      message.success('Product created successfully');
      dispatch(fetchProductsAction([data]));
    }
  });
};

export const useUpdateProduct = () => {
  return useMutation<Product, Error, ProductUpdate>({
    mutationFn: (updatedProduct) => updateProduct(updatedProduct),
    onSuccess: (data) => {
      console.log('Product updated successfully:', data);
      message.success('Product updated successfully');
    },
    onError: (error: Error) => {
      console.error('Error updating product:', error.message);
      message.error(`Error deleting product: ${error.message}`);
      // Additional error handling logic here
    }
  });
};

export const useDeleteProduct = () => {
  const dispatch = useDispatch();

  return useMutation<void, Error, number>({
    mutationFn: deleteProduct,
    onSuccess: (_, productId) => {
      message.success(`Product deleted successfully, ID: ${productId}`);
      dispatch(deleteProductAction(productId.toString())); 
    },
    onError: (error: Error, productId) => {
      message.error(`Error deleting product:', ${error.message}, 'Product ID: ${productId}`);
    }
  });
};
