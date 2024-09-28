const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new diet plan/recipe
exports.createNutrition = async (req, res) => {
  const { type } = req.params;
  const body = req.body; // type could be "diet plan", "recipe"
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newNutritionRef = db.ref(`nutrition/${type}/${id}`);
    await newNutritionRef.set(body);
    res.status(200).json({
      message: `Nutrition ${type} item created successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating nutrition ${type} item`,
      error: error.message
    });
  }
};

// Get all nutrition items (diet plans and recipes)
exports.getAllNutrition = async (req, res) => {
  const { type } = req.params;
  try {
    const nutritionRef = db.ref('nutrition/'+type);
    const snapshot = await nutritionRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: `No nutrition ${type} plans available` });
    }
    const nutritionItems = snapshot.val();
    const nutritionList = Object.keys(nutritionItems).map((key) => ({ id: key, ...nutritionItems[key] }));
    res.status(200).json({
      message: `Nutrition ${type} items retrieved successfully`,
      data: nutritionList
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching nutrition ${type} items`,
      error: error.message
    });
  }
};

// Update a nutrition item
exports.updateNutrition = async (req, res) => {
  const { id, type } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const nutritionRef = db.ref(`nutrition/${type}/${id}`);
    await nutritionRef.update(body);
    res.status(200).json({
      message: `Nutrition ${type} item updated successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating nutrition ${type} item`,
      error: error.message
    });
  }
};

// Delete a nutrition item
exports.deleteNutrition = async (req, res) => {
  const { id, type } = req.params;
  try {
    const nutritionRef = db.ref(`nutrition/${type}/${id}`);
    await nutritionRef.remove();
    res.status(200).json({
      message: `Nutrition ${type} item deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting nutrition ${type} item`,
      error: error.message
    });
  }
};
