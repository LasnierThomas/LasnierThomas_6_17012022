const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de pass incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.like = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((object) => {
            if (!object.usersLiked.include(req.body.userId && req.body.like === 1)) {

                User.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: userLike + 1 }))
                    .catch(error => res.status(400).json({ error }));
            };

            if (object.usersLiked.include(req.body.userId && req.body.like === 0)) {

                User.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: userLike = 0 }))
                    .catch(error => res.status(400).json({ error }));
            };

            if (!object.usersDisliked.include(req.body.userId && req.body.like === -1)) {

                User.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: +1 },
                        $push: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: userDislike + 1 }))
                    .catch(error => res.status(400).json({ error }));
            };
            
            if (object.usersDisliked.include(req.body.userId && req.body.like === 0)) {

                User.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: userDislike = 0 }))
                    .catch(error => res.status(400).json({ error }));
            };
        })
        .catch(error => res.status(400).json({ error }));

};