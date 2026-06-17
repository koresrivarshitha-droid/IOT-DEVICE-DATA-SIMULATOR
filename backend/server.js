const nodemailer = require("nodemailer");
const generateSensorData = require("./simulator");
const express = require("express");
const cors = require("cors");
const db = require("./db");


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("IoT Device Simulator Backend Running");
});

app.post("/api/devices", (req, res) => {
 const {
  deviceId,
  temperature,
  humidity,
  voltage,
  gps,
  status
} = req.body;

if (!deviceId || !temperature || !humidity || !status) {
  return res.status(400).json({
    success: false,
    message: "Required fields missing"
  });
}

  const sql = `
INSERT INTO Devices
(deviceName, deviceType, protocol, status, temperature, humidity, voltage, gps)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

db.query(
  sql,
  [
    deviceId,
    "Sensor",
    "Simulation",
    status,
    temperature,
    humidity,
    voltage,
    gps
  ],
  (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.status(201).json({
      success: true,
      message: "Device data saved successfully",
      deviceId: result.insertId
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

app.get("/api/history", (req, res) => {
  const sql = "SELECT * FROM ProcessingHistory";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.json(results);
  });
});

app.get("/api/simulate", (req, res) => {
    const sensorData = generateSensorData();
    res.json(sensorData);
});

app.post("/api/process", (req, res) => {
  const sensorData = generateSensorData();
  
  let alert = "Normal";
  let recommendation = "Device operating normally";

  if (sensorData.temperature > 40) {
    alert = "High Temperature Warning";
    recommendation = "Check cooling system";
  } else if (sensorData.humidity > 80) {
    alert = "High Humidity Warning";
    recommendation = "Inspect environment conditions";
  }

  const sql = `
    INSERT INTO ProcessingHistory
    (temperature, humidity, voltage, latitude, longitude, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      sensorData.temperature,
      sensorData.humidity,
      sensorData.voltage,
      sensorData.latitude,
      sensorData.longitude,
      sensorData.status
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.json({
  success: true,
  message: "Sensor data processed and saved successfully",
  data: sensorData,
  alert: alert,
  recommendation: recommendation
});
    }
  );
});

  


app.put("/api/devices/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE Devices SET status = ? WHERE deviceId = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully"
    });
  });
});

app.get("/api/devices/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM Devices WHERE deviceId = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Device not found"
      });
    }

    res.json(results[0]);
  });
});

app.post("/api/send-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "varshithakore@gmail.com",
        pass: "niqd fboj fkrg qebd"
      }
    });

    await transporter.sendMail({
      from: "varshithakore@gmail.com",
      to: "koresrivarshitha@gmail.com",
      subject: "IoT Device Alert",
      text: "Sensor alert generated from IoT Device Simulator."
    });

    res.json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Email sending failed"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});