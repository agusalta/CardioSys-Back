import * as configModel from "../models/configModel.js";

export const getConfig = (req, res) => {
  configModel.getConfig((err, config) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener la configuración", details: err });
    }
    res.status(200).json({ config });
  });
};

export const updateConfig = (req, res) => {
  const { FontSize } = req.body;

  if (!FontSize) {
    return res.status(400).json({ error: "El campo 'FontSize' es requerido" });
  }

  configModel.updateConfig(FontSize, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al actualizar la configuración", details: err });
    }
    res
      .status(200)
      .json({ message: "Configuración actualizada exitosamente", result });
  });
};

export const deleteConfig = (req, res) => {
  configModel.deleteConfig((err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al eliminar la configuración", details: err });
    }
    res
      .status(200)
      .json({ message: "Configuración eliminada exitosamente", result });
  });
};

export const createConfig = (req, res) => {
  const { FontSize } = req.body;

  if (!FontSize) {
    return res.status(400).json({ error: "El campo 'FontSize' es requerido" });
  }

  configModel.createConfig(FontSize, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear la configuración", details: err });
    }
    res
      .status(201)
      .json({ message: "Configuración creada exitosamente", result });
  });
};
