const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.renderSignup = (req, res) => {
  res.render("auth/signup");
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    req.flash("success", "Account created. Please login.");
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    req.flash("error", "Error signing up");
    res.redirect("/signup");
  }
};

exports.renderLogin = (req, res) => {
  res.render("auth/login");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/login");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    req.flash("error", "Invalid password");
    return res.redirect("/login");
  }
  req.session.userId = user._id;
  req.session.userName = user.name;
  res.redirect("/dashboard");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
