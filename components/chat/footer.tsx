import { FOOTER_MESSAGE } from "@/configuration/ui";
import Link from "next/link";

export default function ChatFooter() {
  return (
    <footer className="w-full bg-white shadow-md text-xs text-gray-600 py-3 flex items-center">
      <div className="flex-1 text-left pl-4">
        {/* Left Pane */}
        <Link href="/terms" className="hover:underline hover:text-gray-800">
          Terms of Use
        </Link>
      </div>
      <div className="flex-1 text-center">
        {/* Center Pane */}
        {FOOTER_MESSAGE}
      </div>
      <div className="flex-1 text-right pr-4">
        {/* Right Pane */}
        <a
          href="http://www.ringel.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800"
        >
          Powered by ringel.AI
        </a>
      </div>
    </footer>
  );
}
