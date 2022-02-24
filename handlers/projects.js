const db = require("../database/connection");

// add project
const post = (req, res) => {
  const data = req.body;
  const userId = data.userId;
  db.query(
    "INSERT INTO projects(userId,name,timeline,priority) VALUES($1,$2,$3,$4)",
    [userId, data.name, data.timeline, data.priority]
  )
    .then(() => {
      db.query(" SELECT MAX( id ) FROM projects")
        .then(({ rows }) => {
          db.query(
            "INSERT INTO project_member (userId,projectId) VALUES($1,$2)",
            [userId, rows[0].max]
          )
            .then(() => {
              res.send({ success: true });
            })
            .catch((err) => {
              console.log(err);
              res.send({ success: false });
            });
        })
        .catch((err) => {
          console.log(err);
          res.send({ success: false });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

//add to project_member :
//TODO: user.id sholud come from frontend
const addMember = (req, res) => {
  const data = req.body;
  db.query("SELECT id FROM users WHERE email = $1", [data.email])
    .then(({ rows }) => {
      const id = rows[0].id;
      db.query("INSERT INTO project_member (userId,projectId) VALUES($1,$2)", [
        id,
        data.projectId,
      ])
        .then(() => {
          res.send({ success: true });
        })
        .catch((err) => {
          console.log(err);
          res.send({ success: false });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

// get user's projects
//TEMP $1 = req.user.email
const get = (req, res) => {
  db.query("SELECT id FROM users WHERE email = $1", [req.user.email])
    .then(({ rows }) => {
      const id = rows[0].id;
      db.query(
        "SELECT projects.* FROM project_member JOIN projects ON projects.id=project_member.projectId JOIN users ON users.id =project_member.userId WHERE users.id=$1",
        [id]
      )
        .then(({ rows }) => {
          res.send(rows);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

//edit project

module.exports = { post, get, addMember };
