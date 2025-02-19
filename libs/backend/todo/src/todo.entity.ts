import { v4 as uuidv4 } from 'uuid';

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    URGENT = 'urgent'
}

export class Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
    priority: TaskPriority;
    category?: string;

    constructor(partial: Partial<Todo>) {
        this.id = uuidv4();
        this.completed = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.priority = TaskPriority.MEDIUM;
        Object.assign(this, partial);
    }
} 