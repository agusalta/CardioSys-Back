import jwt from "jsonwebtoken";
import { findUserByUsername } from "../models/authModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("auth", token, {
      domain: "https://sistema-medico-flax.vercel.app",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 3600000,
      partitioned: true,
    });

    return res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const logout = (req, res) => {
  res.cookie("auth", "", {
    domain: "https://sistema-medico-flax.vercel.app",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    expires: new Date(0),
    partitioned: true,
  });

  res.json({ message: "Cierre de sesión exitoso" });
};

export const checkAuth = (req, res) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ isLoggedIn: false });
    }

    res.json({ isLoggedIn: true, username: decoded.username });
  });
};

export const protectRoute = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }

    req.user = decoded;
    next();
  });
};
