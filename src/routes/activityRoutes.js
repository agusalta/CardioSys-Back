import express from "express";
import { getRecentActivity } from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getRecentActivity); // Obtener actividad reciente

export default router;
