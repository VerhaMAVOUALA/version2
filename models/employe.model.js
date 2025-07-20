import connectionDB from "../config/db.js";

export const Employee = {
  getAll: (callback) => {
    connectionDB.query("SELECT * FROM employees", callback);
  },
  getById: (id, callback) => {
    connectionDB.query("SELECT * FROM employees WHERE id = ?", [id], callback);
  },
  create: (employee, callback) => {
    connectionDB.query("INSERT INTO employees SET ?", employee, callback);
  },
  update: (id, employee, callback) => {
    connectionDB.query(
      "UPDATE employees SET ? WHERE id = ?",
      [employee, id],
      callback
    );
  },
  delete: (id, callback) => {
    connectionDB.query("DELETE FROM employees WHERE id = ?", [id], callback);
  },
};
