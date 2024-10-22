const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Upload a new educational material
exports.uploadMaterial = async (req, res) => {
  const { type } = req.params;
  const body = req.body; // type could be "image", "pdf", "video"
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newMaterialRef = db.ref(`education-materials/${type}/${id}`);
    await newMaterialRef.set(body);
    res.status(200).json({
      message: `Educational ${type} uploaded successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error uploading educational ${type}`,
      error: error.message
    });
  }
};

// Get all educational materials
exports.getAllMaterials = async (req, res) => {
  const { type } = req.params;
  try {
    const materialsRef = db.ref('education-materials/'+type);
    const snapshot = await materialsRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: `No education ${type} available` });
    }
    const materials = snapshot.val();
    const materialsList = Object.keys(materials).map((key) => ({ id: key, ...materials[key] }));
    res.status(200).json({
      message: `Educational ${type} retrieved successfully`,
      data: materialsList
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching educational ${type}`,
      error: error.message
    });
  }
};

// Update an educational material
exports.updateMaterial = async (req, res) => {
  const { id, type } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const materialRef = db.ref(`education-materials/${type}/${id}`);
    await materialRef.update(body);
    res.status(200).json({
      message: `Educational ${type} updated successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating educational ${type}`,
      error: error.message
    });
  }
};

// Delete an educational material
exports.deleteMaterial = async (req, res) => {
  const { id, type } = req.params;
  try {
    const materialRef = db.ref(`education-materials/${type}/${id}`);
    await materialRef.remove();
    res.status(200).json({
      message: `Educational ${type} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting educational ${type}`,
      error: error.message
    });
  }
};
