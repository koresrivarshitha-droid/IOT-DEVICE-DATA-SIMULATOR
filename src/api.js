// src/api.js
// Thin REST API client — communicates with the backend Express server (port 3001)

const BASE_URL = 'http://localhost:5000/api';

// Generic fetch wrapper with JSON handling and error normalization
async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

 const data = await res.json();

if (!res.ok) {
  throw new Error(`HTTP ${res.status}`);
}

return data;
}

// ── Devices ──────────────────────────────────────────────────────────────────

/** Fetch all registered devices from MySQL */
export async function apiGetDevices() {
  return apiFetch('/devices');
}

/**
 * Onboard (register) a new device in MySQL.
 * @param {Object} device - Device payload
 * @returns {Promise<{success, message, insertId, deviceId, affectedRows}>}
 */
export async function apiOnboardDevice(device) {
  return apiFetch('/devices', {
    method: 'POST',
    body: JSON.stringify(device),
  });
}

/**
 * Delete a device from MySQL.
 * @param {string} deviceId
 */
export async function apiDeleteDevice(deviceId) {
  return apiFetch(`/devices/${deviceId}`, { method: 'DELETE' });
}

/**
 * Update device status in MySQL.
 * @param {string} deviceId
 * @param {string} status - e.g. 'active' | 'inactive' | 'warning'
 */
export async function apiUpdateDeviceStatus(deviceId, status) {
  return apiFetch(`/devices/${deviceId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

// ── Readings ─────────────────────────────────────────────────────────────────

/**
 * Post a sensor reading to MySQL.
 * @param {Object} reading
 */
export async function apiPostReading(reading) {
  return apiFetch('/readings', {
    method: 'POST',
    body: JSON.stringify(reading),
  });
}

/** Fetch last N readings, optionally filtered by deviceId */
export async function apiGetReadings(deviceId = null, limit = 50) {
  const query = deviceId
    ? `?deviceId=${encodeURIComponent(deviceId)}&limit=${limit}`
    : `?limit=${limit}`;
  return apiFetch(`/readings${query}`);
}

// ── Feed Events ───────────────────────────────────────────────────────────────

/**
 * Post a feed event to MySQL.
 * @param {Object} event - { deviceId, type, message }
 */
export async function apiPostFeedEvent(event) {
  return apiFetch('/feed', {
    method: 'POST',
    body: JSON.stringify(event),
  });
}

/** Fetch latest N feed events */
export async function apiGetFeed(limit = 30) {
  return apiFetch(`/feed?limit=${limit}`);
}

// ── Stats ─────────────────────────────────────────────────────────────────────

/** Get database statistics (device count, reading count, etc.) */
export async function apiGetStats() {
  return apiFetch('/stats');
}

/** Check backend health */
export async function apiHealthCheck() {
  try {
    return await apiFetch('/health');
  } catch {
    return null;
  }
}
