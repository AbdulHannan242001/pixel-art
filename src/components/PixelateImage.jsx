// PixelateImage.jsx
import React, { useRef, useEffect } from 'react';

export default function PixelateImage({ image, setColors }) {
    const canvasRef = useRef(null);

    const colorDistance = (color1, color2) => {
        return Math.sqrt(
            Math.pow(color1[0] - color2[0], 2) +
            Math.pow(color1[1] - color2[1], 2) +
            Math.pow(color1[2] - color2[2], 2)
        );
    };

    const getColorID = (color, colorPalette, tolerance = 30) => {
        for (let i = 0; i < colorPalette.length; i++) {
            if (colorDistance(color, colorPalette[i].rgb) < tolerance) {
                return colorPalette[i].id;
            }
        }
        return colorPalette.length ? Math.max(...colorPalette.map(c => c.id)) + 1 : 1; // Ensure unique ID
    };

    const pixelateImage = () => {
        const maxWidth = 800; // Max width for the canvas
        const maxHeight = 800; // Max height for the canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = () => {
            // Calculate the scaling factor
            const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
            const scaledWidth = img.width * scaleFactor;
            const scaledHeight = img.height * scaleFactor;

            const pixelSize = 3; // Adjust pixel size as needed
            canvas.width = scaledWidth;
            canvas.height = scaledHeight;

            // Draw scaled image on canvas
            ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

            const colorPalette = [];
            const pixelatedColors = [];

            for (let y = 0; y < scaledHeight; y += pixelSize) {
                const row = [];
                for (let x = 0; x < scaledWidth; x += pixelSize) {
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
