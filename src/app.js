const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const authRoutes = require('./routes/auth');
const petsRoutes = require('./routes/pets');
const daycareRoutes = require('./routes/daycare');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Swagger documentation
const swaggerFile = path.join(__dirname, '../resources/swagger.yaml');
const swaggerDoc = yaml.load(fs.readFileSync(swaggerFile, 'utf8'));

// Swagger documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/auth', authRoutes);
app.use('/pets', petsRoutes);
app.use('/daycare', daycareRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    message: `${req.method} ${req.path} não existe`,
    availableResources: [
      '/health',
      '/api-docs',
      '/auth/login-worker',
      '/auth/login-tutor',
      '/pets',
      '/daycare'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message
  });
});

module.exports = app;
