const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/start', authMiddleware, streamController.startStream);
router.post('/end', authMiddleware, streamController.endStream);
router.get('/active', streamController.getActiveStreams);

module.exports = router;