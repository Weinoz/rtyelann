const express = require('express');
const router = express.Router();
const rtController = require('../controllers/rtController');

router.post('/', rtController.createRT);
router.get('/', rtController.getAllRTs);
router.get('/:id', rtController.getRTById);
router.put('/:id', rtController.updateRT);
router.delete('/:id', rtController.deleteRT);
router.post('/:id/favorite', rtController.markAsFavorite);

module.exports = router;