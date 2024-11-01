// App.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import ImageUploader from './components/ImageUploader';
import PixelateImage from './components/PixelateImage';
import PixelGrid from './components/PixelGrid';
import ColorPicker from './components/ColorPicker';

function App() {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState({ pixels: [], palette: [] });
  const [selectedColorID, setSelectedColorID] = useState(null);
  const [completedColors, setCompletedColors] = useState([]);

  const handleColorCompletion = (colorId) => {
    if (!completedColors.includes(colorId)) {
      setCompletedColors((prev) => [...prev, colorId]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-t from-slate-600 to-slate-800 min-h-[120vh]">
      <h1 className="text-2xl font-bold mb-4">PIXEL ART COLOR PICKER</h1>
      {!image && <ImageUploader setImage={setImage} />}
      {image && <PixelateImage image={image} setColors={setColors} />}
      {colors.palette.length > 0 && (
        <>
          <PixelGrid
            colors={colors}
            selectedColorID={selectedColorID}
            onCompletion={handleColorCompletion} // Ensure the onCompletion handler is passed
          />
          <ColorPicker
            palette={colors.palette}
            setSelectedColorID={setSelectedColorID}
            completedColors={completedColors}
          />
        </>
      )}
    </div>
  );
}

export default App;
