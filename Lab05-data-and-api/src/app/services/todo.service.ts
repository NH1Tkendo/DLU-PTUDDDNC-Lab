import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  // Lấy danh sách (Giới hạn 10 item mẫu)
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?_limit=10`);
  }

  // Gửi yêu cầu tạo mới lên Server
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }
}
