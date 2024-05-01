interface DraggableItemBase {
  id: string;
  type: string;
  url: string;
  position: Position;
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

export interface Shirt {
  id: string; 
  url: string; 
  alt: string;
  name: string;
  price: number
}

export interface DesignState {
  selectedShirt: Shirt | null; // The currently selected shirt, or null if none selected
  currentStep: "select" | "design" | "order"; // The current step in the design process
  icons: IconItem[];
  plates: PlateItem[];
}
