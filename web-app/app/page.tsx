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

      <div className="group relative">
        <Tooltip position={"right"}>
          <div className="h-56 w-56 bg-neutral-800 p-4 text-sm text-white">
            I'm a tooltip
          </div>
        </Tooltip>
        <Button variant={"threeD"} threeDColor={"neutral"} rounded={"full"}>
          Continue
        </Button>
      </div>

      <Text>this is a text</Text>
      <Label>This is a label</Label>
    </main>
  );
}
