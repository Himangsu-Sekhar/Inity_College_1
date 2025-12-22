const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const pgController = require("../controllers/pgController");
const roomController = require("../controllers/roomController");
const bedController = require("../controllers/bedController");
const tenantController = require("../controllers/tenantController");

// Add PG
router.post("/new", auth.isLoggedIn, pgController.addPG);

// Delete PG
router.post("/:pgId/delete", auth.isLoggedIn, pgController.deletePG);

// PG Dashboard (rooms + beds)
router.get("/:pgId", auth.isLoggedIn, pgController.pgDashboard);

// Add room
router.post("/:pgId/room/add", auth.isLoggedIn, roomController.addRoom);

// Delete room
router.post("/room/:roomId/delete", auth.isLoggedIn, roomController.deleteRoom);

// Add bed
router.post("/room/:roomId/bed/add", auth.isLoggedIn, bedController.addBed);

// Delete bed
router.post("/bed/:bedId/delete", auth.isLoggedIn, bedController.deleteBed);

// Vacate bed
router.post("/bed/:bedId/vacate", auth.isLoggedIn, bedController.vacateBed);

// Add tenant + assign bed
router.post("/tenant/add", auth.isLoggedIn, tenantController.addTenantAndAssign);



module.exports = router;

