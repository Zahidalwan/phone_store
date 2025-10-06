import { pool } from "../config/db.js";
// import bcrypt from "bcrypt";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT 
        id, fullname, username, email, role,
        address, phone_number, age
       FROM users`
    );

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await pool.query(
      `SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: users[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const addUserHandler = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  // Validasi input
  if (!fullname || !fullname.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Fullname is required",
    });
  }

  if (!username || !username.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Username is required",
    });
  }

  if (username.includes(" ")) {
    return res.status(400).json({
      status: "fail",
      message: "Username must not contain spaces",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Email is required",
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Password is required",
    });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Role is required",
    });
  }

  try {
    // Hash password kalau mau aman
    // const hashedPassword = await bcrypt.hash(password, 10);

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

    res.status(201).json({
      status: "success",
      message: "User added successfully",
      data: newUser, // password tidak dikembalikan
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;
  try {
    const [users] = await pool.query(
      `UPDATE users SET fullname = ?, username = ?, email = ?, password = ?, role = ?, address = ?, phone_number = ?, age = ? WHERE id = ?`,
      [
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
        id,
      ]
    );

    const [userUpdate] = await pool.query(
      `SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?`,
      [id]
    );

    const updateUser = {
      id: users.insertId,
      fullname,
      username,
      email,
      role,
      address,
      phone_number,
      age,
    };

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: userUpdate[0], // password tidak dikembalikan
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleteUser] = await pool.query(`DELETE FROM users WHERE id = ?`, [
      id,
    ]);

    if (deleteUser.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
