const express = require('express');
const treatmentController = require('../controllers/treatmentController');
const userController = require('../controllers/userController');
const nutritionController = require('../controllers/nutritionController');
const fitnessController = require('../controllers/fitnessController');
const educationController = require('../controllers/educationController');

const router = express.Router();

// -------- Treatment Routes -------- //

// Create a new treatment package
router.post('/treatments', treatmentController.createTreatment);

// Get all treatment packages
router.get('/treatments', treatmentController.getAllTreatments);

router.get('/treatments/:id', treatmentController.getAllTreatments);

// Update a treatment package
router.put('/treatments/:id', treatmentController.updateTreatment);

// Delete a treatment package
router.delete('/treatments/:id', treatmentController.deleteTreatment);


// -------- User Routes -------- //

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Update a user
router.put('/users/:id', userController.updateUser);

// Delete a user
router.delete('/users/:id', userController.deleteUser);


// -------- Nutrition Routes -------- //

// Create a new nutrition plan/recipe
router.post('/nutrition/:type', nutritionController.createNutrition);

// Get all nutrition items (diet plans and recipes)
router.get('/nutrition/:type', nutritionController.getAllNutrition);

// Update a nutrition plan/recipe
router.put('/nutrition/:type/:id', nutritionController.updateNutrition);

// Delete a nutrition plan/recipe
router.delete('/nutrition/:type/:id', nutritionController.deleteNutrition);


// -------- Fitness Routes -------- //

// Create a new fitness plan (yoga, meditation, exercise)
router.post('/fitness/:type', fitnessController.createFitnessPlan);

// Get all fitness plans (yoga, meditation, exercise)
router.get('/fitness/:type', fitnessController.getAllFitnessPlans);

// Update a fitness plan (yoga, meditation, exercise)
router.put('/fitness/:type/:id', fitnessController.updateFitnessPlan);

// Delete a fitness plan (yoga, meditation, exercise)
router.delete('/fitness/:type/:id', fitnessController.deleteFitnessPlan);


// -------- Education Routes -------- //

// Upload a new educational material
router.post('/education-materials', educationController.uploadMaterial);

// Get all educational materials
router.get('/education-materials', educationController.getAllMaterials);

// Update an educational material
router.put('/education-materials/:id', educationController.updateMaterial);

// Delete an educational material
router.delete('/education-materials/:id', educationController.deleteMaterial);


module.exports = router;
