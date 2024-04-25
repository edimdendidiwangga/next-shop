import { z } from 'zod';

export const productSchemaForCreate = z.object({
  title: z.string().nonempty("Title is required."),
  price: z.number().min(0, "Price must be a non-negative number."),
  description: z.string().nonempty("Description is required."),
  categoryId: z.number().min(1, "Category ID must be greater than 0."),
  images: z.string().url().nonempty("At least one image URL is required."),
});

export const productSchemaForUpdate = z.object({
  id: z.number().int(),
  title: z.string().nonempty("Title is required."),
  price: z.number().min(0, "Price must be a non-negative number."),
  description: z.string().nonempty("Description is required."),
  categoryId: z.number().min(1, "Category ID must be greater than 0."),
  images: z.string().url().nonempty("At least one image URL is required."),
});

export type ProductFormDataForCreate = z.infer<typeof productSchemaForCreate>;
export type ProductFormDataForUpdate = z.infer<typeof productSchemaForUpdate>;
