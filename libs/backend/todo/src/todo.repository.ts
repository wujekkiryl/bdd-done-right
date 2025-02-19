import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoRepository {
    private todos: Todo[] = [];

    async findAll(): Promise<Todo[]> {
        return this.todos;
    }

    async findById(id: string): Promise<Todo | undefined> {
        return this.todos.find(todo => todo.id === id);
    }

    async create(todoData: Partial<Todo>): Promise<Todo> {
        const todo = new Todo(todoData);
        this.todos.push(todo);
        return todo;
    }

    async update(id: string, todoData: Partial<Todo>): Promise<Todo | undefined> {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return undefined;

        this.todos[index] = {
            ...this.todos[index],
            ...todoData,
            updatedAt: new Date()
        };
        return this.todos[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return false;

        this.todos.splice(index, 1);
        return true;
    }

    async findTodaysFocus(): Promise<Todo[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.todos.filter(todo =>
            !todo.completed &&
            (todo.priority === 'urgent' || todo.priority === 'high') &&
            (!todo.dueDate || new Date(todo.dueDate) >= today)
        );
    }
} 