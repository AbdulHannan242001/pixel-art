// ColorPicker.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ColorPicker({ palette, setSelectedColorID, completedColors }) {
    const [selectedID, setSelectedID] = useState(null);

    const handleColorSelect = (colorID) => {
        setSelectedID(colorID);
        setSelectedColorID(colorID); // Pass selected color ID to parent
    };
    return (
        <main className='overflow-x-auto overflow-y-visible max-w-5xl p-2 mt-4 flex flex-row fixed bottom-4'>
            {palette.map((color, index) => (
                // Conditionally render each color based on completion status
                !completedColors.includes(color.id) &&
                <motion.div
                    key={index}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: color.id === selectedID ? 1.3 : 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => handleColorSelect(color.id)}
                    className={`min-w-12 min-h-12 flex items-center justify-center mr-2 border border-white/10 cursor-pointer rounded-full`}
                    style={{
                        backgroundColor: `rgb(${color.rgb})`,
                        opacity: completedColors.includes(color.id) ? 0.5 : 1
                    }}
                >
                    {color.id}
                </motion.div>
            ))}
        </main>
    );
}
