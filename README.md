
# Projet 6 Construisez une API sécurisée pour une application d'avis gastronomiques

## Créer le Back end du site

## Architecture :

### Le back end devras comprendre les points d'acces suivants :
- POST /api/auth/signup ;
- POST /api/auth/login ;
- GET /api/sauces ;
- GET /api/sauces/:id ;
- POST /api/sauces ;
- PUT /api/sauces/:id ;
- DELETE /api/sauces/:id ;
- POST /api/sauces/:id/like .

### Produit présenté :
- Sauces piquante

### Incorporation d'une sauce :
- Créer un objet sauces, pouvoir le modifier, le supprimer ;
- Pouvoir le liker ou le dislikers .

### Information complémentaires :
- Une personne doit pouvoir liker ou disliker une fois uniquement et ne doit pas pouvoir faire les deux;
- Une personne ne doit pas pouvoir modifier ou supprimer l'objet d'une autre personne


### Instalation et mise en route :
- Clonez le repository ;
- installer les modules suivant avec " i -s 'nom du modules' "
    - bcrypt; ( permet de hasher le mot de passe)
    - jsonwebtoken; ( permet de créer un token sécuriser )
    - multer; (package de gestion de fichiers)
    - mongoose; ( Est la base de donnée du site)
    - mongoose-unique-validator; ( Permet d'avoir un champ unique pour ne pas faire de doublons)
    - express: ( Base de donéés Express)
    - path ;  ( Permet de gérer la source image de façon static)
    - cors ; (Permet le partage des ressources entre origines multiples)
    - nodemon ; ( Permet de modifier le code une fois le server lancé)

### Lancement du server :
- ce diriger sur la partie back, 
    -dans le terminal entré  cd back  puis nodemon server;
- ouvrir un nouveau terminal et ce diriger sur la parti front, 
    -dans le terminal entré cd front puis npm start;