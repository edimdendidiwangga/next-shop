import React from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../components/molecules/ProductForm';
import { useSingleProduct } from '../../hooks/productHooks';
import { getFirstImageUrl } from '../../utils/utils';

const UpdateProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const productId = parseInt(id as string);
  const isUpdatePage = router.pathname.includes('update-product');
  
  const { data: product, isLoading, error } = useSingleProduct(productId);

  const defaultValues = {
    id: product?.id,
    title: product?.title ?? '',
    price: product?.price ?? 0,
    description: product?.description ?? '',
    categoryId: product?.category?.id ?? 0,
    images: getFirstImageUrl(product?.images) ?? '',
  };
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Update Product</h1>
      <div className="bg-white p-6 rounded shadow-md">
        {product && <ProductForm defaultValues={defaultValues} isUpdatePage={isUpdatePage} />}
      </div>
    </div>
  );
};

export default UpdateProductPage;
