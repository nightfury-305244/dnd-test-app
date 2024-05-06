import type { Position, Symbol } from "./apiTypes";

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
