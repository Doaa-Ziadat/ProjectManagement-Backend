const home = (req, res) => {
  console.log(req.cookies.user, "home");
  res.send("Hello World");
};

module.exports = home;
