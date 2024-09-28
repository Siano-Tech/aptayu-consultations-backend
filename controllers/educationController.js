const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Upload a new educational material
exports.uploadMaterial = async (req, res) => {
  const body = req.body; // type could be "image", "pdf", "video"
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newMaterialRef = db.ref('education-material/'+id);
    await newMaterialRef.set(body);
    res.status(200).json({
      message: 'Educational material uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error uploading educational material',
      error: error.message
    });
  }
};

// Get all educational materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materialsRef = db.ref('education-material');
    const snapshot = await materialsRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No education materials available' });
    }
    const materials = snapshot.val();
    const materialsList = Object.keys(materials).map((key) => ({ id: key, ...materials[key] }));
    res.status(200).json({
      message: 'Educational materials retrieved successfully',
      data: materialsList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching educational materials',
      error: error.message
    });
  }
};

// Update an educational material
exports.updateMaterial = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const materialRef = db.ref(`education-material/${id}`);
    await materialRef.update(body);
    res.status(200).json({
      message: 'Educational material updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating educational material',
      error: error.message
    });
  }
};

// Delete an educational material
exports.deleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const materialRef = db.ref(`education-material/${id}`);
    await materialRef.remove();
    res.status(200).json({
      message: 'Educational material deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting educational material',
      error: error.message
    });
  }
};
