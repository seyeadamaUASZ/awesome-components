# AwesomeComponents

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Un subject est un observable qu'on peut émettre à la volé
Un behaviourSubject est un observable qui réémet son émission à chaque nouvelle subscription

Pattern subject as a service

ng-container permet de poser des directives structurelles sur le template sans pour autant utiliser des div


Dans ce template, vous avez deux nouveautés :

ng-container  – il s'agit d'un élément où vous pouvez placer des directives structurelles (  *ngIf  et  *ngFor  , par exemple) qui disparaît à la compilation. Ça veut dire que vous n'êtes pas obligé d'ajouter une  div  ou un autre élément HTML si vous avez seulement besoin d'appliquer des directives structurelles ;

*ngIf/else  +  ng-template  :

le "  else  " d'un  *ngIf  fonctionne comme tout autre  else  : si la condition n'est pas remplie, le template passé à  else  sera affiché,

ng-template  permet d'ajouter un bloc qui n'est pas affiché par défaut, mais auquel on peut faire référence. Dans ce cas, vous utilisez la référence locale  #buttons  pour passer tout le contenu du  ng-template  comme bloc "  else  " au  *ngIf  précédent.


Il faut cast le paramètre en  number  (avec  +  ), car tout paramètre de route est automatiquement une string, même si on sait qu'il contiendra un nombre dans ce cas.


Un enum est l'une des multiples manières de typer strictement des chaînes de caractères.

Tout transformer en minuscules permet de créer une recherche insensible à la casse.

combineLatest émet les dernières émissions de tous ses Observables sous forme de tuple à chaque fois que l'un d'entre eux émet.

Le cast  search as string empêche TypeScript de râler parce qu'il n'arrive pas à identifier le type exact de search .



Il s'agit d'une suppression pessimiste. Vous attendez donc que la requête réussisse avant de mettre à jour les données côté application :

quand la requête réussit, vous transférez l'Observable vers lescandidates$ à l'instant t ;

si vous ne mettez pas le take(1) , vous finirez dans un infinite loop ! Tout ce qui vient après ce switchMap ne doit être exécuté qu'une seule fois par suppression ;

vous utilisez map pour modifier le tableau, retournant un tableau qui contient tous les candidats sauf celui qui comporte l' id passé en argument ;

vous faites émettre la nouvelle liste de candidats et l'état de chargement.

C'est cette dernière étape qui fait toute la magie du state management réactif : le reste de l'application n'a pas besoin de suivre l'avancée de la requête de suppression. Les components qui sont souscrits aux Observables du service vont simplement afficher les nouvelles données qui sont émises !


Le state management réactif nous permet de modifier notre approche à la modification des données pour être pessimiste ou optimiste.

Une action est pessimiste si vous attendez la réaction du serveur avant de modifier les données dans l'application.

Une action est optimiste si vous modifiez les données de l'application avant même d'envoyer la requête au serveur, permettant une expérience utilisateur beaucoup plus lisse.