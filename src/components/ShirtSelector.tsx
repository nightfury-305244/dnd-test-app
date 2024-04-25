import { shirts } from "../data/shirts";

const ShirtSelector = ({
  onSelect,
}: {
  onSelect: (shirt: (typeof shirts)[0]) => void;
}) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Choose a T-shirt:</h2>
      <div className="grid grid-cols-2 gap-4">
        {shirts.map((shirt) => (
          <button
            key={shirt.id}
            onClick={() => onSelect(shirt)}
            className="border p-2"
          >
            <img
              src={shirt.url}
              alt={shirt.alt}
              className="w-full h-auto object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShirtSelector;
