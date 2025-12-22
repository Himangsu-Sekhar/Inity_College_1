const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const tenantController = require("../controllers/tenantController");

router.get("/", auth.isLoggedIn, tenantController.listTenants);
router.get("/add", auth.isLoggedIn, tenantController.renderAddTenant);
router.post("/add", auth.isLoggedIn, tenantController.addTenant);

router.get("/:tenantId/edit", auth.isLoggedIn, tenantController.renderEditTenant);
router.post("/:tenantId/edit", auth.isLoggedIn, tenantController.editTenant);

router.get("/:tenantId/delete", auth.isLoggedIn, tenantController.deleteTenant);

module.exports = router;
