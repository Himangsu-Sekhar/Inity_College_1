const Room = require("../models/Room");
const PG = require("../models/PG");
const Bed = require("../models/Bed");
const Tenant = require("../models/Tenant");


exports.addRoom = async (req, res) => {
  const { roomNumber, roomType } = req.body;
  const { pgId } = req.params;

  const room = await Room.create({ pgId, roomNumber, roomType });
  await PG.findByIdAndUpdate(pgId, { $push: { rooms: room._id } });

  res.redirect(`/pg/${pgId}`);
};
exports.deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { pgId } = req.body;

    // Find beds in room
    const beds = await Bed.find({ roomId });

    // Delete tenants in beds
    const tenantIds = beds
      .filter(b => b.tenantId)
      .map(b => b.tenantId);

    await Tenant.deleteMany({ _id: { $in: tenantIds } });

    // Delete beds
    await Bed.deleteMany({ roomId });

    // Remove room reference from PG
    await PG.findByIdAndUpdate(pgId, {
      $pull: { rooms: roomId }
    });

    // Delete room
    await Room.findByIdAndDelete(roomId);

    res.redirect(`/pg/${pgId}`);
  } catch (err) {
    console.error("Delete room error:", err);
    res.status(500).send("Failed to delete room");
  }
};
