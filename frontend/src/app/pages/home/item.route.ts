import { Routes } from '@angular/router';

import { ItemComponent } from './item.component';
import { UserRouteAccessService } from '../../shared';

export const itemRoute: Routes = [
    {
        path: '',
        component: ItemComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];