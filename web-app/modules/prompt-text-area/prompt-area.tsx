"use client";

import { SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";

export const PromptArea = () => {
  const [formData, setFormData] = useState<{ prompt: string }>({
    prompt: "",
  });

  const [lesson, setLesson] = useState<JSON | null>();

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
      className="flex min-h-32 w-full flex-col items-center justify-between rounded-xl border border-neutral-200 px-2 py-2 sm:w-[90%] md:w-[56%]"
    >
      <textarea
        onChange={handleChange}
        value={formData.prompt}
        className="min-h-12 w-full p-2 tracking-tight outline-none"
        placeholder=" Let's learn something today!"
      />
      <div className="flex h-8 w-full items-center justify-between">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 pb-0.5 text-xl">
          +
        </button>
        <button
          className="flex h-8 w-fit cursor-pointer items-center justify-center gap-x-1 rounded-full bg-blue-500 p-4 text-sm text-white"
          type="submit"
        >
          <SendHorizontal size={16} />
        </button>
      </div>
    </form>
  );
};
