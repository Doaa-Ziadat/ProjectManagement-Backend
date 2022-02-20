const express = require("express");
const router = express.Router();
// const home = require("./handlers/home");
const signup = require("./handlers/signup");
const checkAuth = require("./middleware/checkAuth");
const login = require("./handlers/login");
const projects = require("./handlers/projects");
const email = require("./handlers/email");
// router.get("/", home);
router.post("/signup", signup.post);
router.post("/login", login.post);
router.post("/add-project", checkAuth, projects.post);
router.post("/add-member", checkAuth, projects.addMember);
router.get("/projects", projects.get);
// router.get("/email/:id", email.get);

module.exports = router;
