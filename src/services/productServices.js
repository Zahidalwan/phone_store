// services/productServices.js
import { pool } from "../config/db.js";
import { validate } from "../helpers/validate.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidations.js";

// ===============================
// 📦 CREATE PRODUCT
// ===============================
export const createProduct = async (data) => {
  const validData = validate(createProductSchema, data);
  const { user_id, name, description, price, stock } = validData;

  await pool.query(
    `INSERT INTO products (user_id, name, description, price, stock)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, name, description, price, stock]
  );

  return { message: "Produk berhasil ditambahkan" };
};

// ===============================
// 📋 GET ALL PRODUCTS
// ===============================
export const getAllProducts = async () => {
  const [products] = await pool.query(
    `SELECT 
        id, user_id, name, description, price, stock
     FROM products`
  );

  return products;
};

// ===============================
// 🔍 GET PRODUCT BY ID
// ===============================
export const getProductById = async (id) => {
  const [products] = await pool.query(
    `SELECT 
        id, user_id, name, description, price, stock
     FROM products
     WHERE id = ?`,
    [id]
  );

  if (products.length === 0) {
    const error = new Error("Produk tidak ditemukan");
    error.status = 404;
    throw error;
  }

  return products[0];
};

// ===============================
// ✏️ UPDATE PRODUCT
// ===============================
export const updateProduct = async (id, data) => {
  const validData = validate(updateProductSchema, data);

  // Jika tidak ada field dikirim
  if (Object.keys(validData).length === 0) {
    const error = new Error("Tidak ada data yang dikirim untuk update");
    error.status = 400;
    throw error;
  }

  const fields = Object.keys(validData)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(validData);

  const [result] = await pool.query(
    `UPDATE products SET ${fields} WHERE id = ?`,
    [...values, id]
  );

  if (result.affectedRows === 0) {
    const error = new Error("Produk tidak ditemukan");
    error.status = 404;
    throw error;
  }

  return { message: "Produk berhasil diperbarui" };
};

// ===============================
// 🗑️ DELETE PRODUCT
// ===============================
export const deleteProduct = async (id) => {
  const [result] = await pool.query(`DELETE FROM products WHERE id = ?`, [id]);

  if (result.affectedRows === 0) {
    const error = new Error("Produk tidak ditemukan");
    error.status = 404;
    throw error;
  }

  return { message: "Produk berhasil dihapus" };
};
