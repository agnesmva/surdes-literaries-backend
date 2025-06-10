const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member-controller');

router.get('/', MemberController.findAll);
router.post('/', MemberController.create);
router.put('/:id', MemberController.update);
router.delete('/:id', MemberController.softDelete);

module.exports = router;
