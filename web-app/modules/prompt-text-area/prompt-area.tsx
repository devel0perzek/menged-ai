"use client";

import { Loader, SendHorizontal } from "lucide-react";
import { FormEvent, useState, useRef, useEffect } from "react";
import { FileUploadArea } from "./file-upload";
import { TranscribeText } from "./transcribe-text";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/cn";
import { Tooltip } from "@/components/ui/tooltip";

export const PromptArea = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [lesson, setLesson] = useState<JSON | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<{ prompt: string }>({ prompt: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ new state

  const { getToken } = useAuth();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, prompt: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const trimmed = formData.prompt.trim();
      if (!trimmed) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleTranscribedText = (transcribedText: string) => {
    setFormData((prev) => ({
      ...prev,
      prompt: prev.prompt
        ? `${prev.prompt} ${transcribedText}`
        : transcribedText,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmed = formData.prompt.trim();
    if (!trimmed && files.length === 0) return;

    try {
      setIsSubmitting(true);
      const dataToSend = new FormData();
      dataToSend.append("prompt", trimmed);
      files.forEach((file) => dataToSend.append("files", file));

      const token = await getToken();
      const response = await fetch(
        `http://localhost:4000/lessons/generate_lesson`,
        {
          method: "POST",
          body: dataToSend,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLesson(data);
        setFormData({ prompt: "" });
        setFiles([]);
      } else {
        console.error("Submission failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled =
    (formData.prompt.trim().length === 0 && files.length === 0) || isSubmitting;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn(
        "relative flex w-full flex-col items-center justify-between rounded-3xl border border-neutral-200 px-2.5 py-3 sm:w-[90%] md:w-[56%]",
        "transition-[height] duration-200 ease-in-out",
      )}
    >
      <FileUploadArea
        onFilesChange={handleFilesChange}
        isSubscribed={isSubscribed}
      />

      <TextArea
        ref={textAreaRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={formData.prompt}
        placeholder="Let's learn something today!"
      />

      <div className="flex h-8 w-full items-center justify-end gap-x-2">
        <div className="group relative">
          <TranscribeText onTranscribedText={handleTranscribedText} />
          <Tooltip position={"bottom"}>
            <div className="flex h-fit w-16 items-center justify-center rounded-sm bg-neutral-800 px-4 py-1.5 text-xs font-medium tracking-tight text-white">
              Dictate
            </div>
          </Tooltip>
        </div>

        <Button
          rounded={"full"}
          color="blue"
          type="submit"
          disabled={isDisabled}
        >
          {isSubmitting ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <SendHorizontal size={16} />
          )}
        </Button>
      </div>
    </form>
  );
};
