import DraggableItem from "./DraggableItem";
import { icons, plates } from "../data/icons";

interface ToolboxProps {
  textOnPlate: string;
  setTextOnPlate: (text: string) => void;
  dateOnPlate: string;
  setDateOnPlate: (text: string) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({
  setTextOnPlate,
  textOnPlate,
  setDateOnPlate,
  dateOnPlate,
}) => {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Icons:</h2>
        <div className="flex flex-wrap justify-start items-center gap-4">
          {icons.map((icon) => (
            <DraggableItem
              key={icon.id}
              id={icon.id}
              url={icon.url}
              type={icon.type}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-4">Plates:</h2>
        <div className="flex flex-wrap justify-start items-center gap-4">
          {plates.map((plate) => (
            <DraggableItem
              key={plate.id}
              id={plate.id}
              url={plate.url}
              type={plate.type}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="textOnPlate" className="font-bold">
          Text on Plate:
        </label>
        <input
          id="textOnPlate"
          type="text"
          value={textOnPlate}
          onChange={(e) => setTextOnPlate(e.target.value)}
          placeholder="Enter text for the plate"
          className="mt-2 p-1 border rounded"
        />
      </div>
      <div>
        <label htmlFor="dateOnPlate" className="font-bold">
          Text on Date:
        </label>
        <input
          id="dateOnPlate"
          type="date"
          value={dateOnPlate}
          onChange={(e) => setDateOnPlate(e.target.value)}
          placeholder="Enter text for the plate"
          className="mt-2 p-1 border rounded"
        />
      </div>
    </div>
  );
};

export default Toolbox;
