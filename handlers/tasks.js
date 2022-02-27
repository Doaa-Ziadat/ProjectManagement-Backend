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

const update = (req, res) => {
  const data = req.body;
  console.log(data);

  // const userId = data.userId;
  //,userid=${data.userId}
  db.query(
    `UPDATE tasks 
    SET name='${data.name} ',
    timeline='${data.timeline}',
    priority='${data.priority}',
    processlabel='${data.processlabel}'
    WHERE id='${data.id}'`
  )
    .then(() => {
      console.log("edited");
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};
const deleteTask = (req, res) => {
  const data = req.body;
  db.query(`DELETE FROM tasks WHERE id='${data.id}'`)
    .then(() => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

module.exports = { post, get, update, deleteTask };
