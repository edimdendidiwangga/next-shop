import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { message } from 'antd';
import { productSchema, ProductFormData } from '../../schemas/productSchema';
import { useCreateProduct } from '../../hooks/productHooks';

interface ProductFormProps {
  defaultValues?: ProductFormData;
}

const ProductForm: React.FC<ProductFormProps> = ({ defaultValues }) => {
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues
  });

  const { mutate: createProduct } = useCreateProduct();

  const handleFormSubmit = (data: ProductFormData) => {
    const formattedData = {
      ...data,
      images: data.images.split(',').map(image => image.trim())
    };

    createProduct(formattedData, {
      onSuccess: () => {
        reset();
      },
      onError: (error: Error) => {
        message.error('Product added failed');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" {...register('title')} placeholder="Enter title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3" />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>} {/* Display error message if title has error */}
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" {...register('price', { valueAsNumber: true} )} placeholder="Enter price" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3" />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>} {/* Display error message if price has error */}
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea {...register('description')} placeholder="Enter description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3" />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>} {/* Display error message if description has error */}
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">Category ID</label>
        <input type="number" {...register('categoryId', { valueAsNumber: true} )} placeholder="Enter category ID" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3" />
        {errors.categoryId && <span className="text-red-500">{errors.categoryId.message}</span>} {/* Display error message if categoryId has error */}
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <input type="text" {...register('images')} placeholder="Enter images URLs, separated by commas" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3" />
        {errors.images && <span className="text-red-500">{errors.images.message}</span>} {/* Display error message if images has error */}
      </div>
      <div className="space-x-2">
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button type="button" onClick={() => reset()} className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
