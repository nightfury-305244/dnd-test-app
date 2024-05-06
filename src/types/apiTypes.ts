export interface Symbol {
  _id: string;
  type: number;
  url: string;
  price: number;
  alt: string;
}

export interface Stone {
  _id: string;
  name: string;
  price: number;
  alt: string;
  url: {
    frontUrl: string,
    leftUrl: string,
    rightUrl: string,
    backUrl: string
  }
}

export interface Position {
  x: number;
  y: number;
}

export interface Product {
  _id?: string;
  stone?: Stone,
  symbols?: [
    {
      symbol: Symbol,
      position: Position
    }
  ],
  textOnPlate?: string,
  dateOnPlate?: string,
  price?: string
}