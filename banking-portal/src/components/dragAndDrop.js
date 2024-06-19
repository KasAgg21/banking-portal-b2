import React, { useState } from 'react';
import '../styles/dragAndDrop.css';

const DragAndDropImages = () => {
    const [files, setFiles] = useState([]);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleDelete = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className='card'>
            <div className='top'>
                <p>Drag and drop documents</p>
            </div>
            <div 
                className='drag-area'
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <span className='select'>
                    Drop documents here
                </span>
                Drag and drop documents here or {" "}
                <span className='select'>
                    Browse
                </span>
                <input 
                    name='file' 
                    type='file' 
                    className='file' 
                    multiple 
                    onChange={handleFileChange}
                />
            </div>
            <div className='container'>
                {files.map((file, index) => (
                    <div key={index} className='document'>
                        <span className='delete' onClick={() => handleDelete(index)}>&times;</span>
                        <img src={URL.createObjectURL(file)} alt={file.name} />
                    </div>
                ))}
            </div>
            <button type='button'>
                Upload
            </button>
        </div>
    );
}

export default DragAndDropImages;
