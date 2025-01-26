// backend/routes/authRoutes.js
import express from "express";
import { login, logout, protectRoute } from "../controllers/authController.js";

const router = express.Router();

// Ruta para login
router.post("/login", login);

// Ruta para logout
router.post("/logout", logout);

// Ruta protegida (requiere autenticación)
router.get("/protected", protectRoute, (req, res) => {
  res.json({ message: "Acceso concedido a datos protegidos", user: req.user });
});

export default router;
