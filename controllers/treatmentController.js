const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new treatment package
exports.createTreatment = async (req, res) => {
  const body = req.body;
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newTreatmentRef = db.ref('treatments/'+id);
    await newTreatmentRef.set(body);
    res.status(200).json({
      message: 'Treatment package created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating treatment package',
      error: error.message
    });
  }
};

// Get all treatment packages
exports.getAllTreatments = async (req, res) => {
  const { id } = req.params;
  try {
    const treatmentsRef = id ? db.ref('treatments/'+id) : db.ref('treatments');
    const snapshot = await treatmentsRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No treatments available' });
    }
    const treatments = snapshot.val();
    const treatmentsList = Object.keys(treatments).map((key) => ({ id: key, ...treatments[key] }));
    res.status(200).json({
      message: 'Treatments retrieved successfully',
      data: treatmentsList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching treatments',
      error: error.message
    });
  }
};

// Update a treatment package
exports.updateTreatment = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const treatmentRef = db.ref(`treatments/${id}`);
    await treatmentRef.update(body);
    res.status(200).json({
      message: 'Treatment package updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating treatment package',
      error: error.message
    });
  }
};

// Delete a treatment package
exports.deleteTreatment = async (req, res) => {
  const { id } = req.params;
  try {
    const treatmentRef = db.ref(`treatments/${id}`);
    await treatmentRef.remove();
    res.status(200).json({
      message: 'Treatment package deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting treatment package',
      error: error.message
    });
  }
};
