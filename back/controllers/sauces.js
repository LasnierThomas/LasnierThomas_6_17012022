const hotSauce = require('../models/hotSauce');
const fs = require('fs');

exports.getAllhotSauce = (req, res, next) => {
    hotSauce.find()
    .then(hotSauces => res.status(200).json(hotSauces))
    .catch(error => res.status(400).json({ error }));
};