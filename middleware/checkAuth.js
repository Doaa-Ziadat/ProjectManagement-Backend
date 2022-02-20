function checkAuth(req, res, next) {
  const user = req.cookies.user;
  console.log(user, "token");
  // console.log("req.user in checkAuth", req.user);
  if (!user) {
    res.redirect("http://localhost:3000/log-in");
  } else {
    next();
  }
}

module.exports = checkAuth;
