const cron = require("node-cron");
const Tenant = require("../models/Tenant");

// Runs EVERY DAY at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  console.log("Running payment status cron...");

  try {
    const tenants = await Tenant.find({ currentPaymentStatus: "paid" });

    const now = Date.now();
    const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

    for (let tenant of tenants) {
      if (now - new Date(tenant.lastPaidAt).getTime() >= THIRTY_DAYS) {
        tenant.currentPaymentStatus = "pending";
        await tenant.save();

        console.log(`Rent pending for ${tenant.name}`);
      }
    }
  } catch (err) {
    console.error("Cron error:", err);
  }
});
