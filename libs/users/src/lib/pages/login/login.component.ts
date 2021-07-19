/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    loginFormGroup!: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'El email o la contraseña son incorrectos';

    constructor(
      private formBuilder: FormBuilder, 
      private authService: AuthService,
      private localStorageService: LocalstorageService
      ) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.loginFormGroup.invalid) return;

        this.authService.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
            (user) => { 
              this.authError = false;
              this.localStorageService.setToken(user.token)
            },
            (error: HttpErrorResponse) => {
                this.authError = true;
                if (error.status !== 400) {
                    this.authMessage = 'Error en el servidor, intentalo de nuevo más tarde';
                }
            }
        );
    }
}
