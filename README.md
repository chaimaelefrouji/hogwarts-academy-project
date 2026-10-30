# Hogwarts Academy — Projet TypeScript

Ce projet a été réalisé dans le cadre d’un devoir TypeScript. Il consiste à développer une petite application autour d’une académie de sorciers, en mettant en pratique plusieurs fonctionnalités de TypeScript, comme les types, les interfaces, les décorateurs et les fonctions de validation.

## Prérequis

Pour exécuter le projet, il faut avoir installé :
- Node.js (version 18 ou supérieure)
- npm
- Visual Studio Code (recommandé)

## Installation du projet

Commencez par ouvrir le dossier du projet dans Visual Studio Code, puis ouvrez un terminal et exécutez la commande suivante :

```bash
npm install
```

Cette commande permet d’installer les dépendances nécessaires au fonctionnement du projet.

## Exécution

Pour lancer le projet, utilisez la commande :

```bash
npm start
```

Pour vérifier que le code TypeScript ne contient pas d’erreurs de types, exécutez :

```bash
npm run typecheck
```

## Travail réalisé

J’ai travaillé sur les six exercices demandés dans le sujet :

**1. Ajout d’un sorcier**

J’ai modifié la méthode `addWizard()` pour qu’elle accepte un objet `NewWizard`, sans identifiant. L’identifiant est ensuite généré automatiquement lors de l’ajout du sorcier.

**2. Recherche par maison**

J’ai ajouté la méthode `findByHouse()` pour récupérer uniquement les sorciers appartenant à une maison donnée.

**3. Utilisation du type `Extract`**

J’ai utilisé le type utilitaire `Extract` pour récupérer le type `SpellCastEvent` à partir de `AcademyEvent`.

**4. Validation de la puissance des sorts**

J’ai créé le décorateur `@ValidateSpellPower` pour empêcher l’utilisation d’un sort lorsque sa puissance est négative.

**5. Mise en cache avec `@Cache`**

J’ai implémenté un décorateur `@Cache` qui conserve les résultats dans une `Map`. J’ai utilisé une `WeakMap` pour que chaque instance possède son propre cache.

**6. Vérification des données**

J’ai créé les fonctions `isHouse()` et `isWizard()` pour vérifier que les données reçues respectent les types attendus. La validation rejette notamment la maison `Durmstrang`.

Les six exercices sont testés dans le fichier `src/main.ts`.

## Configuration des décorateurs

Pour utiliser les décorateurs classiques de TypeScript, j’ai activé l’option suivante dans le fichier `tsconfig.json` :

```json
"experimentalDecorators": true
```



