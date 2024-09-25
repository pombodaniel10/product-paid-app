export class Product {
    constructor(
      public readonly id: string,  // ID del producto
      public readonly name: string, // Nombre del producto
      public readonly image: string, // url imagen del producto
      public stock: number,         // Unidades en stock
      public readonly price: number // Precio del producto
    ) {}
  
    // Método para disminuir el stock
    decrementStock(quantity: number): void {
      if (this.stock < quantity) {
        throw new Error('Not enough stock');
      }
      this.stock -= quantity;
    }
  
    // Método para aumentar el stock
    incrementStock(quantity: number): void {
      this.stock += quantity;
    }
  
    // Método para verificar si el producto está disponible
    isAvailable(): boolean {
      return this.stock > 0;
    }
  }
  