import { PromptArea } from "@/modules/prompt-text-area/prompt-area";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start px-2 py-8 pt-32">
      <h2 className="m-2 text-3xl font-medium tracking-tighter">
        Learning should be fun.
      </h2>
      <PromptArea />
    </main>
  );
}
