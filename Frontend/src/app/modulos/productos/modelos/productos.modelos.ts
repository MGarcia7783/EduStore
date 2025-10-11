export class Productos {
  constructor(
    public nombreProducto: string,
    public descripcionProducto: string,
    public precio: number,
    public imagen: string
  ) {}

  precioValido(): boolean {
    return this.precio > 0;
  }
}
