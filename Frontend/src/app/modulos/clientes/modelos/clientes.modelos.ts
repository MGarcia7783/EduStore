export class Clientes {
  constructor(
    public identificacion: string,
    public nombreCliente: string,
    public telefono: string,
    public email: string,
    public clave: string
  ) {
    if (telefono.length < 8 || telefono.length > 12) {
      throw new Error('El número de teléfono debe tener entre 8 y 12 dígitos.');
    }
  }

  emailValido(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  claveSegura(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(this.clave);
  }
}
