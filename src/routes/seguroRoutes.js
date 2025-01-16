import express from "express";
import {
  getAllSeguros,
  createNuevoSeguro,
  updateSeguro,
  deleteSeguro,
} from "../controllers/seguroController.js";

const router = express.Router();

router.get("/seguros", getAllSeguros);
router.get("/seguros/:id", getAllSeguros);
router.post("/seguros", createNuevoSeguro);
router.put("/seguros/:id", updateSeguro);
router.delete("/seguros/:id", deleteSeguro);

export default router;
