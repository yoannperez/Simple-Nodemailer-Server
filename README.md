# Simple-Nodemailer-Server


Vous trouverez dans ce repo les fichiers minimum nécessaires pour facilement envoyer un email à partir d'un backend Nodejs. Un composant react est disponible dans /ReactComponent.

# Technologies utilisées
## Backend
NodeJS, ExpressJS, Nodemailer.

# Comment utiliser ce dépot ?

Vous devrez disposer des dernières versions de NodeJS et de npm installées sur votre machine afin de pouvoir executer ce projet en local.

Télécharger et installer le logiciel NodeJS (comprend npm) à cette adresse :
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

# Installation

Cloner ce repo :
```
git clone https://github.com/yoannperez/Simple-Nodemailer-Server.git
```

Puis se placer dans le dossier:
```
cd Simple-Nodemailer-Server
```


## Installation des dépendances

```
npm install
```
## Installation des certificats

```
mkdir ssl
cd ssl
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
cd ../
```

## Variables d'environnement
```
mv env .env
```
Puis remplir les champs.

## Démarrer le service

```
npm start
```

