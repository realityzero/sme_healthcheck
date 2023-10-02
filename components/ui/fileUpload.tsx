import React, { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';

interface FileUploadComponentProps {
  onUpload: (uploadedFiles: FileWithPath[]) => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ onUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setIsDragging(false); // Reset drag state
    // Handle the dropped files, e.g., upload them
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
        'application/pdf': []
    }, // Allow only PDF files
    multiple: true, // Enable multiple file uploads
    maxFiles: 2,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div className="w-full max-w-xs mx-auto p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-110">
        <div
        {...getRootProps()}
        className={`bg-gray-100 border-dashed border-2 border-gray-300 p-8 text-center ${
            isDragging
            ? 'bg-blue-100 border-blue-300'
            : 'hover:bg-blue-100 hover:border-blue-300'
        }`}
        >
            <input {...getInputProps()} />
            <div className="text-gray-500">
                <div className="m-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="mx-auto text-5xl rounded-full bg-opacity-12 bg-blue-100 p-2"
                        >
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"></path>
                    </svg>
                </div>
                <p className="text-sm font-semibold">
                {isDragging ? 'Drop your files here!' : 'Click to upload or drag and drop Bank Statements'}
                </p>
                <p className="text-xs font-light">
                Lower than 4mb | PDF Only
                </p>
            </div>
        </div>
    </div>
  );
};

export default FileUploadComponent;
