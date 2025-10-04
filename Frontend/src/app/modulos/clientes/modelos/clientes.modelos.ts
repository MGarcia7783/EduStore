export class Clientes {
  constructor(
    public identificacion: string,
    public nombreCliente: string,
    public telefono: string,
    public email: string,
    public clave: string,
    public confirmarClave: string
  ) {  }

  emailValido(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  claveSegura(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(this.clave);
  }

  clavesCoinciden(): boolean {
    return this.clave === this.confirmarClave;
  }
}
