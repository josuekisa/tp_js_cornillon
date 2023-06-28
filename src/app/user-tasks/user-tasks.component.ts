import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { TaskService } from '../task.service';
import { User } from '../user.interface';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {
  userId: string = '';
  user: User | undefined;
  tasks: any[] = [];
  showCompletedTasks = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    this.userService.getUsers().subscribe((user: User[]) => {
      this.user = user[0]; // Ou utilisez la logique appropriée pour récupérer un utilisateur spécifique
    });
    this.taskService.getTasksByUser(this.userId).subscribe((tasks: any[]) => {
      this.tasks = tasks;
    });
  }

  addTask(task: any) {
    this.taskService.addTask(task).subscribe((newTask: any) => {
      this.tasks.push(newTask);
    });
  }

  toggleShowCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
  }
}
