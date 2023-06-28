import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users/:userId/todos', component: UserTasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
