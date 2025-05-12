import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface Project {
  name: string;
  team: string;
  progress: number;
}

interface Task {
  team: string;
  details: string;
}
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [];
  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
  }

  loadProjects(): void {
    const data = localStorage.getItem('projects');
    this.projects = data ? JSON.parse(data) : [];
  }

  loadTasks(): void {
    const data = localStorage.getItem('tasks');
    this.tasks = data ? JSON.parse(data) : [];
  }

  saveProjects(): void {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addProject(): void {
    const name = prompt('Project name:');
    const team = prompt('Team name:');
    if (name && team) {
      this.projects.push({ name, team, progress: 0 });
      this.saveProjects();
    }
  }

  updateProgress(index: number, value: number): void {
    this.projects[index].progress = Number(value);
    this.saveProjects();
  }

  editProject(index: number): void {
    const newName = prompt('New project name:', this.projects[index].name);
    if (newName) {
      this.projects[index].name = newName;
      this.saveProjects();
    }
  }

  deleteProject(index: number): void {
    if (confirm('Delete this project?')) {
      this.projects.splice(index, 1);
      this.saveProjects();
    }
  }

  sendTask(index: number): void {
    const details = prompt('Task details:');
    if (details) {
      this.tasks.push({ team: this.projects[index].team, details });
      this.saveTasks();
    }
  }
}
