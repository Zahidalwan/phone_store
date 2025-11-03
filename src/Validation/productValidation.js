import { z } from "zod";

export const createProductSchema = z.object({
  user_id: z.number(),
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi terlalu pendek"),
  price: z.number().positive("Harga harus lebih dari 0"),
  stock: z.number().int().min(0, "Stok tidak boleh negatif"),
});

export const updateProductSchema = z.object({
  user_id: z.number().optional(),
  name: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).optional(),
});
