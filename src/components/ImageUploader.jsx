// ImageUploader.jsx
import React from 'react';

export default function ImageUploader({ setImage }) {
    const handleUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col items-center justify-center my-4">
            <input type="file" accept="image/*" onChange={handleUpload} />
        </div>
    );
}
