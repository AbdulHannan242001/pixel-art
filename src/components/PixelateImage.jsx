// PixelateImage.jsx
import React, { useRef, useEffect } from 'react';

export default function PixelateImage({ image, setColors }) {
    const canvasRef = useRef(null);

    const colorDistance = (color1, color2) => {
        // Simple Euclidean distance in RGB space
        return Math.sqrt(
            Math.pow(color1[0] - color2[0], 2) +
            Math.pow(color1[1] - color2[1], 2) +
            Math.pow(color1[2] - color2[2], 2)
        );
    };

    const getColorID = (color, colorPalette, tolerance = 30) => {
        // Check if color is similar to existing colors in palette
        for (let i = 0; i < colorPalette.length; i++) {
            if (colorDistance(color, colorPalette[i].rgb) < tolerance) {
                return colorPalette[i].id; // Return matching color ID
            }
        }
        // New color, assign new ID
        return colorPalette.length + 1;
    };

    const pixelateImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = () => {
            const pixelSize = 5; // Adjustable pixelation level
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const colorPalette = [];
            const pixelatedColors = [];

            for (let y = 0; y < img.height; y += pixelSize) {
                const row = [];
                for (let x = 0; x < img.width; x += pixelSize) {
                    const pixelData = ctx.getImageData(x, y, pixelSize, pixelSize).data;
                    const color = [pixelData[0], pixelData[1], pixelData[2]];
                    const id = getColorID(color, colorPalette);

                    if (!colorPalette.some(c => c.id === id)) {
                        colorPalette.push({ rgb: color, id });
                    }

                    row.push({ id, rgb: `rgb(${color[0]}, ${color[1]}, ${color[2]})` });
                }
                pixelatedColors.push(row);
            }

            setColors({ pixels: pixelatedColors, palette: colorPalette });
        };
    };

    useEffect(() => {
        if (image) pixelateImage();
    }, [image]);

    return <canvas ref={canvasRef} style={{ display: 'none' }} />;
}
