import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { PromptArea } from "@/modules/prompt-text-area/prompt-area";

export default function Home() {
  const isSubscribed = false; // Replace with actual subscription logic
  return (
    <main className="flex flex-col items-center justify-start gap-y-4 px-2 py-8 pt-32">
      <h2 className="text-4xl font-semibold tracking-tighter">
        Make learning fun again.
      </h2>
      <PromptArea isSubscribed={isSubscribed} />
    </main>
  );
}
