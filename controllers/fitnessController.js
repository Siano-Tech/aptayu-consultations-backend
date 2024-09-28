const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new fitness plan (yoga, meditation, exercise)
exports.createFitnessPlan = async (req, res) => {
  const { type } = req.params;
  const body = req.body; // type could be "yoga", "meditation", "exercise"
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newFitnessPlanRef = db.ref(`fitness/${type}/${id}`);
    await newFitnessPlanRef.set(body);
    res.status(200).json({
      message: `Fitness ${type} plan created successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating fitness ${type} plan`,
      error: error.message
    });
  }
};

// Get all fitness plans (yoga, meditation, exercise)
exports.getAllFitnessPlans = async (req, res) => {
  const { type } = req.params;
  try {
    const fitnessRef = db.ref('fitness/'+type);
    const snapshot = await fitnessRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: `No fitness ${type} plans available` });
    }
    const fitnessPlans = snapshot.val();
    const fitnessList = Object.keys(fitnessPlans).map((key) => ({ id: key, ...fitnessPlans[key] }));
    res.status(200).json({
      message: `Fitness ${type} plans retrieved successfully`,
      data: fitnessList
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching fitness ${type} plans`,
      error: error.message
    });
  }
};

// Update a fitness plan
exports.updateFitnessPlan = async (req, res) => {
  const { id, type } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const fitnessRef = db.ref(`fitness/${type}/${id}`);
    await fitnessRef.update(body);
    res.status(200).json({
      message: `Fitness ${type} plan updated successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating ${type} fitness plan`,
      error: error.message
    });
  }
};

// Delete a fitness plan
exports.deleteFitnessPlan = async (req, res) => {
  const { id, type } = req.params;
  try {
    const fitnessRef = db.ref(`fitness/${type}/${id}`);
    await fitnessRef.remove();
    res.status(200).json({
      message: `Fitness ${type} plan deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting fitness ${type} plan`,
      error: error.message
    });
  }
};
