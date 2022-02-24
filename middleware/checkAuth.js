function checkAuth(req, res, next) {
  const user = req.cookies.user;

  if (!user) {
    res.redirect("http://localhost:3000/Login");
  } else {
    next();
  }
}

module.exports = checkAuth;
