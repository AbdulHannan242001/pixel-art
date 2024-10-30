// App.js
import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import PixelateImage from './components/PixelateImage';
import PixelGrid from './components/PixelGrid';
import ColorPicker from './components/ColorPicker';

function App() {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState({ pixels: [], palette: [] });
  const [selectedColorID, setSelectedColorID] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Pixelate Your Image</h1>
      <ImageUploader setImage={setImage} />
      {image && <PixelateImage image={image} setColors={setColors} />}
      {colors.palette.length > 0 && (
        <>
          <PixelGrid colors={colors} selectedColorID={selectedColorID} />
          <ColorPicker palette={colors.palette} setSelectedColorID={setSelectedColorID} />
        </>
      )}
    </div>
  );
}

export default App;
