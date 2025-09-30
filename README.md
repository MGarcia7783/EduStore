# EduStore

EduStore es una aplicación web educativa desarrollada en Angular 20 con JSON Server como backend simulado. Su propósito es didáctico: enseñar a los estudiantes sobre el flujo completo de una aplicación web moderna (frontend + backend).

## Descripción Detallada

EduStore fue creado para servir como una herramienta de aprendizaje práctico, permitiendo a los estudiantes entender cómo se comunican las aplicaciones frontend con un servidor backend. Resuelve la necesidad de tener un entorno de desarrollo completo y funcional sin la complejidad de configurar una base de datos real.

**Características Principales:**
*   Gestión de clientes (CRUD completo).
*   Gestión de producto (CRUD completo).
*   Gestión de pedidos.
*   Carrito de compras.
*   Interfaz de usuario intuitiva.

## Tecnologías utilizadas

*   Angular 20
*   Servidor JSON
*   Bootstrap
*   ngx-toastr (notificación)

## Empezando

Sigue estas instrucciones para poner en marcha una copia de tu proyecto en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos

Asegúrate de tener instalado lo siguiente:
*   Node.js (versión 16.x o superior recomendada)
*   Angular CLI: `npm install -g @angular/cli`

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/MGarcia7783/edustore-app.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd EduStore
    cd Frontend
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```

### Ejecutar la Aplicación

1.  **Iniciar el Backend (JSON Server):**
    Abre una nueva terminal y ejecuta:
    ```bash
    cd EduStore
    cd Backend
    npx json-server --watch db-store.json
    ```
    El servidor estará disponible en `http://localhost:3000`.

2.  **Iniciar el Frontend (Angular):**
    En otra terminal, ejecuta:
    ```bash
    cd EduStore
    cd Frontend
    ng serve
    ```
    La aplicación se abrirá automáticamente en tu navegador en `http://localhost:4200`.

