import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(private readonly todoRepository: TodoRepository) { }

    async getAllTodos(): Promise<Todo[]> {
        return this.todoRepository.findAll();
    }

    async getTodoById(id: string): Promise<Todo> {
        return this.todoRepository.findById(id);
    }

    async createTodo(todoData: Partial<Todo>): Promise<Todo> {
        return this.todoRepository.create(todoData);
    }

    async updateTodo(id: string, todoData: Partial<Todo>): Promise<Todo> {
        return this.todoRepository.update(id, todoData);
    }

    async deleteTodo(id: string): Promise<boolean> {
        return this.todoRepository.delete(id);
    }

    async getTodaysFocus(): Promise<Todo[]> {
        return this.todoRepository.findTodaysFocus();
    }
}
