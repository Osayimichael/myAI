import { DisplayMessage } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Formatting } from "./formatting";
import { LoadingIndicator } from "@/types";
import Loading from "./loading";
import { AI_NAME } from "@/configuration/identity";
import { useRef } from "react";
import ScrollToBottom from "./scrolltobottom"; // Import the scroll button

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
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling

  const showLoading =
    indicatorState.length > 0 &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  return (
    <motion.div
      ref={chatContainerRef} // Attach ref to the chat container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col flex-1 p-1 gap-3 overflow-y-auto"
    >
      <div className="h-[60px]"></div>
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
      <div className="h-[225px]"></div>

      {/* Scroll to Bottom Button */}
      <ScrollToBottom chatContainerRef={chatContainerRef} />
    </motion.div>
  );
}
