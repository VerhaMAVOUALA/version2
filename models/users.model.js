import connectionDB from "../config/db.js";

export const User = {
    
  getAll: (callback) => {
    connectionDB.query("SELECT * FROM users", callback);
  },
  getById: (id, callback) => {
    connectionDB.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },
  create: (user, callback) => {
    connectionDB.query("INSERT INTO users SET ?", user, callback);
  },
  update: (id, user, callback) => {
    connectionDB.query(
      "UPDATE users SET ? WHERE id = ?",
      [user, id],
      callback
    );
  },
  delete: (id, callback) => {
    connectionDB.query("DELETE FROM users WHERE id = ?", [id], callback);
  },
};
