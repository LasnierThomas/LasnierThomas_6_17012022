const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', auth, saucesCtrl.getAllhotSauce);
router.get('/:id', auth, saucesCtrl.getOnehotSauce);
router.post('/', auth, multer, saucesCtrl.createhotSauce);
router.put('/:id', auth, multer, saucesCtrl.modifyhotSauce);
router.delete('/:id', auth, saucesCtrl.deletehotSauce);
router.post('/:id/like', auth, saucesCtrl.like);

module.exports = router;