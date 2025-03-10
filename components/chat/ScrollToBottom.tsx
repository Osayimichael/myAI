import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames
import { ChevronDown } from "lucide-react"; // Icon library (ensure lucide-react is installed)

const ScrollToBottom: React.FC<{ chatContainerRef: React.RefObject<HTMLDivElement> }> = ({ chatContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const isAtBottom = chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 10;
      setIsVisible(!isAtBottom);
    };

    chatContainer.addEventListener("scroll", handleScroll);
    return () => chatContainer.removeEventListener("scroll", handleScroll);
  }, [chatContainerRef]);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    setIsVisible(false); // Hide button after click
  };

  if (!isVisible) return null; // Hide button if not needed

  return (
    <button
      className="fixed bottom-16 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-black shadow-lg transition-opacity hover:bg-gray-300"
      onClick={scrollToBottom}
    >
      <ChevronDown size={24} />
    </button>
  );
};

export default ScrollToBottom;
