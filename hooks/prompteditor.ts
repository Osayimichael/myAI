import React, { useState } from "react";
import { INTENTION_PROMPT } from "@/configuration/prompts"; // Import as a function

export default function PromptEditor() {
  const [prompt, setPrompt] = useState(INTENTION_PROMPT()); // ✅ Correctly initialized state

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Edit AI Prompt</h2>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} // ✅ Updates state correctly
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
