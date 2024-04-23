import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().nonempty(),
  price: z.number().min(1),
  description: z.string().nonempty(),
  categoryId: z.number().min(1),
  images: z.array(z.string().url()).nonempty(),
});
