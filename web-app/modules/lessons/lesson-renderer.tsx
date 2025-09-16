"use client";

import { useState } from "react";
import { LessonBlock } from "./lesson-block";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";

interface LessonRendererProps {
  lesson: any;
}

export function LessonRenderer({ lesson }: LessonRendererProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(
    Array(lesson.content.length).fill(false),
  );

  const totalBlocks = lesson.content.length;
  const progress = (completed.filter(Boolean).length / totalBlocks) * 100;

  function handleContinue() {
    if (currentIndex < totalBlocks - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function markComplete(index: number) {
    setCompleted((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      {/* Title */}
      <Text size="xl" className="font-bold">
        {lesson.title}
      </Text>

      {/* Progress Bar */}
      <Progress value={progress} />

      {/* Render unlocked blocks */}
      {lesson.content
        .slice(0, currentIndex + 1)
        .map((block: any, idx: number) => (
          <LessonBlock
            key={idx}
            block={block}
            index={idx}
            onComplete={() => markComplete(idx)}
          />
        ))}

      {/* Continue button (only enabled when block is complete) */}
      {currentIndex < totalBlocks - 1 && (
        <div className="flex justify-end">
          <Button
            variant="default"
            onClick={handleContinue}
            disabled={!completed[currentIndex]}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
