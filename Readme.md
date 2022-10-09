# Monix 2.0

[![Build and Deploy docker image](https://github.com/ClubNix/monix-2.0/actions/workflows/deploy.yaml/badge.svg?branch=master)](https://github.com/ClubNix/monix-2.0/actions/workflows/deploy.yaml)

<p align="center" width="100%">
    <img width="33%" src="https://raw.githubusercontent.com/ClubNix/monix-2.0/master/src/assets/monixcoin.svg"> 
</p>

Projet du Club *Nix permettant de gérer les stocks ainsi qu'en permettant aux membres d'acherter des produits contre des monix-coins.

Le projet associé au backend du projet est trouvable ici : https://github.com/ClubNix/monix-backend  

Le projet correspond à la version 2 du projet, la première version est consultable ici: https://github.com/ClubNix/monix  
La version 1.5 (version intermédiaire) est également consultatble ici: https://github.com/ClubNix/monix-1.5  

## Installation

Pour utiliser l'application, il est nécéssaire de la build par soi-même en utilisant la commande: `REACT_APP_BACKEND_URL=<VOTRE_BACKEND_SANS_SLASH> docker build . -t monix-front-user` (Ceci est dû au fait que React utilise les variables d'environnement au moment du build).  
Si vous utilisez la version avec l'adresse de backend set dans le projets, vous pouvez utiliser le 


## Développement

Afin de développer, il vous sera nécéssaire d'utiliser ces commandes:  
  - `npm i` Installation Packages + hook
  - `npm start` Pour lancer l'application en debug
  - `npm run lint:fix` Pour régler certains problèmes de style de code automatiquement
  - `npm run format` Pour formatter les fichiers avec prettier
  - `npm run check` Verifie le formattage + la qualité du code (⚠️ lancé automatiquement avant chaque commit ⚠️)

Pour la qualité de code, nous utilisons ESLINT et Prettier pour le formattage.  
Le Front-End est basé sur TypeScript et React.
