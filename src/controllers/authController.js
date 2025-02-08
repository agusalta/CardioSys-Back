import jwt from "jsonwebtoken";
import { findUserByUsername } from "../models/authModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Asegúrate de usar await ya que findUserByUsername es asincrónica
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Usa await con bcrypt.compare, ya que es una función asincrónica
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generar el token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Opcional: guardar el token en una cookie (si es necesario)
    res.cookie("auth", token, {
      domain: ".railway.app", // Configura el dominio principal que abarca tanto frontend como backend
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Asegúrate de que esté en true en producción
      sameSite: "None", // "None" permite cookies entre dominios diferentes
      maxAge: 3600000, // 1 hora
    });

    // Enviar el token en la respuesta
    return res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const logout = (req, res) => {
  // Limpiar la cookie de autenticación
  res.clearCookie("auth", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None", // SameSite: "None" para permitir cookies entre dominios
  });

  res.json({ message: "Cierre de sesión exitoso" });
};

export const checkAuth = (req, res) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }

  // Verificación del token JWT
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

  // Obtener el token del header Authorization
  const token = authHeader.split(" ")[1];

  // Verificación del token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }

    // Añadir el usuario decodificado a la solicitud
    req.user = decoded;
    next();
  });
};
