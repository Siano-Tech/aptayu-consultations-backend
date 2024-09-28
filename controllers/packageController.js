const { db } = require('../config/firebase');

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packagesRef = db.ref('packages');
    const snapshot = await packagesRef.once('value');
    const packages = snapshot.val();

    res.status(200).json({
      message: 'Packages retrieved successfully',
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching packages',
      error: error.message
    });
  }
};

// Create a new package
exports.createPackage = async (req, res) => {
  const { name, duration, price, description } = req.body;
  try {
    const newPackageRef = db.ref('packages').push();
    await newPackageRef.set({ name, duration, price, description });

    res.status(200).json({
      message: 'Package created successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating package',
      error: error.message
    });
  }
};
