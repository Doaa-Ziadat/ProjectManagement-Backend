const db = require("../database/connection");

const post = (req, res) => {
  const data = req.body;
  //check if the user already exists
  console.log("sign up data", data);
  db.query("SELECT * FROM users WHERE email=$1", [data.email])
    .then((response) => {
      if (!response.rows.length) {
        if (data.password === data.passwordConfirm) {
          db.query(
            "INSERT INTO users(name, email ,password, adminFlag)  VALUES($1,$2,$3,$4)",
            [data.name, data.email, data.password, false]
          ).then(() => {
            res.send({ success: true });
          });
        } else {
          res.send({ success: false, message: "passwords doesn't match" });
        }
      } else {
        res.send({ success: false, message: "Email already exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, message: err });
    });
};

module.exports = { post };
