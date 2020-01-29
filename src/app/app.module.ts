/* Angular Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Angular Material Modules */
import {
	MatCardModule, MatFormFieldModule,
	MatInputModule, MatIconModule,
	MatButtonModule, MatSnackBarModule
} from '@angular/material';

/* Components */
import { AppComponent } from './app.component';
import { RoutesModule } from './app.routing.module';
import { AuthComponent } from './auth/auth.component';

const MaterialModules = [
	MatCardModule, MatFormFieldModule,
	MatInputModule, MatIconModule,
	MatButtonModule, MatSnackBarModule
]

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModules,
		ReactiveFormsModule,
		HttpClientModule,
		RoutesModule
	],
	declarations: [
		AppComponent,
		AuthComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule {}
