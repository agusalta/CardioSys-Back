import * as activityModel from "../models/activityModel.js";

export const getRecentActivity = (req, res) => {
  activityModel.getRecentActivity((err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener actividad reciente",
        details: err.message,
      });
    }
    res.status(200).json(results);
  });
};
