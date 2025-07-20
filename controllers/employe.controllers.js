import { Employee } from "../models/employe.model.js";

export const createEmployee = (req, res) => {
  Employee.create(req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({
        message: "Employé créé avec succès",
        id: results.insertId,
        ...req.body,
      });
    }
  });
};
