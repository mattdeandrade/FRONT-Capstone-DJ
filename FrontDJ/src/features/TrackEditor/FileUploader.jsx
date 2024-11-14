import React from "react";

const FileUploader = ({ fileInputRef, handleFileChange }) => (
  <input
    type="file"
    ref={fileInputRef}
    accept=".mp3"
    onChange={handleFileChange}
  />
);

export default FileUploader;
