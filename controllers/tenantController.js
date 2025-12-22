const Tenant = require("../models/Tenant");
const PG = require("../models/PG");
const Room = require("../models/Room");
const Bed = require("../models/Bed");

exports.addTenantAndAssign = async (req, res) => {
  try {
    const { name, phone, rentAmount, pgId, roomId, bedId } = req.body;

    const now = new Date();
    const month = now.getMonth() + 1; // JS months are 0–11, so +1 => 1–12
    const year = now.getFullYear();

    const tenant = await Tenant.create({
      name,
      phone,
      rentAmount,
      pgId,
      roomId,
      bedId,

      // ⬇ new fields
      currentPaymentStatus: "paid",
      lastPaidAt: now,

      paymentHistory: [
        {
          month,
          year,
          status: "paid"
        }
      ]
    });

    await Bed.findByIdAndUpdate(bedId, {
      tenantId: tenant._id,
      isOccupied: true
    });

    res.redirect(`/pg/${pgId}`);
  } catch (error) {
    console.error("Error adding tenant:", error);
    res.status(500).send("Something went wrong while adding tenant");
  }
};
exports.listTenants = async (req, res) => {
  try {
    // 1. Find PGs owned by logged-in user
    const pgs = await PG.find({
      ownerId: req.session.userId
    }).select("_id");

    const pgIds = pgs.map(pg => pg._id);

    // 2. Find tenants ONLY in those PGs
    const tenants = await Tenant.find({
      pgId: { $in: pgIds }
    })
      .populate("pgId", "name")
      .populate("roomId", "roomNumber")
      .populate("bedId", "bedNumber")
      .sort({ createdAt: -1 });

    res.render("tenant/index", { tenants });
  } catch (err) {
    console.error("List tenants error:", err);
    res.status(500).send("Failed to load tenants");
  }
};
exports.markRentPaid = async (req, res) => {
  const tenant = await Tenant.findById(req.params.tenantId);

  const now = new Date();
  tenant.currentPaymentStatus = "paid";
  tenant.lastPaidAt = now;
  tenant.paymentHistory.push({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    status: "paid"
  });

  await tenant.save();
  res.redirect("/tenants/all");
};
