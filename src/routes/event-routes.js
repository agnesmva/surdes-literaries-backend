const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event-controller');

router.get('/', EventController.findAll);
router.post('/', EventController.create);
router.put('/:id', EventController.updatePut);
router.delete('/:id', EventController.softDelete);


module.exports = router;
