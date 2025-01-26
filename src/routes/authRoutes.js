// backend/routes/authRoutes.js
import express from "express";
import {
  login,
  logout,
  protectRoute,
  checkAuth,
} from "../controllers/authController.js";

const router = express.Router();

// Ruta para login
router.post("/login", login);

// Ruta para logout
router.post("/logout", logout);

// Ruta para verificar si el usuario está autenticado
router.get("/checkAuth", checkAuth);

// Ruta protegida (requiere autenticación)
router.get("/protected", protectRoute, (req, res) => {
  res.json({ message: "Acceso concedido a datos protegidos", user: req.user });
});

export default router;
