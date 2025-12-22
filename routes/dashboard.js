const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth.isLoggedIn, dashboardController.mainDashboard);

module.exports = router;
