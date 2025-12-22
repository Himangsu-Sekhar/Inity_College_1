const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const tenantController = require("../controllers/tenantController");

// List all tenants
router.get("/all", auth.isLoggedIn, tenantController.listTenants);
router.post("/:tenantId/mark", auth.isLoggedIn, tenantController.markRentPaid);


module.exports = router;
