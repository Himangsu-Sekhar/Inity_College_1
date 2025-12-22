const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    month: { type: Number, required: true }, // 1–12
    year: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "paid"
    }
  },
  { timestamps: true }
);

const tenantSchema = new mongoose.Schema(
  {
    pgId: { type: mongoose.Schema.Types.ObjectId, ref: "PG", required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    bedId: { type: mongoose.Schema.Types.ObjectId, ref: "Bed", required: true },

    name: { type: String, required: true },
    phone: { type: String, required: true },
    rentAmount: { type: Number, required: true },

    // ✅ Overall current status of this tenant's rent
    currentPaymentStatus: {
      type: String,
      enum: ["paid", "pending"],
      default: "paid"
    },

    // ✅ When the tenant last paid (used to auto-switch to "pending" after 30 days)
    lastPaidAt: {
      type: Date,
      default: Date.now
    },

    // ✅ Monthly payment history
    paymentHistory: [paymentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", tenantSchema);
