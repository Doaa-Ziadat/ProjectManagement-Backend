const db = require("../database/connection");

const post = (req, res) => {
  const data = req.body;
  //check if the user already exists
  console.log(data);
  db.query("SELECT * FROM users WHERE email=$1", [data.email]).then(
    (response) => {
      if (!response.rows.length) {
        db.query(
          "INSERT INTO users(name, email ,password, adminFlag)  VALUES($1,$2,$3,$4)",
          [data.name, data.email, data.passsword, false]
        ).then(() => {
          res.send({ success: true });
        });
      } else {
        res.send({ success: false, message: "Email already exist" });
      }
    }
  );
};

module.exports = { post };
