import { useState } from 'react';

function SensorForm() {
  // State to hold our form data
  const [formData, setFormData] = useState({
    deviceId: '',
    temperature: '',
    humidity: '',
    voltage: '',
    gps: '',
    status: 'active'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Prevent default submission for now
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="sensor-form-container">
      <h2>IoT Device Data Simulator Form</h2>
      <p>Enter sensor readings and device status below.</p>

      <form onSubmit={handleSubmit}>
        {/* Device ID */}
        <div>
          <label htmlFor="deviceId">Device ID:</label><br />
          <input 
            type="text" 
            id="deviceId" 
            name="deviceId" 
            value={formData.deviceId} 
            onChange={handleChange} 
            placeholder="e.g., DEV-001" 
            required 
          />
        </div>

        {/* Temperature */}
        <div>
          <label htmlFor="temperature">Temperature (°C):</label><br />
          <input 
            type="number" 
            id="temperature" 
            name="temperature" 
            value={formData.temperature} 
            onChange={handleChange} 
            placeholder="e.g., 25" 
          />
        </div>

        {/* Humidity */}
        <div>
          <label htmlFor="humidity">Humidity (%):</label><br />
          <input 
            type="number" 
            id="humidity" 
            name="humidity" 
            value={formData.humidity} 
            onChange={handleChange} 
            placeholder="e.g., 60" 
          />
        </div>

        {/* Voltage */}
        <div>
          <label htmlFor="voltage">Voltage (V):</label><br />
          <input 
            type="number" 
            id="voltage" 
            name="voltage" 
            value={formData.voltage} 
            onChange={handleChange} 
            placeholder="e.g., 3.3" 
            step="0.1" 
          />
        </div>

        {/* GPS */}
        <div>
          <label htmlFor="gps">GPS Coordinates:</label><br />
          <input 
            type="text" 
            id="gps" 
            name="gps" 
            value={formData.gps} 
            onChange={handleChange} 
            placeholder="e.g., 17.3850° N, 78.4867° E" 
          />
        </div>

        {/* Device Status */}
        <div>
          <label htmlFor="status">Device Status:</label><br />
          <select 
            id="status" 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <br />
        <button type="submit">Submit Data</button>
      </form>
    </div>
  );
}

export default SensorForm;