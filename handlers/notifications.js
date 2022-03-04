const db = require("../database/connection");

const get = (req, res) => {
  db.query("SELECT * FROM project_member_pending WHERE userId = $1", [
    req.params.id,
  ])
    .then(({ rows }) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete user form project_member_pending
const deleteNotification = (req, res) => {
  const data = req.body;
  db.query(`DELETE FROM project_member_pending WHERE id='${data.id}'`)
    .then(() => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

module.exports = { get, deleteNotification };
