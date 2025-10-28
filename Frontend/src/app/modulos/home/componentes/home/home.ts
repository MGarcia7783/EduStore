import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../login/servicios/login.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private loginService = inject(LoginService);
  private router = inject(Router);

  logout() {
    this.loginService.logout(), this.router.navigate(['/login']);
  }
}
