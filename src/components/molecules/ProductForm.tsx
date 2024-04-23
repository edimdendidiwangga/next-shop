// components/ProductForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../schemas/productSchema';

type ProductFormData = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export const ProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductFormData> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} />
      <p>{errors.title?.message}</p>

      <input type="number" {...register('price')} />
      <p>{errors.price?.message}</p>

      <input {...register('description')} />
      <p>{errors.description?.message}</p>

      <input type="number" {...register('categoryId')} />
      <p>{errors.categoryId?.message}</p>

      <input {...register('images')} />
      <p>{errors.images?.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
};
