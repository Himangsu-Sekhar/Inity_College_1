module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    req.flash("error", "Please login first");
    return res.redirect("/login");
  }
  next();
};
