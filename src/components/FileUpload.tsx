import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      onFileUpload(file);
    } else {
      alert("Invalid file type. Please upload a JSON file with the correct dataset.");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Upload JSON File</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef} // Reference to clear the input
        />
      </Form.Group>
    </Form>
  );
};

export default FileUpload;
