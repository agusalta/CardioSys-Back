import express from "express";
import {
  getAllSeguros,
  createNuevoSeguro,
  updateSeguro,
  deleteSeguro,
  getSeguroById,
  getEmpresasDePrepagas,
  getEmpresaDePrepagaPorId,
} from "../controllers/seguroController.js";

const router = express.Router();

router.get("/seguros", getAllSeguros);
router.get("/:id", getSeguroById);
router.get("/prepaga/empresas", getEmpresasDePrepagas);
router.get("/prepaga/empresas/:id", getEmpresaDePrepagaPorId);
router.post("/seguros", createNuevoSeguro);
router.put("/seguros/:id", updateSeguro);
router.delete("/seguros/:id", deleteSeguro);

export default router;
