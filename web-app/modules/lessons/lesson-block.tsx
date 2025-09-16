"use client";

import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Quiz } from "@/components/interactive/quiz";

interface LessonBlockProps {
  block: any;
  index: number;
  onComplete: () => void;
}

export function LessonBlock({ block, onComplete }: LessonBlockProps) {
  switch (block.type) {
    case "text":
      // Auto-complete text blocks immediately
      onComplete();
      return (
        <Card>
          <Text>{block.body}</Text>
        </Card>
      );

    case "example":
      // Auto-complete example blocks immediately
      onComplete();
      return (
        <Card>
          <Text className="italic">Example: {block.body}</Text>
        </Card>
      );

    case "interactive":
      return (
        <Card className="space-y-3">
          <Text>{block.instructions}</Text>
          {block.component === "quiz" && (
            <Quiz data={block.data} onComplete={onComplete} />
          )}
        </Card>
      );

    default:
      return null;
  }
}
