import React, { useState } from 'react';
import axios from 'axios';
import '../styles/dragAndDrop.css';

const DragAndDropImages = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const uploadFiles = async () => {
        setLoading(true);
        const uploadedFileUrls = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'xebiadocs'); // Replace with your Cloudinary upload preset
            formData.append("cloud_name", "ds5wmytro")
            
            fetch('https://api.cloudinary.com/v1_1/ds5wmytro/image/upload',{
                    method: "post",
                    body: formData
                })
                .then((res) => res.json)
                .then((data) => {
                    console.log(data);
                }).catch((err) => {
                    console.log(err);
                })
        }

        setLoading(false);

        // Send the file URLs to your backend
        try {
            await axios.post('YOUR_BACKEND_URL', { files: uploadedFileUrls });
        } catch (error) {
            console.error('Error sending file URLs to backend', error);
        }
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
                <span className='select' onClick={() => document.querySelector('.file').click()}>
                    Browse
                </span>
                <input 
                    name='file' 
                    type='file' 
                    className='file' 
                    multiple 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}  // Hide the input element
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
            <button type='button' onClick={uploadFiles} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
}

export default DragAndDropImages;
