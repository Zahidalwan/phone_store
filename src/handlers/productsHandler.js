import { pool } from "../config/db.js";
// import bcrypt from "bcrypt";

export const getAllProductHandler = async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT 
        id, user_id, name, description, price, stock
       FROM products`
    );

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getProductByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [products] = await pool.query(
      `SELECT id, user_id, name, description, price, stock
       FROM products WHERE id = ?`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "products not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: products[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const addProductHandler = async (req, res) => {
  const { user_id, name, description, price, stock } = req.body;

  // Validasi input
  if (!user_id || !user_id.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "user_id is required",
    });
  }

  if (!name || !name.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "name is required",
    });
  }

  try {
    // Hash password kalau mau aman
    // const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO products (user_id, name, description, price, stock ) VALUES (?, ?, ?, ?, ?)",
      [user_id, name, description, price, stock]
    );

    const newProduct = {
      user_id,
      name,
      description,
      price,
      stock,
    };

    res.status(200).json({
      status: "success",
      message: "product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const updateProductHandler = async (req, res) => {
  const { id } = req.params;
  const { user_id, name, description, price, stock } = req.body;
  try {
    const [product] = await pool.query(
      `UPDATE products SET user_id = ?, user_id = ?, description = ?, description = ?, stock = ?`,
      [user_id, name, description, price, stock, id]
    );

    const [userUpdate] = await pool.query(
      `SELECT id, user_id, name, description, price, stock, FROM products WHERE id = ?`,
      [id]
    );

    const updateproduct = {
      id: product.insertId,
      user_id,
      name,
      description,
      price,
      stock,
    };

    res.status(200).json({
      status: "success",
      message: "product updated successfully",
      data: userUpdate[0], // password tidak dikembalikan
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleteproduct] = await pool.query(
      `DELETE FROM products WHERE id = ?`,
      [id]
    );

    if (deleteproduct.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "product deleted successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
