interface DraggableItemBase {
    id: string;
    type: string;
    url: string;
    position: {
        x: number;
        y: number;
    };
}

export interface IconItem extends DraggableItemBase {
    type: 'icon';
}

export interface PlateItem extends DraggableItemBase {
    type: 'plate';
    textOnPlate: string;
    dateOnPlate: string;
}

export type DraggableItem = IconItem | PlateItem;
