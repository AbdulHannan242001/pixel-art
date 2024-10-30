// PixelGrid.jsx
import React, { useState } from 'react';

export default function PixelGrid({ colors, selectedColorID }) {
    const [filledPixels, setFilledPixels] = useState({});

    const handlePixelClick = (rowIndex, colIndex, pixel) => {
        if (pixel.id === selectedColorID) {
            setFilledPixels(prev => ({
                ...prev,
                [`${rowIndex}-${colIndex}`]: pixel.rgb
            }));
        }
    };

    return (
        <div className="grid">
            {colors.pixels.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((pixel, colIndex) => (
                        <div
                            key={colIndex}
                            onClick={() => handlePixelClick(rowIndex, colIndex, pixel)}
                            className={`w-[10px] h-[10px] border-[1px] border-white/10 cursor-pointer text-[10px] flex items-center justify-center`}
                            style={{
                                backgroundColor: filledPixels[`${rowIndex}-${colIndex}`] || '#ffffff',
                                color: pixel.id === selectedColorID ? 'none' : 'black'
                            }}
                        >
                            {pixel.id}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
