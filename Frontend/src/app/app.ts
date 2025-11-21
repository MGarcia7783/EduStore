import { Component, signal, OnInit } from '@angular/core'; // Añadir OnInit
import { Router, RouterOutlet } from '@angular/router'; // Añadir Router

@Component({
  selector: 'app-root',
  // Asegúrate de que RouterOutlet esté en imports:
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit { // Implementar OnInit
  protected readonly title = signal('Frontend');

  // 1. Inyectar el Router en el constructor
  constructor(private router: Router) {}

  // 2. Usar ngOnInit para la navegación inicial
  ngOnInit() {
    // Forzar la navegación a la ruta inicial de Login
    if (this.router.url === '/') {
      this.router.navigate(['/login']);
    }
  }
}
