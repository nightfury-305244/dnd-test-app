interface DraggableItemBase {
  _id: string;
  type: string;
  url: string;
  position: Position;
  price: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface IconItem extends DraggableItemBase {
  type: "icon";
}

export interface PlateItem extends DraggableItemBase {
  type: "plate";
  textOnPlate: string;
  dateOnPlate: string;
}

export type DraggableItem = IconItem | PlateItem;

// src/types/index.ts
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
    deliveryTime?: string;  // Can be Date or string depending on how you handle dates
  };
}

export interface OrderState {
  order: OrderData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ProductInfo {
  shirtId: string;
  droppedSymbols?: DraggableItem[];
  textOnPlate?: string,
  dateOnPlate?: string
  price: number
}