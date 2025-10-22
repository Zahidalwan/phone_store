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

  return users[0];
};
