import { pool } from "../config/db.js";
import { createUserSchema } from "../Validation/userValidation.js";
import { updateUserSchema } from "../Validation/userValidation.js";
import validate from "../Validation/validation.js";

export const getAllUser = async () => {
  const [users] = await pool.query(
    `SELECT 
            id, fullname, username, email, role,
            address, phone_number, age
           FROM users`
  );

  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    `SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?`,
    [id]
  );

  if (users.length === 0) {
    throw new Error("User not found");
  }

  return users[0];
};

export const createUser = async (req) => {
  const validated = validate(createUserSchema, req);

  const { fullname, username, email, password, role } = validated;

  const [result] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [
      fullname,
      username,
      email,
      password /* ganti hashedPassword kalau pakai bcrypt */,
      role,
    ]
  );

  const newUser = {
    id: result.insertId,
    fullname,
    username,
    email,
    role,
  };

  return newUser;
};

export const updateUser = async (id, req) => {
  const validated = validate(updateUserSchema, req);

  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  const [result] = await pool.query(
    `UPDATE users 
     SET fullname = ?, username = ?, email = ?, password = ?, role = ?, address = ?, phone_number = ?, age = ? 
     WHERE id = ?`,
    [fullname, username, email, password, role, address, phone_number, age, id]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  const [rows] = await pool.query(
    `SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?`,
    [id]
  );

  return rows[0];
};

export const deleteUser = async (id) => {
  await getUserById(id); // Cek apakah user ada

  const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  return { message: "User deleted successfully" };
};
