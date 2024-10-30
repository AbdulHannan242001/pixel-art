// ColorPicker.jsx
import { main } from 'framer-motion/client';
import React from 'react';

export default function ColorPicker({ palette, setSelectedColorID }) {
    return (
        <main className='overflow-x-auto max-w-5xl p-2 mt-4 flex flex-row'>
            {palette.map((color, index) => (
                <div
                    key={index}
                    onClick={() => setSelectedColorID(color.id)}
                    className='min-w-12 min-h-12 flex items-center justify-center mr-2 border border-white/10 cursor-pointer rounded-full'
                    style={{ backgroundColor: `rgb(${color.rgb})` }}
                >
                    {color.id}
                </div>
            ))}
        </main>
    );
}
