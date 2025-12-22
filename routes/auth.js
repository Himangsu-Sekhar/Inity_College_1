const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/signup", authController.renderSignup);
router.post("/signup", authController.signup);

router.get("/login", authController.renderLogin);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;
