# TP - TODO-LIST-APP avec Angular

## Prérequis
- Création et éxecution projet Angular
- Connaissance et manipulation des composants Angular

## Objectifs
- Manipuler les composants et Typescript
- Manipuler et comprendre les data-bindings 

## Étape 1 : Initialiser le Projet Angular

1. **Installer Angular CLI (si ce n'est pas déjà fait) :**
   ```sh
   npm install -g @angular/cli
   ```
2. **Créer un nouveau projet Angular :**
   ```sh
   ng new todo-list-app
   cd todo-list-app
   ```
## Étape 2 : Créer les Composants
Nous allons créer des composants pour structurer notre application :
1. **Créer le composant principal pour la liste de tâches :**
   ```sh
   ng generate component task-list --standalone
   ```
2. **Créer le composant pour une tâche individuelle :**
   ```sh
   ng generate component task-item --standalone
   ```

## Étape 3 : Définir le Modèle de Données
Créez un fichier task.model.ts dans le dossier src/app pour définir une interface Task :
   ```typescript
    // src/app/task.model.ts
    // Définir une interface pour représenter la structure d'une tâche
    export interface Task {
    id: number;             // Identifiant unique pour la tâche
    description: string;    // Description de la tâche
    completed: boolean;     // Statut de la tâche, si elle est terminée ou non
    }
   ```

## Étape 4 : Implémenter le Composant TaskListComponent
Modifiez task-list.component.ts pour inclure la logique de gestion des tâches :
1. **Créer le composant principal pour la liste de tâches :**
```typescript
    // src/app/task-list/task-list.component.ts
    import { Component } from '@angular/core';
    import { Task } from '../task.model';  //Importer l'interface Task
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';
    import { TaskItemComponent } from '../task-item/task-item.component';  // Importer le composant TaskItem
    
    @Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, TaskItemComponent]  // Importer les modules nécessaires, FormsModule pour gérer les formulaires
    })
    export class TaskListComponent {
    tasks: Task[] = [];  // Initialiser un tableau pour stocker les tâches
    newTaskDescription: string = '';  // Initialiser une variable pour la nouvelle description de tâche
    nextId: number = 1;  // Initialiser l'identifiant suivant pour une tâche
    
    // Méthode pour ajouter une tâche
    addTask() {
    if (this.newTaskDescription.trim()) {  // Vérifier que la description de tâche n'est pas vide
    this.tasks.push({
    id: this.nextId++,  // Assigner un identifiant unique à la tâche
    description: this.newTaskDescription.trim(),  // Définir la description de la tâche
    completed: false  // La tâche est non terminée par défaut
    });
    this.newTaskDescription = '';  // Réinitialiser la description de la nouvelle tâche
    }
    }
    
    // Méthode pour supprimer une tâche par son identifiant
    removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);  // Filtrer les tâches pour exclure celle avec l'identifiant correspondant
    }
    
    // Méthode pour marquer une tâche comme terminée ou non terminée
    toggleTaskCompletion(id: number) {
    const task = this.tasks.find(task => task.id === id);  // Trouver la tâche par son identifiant
    if (task) {
    task.completed = !task.completed;  // Inverser le statut de la tâche (terminée ou non)
    }
    }
    }

```

Complétez le template associé task-list.component.html :
```html
   <!-- src/app/task-list/task-list.component.html -->
<div class="container">
  <h1>To-Do List</h1>
  <input [(ngModel)]="newTaskDescription" placeholder="Add a new task">  <!-- Liaison bidirectionnelle (two-way binding) avec ngModel -->
  <button (click)="addTask()">Add Task</button>  <!-- Ajouter une tâche au clic -->
  <ul>
    <li *ngFor="let task of tasks">  <!-- Boucle pour chaque tâche dans le tableau tasks -->
      <app-task-item [task]="task" (remove)="removeTask($event)" (toggleCompletion)="toggleTaskCompletion($event)"></app-task-item>  <!-- Passer la tâche au composant TaskItem et définir les événements -->
    </li>
  </ul>
</div>
```
## Étape 5 : Implémenter le Composant TaskItemComponent
Modifiez task-item.component.ts pour gérer l'affichage individuel des tâches :
```typescript
// src/app/task-item/task-item.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';  // Importer l'interface Task
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  imports: [CommonModule]  // Importer les modules nécessaires
})
export class TaskItemComponent {
  @Input() task!: Task;  // Définir une propriété d'entrée pour recevoir une tâche
  @Output() remove = new EventEmitter<number>();  // Définir un événement de sortie pour supprimer une tâche
  @Output() toggleCompletion = new EventEmitter<number>();  // Définir un événement de sortie pour marquer une tâche comme terminée

  // Méthode appelée lorsque la tâche est supprimée
  onRemove() {
    this.remove.emit(this.task.id);  // Émettre l'événement avec l'identifiant de la tâche
  }

  // Méthode appelée lorsque la tâche est marquée comme terminée ou non terminée
  onToggleCompletion() {
    this.toggleCompletion.emit(this.task.id);  // Émettre l'événement avec l'identifiant de la tâche
  }
}
```

Créez le template associé task-item.component.html :
```html
<!-- src/app/task-item/task-item.component.html -->
<span [style.textDecoration]="task.completed ? 'line-through' : 'none'">
  {{ task.description }}  <!-- Style Binding Afficher la description de la tâche -->
</span>
<button (click)="onToggleCompletion()"> <!-- Event binding -->
  {{ task.completed ? 'Unmark' : 'Complete' }}  <!-- Bouton pour marquer ou démarquer une tâche accomplie ou pas-->
</button>
<button (click)="onRemove()">Remove</button>  <!-- Bouton pour supprimer la tâche -->
```

## Étape 6 : Créer le Composant Racine AppComponent
Créez app.component.ts pour le composant racine et configurez-le pour inclure le router-outlet et d'autres composants nécessaires :

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet]  // Importer les composants nécessaires
})
export class AppComponent {}

```
Le template associé app.component.html :
```html
<router-outlet></router-outlet>
```

## Étape 7 : Configurer le Routage
Configurez le routage dans app.routes.ts pour gérer les routes de votre application :
```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  { path: '', component: TaskListComponent },
];
```
## Étape 8 : Ajouter le Style CSS
Dans task-list.component.css :
```css
/* src/app/task-list/task-list.component.css */
.container {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h1 {
  margin: 0 0 20px 0;
}

input {
  padding: 10px;
  width: calc(100% - 22px);
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px;
  width: 100%;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #218838;
}

ul {
  list-style: none;
  padding: 0;
}
```

Et dans task-item.component.css :
```css
/* src/app/task-item/task-item.component.css */
li {
  padding: 10px;
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}

li:nth-child(odd) {
  background: #f1f1f1;
}

button {
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background: #c82333;
}
```
## Étape 9 : Lancer l'Application
Lancez l'application en utilisant la commande suivante :
```shell
ng serve
```
