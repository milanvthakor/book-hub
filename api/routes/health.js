const express = require('express');
const router = express.Router();

const HealthController = require('../controllers/health');

// A health check route at "/health" to enable clients to verify the server's operational status.
router.get('/', HealthController.healthCheck);

module.exports = router;