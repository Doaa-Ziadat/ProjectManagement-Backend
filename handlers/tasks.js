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
  console.log("in add task");
  const data = req.body;
  const userId = data.userid;
  console.log("add", data);
  console.log(userId);
  if (userId && userId != 0) {
    console.log("insert not true");
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
  } else {
    db.query(
      "INSERT INTO tasks(name,projectid,timeline,priority,processlabel) VALUES($1,$2,$3,$4,$5)",
      [
        data.name,
        data.projectId,
        data.timeline,
        data.priority,
        data.processlabel,
      ]
    )
      .then(() => {
        res.send({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.send({ success: false });
      });
  }
};

const update = (req, res) => {
  const data = req.body;
  console.log("backenddd", data);
  if (data.userid && data.userid != 0) {
    db.query(
      `UPDATE tasks 
      SET name='${data.name} ',
      timeline='${data.timeline}',
      priority='${data.priority}',
      processlabel='${data.processlabel}',
      userid='${data.userid}'
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
  } else {
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
  }
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
