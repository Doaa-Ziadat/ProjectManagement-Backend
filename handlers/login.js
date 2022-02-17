const db = require("../database/connection");
const jwt = require("jsonwebtoken");

const post = (req, res) => {
  const data = req.body;
  db.query("SELECT password FROM users WHERE email=$1", [data.email]).then(
    ({ rows }) => {
      if (rows[0]) {
        const user = rows[0];
        console.log(user);

        if (user.password !== data.password) {
          res.send({ success: false, message: "Incorrect password" });
        } else {
          const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
          res.cookie("token", token, { maxAge: 6000000 });
          res.send({ success: true });
        }
      } else {
        res.send({ success: false, message: "Incorrect email" });
      }
    }
  );
};

module.exports = { post };
