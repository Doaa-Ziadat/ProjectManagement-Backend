const express = require("express");
const router = express.Router();
const home = require("./handlers/home");
const signup = require("./handlers/signup");
const checkAuth = require("./middleware/checkAuth");
const login = require("./handlers/login");
const projects = require("./handlers/projects");
const email = require("./handlers/email");
const tasks = require("./handlers/tasks");
router.post("/signup", signup.post);
router.post("/login", login.post);
router.post("/add-project", checkAuth, projects.post);
router.post("/add-member", checkAuth, projects.addMember);
router.get("/projects", checkAuth, projects.get);
router.get("/tasks/:id", checkAuth, tasks.get);
router.post("/add-task", checkAuth, tasks.post);
router.post("/edit-task", checkAuth, tasks.update);
router.post("/delete-task", checkAuth, tasks.deleteTask);

router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.clearCookie("__react_session__");
  return res.status(200).redirect("http://localhost:4000/");
  // 3000 error with the cors ..
});
router.get("/getCookies", (req, res) => {
  res.send({ loggedIn: !!req.user, email: req.user });
});

// router.get("/home", home);
// router.get("/email/:id", email.get);

module.exports = router;
