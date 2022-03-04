const db = require("../database/connection");
const get = (req, res) => {
  db.query("SELECT id FROM users WHERE email = $1", [req.params.email])
    .then(({ rows }) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { get };
