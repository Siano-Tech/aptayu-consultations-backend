
const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

// Add a report
router.post('/add/', reportController.createReport);

// Get all reports
router.get('/', reportController.getAllReports);

router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getAllReportById);

// Update a treatment package
router.put('/:id', reportController.updateReport);

// Delete a treatment package
router.delete('/:id', reportController.deleteReport);

module.exports = router;
