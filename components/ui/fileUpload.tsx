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

    // <div className="file-upload w-full border border-dashed border-gray-900">
    //   <div {...getRootProps()} className="dropzone">
    //     <input {...getInputProps()} />
    //     <div className="upload-icon">
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="64"
    //             height="64"
    //             viewBox="0 0 64 64"
    //             >
    //             <path
    //                 fill="#000000"
    //                 d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 60C16.565 60 4 47.435 4 32S16.565 4 32 4s28 12.565 28 28-12.565 28-28 28zm-8-20c-2.209 0-4 1.791-4 4 0 2.209 1.791 4 4 4h16c2.209 0 4-1.791 4-4 0-2.209-1.791-4-4-4H24zm0 8c-1.104 0-2-.896-2-2 0-1.104.896-2 2-2h16c1.104 0 2 .896 2 2 0 1.104-.896 2-2 2H24z"
    //             ></path>
    //         </svg>
    //     </div>
    //     <p>Click to upload or drag and drop Bank Statements</p>
    //   </div>
    // </div>


    // <div className="w-full max-w-xs mx-auto p-4 border rounded-lg shadow-lg">
    //   <div {...getRootProps()} className="bg-gray-100 border-dashed border-2 border-gray-300 p-8 text-center">
    //     <input {...getInputProps()} />
    //     <div className="text-gray-500">
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="64"
    //             height="64"
    //             viewBox="0 0 64 64"
    //             >
    //             <path
    //                 fill="#000000"
    //                 d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 60C16.565 60 4 47.435 4 32S16.565 4 32 4s28 12.565 28 28-12.565 28-28 28zm-8-20c-2.209 0-4 1.791-4 4 0 2.209 1.791 4 4 4h16c2.209 0 4-1.791 4-4 0-2.209-1.791-4-4-4H24zm0 8c-1.104 0-2-.896-2-2 0-1.104.896-2 2-2h16c1.104 0 2 .896 2 2 0 1.104-.896 2-2 2H24z"
    //             ></path>
    //         </svg>
    //       <p className="text-lg font-semibold">Click to upload or drag and drop Bank Statements</p>
    //     </div>
    //   </div>
    // </div>
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
