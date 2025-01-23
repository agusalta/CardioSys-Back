import express from "express";
import {
  getAllSeguros,
  createNuevoSeguro,
  updateSeguro,
  deleteSeguro,
  getSeguroById,
} from "../controllers/seguroController.js";

const router = express.Router();

router.get("/seguros", getAllSeguros);
router.get("/:id", getSeguroById);
router.post("/seguros", createNuevoSeguro);
router.put("/seguros/:id", updateSeguro);
router.delete("/seguros/:id", deleteSeguro);

export default router;
