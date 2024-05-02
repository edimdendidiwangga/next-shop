import { z } from 'zod';

// Base schema for common fields
const baseProductSchema = z.object({
  title: z.string().nonempty("Title is required."),
  price: z.number().min(0, "Price must be a non-negative number."),
  description: z.string().nonempty("Description is required."),
  categoryId: z.number().min(1, "Category ID must be greater than 0."),
  images: z.string().url().nonempty("At least one image URL is required."),
});

export const productSchemaForCreate = baseProductSchema;

export const productSchemaForUpdate = baseProductSchema.extend({
  id: z.number().int().nonnegative("ID must be a non-negative integer."),
});

export type ProductFormDataForCreate = z.infer<typeof productSchemaForCreate>;
export type ProductFormDataForUpdate = z.infer<typeof productSchemaForUpdate>;
