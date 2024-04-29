import { useDrag } from 'react-dnd';
import { useRef } from 'react';
import { DraggableItem } from '../types';

type MoveItemFunction = (id: string, x: number, y: number) => void;

const IconItem = ({ item, moveItem }: {item: DraggableItem, moveItem: MoveItemFunction}) => {
    const ref = useRef(null);
    const [, drag] = useDrag({
        type: item.type,
        item: item,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            if (delta) {
                const x = Math.round(item.position.x + delta.x);
                const y = Math.round(item.position.y + delta.y);
                moveItem(item.id, x, y);
            }
        },
    });

    drag(ref);

    return (
        <div ref={ref} style={{ position: 'absolute', left: item.position.x, top: item.position.y, cursor: 'move' }}>
            <img src={item.url} alt={`Dropped ${item.type}`} style={{ width: '50px', height: '50px' }} />
        </div>
    );
};

export default IconItem;