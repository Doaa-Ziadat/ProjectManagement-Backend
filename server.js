const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = require("./router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use((req, res, next) => {

//   console.log(req.cookies);

//   const token = req.cookies.user;
//   if (token) {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user;
//   }
//   next();
// });

app.use(router);

app.listen(4000, () => {
  console.log("Running on http://localhost:4000");
});
