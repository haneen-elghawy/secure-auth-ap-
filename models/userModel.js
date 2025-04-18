const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const db = require('./db');

const createUser = async ({ username, email, password, role = 'user' }) => {
  await db.read();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: nanoid(),
    username,
    email,
    password: hashedPassword,
    role,
  };
  db.data.users.push(newUser);
  await db.write();
  return newUser;
};

const findUserByEmail = async (email) => {
  await db.read();
  return db.data.users.find(user => user.email === email);
};

const findUserById = async (id) => {
  await db.read();
  return db.data.users.find(user => user.id === id);
};

const updateUser = async (id, updates) => {
  await db.read();
  const index = db.data.users.findIndex(user => user.id === id);
  if (index === -1) return null;
  db.data.users[index] = { ...db.data.users[index], ...updates };
  await db.write();
  return db.data.users[index];
};

module.exports = { createUser, findUserByEmail, findUserById, updateUser };
