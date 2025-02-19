import { Route } from '@angular/router';
import { TodoComponent } from '@frontend/todo';

export const appRoutes: Route[] = [
    {
        path: '',
        component: TodoComponent
    }
];
