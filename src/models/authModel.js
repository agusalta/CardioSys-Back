// authModel.js
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { setDemoMode } from "../config/db.js";
dotenv.config();

const user = {
  username: process.env.USER || null,
  password: process.env.PASSWORD_HASH || null,
};

const demoUser = {
  username: "demo_user",
  password: "$2b$10$zNVYQrChxH.RfWWBjjNuteMYHlwiwqWvznW2.MdzmaOOtBi5v7vH.",
};

export const findUserByUsername = (username) => {
  if (username === user.username) {
    setDemoMode(false);
    return { ...user };
  } else if (username === demoUser.username) {
    setDemoMode(true);
    return { ...demoUser };
  }
  return null;
};

export const comparePassword = (password, storedHash) => {
  return bcrypt.compare(password, storedHash);
};

// Función para generar un hash de contraseña (solo para uso en desarrollo)
export const generateHash = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
