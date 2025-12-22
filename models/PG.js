const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String },
    type: { type: String, enum: ["boys", "girls", "coed"], default: "coed" },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("PG", pgSchema);
