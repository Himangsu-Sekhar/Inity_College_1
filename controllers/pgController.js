const PG = require("../models/PG");
const Room = require("../models/Room");
const Bed = require("../models/Bed");
const Tenant = require("../models/Tenant");

exports.listPGs = async (req, res) => {
  const pgs = await PG.find({ ownerId: req.session.userId });
  res.render("dashboard/index", { pgs, stats: null });
};

exports.renderAddPG = (req, res) => {
  res.render("pg/add"); // you can create this later if needed
};

exports.addPG = async (req, res) => {
  const { name, address, city, pincode, type } = req.body;
  await PG.create({
    ownerId: req.session.userId,
    name,
    address,
    city,
    pincode,
    type
  });
  res.redirect("/dashboard");
};

exports.pgDashboard = async (req, res) => {
  const { pgId } = req.params;
  const pg = await PG.findById(pgId);
  const rooms = await Room.find({ pgId }).populate({
    path: "beds",
    populate: { path: "tenantId" }
  });

  // calculate stats per PG
  const beds = rooms.flatMap((r) => r.beds);
  const occupiedBeds = beds.filter((b) => b.isOccupied).length;
  const vacantBeds = beds.length - occupiedBeds;
  const tenants = await Tenant.find({ pgId });

  res.render("pg/show", {
    pg,
    rooms,
    stats: {
      totalRooms: rooms.length,
      totalBeds: beds.length,
      occupiedBeds,
      vacantBeds,
      totalTenants: tenants.length
    }
  });
};

//delete pg
exports.deletePG = async (req, res) => {
  try {
    const { pgId } = req.params;

    // Find rooms under this PG
    const rooms = await Room.find({ pgId });

    // Find all beds in those rooms
    const roomIds = rooms.map(r => r._id);
    const beds = await Bed.find({ roomId: { $in: roomIds } });

    // Delete tenants of those beds
    const tenantIds = beds
      .filter(b => b.tenantId)
      .map(b => b.tenantId);

    await Tenant.deleteMany({ _id: { $in: tenantIds } });

    // Delete beds
    await Bed.deleteMany({ roomId: { $in: roomIds } });

    // Delete rooms
    await Room.deleteMany({ pgId });

    // Delete PG
    await PG.findByIdAndDelete(pgId);

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Delete PG error:", err);
    res.status(500).send("Failed to delete PG");
  }
};