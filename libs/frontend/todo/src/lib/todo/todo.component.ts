import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Todo, TaskPriority } from '../types/todo.types';

@Component({
  selector: 'front-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  focusMode = false;
  newTodo: Partial<Todo> = {
    title: '',
    priority: TaskPriority.MEDIUM,
  };
  categories: string[] = ['Personal', 'Work', 'Shopping', 'Health'];
  priorities = Object.values(TaskPriority);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    const endpoint = this.focusMode ? '/api/todos/focus' : '/api/todos';
    this.http.get<Todo[]>(endpoint).subscribe(
      (todos) => (this.todos = todos)
    );
  }

  toggleFocusMode() {
    this.focusMode = !this.focusMode;
    this.loadTodos();
  }

  addTodo() {
    if (!this.newTodo.title?.trim()) return;

    this.http.post<Todo>('/api/todos', this.newTodo).subscribe(() => {
      this.loadTodos();
      this.newTodo = { title: '', priority: TaskPriority.MEDIUM };
    });
  }

  toggleComplete(todo: Todo) {
    this.http
      .put<Todo>(`/api/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      })
      .subscribe(() => this.loadTodos());
  }

  deleteTodo(id: string) {
    this.http.delete(`/api/todos/${id}`).subscribe(() => this.loadTodos());
  }

  updateTodo(todo: Todo) {
    this.http
      .put<Todo>(`/api/todos/${todo.id}`, todo)
      .subscribe(() => this.loadTodos());
  }
}
