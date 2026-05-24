const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Daftarkan rute POST
router.post('/generate-pipeline', aiController.generatePipeline);
router.post('/generate-dockerfile', aiController.generateDockerfile);
router.post('/analyze-error', aiController.analyzeError);
router.post('/chat', aiController.chatDevOps);

module.exports = router;