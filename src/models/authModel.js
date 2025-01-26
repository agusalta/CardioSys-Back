import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const user = {
  username: process.env.USER || null,
  password: process.env.PASSWORD_HASH || null,
};

export const findUserByUsername = (username) => {
  if (username === user.username) {
    return { ...user };
  }
  return null;
};

export const comparePassword = (password, storedHash) => {
  return bcrypt.compare(password, storedHash);
};
