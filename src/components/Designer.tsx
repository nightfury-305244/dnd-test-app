import { useState } from 'react';
import DropArea from './DropArea';
import ShirtSelector from './ShirtSelector';
import Toolbox from './Toolbox';
import { Shirt } from '../data/shirts';

const Designer = () => {
  const [selectedShirt, setSelectedShirt] = useState<Shirt | null>(null);
  const [textOnPlate, setTextOnPlate] = useState("");
  const [dateOnPlate, setDateOnPlate] = useState("");

  return (
    <div className="flex flex-col items-center">
      <ShirtSelector onSelect={setSelectedShirt} />
      <div className="my-4">
        {selectedShirt ? (
          <DropArea textOnPlate={textOnPlate} dateOnPlate={dateOnPlate}>
            <img src={selectedShirt.url} alt={selectedShirt.alt} className="max-w-md mx-auto"/>
          </DropArea>
        ) : (
          <div>Please select a t-shirt to start designing.</div>
        )}
      </div>
      <Toolbox setTextOnPlate={setTextOnPlate} textOnPlate={textOnPlate} setDateOnPlate={setDateOnPlate} dateOnPlate={dateOnPlate} />
    </div>
  );
};

export default Designer;
