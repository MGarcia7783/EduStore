import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../modelos/login.request';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgClass
],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private loginService = inject(LoginService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public frmLogin!: FormGroup;

  ngOnInit(): void {
    this.createFormLogin();
  }

  createFormLogin() {
    this.frmLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.frmLogin.invalid) {
      this.toastr.warning('Complete los campos obligatorios', 'Validación');
      this.frmLogin.markAllAsTouched();
      return;
    }

    const loginRequest: LoginRequest = this.frmLogin.value;

    this.loginService.login(loginRequest).subscribe({
      next: () => {
        this.router.navigate(['home/pedidos/catalogo']);
      },
      error: (err) => {
        const mensaje = err?.message || 'Error al iniciar sesión';
        this.toastr.error(mensaje, 'Error');
      },
    });
  }
}
