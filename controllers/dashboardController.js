const PG = require("../models/PG");
const Room = require("../models/Room");
const Bed = require("../models/Bed");
const Tenant = require("../models/Tenant");

exports.mainDashboard = async (req, res) => {
  const ownerId = req.session.userId;

  const pgs = await PG.find({ ownerId });
  const pgIds = pgs.map(pg => pg._id);

  const rooms = await Room.find({ pgId: { $in: pgIds } });
  const beds = await Bed.find({ roomId: { $in: rooms.map(r => r._id) } });
  const tenants = await Tenant.find({ pgId: { $in: pgIds } });

  const occupiedBeds = beds.filter(b => b.isOccupied).length;
  const vacantBeds = beds.length - occupiedBeds;

  // ✅ CORRECT pending logic
  const pendingPayments = tenants.filter(
    t => t.currentPaymentStatus === "pending"
  ).length;

  res.render("dashboard/index", {
    pgs,
    stats: {
      totalPGs: pgs.length,
      totalRooms: rooms.length,
      totalBeds: beds.length,
      occupiedBeds,
      vacantBeds,
      totalTenants: tenants.length,
      pendingPayments
    }
  });
};

