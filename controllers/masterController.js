const { db } = require('../config/firebase');

exports.getAllTreatments = async (req, res) => {
  try {
    const treatmentsRef = db.ref('treatments');
    const snapshot = await treatmentsRef.once('value');
    const treatments = snapshot.val();
    
    res.status(200).json({
      message: 'Treatments retrieved successfully',
      data: treatments
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching treatments',
      error: error.message
    });
  }
};

exports.createTreatment = async (req, res) => {
  const { name, description, duration, price } = req.body;
  try {
    const newTreatmentRef = db.ref('treatments').push();
    await newTreatmentRef.set({ name, description, duration, price });
    res.status(200).json({
      message: 'Treatment created successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating treatment',
      error: error.message
    });
  }
};
