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

export interface DraggableItem {
  symbol: Symbol;
  position: Position;
}

export interface OrderData {
  subscriberInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  deliveryInfo: {
    address: string;
    locationName?: string;
    deliveryNumber?: string;
    deliveryTime?: string;
  };
}

export interface OrderState {
  order: OrderData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface ProductInfo {
  stoneId: string;
  droppedSymbols?: DraggableItem[];
  textOnPlate?: string;
  dateOnPlate?: string;
  price: number;
}
