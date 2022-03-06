const res = require("express/lib/response");
const db = require("../database/connection");

// add project
const post = (req, res) => {
  const data = req.body;

  const userId = data.userId;
  db.query(
    "INSERT INTO projects(userId,name,timeline,priority,publicFlag) VALUES($1,$2,$3,$4,$5)",
    [userId, data.name, data.timeline, data.priority, data.publicFlag]
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

//add to project_member_pending:
const addMemberPending = (req, res) => {
  const data = req.body;
  console.log(data);
  db.query("SELECT id FROM users WHERE email = $1", [data.email])
    .then(({ rows }) => {
      if (rows[0]) {
        const id = rows[0].id;
        // check if user already a member of the project
        db.query(
          "SELECT id FROM project_member WHERE userId = $1 AND projectId=$2",
          [id, data.projectId]
        ).then(({ rows }) => {
          if (rows[0]) {
            res.send({
              success: false,
              message: "user already a particepent in this project",
            });
          } else {
            //check if user already been invited
            db.query(
              "SELECT id FROM project_member_pending WHERE userId = $1 AND projectId=$2",
              [id, data.projectId]
            ).then(({ rows }) => {
              if (rows[0]) {
                res.send({
                  success: false,
                  message: "user already has been invited to this project",
                });
              } else {
                db.query(
                  "INSERT INTO project_member_pending (userId,projectId,invitedBy,seenFlag,invitedByEmail,projectName) VALUES($1,$2,$3,$4,$5,$6)",
                  [
                    id,
                    data.projectId,
                    data.invitedBy,
                    false,
                    data.invitedByEmail,
                    data.projectName,
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
            });
          }
        });
      } else {
        res.send({ success: false, message: "user doesn't exist" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addMember = (req, res) => {
  const data = req.body;
  const id = data.id;
  // check if user already a member of the project
  db.query("SELECT id FROM project_member WHERE userId = $1 AND projectId=$2", [
    id,
    data.projectId,
  ]).then(({ rows }) => {
    if (rows[0]) {
      res.send({
        success: false,
        message: "user already a particepent in this project",
      });
    } else {
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
    }
  });
};

// get user's projects
//TEMP $1 = req.user.email
const get = (req, res) => {
  console.log("in user projects ");
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

// display project member
const getMembers = (req, res) => {
  console.log("in get members");
  console.log(req.params.id);
  let datatoSent = [];
  let i = 0;
  db.query("SELECT userId FROM project_member WHERE projectid  = $1", [
    req.params.id,
  ])

    .then(async ({ rows }) => {
      // array of promises
      await Promise.all(
        Array.from(rows).map((user) => {
          return db
            .query("SELECT name,email FROM users WHERE id=$1", [user.userid])
            .then(({ rows }) => {
              datatoSent.push(rows[0]);
            })
            .catch((err) => {
              res.send(err);
            });
        })
      );
      console.log("data to send", datatoSent);

      res.send(datatoSent);
    })

    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

module.exports = { post, get, addMemberPending, addMember, getMembers };
