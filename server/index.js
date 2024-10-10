require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.routes");
const userProfileRoute = require("./routes/userProfile.routes");
const shipmentRoute = require("./routes/shipment.routes");
const senderRoute = require("./routes/sender.routes");
const courierRoute = require("./routes/courier.routes");
const recipientRoute = require("./routes/recipient.routes");
const serviceRoute = require("./routes/service.routes");
const packageRoute = require("./routes/package.routes");
const paymentRoute = require("./routes/payment.routes");
const shippingRateRoute = require("./routes/shippingrate.routes");
const costRoute = require("./routes/cost.routes");
const dropPointRoute = require("./routes/dropPoint.routes");
const cityRoute = require("./routes/city.routes");
const notificationRoute = require("./routes/notification.routes");
const costEstimationRoute = require("./routes/costEstimation.routes");
const cron = require("node-cron");
const Shipment = require("./models/shipment");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/api/v1/users", userRoute);
app.use("/api/v1/user-profiles", userProfileRoute);
app.use("/api/v1/shipments", shipmentRoute);
app.use("/api/v1/senders", senderRoute);
app.use("/api/v1/couriers", courierRoute);
app.use("/api/v1/recipients", recipientRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/packages", packageRoute);
app.use("/api/v1/payments", paymentRoute);
app.use("/api/v1/shippings", shippingRateRoute);
app.use("/api/v1/rajaongkir", costRoute);
app.use("/api/v1/drop-point", dropPointRoute);
app.use("/api/v1/city", cityRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/cost-estimation", costEstimationRoute);


app.get("/", (req, res) => {
  res.send("Welcome to server");
});

// 404 error handling
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Bad Request",
    data: null,
  });
});

// 500 error handling
app.use((err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: err.message ?? "Internal Server Error",
    data: null,
  });
});


// Cron job to clean up shipments older than 3 hours with a costShipment of null or 0
const scheduleShipmentCleanup = () => {
  console.log("Initializing cron job...");

  cron.schedule("0 * * * *", async () => {
    console.log("Cron job running...");

    try {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
      console.log(`Deleting shipments older than: ${threeHoursAgo}`);

      const deletedShipments = await Shipment.deleteMany({
        $or: [{ costShipment: null }, { costShipment: 0 }],
        createdAt: { $lte: threeHoursAgo },
      });

      console.log(`${deletedShipments.deletedCount} shipments deleted.`);
    } catch (error) {
      console.error("Error deleting shipments:", error);
    }
  }, {
    timezone: "Asia/Jakarta", // Ensures the cron job runs according to Jakarta's timezone
  });
};

// Call the cron job function to start the scheduled task
scheduleShipmentCleanup();




const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database is connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
