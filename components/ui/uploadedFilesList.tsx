import React from 'react';

interface UploadedFilesListProps {
  files: { name: string; url: string }[];
}

const UploadedFilesList: React.FC<UploadedFilesListProps> = ({ files }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Uploaded Files:</h2>
      <ul className="list-disc pl-5">
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedFilesList;
