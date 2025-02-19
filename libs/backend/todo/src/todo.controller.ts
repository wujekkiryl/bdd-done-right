import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async getAllTodos(): Promise<Todo[]> {
        return this.todoService.getAllTodos();
    }

    @Get('focus')
    async getTodaysFocus(): Promise<Todo[]> {
        return this.todoService.getTodaysFocus();
    }

    @Get(':id')
    async getTodoById(@Param('id') id: string): Promise<Todo> {
        return this.todoService.getTodoById(id);
    }

    @Post()
    async createTodo(@Body() todoData: Partial<Todo>): Promise<Todo> {
        return this.todoService.createTodo(todoData);
    }

    @Put(':id')
    async updateTodo(
        @Param('id') id: string,
        @Body() todoData: Partial<Todo>
    ): Promise<Todo> {
        return this.todoService.updateTodo(id, todoData);
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: string): Promise<boolean> {
        return this.todoService.deleteTodo(id);
    }
} 