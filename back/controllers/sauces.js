const hotSauce = require('../models/hotSauce');
const fs = require('fs');

exports.getAllhotSauce = (req, res, next) => {
    hotSauce.find()
        .then(hotSauces => res.status(200).json(hotSauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnehotSauce = (req, res, next) => {
    hotSauce.findOne({ _id: req.params.id })
        .then(hotSauces => res.status(200).json(hotSauces))
        .catch(error => res.status(400).json({ error }));
};

exports.createhotSauce = (req, res, next) => {
    const hotSauceObject = JSON.parse(req.body.sauce);
    delete hotSauceObject._id;
    const newSauce = new hotSauce({
        ...hotSauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userDisliked: [],
        userLiked: []
    });
    newSauce.save()
        .then(() => res.status(201).json({ message: ' Objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyhotSauce = (req, res, next) => {
    const hotSauceObject = req.file ?
        {
            ...JSON.parse(req.body.newSauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    hotSauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletehotSauce = (req, res, next) => {
    hotSauce.findOne({ _id: req.params.id })
        .then(newSauce => {
            const filename = newSauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                hotSauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));

    hotSauce.findOne({ _id: req.params.id }).then(
        (newSauce) => {
            if (!newSauce) {
                return res.status(404).json({
                    error: new error( 'Objet non trouvé')
                });    
            }
            if (newSauce.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new error('Requête non autorisé')
                });
            }
        }
    )
};

exports.like = (req, res, next) => {
    
    hotSauce.findOne({ _id: req.params.id })
        .then((object) => {
            if (!object.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                

                hotSauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 }, 
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: 'userLike + 1' }))
                    .catch(error => res.status(400).json({ error }));
                    
            };

            if (object.usersLiked.includes(req.body.userId) && req.body.like === 0) {

                hotSauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: 'userLike = 0' }))
                    .catch(error => res.status(400).json({ error }));
            };

            if (!object.usersDisliked.includes(req.body.userId) && req.body.like === -1) {

                hotSauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: 1 },
                        $push: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: 'userDislike + 1 '}))
                    .catch(error => res.status(400).json({ error }));
                    
            };
            
            if (object.usersDisliked.includes(req.body.userId) && req.body.like === 0) {

                hotSauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: 'userDislike = 0 '}))
                    .catch(error => res.status(400).json({ error }));
            };
        })
        .catch(error => res.status(400).json({ error }));
        
};