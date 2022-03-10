const db = require("../database/connection");
const get = (req, res) => {
  db.query("SELECT name,email FROM users WHERE id=$1", [req.params.id])
    .then(({ rows }) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { get };
