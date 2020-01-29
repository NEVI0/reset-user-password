/* Angular */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/* Component */
import { AuthComponent } from './auth/auth.component';

/* Const tha contains the routes */
const AppRoutes: Routes = [
	{
		path: 'auth/:key/:email/:token', component: AuthComponent
	},
	{
		path: '', redirectTo: 'auth', pathMatch: 'full'
	}
];

/* Exporta the routes to the module */
export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
