const express = require("express");
const router = express.Router();
const home = require("./handlers/home");
const signup = require("./handlers/signup");
const login = require("./handlers/login");
router.get("/", home);
router.post("/signup", signup.post);
router.post("/login", login.post);

module.exports = router;
