const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    bedNumber: { type: String, required: true },
    isOccupied: { type: Boolean, default: false },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bed", bedSchema);
