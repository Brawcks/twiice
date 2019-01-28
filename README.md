# A lire avant tout développement du projet

Dans le but de développer le projet correctement, merci de bien lire le guide 
contribution disponible à la racine du projet. 

**Twiice** est content de vous compter dans ses rangs :D

# Créateurs

Le projet est actuellement porté par **Vincent COFFIN et Antoine LE TROADEC**. Le code du projet est disponible sous 
license **GNU GPL V3**.

# Documentation du projet

La documentation du projet est disponible dans la sidebar de gauche de votre 
Gitlab. En bas, vous verrez d'affiché `wiki`. Cliquez dessus pour atterir sur 
le wiki du projet, qui détaille certaines fonctionnalités et la façon de 
développer le projet :). Le sommaire du wiki est cliquable sur la gauche après 
avoir **cliqué sur wiki**

# Démarrer le projet

Pour démarrer le projet, il est nécessaire d'actualiser l'environnement node avant chaque
démarrage du projet via cette commande :

`meteor npm install && meteor -s settings.json`

Il est aussi possible de lancer le script de lancement du projet, en vous positionnant à la racine du projet, puis en
lançant la commande : `./start.sh` .

# Twiice - La gestion simplifiée

**Twiice** est un projet né de la diffiulté à laquelle sont confrontée les petites 
entrerises à se gérer au quotidien. De nombreux outils de gestion existent
actuellement, mais ne permettent pas aux petites entreprises de combler leurs 
besoins, souvent complexes et très singuliers.

**Twiice** apporte **une solution simple** de gestion d'une entreprise, capable de 
s'adapter facilement aux problématiques métier de toute TPE.

**Twiice** se rapproche de ce que sait faire un ERP, tout en étant modulaire
et facilement paramétrable.

## Ouvertures et possibilités

**Twiice** est un projet ouvert. Cela signifie qu'il tend à vouloir s'adapter à tout besoin formulé par une TPE (Dans un premier temps).

Voici les points pouvant être couverts par Twiice, hypothétiquement de la création des modules : 

*  Gestion de projet
*  Gestion CRM (Customer Relationship Management)
*  Mise en place CMS (Création d'un CMS complet)
*  Gestion d'inventaire
*  Gestion de factures
*  Gestion de devis, bons de commande ...
*  Toute gestion spécifique voulue par vous ou votre entreprise !


**Twiice**, c'est le besoin réel formulé par les entreprise de trouver un outil adaptable à leurs spécificités métier. Au stade actuel, 
il s'apparente à un **Framework ++** de mise en place d'une solution de gestion de données diverses.

## Comment faire ?

Dans un premier temps, **Twiice** se destine au petites entreprises du numérique, ou petites entreprises extérieures à cette bulle métier,
accompagnées par une personne maîtrisant le domaine du web et du développement. A partir de là, il est possible d'apprendre à développer et comprendre
le projet Twiice, par le biais de notre **WIKI** ainsi que de nos scripts automatisés.

**Et après ?**

Twiice veut voir plus loin. Etant encore un projet jeune, il se limite à des besoins techniques légers pour développer son propre logiciel de gestion de données.
Cependant, dans un futur proche, **Twiice** veut se rendre disponible tout public, et proposer via une interface graphique simple, d'automatiser les développements
en passant par du développement "Graphique" directement dans le logiciel. **Il ne sera plus nécessaire de coder !**.

### Un projet Open-Source

Twiice est un projet dont les sources sont ouvertes afin de vous permettre d'apporter votre contribution.
Toute contribution est la bienvenue, tant qu'elle contribue à l'amélioration continue du projet initial. Le but est
de profiter des compétences de tous afin de fournir un outil qualitatif. 

Dans le but de contribuer, il est nécessaire de suivre les guidelines de développement et de s'adapter à la structure
du projet.

### Créez vos propre modules

**Twiice** vous offre de nombreuses possibilitées, mais vous laisse aussi le droit de créer vos propres solutions. 
Vous avez besoin de votre propre **CRM** ? Twiice vous permet de le créer. Vous voulez créer un **CMS** spécifique ?
Twiice vous apporte les éléments essentiels. Un **module standard** ne vous convient pas ? Adaptez le sans écraser le
code principal du projet. 

**Twiice** s'articule autour du framework [Meteor](https://www.meteor.com/), afin que tout le monde puisse contribuer
et créer simplement ses **propres modules**. N'hésitez pas à nous contacter directement pour toute suggestion
d'amélioration.


## Installation du projet

Pour installer le projet, clonez ce dépôt puis lancez l'instance à l'aide de la
chaine de commandes suivante : 

`meteor npm install && meteor -s settings.json`

Cette commande va dans un premier installer les paquets node requis par le 
projet pour fonctionner, puis lancer l'instance en chargeant les modules
définis dans le fichier `settings.json` à la racine du projet. 


## Products Owner 

Cette section définit les personnes responsables du développement de chaque module standard implémenté dans **Twiice**.

**Project** : Antoine LE TROADEC
**CRM** : Vincent COFFIN
