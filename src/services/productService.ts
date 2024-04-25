import { Product } from '../types/types';
import ApiService from './apiService';

interface FetchProductsParams {
  offset?: number;
  limit?: number;
  title?: string;
}

export const fetchProducts = async (params: FetchProductsParams): Promise<Product[]> => {
  try {
    const { offset = 0, limit = 10, title = '' } = params;
    const response = await ApiService.get<Product[]>('/products', { 
      params: { offset, limit, title }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const fetchProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await ApiService.get<Product>(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${productId}:`, error);
    throw error;
  }
};

export const createProduct = async (productData: Product): Promise<Product> => {
  try {
    const response = await ApiService.post<Product>('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
};

export const updateProduct = async (data: Product): Promise<Product> => {
  try {
    const response = await ApiService.put(`/products/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    await ApiService.delete(`/products/${productId}`);
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
};