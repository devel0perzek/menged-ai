"use client";

import { Paperclip, SendHorizontal } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

export const PromptArea = () => {
  // STATES
  const [lesson, setLesson] = useState<JSON | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<{ prompt: string }>({
    prompt: "",
  });

  //   REFS
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle textarea change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, prompt: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/lessons/generate_lesson`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: formData.prompt }),
        },
      );

      if (response.ok) {
        console.log("Form submitted successfully!");
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
      className="flex min-h-32 w-full flex-col items-center justify-between rounded-3xl border border-neutral-200 px-2 py-2 sm:w-[90%] md:w-[56%]"
    >
      <textarea
        onChange={handleChange}
        value={formData.prompt}
        className="min-h-12 w-full p-2 tracking-tight outline-none"
        placeholder=" Let's learn something today!"
      />

      <div className="flex h-8 w-full items-center justify-between">
        <button
          type="button"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100"
          onClick={() => inputRef.current?.click()}
        >
          <Paperclip size={16} />
        </button>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />

        <button
          className="flex h-8 w-fit cursor-pointer items-center justify-center gap-x-1 rounded-full bg-blue-500 p-4 text-sm text-white"
          type="submit"
        >
          <SendHorizontal size={16} />
        </button>
      </div>

      {file && (
        <p className="text-xs text-neutral-500">Selected: {file.name}</p>
      )}
    </form>
  );
};
