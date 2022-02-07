const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

router.get('/', auth, saucesCtrl.getAllhotSauce);

module.exports = router;