const express = require("express");
const router = express.Router();
const home = require("./handlers/home");
const signup = require("./handlers/signup");
const checkAuth = require("./middleware/checkAuth");
const login = require("./handlers/login");
const projects = require("./handlers/projects");
const email = require("./handlers/email");
const id = require("./handlers/id");
const notifications = require("./handlers/notifications");
const comments = require("./handlers/comments");
const tasks = require("./handlers/tasks");
router.post("/signup", signup.post);
router.post("/login", login.post);
router.post("/add-project", checkAuth, projects.post);
router.post("/add-member-pending", checkAuth, projects.addMemberPending);
router.post("/add-member", checkAuth, projects.addMember);
router.get("/get-members/:id", checkAuth, projects.getMembers);
router.get("/projects", checkAuth, projects.get);
router.get("/tasks/:id", checkAuth, tasks.get);
router.post("/add-task", checkAuth, tasks.post);
router.post("/edit-task", checkAuth, tasks.update);
router.post("/delete-task", checkAuth, tasks.deleteTask);
router.get("/notifications/:id", checkAuth, notifications.get);
router.post(
  "/delete-notification",
  checkAuth,
  notifications.deleteNotification
);

router.post("/addComment", comments.upload, comments.addComment);
router.get("/comments/:id", comments.get);
router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.clearCookie("__react_session__");
  return res.status(200).redirect("http://localhost:3000/");
  // 3000 error with the cors ..
});
router.get("/getCookies", (req, res) => {
  // res.send({ loggedIn: "!!req.user", email: "req.user" });

  res.send({ loggedIn: !!req.user, email: req.user });
});

router.get("/getId/:email", id.get);

router.get("/getEmail/:id", email.get);
// router.get("/home", home);

module.exports = router;
