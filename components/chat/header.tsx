import { Button } from "@/components/ui/button";
import { EraserIcon } from "lucide-react";
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";

export const AILogo = () => (
  <div className="relative w-12 h-12">
    <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
  </div>
);

export default function ChatHeader({ clearMessages }: { clearMessages: () => void }) {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AILogo />
        <h1 className="text-lg font-semibold text-gray-900">{CHAT_HEADER}</h1>
      </div>
      <Button
        onClick={clearMessages}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
      >
        <EraserIcon className="w-4 h-4" />
        {CLEAR_BUTTON_TEXT}
      </Button>
    </header>
  );
}
