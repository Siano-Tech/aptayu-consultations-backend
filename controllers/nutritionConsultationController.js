const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new nutrition consultation
exports.createNutritionConsultation = async (req, res) => {
  const body = req.body;
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newNutritionRef = db.ref('nutritionConsultations/'+id);
    await newNutritionRef.set(body);
    res.status(200).json({
      message: 'Nutritionist Consultation created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating nutritionist consultation',
      error: error.message
    });
  }
};

// Get all nutrition consultation
exports.getAllNutritionConsultations = async (req, res) => {
  const { id } = req.params;
  try {
    const nutritionRef = id ? db.ref('nutritionConsultations/'+id) : db.ref('nutritionConsultations');
    const snapshot = await nutritionRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No nutritionist consultation available' });
    }
    const nutrition = snapshot.val();
    const nutritionList = id ? nutrition : Object.keys(nutrition).map((key) => ({ id: key, ...nutrition[key] }));
    res.status(200).json({
      message: 'Nutritionist Consultations retrieved successfully',
      data: nutritionList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching nutritionist consultation',
      error: error.message
    });
  }
};

// Get all nutrition consultation
exports.getAllNutritionConsultationByUid = async (req, res) => {
  const { uid } = req.params;
  try {
    const nutritionRef = db.ref('nutritionConsultations').orderByChild('patientId').equalTo(uid);
    const snapshot = await nutritionRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No nutritionist consultation available' });
    }
    const nutrition = snapshot.val();
    const nutritionList = Object.keys(nutrition).map((key) => ({ id: key, ...nutrition[key] }));
    res.status(200).json({
      message: 'Nutritionist Consultation retrieved successfully',
      data: nutritionList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching consultations',
      error: error.message
    });
  }
};

// Update a nutrition Consultation
exports.updateNutritionConsultation = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const nutritionRef = db.ref(`nutritionConsultations/${id}`);
    await nutritionRef.update(body);
    res.status(200).json({
      message: 'Nutritionist Consultation updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating nutritionist consultation',
      error: error.message
    });
  }
};

// Delete a nutrition consultation
exports.deleteNutritionConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const nutritionRef = db.ref(`nutritionConsultations/${id}`);
    await nutritionRef.remove();
    res.status(200).json({
      message: 'Nutritionist Consultation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting nutritionist consultation',
      error: error.message
    });
  }
};
