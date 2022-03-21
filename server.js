const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = require("./router");

const app = express();

app.use(cors());
// app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.get("/", function (req, res) {
//   // console.log(req);
//   // Cookies that have not been signed
//   console.log("Cookies: ", req.cookies);
// });

app.use((req, res, next) => {
  // console.log("cookies server: ", req.cookies);

  const token = req.cookies.user;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  }
  next();
});

app.use(router);

//status images folder
app.use("/images", express.static("./images"));

app.listen(process.env.PORT || 4000, () => {
  console.log("Running on http://localhost:4000");
});
