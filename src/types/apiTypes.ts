export interface Symbol {
  _id: string;
  type: number;
  url: string;
  price: number;
  alt: string;
}

export interface Shirt {
  _id: string;
  name: string;
  price: number;
  alt: string;
  url: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Product {
  shirtId?: string,
  symbols?: [
    {
      symbolId: string,
      position: Position
    }
  ],
  textOnPlate?: string,
  dateOnPlate?: string,
  price?: string
}