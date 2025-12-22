require("dotenv").config();
require("./cron/paymentStatusCron");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const morgan = require("morgan");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); 
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const pgRoutes = require("./routes/pg");
const indexRoutes = require("./routes/main");
const tenantRoutes = require("./routes/tenant");



const app = express();

// DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "initysecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    })
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs',ejsMate);

// Static (if needed)
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRoutes)
app.use("/", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/pg", pgRoutes);
app.use("/tenants", tenantRoutes);
// app.use("/tenants", tenantRoutes);
// 404
app.use((req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));
