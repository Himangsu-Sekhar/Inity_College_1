const Bed = require("../models/Bed");
const Room = require("../models/Room");
const Tenant = require("../models/Tenant");

exports.addBed = async (req, res) => {
  const { bedNumber } = req.body;
  const { roomId } = req.params;
  const { pgId } = req.body;

  const bed = await Bed.create({ roomId, bedNumber });
  await Room.findByIdAndUpdate(roomId, { $push: { beds: bed._id } });

  res.redirect(`/pg/${pgId}`);
};

exports.vacateBed = async (req, res) => {
  const { bedId } = req.params;
  const { pgId } = req.body;

  const bed = await Bed.findById(bedId);
  if (bed.tenantId) {
    await Tenant.findByIdAndDelete(bed.tenantId);
  }
  bed.tenantId = null;
  bed.isOccupied = false;
  await bed.save();

  res.redirect(`/pg/${pgId}`);
};
exports.deleteBed = async (req, res) => {
  try {
    const { bedId } = req.params;
    const { pgId, roomId } = req.body;

    const bed = await Bed.findById(bedId);

    // Delete tenant if exists
    if (bed.tenantId) {
      await Tenant.findByIdAndDelete(bed.tenantId);
    }

    // Remove bed reference from room
    await Room.findByIdAndUpdate(roomId, {
      $pull: { beds: bedId }
    });

    // Delete bed
    await Bed.findByIdAndDelete(bedId);

    res.redirect(`/pg/${pgId}`);
  } catch (err) {
    console.error("Delete bed error:", err);
    res.status(500).send("Failed to delete bed");
  }
};
