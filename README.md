# QuizApp

## Description

* **QuizApp** est une application web permettant aux utilisateurs de tester leurs connaissances sur différents sujets.
* Le projet combine un backend en Django REST Framework et un frontend en Next.js avec une base de données SQLite.
* Les utilisateurs peuvent s'inscrire, se connecter, choisir des sujets, répondre à des quiz, et voir leur score final.

## Design Figma

* Le design de l'application est disponible sur Figma : [QuizApp Design](https://www.figma.com/design/bbp3CXwaKcMoPYUowfnBFf/QuizApp?node-id=0-1&t=BmGfG7Z115iXFtro-1).

## Instructions pour exécuter l'application

### Prérequis

* **Node.js** (version 16 ou supérieure)
* **Python** (version 3.8 ou supérieure)
* **Git** pour cloner le projet

### Étapes

1. **Clonez le dépôt**
   ```bash
   git clone https://github.com/KhaoulaIchou/QuizApplication.git
   cd QuizApplication
   ```

2. **Backend**
   * Allez dans le dossier `quizapp_backend` :
     ```bash
     cd quizapp_backend
     ```
   * Lancez le serveur Django :
     ```bash
     python manage.py migrate
     python manage.py runserver
     ```

3. **Frontend**
   * Allez dans le dossier `projectQuiz` :
     ```bash
     cd ../projectQuiz
     ```
   * Installez les dépendances :
     ```bash
     npm install
     ```
   * Lancez le serveur Next.js :
     ```bash
     npm run dev
     ```

4. **Accès à l'application**
   * Ouvrez [http://localhost:3000](http://localhost:3000) dans un navigateur.
