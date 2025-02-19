import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
  exports: [TodoService],
})
export class TodoModule { }
