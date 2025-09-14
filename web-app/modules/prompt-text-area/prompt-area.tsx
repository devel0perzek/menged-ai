"use client";

import { SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";
import { FileUploadArea } from "./file-upload";
import { TranscribeText } from "./transcribe-text";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";

export const PromptArea = ({ isSubscribed }: { isSubscribed: boolean }) => {
  // STATES
  const [lesson, setLesson] = useState<JSON | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<{ prompt: string }>({
    prompt: "",
  });

  // Handle textarea change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 0) {
      return; // Prevent input if length exceeds 500 characters
    }
    setFormData({ ...formData, prompt: e.target.value });
  };

  // Handle file change from child component
  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  // Handle transcribed text from child component and append it
  const handleTranscribedText = (transcribedText: string) => {
    setFormData((prev) => ({
      ...prev,
      prompt: prev.prompt
        ? `${prev.prompt} ${transcribedText}`
        : transcribedText,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const dataToSend = new FormData();
      dataToSend.append("prompt", formData.prompt);
      files.forEach((file) => dataToSend.append("files", file));

      const response = await fetch(
        `http://localhost:4000/lessons/generate_lesson`,
        {
          method: "POST",
          body: dataToSend,
        },
      );

      if (response.ok) {
        const data = await response.json();
        setLesson(data);
        console.log("Received lesson:", data);
      } else {
        console.error("Submission failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex min-h-32 w-full flex-col items-center justify-between rounded-3xl border border-neutral-200 px-2.5 py-3 sm:w-[90%] md:w-[56%]"
    >
      {/* File upload component */}
      <FileUploadArea
        onFilesChange={handleFilesChange}
        isSubscribed={isSubscribed}
      />

      <TextArea
        onChange={handleChange}
        value={formData.prompt}
        placeholder=" Let's learn something today!"
      />

      <div className="flex h-8 w-full items-center justify-end gap-x-2">
        {/* Transcription component */}
        <TranscribeText onTranscribedText={handleTranscribedText} />

        <Button
          rounded={"full"}
          color="blue"
          type="submit"
          disabled={!formData.prompt && files.length === 0}
        >
          <SendHorizontal size={16} />
        </Button>
      </div>
    </form>
  );
};
