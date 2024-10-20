const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new report package
exports.createReport = async (req, res) => {
  const { uid } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newReportRef = db.ref(`reports/${uid}/${id}`);
    await newReportRef.set(body);
    res.status(200).json({
      message: 'Report package created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating report package',
      error: error.message
    });
  }
};

// Get all report packages
exports.getAllReports = async (req, res) => {
  const { uid } = req.params;
  try {
    const reportsRef = uid ? db.ref(`reports/${uid}`) : db.ref(`reports/`);
    const snapshot = await reportsRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No reports available' });
    }
    const reports = snapshot.val();
    const reportsList = Object.keys(reports).map((key) => ({ id: key, ...reports[key] }));
    res.status(200).json({
      message: 'Reports retrieved successfully',
      data: reportsList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching reports',
      error: error.message
    });
  }
};

// Get all report packages
exports.getAllReportById = async (req, res) => {
  const { uid, id } = req.params;
  try {
    const reportsRef = uid ? db.ref(`reports/${uid}/${id}`) : db.ref(`reports/${id}`);
    const snapshot = await reportsRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No reports available' });
    }
    const report = snapshot.val();
    res.status(200).json({
      message: 'Report retrieved successfully',
      data: {...report, id}
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching reports',
      error: error.message
    });
  }
};

// Update a report package
exports.updateReport = async (req, res) => {
  const { uid, id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const reportRef = db.ref(`reports/${uid}/${id}`);
    await reportRef.update(body);
    res.status(200).json({
      message: 'Report package updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating report package',
      error: error.message
    });
  }
};

// Delete a report package
exports.deleteReport = async (req, res) => {
  const { uid, id } = req.params;
  try {
    const reportRef = db.ref(`reports/${uid}/${id}`);
    await reportRef.remove();
    res.status(200).json({
      message: 'Report package deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting report package',
      error: error.message
    });
  }
};
