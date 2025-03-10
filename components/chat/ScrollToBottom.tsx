import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Ensure lucide-react is installed

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
    setIsVisible(false); // Hide button after clicking
  };

  if (!isVisible) return null; // Hide if already at the bottom

  return (
    <button
      className="absolute bottom-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-black shadow-lg hover:bg-gray-300 transition-opacity"
      onClick={scrollToBottom}
      style={{ zIndex: 10 }} // Ensures it's above the footer
    >
      <ChevronDown size={24} />
    </button>
  );
};

export default ScrollToBottom;
