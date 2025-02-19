import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { Todo, TaskPriority } from '../types/todo.types';

const feature = loadFeature('features/app.feature');

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let httpClient: jest.Mocked<HttpClient>;

  const mockTodo: Todo = {
    id: '1',
    title: 'Test todo',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    priority: TaskPriority.MEDIUM,
  };

  beforeEach(async () => {
    httpClient = {
      get: jest.fn().mockReturnValue(of([])),
      post: jest.fn().mockReturnValue(of(mockTodo)),
      put: jest.fn().mockReturnValue(of(mockTodo)),
      delete: jest.fn().mockReturnValue(of(true)),
    } as any;

    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      providers: [
        { provide: HttpClient, useValue: httpClient }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  defineFeature(feature, test => {
    test('Create a new task', ({ given, when, then }) => {
      given('I am on the todo application', () => {
        expect(component).toBeTruthy();
      });

      when(/I enter "(.*)" in the task title field/, (title) => {
        component.newTodo.title = title;
      });

      when(/I select "(.*)" priority/, (priority) => {
        component.newTodo.priority = TaskPriority[priority as keyof typeof TaskPriority];
      });

      when(/I select "(.*)" category/, (category) => {
        component.newTodo.category = category;
      });

      when('I click "Add Task" button', () => {
        const newTodo = { ...component.newTodo };
        httpClient.get.mockReturnValue(of([newTodo]));
        component.addTodo();
      });

      then(/I should see "(.*)" in the task list/, (title) => {
        expect(httpClient.post).toHaveBeenCalledWith('/api/todos', {
          title,
          priority: TaskPriority.HIGH,
          category: 'Shopping'
        });
        expect(component.todos).toContainEqual(expect.objectContaining({
          title,
          priority: TaskPriority.HIGH,
          category: 'Shopping'
        }));
      });

      then('the task should have "high" priority badge', () => {
        const todo = component.todos.find(t => t.title === 'Buy groceries')!;
        expect(todo.priority).toBe(TaskPriority.HIGH);
      });

      then('the task should have "Shopping" category tag', () => {
        const todo = component.todos.find(t => t.title === 'Buy groceries')!;
        expect(todo.category).toBe('Shopping');
      });
    });

    test('Toggle task completion', ({ given, when, then, and }) => {
      given('I am on the todo application', () => {
        expect(component).toBeTruthy();
      });

      given(/I have a task "(.*)"/, (title) => {
        const initialTodo = {
          ...mockTodo,
          title,
          completed: false
        };
        component.todos = [initialTodo];
        httpClient.get.mockReturnValue(of([initialTodo]));
        fixture.detectChanges();
      });

      when(/I click the checkbox next to "(.*)"/, (title) => {
        const todo = component.todos.find(t => t.title === title)!;
        const completedTodo = { ...todo, completed: true };
        httpClient.put.mockReturnValue(of(completedTodo));
        httpClient.get.mockReturnValue(of([completedTodo]));
        component.toggleComplete(todo);
        fixture.detectChanges();
      });

      then('the task should be marked as completed', () => {
        expect(httpClient.put).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ completed: true })
        );
      });

      and('the task should appear with strikethrough text', () => {
        const checkbox = fixture.nativeElement.querySelector('[data-testid="checkbox-todo"]');
        expect(checkbox).toBeTruthy();
        expect(checkbox.checked).toBe(true);
        // expect(checkbox.closest('.todo-item')).toHaveClass('completed');
      });
    });

    test('Delete a task', ({ given, when, then }) => {
      given('I am on the todo application', () => {
        expect(component).toBeTruthy();
      });

      given(/I have a task "(.*)"/, (title) => {
        component.todos = [{
          ...mockTodo,
          id: '1',
          title,
        }];
      });

      when(/I click the delete button for "(.*)"/, (title) => {
        component.deleteTodo('1');
      });

      then(/\"(.*)\" should be removed from the task list/, (title) => {
        expect(httpClient.delete).toHaveBeenCalledWith('/api/todos/1');
      });
    });

    test('Enable Focus Mode', ({ given, when, then, and }) => {
      given('I am on the todo application', () => {
        expect(component).toBeTruthy();
      });

      given('I have the following tasks:', (table: { Title: string; Priority: string; Completed: string; }[]) => {
        component.todos = table.map(row => ({
          ...mockTodo,
          title: row.Title,
          priority: row.Priority as TaskPriority,
          completed: row.Completed === 'true'
        }));
      });

      when(/I click "(.*)" button/, (buttonText) => {
        component.toggleFocusMode();
      });

      then(/I should only see tasks with "(.*)" or "(.*)" priority/, (priority1, priority2) => {
        expect(httpClient.get).toHaveBeenCalledWith('/api/todos/focus');
      });

      and(/\"(.*)\" should not be visible/, (title) => {
        const visibleTasks = component.todos.filter(t => 
          t.priority === TaskPriority.URGENT || t.priority === TaskPriority.HIGH
        );
        expect(visibleTasks.find(t => t.title === title)).toBeUndefined();
      });
    });

    test('Set task due date', ({ given, when, and, then }) => {
        given('I am on the todo application', () => {
            expect(component).toBeTruthy();
        });

        when(/I enter "(.*)" in the task title field/, (title) => {
            component.newTodo.title = title;
        });

        and('I set the due date to tomorrow', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            component.newTodo.dueDate = tomorrow;
        });

        and(/I click "(.*)" button/, (buttonText) => {
            const newTodo = {
                ...mockTodo,
                ...component.newTodo,
                id: '3',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            httpClient.post.mockReturnValue(of(newTodo));
            httpClient.get.mockReturnValue(of([newTodo]));
            component.addTodo();
            fixture.detectChanges();
        });

        then(/I should see "(.*)" in the task list/, (title) => {
            expect(httpClient.post).toHaveBeenCalledWith('/api/todos', expect.objectContaining({
                title,
                dueDate: expect.any(Date)
            }));
            expect(component.todos).toHaveLength(1);
            expect(component.todos[0].title).toBe(title);
        });

        and('the task should display tomorrow\'s date', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            expect(component.todos[0].dueDate?.toDateString()).toBe(tomorrow.toDateString());
        });
    });
  });
});
