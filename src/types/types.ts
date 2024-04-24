export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }
export interface ProductUpdate {
    id: number;
    title?: string;
    price?: number;
    description?: string;
    categoryId?: number;
    images?: string[];
  }
  
  // Add more types as needed
  