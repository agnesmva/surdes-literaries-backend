const express = require('express');
const router = express.Router();
const DictionaryController = require('../controllers/dictionary-controller');

router.get('/', DictionaryController.findAll);
router.get('/:id', DictionaryController.findOne);
router.post('/', DictionaryController.create);
router.put('/:id', DictionaryController.update);
router.delete('/:id', DictionaryController.softDelete);
router.patch('/:id', DictionaryController.updatePatch)




module.exports = router;
