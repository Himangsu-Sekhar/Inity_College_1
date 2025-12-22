const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    pgId: { type: mongoose.Schema.Types.ObjectId, ref: "PG", required: true },
    roomNumber: { type: String, required: true },
    roomType: { type: String, enum: ["single", "shared"], required: true },
    beds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bed" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
