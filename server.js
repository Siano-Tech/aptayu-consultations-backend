const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger setup
// Swagger setup without a hardcoded server URL
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ayurvedic Consultation API',
      version: '1.0.0',
      description: 'API documentation for the Ayurvedic consultation platform',
    },
    servers: [],  // Omit the server URL here, so it will dynamically pick up the URL from where it's being accessed
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Points to the files where Swagger will look for annotations
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const patientsRoutes = require('./routes/patients'); // sorted
const callbackRoutes = require('./routes/callback');
const consultationRoutes = require('./routes/consultations');
const fitnessConsultationsRoutes = require('./routes/fitnessConsultations');
const nutritionConsultationsRoutes = require('./routes/nutritionConsultations');
const eduConsultationsRoutes = require('./routes/eduConsultations');
const carePlanRoutes = require('./routes/carePlans');
const masterRoutes = require('./routes/masters');
const authRoutes = require('./routes/auth');
const notificationRoutes = require('./routes/notifications');
const settingsRoutes = require('./routes/settings');
const reportsRoutes = require('./routes/reports');

// Use routes
app.use('/api/patients', patientsRoutes);
app.use('/api/request-callback', callbackRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/fitnessConsultations', fitnessConsultationsRoutes);
app.use('/api/nutritionConsultations', nutritionConsultationsRoutes);
app.use('/api/eduConsultations', eduConsultationsRoutes);
app.use('/api/carePlans', carePlanRoutes);
app.use('/api/masters', masterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/reports', reportsRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Ayurvedic Consultation API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: err.message,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
