const generateSensorData = require("./simulator");
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("IoT Device Simulator Backend Running");
});

app.post("/api/devices", (req, res) => {
  const { deviceName, deviceType, protocol, status } = req.body;

  const sql =
    "INSERT INTO Devices (deviceName, deviceType, protocol, status) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [deviceName, deviceType, protocol, status],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Device created successfully",
        deviceId: result.insertId,
      });
    }
  );
});

app.get("/api/devices", (req, res) => {
  const { status } = req.query;

  let sql = "SELECT * FROM Devices";

  if (status) {
    sql = `SELECT * FROM Devices WHERE status='${status}'`;
  }

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
}); 

app.get("/api/simulate", (req, res) => {
    const sensorData = generateSensorData();
    res.json(sensorData);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});