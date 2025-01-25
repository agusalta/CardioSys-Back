import express from "express";

import {
  getConfig,
  updateConfig,
  deleteConfig,
  createConfig,
} from "../controllers/configController.js";

const router = express.Router();

router.get("/", getConfig);
router.put("/:id", updateConfig);
router.delete("/:id", deleteConfig);
router.post("/", createConfig);

export default router;
