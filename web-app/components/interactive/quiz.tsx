// components/interactive/Quiz.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

interface QuizProps {
  data: {
    question: string;
    options: string[];
    answer: string;
  };
  onComplete: () => void;
}

export function Quiz({ data, onComplete }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  function handleCheck() {
    if (!selected) return;
    const correct = selected === data.answer;
    setFeedback(correct ? "✅ Correct!" : "❌ Try again.");
    if (correct) {
      setLocked(true);
      onComplete(); // mark this block as complete
    }
  }

  return (
    <Card className="space-y-4">
      <Text size="lg">{data.question}</Text>

      <div className="space-y-2">
        {data.options.map((opt) => (
          <Button
            key={opt}
            variant={selected === opt ? "default" : "outline"}
            onClick={() => !locked && setSelected(opt)}
            className="w-full"
            disabled={locked}
          >
            {opt}
          </Button>
        ))}
      </div>

      {!locked && (
        <Button onClick={handleCheck} disabled={!selected}>
          Check
        </Button>
      )}

      {feedback && <Text>{feedback}</Text>}
    </Card>
  );
}
