const db = require("../database/connection");
const jwt = require("jsonwebtoken");

const post = (req, res) => {
  // if (user) {
  //   res.redirect("http://localhost:3000");
  // }
  const data = req.body;
  db.query("SELECT password,id FROM users WHERE email=$1", [data.email])
    .then(({ rows }) => {
      if (rows[0]) {
        const user = rows[0];

        if (user.password !== data.password) {
          res.send({ success: false, message: "Incorrect password" });
        } else {
          const email = data.email;
          const token = jwt.sign({ email }, process.env.JWT_SECRET);
          res.cookie("user", token, {
            maxAge: 6000000,
            secure: true,
            sameSite: "none",
          });

          // res.send({ success: true });
          // res.redirect("http://localhost:3000");
          res.send({ success: true, email: email, id: user.id });
        }
      } else {
        res.send({ success: false, message: "Incorrect email" });
      }
    })
    .catch((err) => {
      res.send({ success: false });
    });
};

module.exports = { post };
