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
