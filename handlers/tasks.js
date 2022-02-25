const db = require("../database/connection");

const get = (req, res) => {
  db.query("SELECT * FROM tasks WHERE projectId = $1", [req.params.id])
    .then(({ rows }) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const post = (req, res) => {
  console.log("in tasks add backend");

  const data = req.body;
  const userId = data.userId;
  db.query(
    "INSERT INTO tasks(name,projectid,timeline,priority,processlabel,userid) VALUES($1,$2,$3,$4,$5,$6)",
    [
      data.name,
      data.projectId,
      data.timeline,
      data.priority,
      data.processlabel,
      userId,
    ]
  )
    .then(() => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};
module.exports = { post, get };
