/* Angular */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

/* Rxjs Operator */
import { take } from 'rxjs/operators';

/* Config Vars */
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

	/* Config Var */
	private readonly BlockedApiUrl = environment.BlockedApiUrl;

	/* Form to reset the password */
	form: FormGroup

	/* Variables to the URL params */
	key: string;
	email: string;
	token: string;

	/* Controllers */
	success: boolean = false;
	danger: boolean = false;
	isLoading: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private snackbar: MatSnackBar,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		/* Take the values of the URL */
		this.key = this.route.snapshot.params['key'];
		this.email = this.route.snapshot.params['email'];
		this.token = this.route.snapshot.params['token'];

		/* Create the reactive form */
		this.form = this.formBuilder.group({
			key: [ this.key, Validators.required ],
			email: [ this.email ],
			password: [ null, Validators.required ]
		});
	}

	/* Reset the Password */
	onReset() {
		const stringfy = JSON.stringify(this.form.value);
		this.isLoading = true;

		/* HTTP Request */
		this.http.post<any>(`${this.BlockedApiUrl}/resetPass`, JSON.parse(stringfy), {
			headers: new HttpHeaders({
				'Authorization': this.token /* Header with tge application Token */
			})
		}).pipe(
			take(1)
		).subscribe(
			resp => {
				this.success = true;
				this.isLoading = false;
				this.form.reset();
			},
			err => {
				console.log(err);
				if (err.error.message == "invalid token") {
					this.danger = true;
					this.isLoading = false;
					this.form.reset();
					this.form.get('email').disable();
					this.form.get('password').disable();
				} else {
					this.isLoading = false;
					this.snackbar.open(err.error.errorMsg, "Ok");
				}
			}
		);
	}

}
