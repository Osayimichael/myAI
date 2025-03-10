import { DisplayMessage } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Formatting } from "./formatting";
import { LoadingIndicator } from "@/types";
import Loading from "./loading";
import { AI_NAME } from "@/configuration/identity";
import { useRef, useEffect } from "react";
import ScrollToBottom from "./ScrollToBottom"; // Correct case-sensitive import

function AILogo() {
  return (
    <div className="w-9 h-9">
      <Image src="/ai-logo.png" alt={AI_NAME} width={36} height={36} />
    </div>
  );
}

function UserMessage({ message }: { message: DisplayMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 py-1 justify-end"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="px-3 py-1 bg-blue-500 rounded-2xl text-white max-w-[60%] shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {message.content}
      </motion.div>
    </motion.div>
  );
}

function AssistantMessage({ message }: { message: DisplayMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 py-1 justify-start gap-[5px]"
    >
      <div className="w-9 flex items-end">{<AILogo />}</div>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="px-3 py-1 bg-gray-200 rounded-2xl text-black max-w-[60%] shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <Formatting message={message} />
      </motion.div>
    </motion.div>
  );
}

function EmptyMessages() {
  return (
    <div className="flex flex-col flex-1 p-1 gap-3 justify-center items-center">
      <p className="text-gray-500">Ask a question to start the conversation</p>
    </div>
  );
}

export default function ChatMessages({
  messages,
  indicatorState,
}: {
  messages: DisplayMessage[];
  indicatorState: LoadingIndicator[];
}) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const showLoading =
    indicatorState.length > 0 &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Scrollable Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex flex-col flex-1 overflow-y-auto px-4 pt-16 pb-24" 
      >
        {messages.length === 0 ? (
          <EmptyMessages />
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {message.role === "user" ? (
                <UserMessage message={message} />
              ) : (
                <AssistantMessage message={message} />
              )}
            </motion.div>
          ))
        )}
        {showLoading && <Loading indicatorState={indicatorState} />}
      </div>

      {/* Scroll To Bottom Button (Absolute Position) */}
      <div className="absolute bottom-4 right-4">
        <ScrollToBottom chatContainerRef={chatContainerRef} />
      </div>
    </div>
  );
}
