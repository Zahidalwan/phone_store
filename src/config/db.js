import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "phone_store_db",
});

export const testConection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("DB is connected");
    connection.release();
  } catch (error) {
    console.error(error);
  }
};
