import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://example.com/api/tasks';

  constructor(private http: HttpClient) { }

  getTasksByUser(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}`);
  }

  addTask(task: any) {
    return this.http.post<any>(this.apiUrl, task);
  }
}
