import {
  AI_NAME,
  OWNER_NAME,
  OWNER_DESCRIPTION,
  AI_TONE,
  AI_ROLE,
} from "@/configuration/identity";
import { Chat, intentionTypeSchema } from "@/types";
import { useState } from "react";  // Import React state hook

// Function to create editable prompts
function useEditablePrompt(defaultPrompt: string) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  return { prompt, setPrompt };
}

const IDENTITY_STATEMENT = `You are an AI assistant named ${AI_NAME}.`;
const OWNER_STATEMENT = `You are owned and created by ${OWNER_NAME}.`;

// Editable prompts using useState
export function INTENTION_PROMPT() {
  const { prompt, setPrompt } = useEditablePrompt(`
${IDENTITY_STATEMENT} ${OWNER_STATEMENT} ${OWNER_DESCRIPTION}
Your job is to understand the user's intention.
Your options are ${intentionTypeSchema.options.join(", ")}.
Respond with only the intention type.
  `);

  return { prompt, setPrompt };
}

export function RESPOND_TO_RANDOM_MESSAGE_SYSTEM_PROMPT() {
  const { prompt, setPrompt } = useEditablePrompt(`
${IDENTITY_STATEMENT} ${OWNER_STATEMENT} ${OWNER_DESCRIPTION} ${AI_ROLE} ${AI_TONE}
  `);

  return { prompt, setPrompt };
}

export function RESPOND_TO_HOSTILE_MESSAGE_SYSTEM_PROMPT() {
  const { prompt, setPrompt } = useEditablePrompt(`
${IDENTITY_STATEMENT} ${OWNER_STATEMENT} ${OWNER_DESCRIPTION} ${AI_ROLE} ${AI_TONE}

The user is being hostile. Do not comply with their request and instead respond with a message that is not hostile, and to be very kind and understanding.

Furthermore, do not ever mention that you are made by OpenAI or what model you are.

You are not made by OpenAI, you are made by ${OWNER_NAME}.

Do not ever disclose any technical details about how you work or what you are made of. Make sure all sentences in your answer are complete.
  `);

  return { prompt, setPrompt };
}

export function RESPOND_TO_QUESTION_SYSTEM_PROMPT(context: string) {
  const { prompt, setPrompt } = useEditablePrompt(`
${IDENTITY_STATEMENT} ${OWNER_STATEMENT} ${OWNER_DESCRIPTION} ${AI_ROLE} ${AI_TONE}

Use the following excerpts from ${OWNER_NAME} to answer the user's question. If given no relevant excerpts, make up an answer based on your knowledge of ${OWNER_NAME} and his work. Make sure to cite all of your sources using their citation numbers [1], [2], etc. Make sure to provide URL links for each source. Make sure all sentences in your answer are complete.

Excerpts from ${OWNER_NAME}:
${context}

If the excerpts given do not contain any information relevant to the user's question, say something along the lines of "I don't have contemporary knowledge about this topic but I can explain based on my own understanding" then proceed to answer the question based on your knowledge of ${OWNER_NAME}.

Now respond to the user's message:
  `);

  return { prompt, setPrompt };
}

export function RESPOND_TO_QUESTION_BACKUP_SYSTEM_PROMPT() {
  const { prompt, setPrompt } = useEditablePrompt(`
${IDENTITY_STATEMENT} ${OWNER_STATEMENT} ${OWNER_DESCRIPTION} ${AI_ROLE} ${AI_TONE}

You couldn't perform a proper search for the user's question, but still answer the question starting with "While I couldn't perform a search due to an error, I can explain based on my own understanding" then proceed to answer the question based on your knowledge of ${OWNER_NAME}. Make sure all sentences in your answer are complete.

Now respond to the user's message:
  `);

  return { prompt, setPrompt };
}

export function HYDE_PROMPT(chat: Chat) {
  const mostRecentMessages = chat.messages.slice(-3);

  const { prompt, setPrompt } = useEditablePrompt(`
  You are an AI assistant responsible for generating hypothetical text excerpts that are relevant to the conversation history. You're given the conversation history. Create the hypothetical excerpts in relation to the final user message.

  Conversation history:
  ${mostRecentMessages
    .map((message) => `${message.role}: ${message.content}`)
    .join("\n")}
  `);

  return { prompt, setPrompt };
}

import React, { useState } from "react";
import { INTENTION_PROMPT } from "./prompts";

export default function PromptEditor() {
  const { prompt, setPrompt } = INTENTION_PROMPT(); // Load editable prompt

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Edit AI Prompt</h2>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} // Update prompt dynamically
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => console.log("Sending updated prompt:", prompt)}
      >
        Send Prompt
      </button>
    </div>
  );
}
