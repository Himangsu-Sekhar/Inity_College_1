const router = require("express").Router();
const { model } = require("mongoose");
const mainController = require("../controllers/mainController");

router.get("/", mainController.mainRender);

module.exports = router;