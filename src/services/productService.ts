import { Product } from '../types/types';
import ApiService from './apiService';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await ApiService.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
