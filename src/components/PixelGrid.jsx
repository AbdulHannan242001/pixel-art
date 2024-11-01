// PixelGrid.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PixelGrid({ colors, selectedColorID, onCompletion }) { // Added onCompletion prop
    const [filledPixels, setFilledPixels] = useState({});
    const [colorCounts, setColorCounts] = useState({});
    const [filledPixelsCount, setFilledPixelsCount] = useState({});

    useEffect(() => {
        const counts = {};
        colors.pixels.forEach(row => {
            row.forEach(pixel => {
                counts[pixel.id] = (counts[pixel.id] || 0) + 1;
            });
        });
        setColorCounts(counts);

        const initialFilledCount = {};
        Object.keys(counts).forEach(id => {
            initialFilledCount[id] = 0;
        });
        setFilledPixelsCount(initialFilledCount);
    }, [colors]);

    const handlePixelClick = (rowIndex, colIndex, pixel) => {
        if (pixel.id === selectedColorID && !filledPixels[`${rowIndex}-${colIndex}`]) {
            // Proceed only if pixel isn't already filled
            setFilledPixels(prev => ({
                ...prev,
                [`${rowIndex}-${colIndex}`]: pixel.rgb
            }));

            setFilledPixelsCount(prevFilledCount => ({
                ...prevFilledCount,
                [pixel.id]: prevFilledCount[pixel.id] + 1
            }));

            // Update remaining pixel count safely
            setColorCounts(prevCounts => {
                const newCount = { ...prevCounts };
                newCount[pixel.id] = Math.max(newCount[pixel.id] - 1, 0);

                // Check for completion
                if (newCount[pixel.id] <= 0) {
                    onCompletion(pixel.id);
                }

                return newCount;
            });
        }
    };


    const totalPixels = colorCounts[selectedColorID] || 0;
    const filledForSelectedColor = filledPixelsCount[selectedColorID] || 0;
    const completionPercentage = (filledForSelectedColor / (totalPixels + filledForSelectedColor) * 100) || 0


    return (
        <main>
            <motion.div
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5 }}
                className="p-2 border border-white bg-green-500 h-4 max-w-screen mb-2 fixed top-0 left-0 right-0"
            />
            <div className="shadow-lg shadow-[#1e1e1e] grid p-2 bg-gradient-to-tr from-zinc-950 to-zinc-800">
                {colors.pixels.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((pixel, colIndex) => (
                            <motion.div
                                key={colIndex}
                                whileHover={{ scale: 1.5, border: '0.5px solid black' }}
                                onClick={() => handlePixelClick(rowIndex, colIndex, pixel)}
                                className={`w-[12px] h-[12px] border-[1px] border-white/10 cursor-pointer text-[8px] flex items-center justify-center`}
                                style={{
                                    backgroundColor: filledPixels[`${rowIndex}-${colIndex}`] || '#ffffff',
                                    color: 'black',
                                }}
                            >
                                {filledPixels[`${rowIndex}-${colIndex}`] ? '' : pixel.id}
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
}
