"use client";

import { Paperclip, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  isSubscribed: boolean;
}

export const FileUploadArea = ({
  onFilesChange,
  isSubscribed,
}: FileUploadProps) => {
  // STATES
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // REFS
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Update parent when files change
  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    // Enforce file limits
    if (!isSubscribed && files.length + selectedFiles.length > 5) {
      setErrorMessage("Free users can only upload up to 5 files.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setErrorMessage(null); // clear if valid
    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) =>
      file.type.startsWith("image/") ? URL.createObjectURL(file) : "file",
    );
    setPreviews((prev) => [...prev, ...newPreviews]);

    // Reset input value so same file can be reselected later
    if (inputRef.current) inputRef.current.value = "";
  };

  // Remove one file
  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex h-fit w-full flex-wrap items-center gap-2">
        {/* File Preview Area */}
        {files.map((file, index) => (
          <div
            key={index}
            className="relative mb-3 flex h-18 w-24 items-center justify-center"
          >
            {previews[index] !== "file" ? (
              <img
                src={previews[index]}
                alt="preview"
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              <span className="p-1 text-xs text-neutral-500">
                {file.name.endsWith(".pdf") ? "PDF" : "File"}
              </span>
            )}
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute -top-1 -right-2 cursor-pointer rounded-full bg-neutral-800 p-1"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          className="absolute bottom-2 left-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100"
          onClick={() => inputRef.current?.click()}
        >
          <Paperclip size={16} />
        </button>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {errorMessage && (
        <span className="mt-2 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};
