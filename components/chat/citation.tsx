"use client";
import { Citation } from "@/types";
import { useState, useEffect } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { EMPTY_CITATION_MESSAGE } from "@/configuration/ui";

// Component for displaying individual citation circles
export function CitationCircle({
  number,
  citation,
}: {
  number: number;
  citation: Citation;
}) {
  const [open, setOpen] = useState(false);
  
  const isValidUrl = (url?: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const hasSourceUrl = isValidUrl(citation.source_url);
  const hasSourceDescription = citation.source_description?.trim() !== "";
  
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <span
            className="bg-gray-50 rounded-full px-2 py-0.5 hover:cursor-pointer hover:scale-105 inline-block text-sm font-medium text-gray-900"
            onClick={() => setOpen((prev) => !prev)} // Ensures it works on mobile
          >
            {number}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="p-2 rounded-md shadow-md border border-gray-100 max-w-xs dark:bg-blue-600 dark:text-white bg-white z-50"
            side="top"
            align="center"
            onPointerDownOutside={() => setOpen(false)} // Closes on outside click
          >
            <p className="text-sm text-gray-900 dark:text-white">
              {hasSourceUrl ? (
                <Link
                  href={citation.source_url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {citation.source_description || citation.source_url}
                </Link>
              ) : (
                citation.source_description || EMPTY_CITATION_MESSAGE
              )}
            </p>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

// Main Citations component that processes message text and renders citations
export function Citations({
  message,
  citations = [],
  isLoading = false,
}: {
  message: string;
  citations: Citation[];
  isLoading?: boolean;
}) {
  const [processedContent, setProcessedContent] = useState<React.ReactNode>("");
  
  useEffect(() => {
    if (!message) {
      setProcessedContent("");
      return;
    }
    
    // If no citations or empty message, just show the message
    if (!citations || citations.length === 0) {
      setProcessedContent(message);
      return;
    }
    
    // Parse the message to find citation markers [1], [2], etc.
    const citationRegex = /\[(\d+)\]/g;
    let lastIndex = 0;
    let parts: React.ReactNode[] = [];
    let match;
    
    // Clone the message string
    const messageText = String(message);
    
    // Find all citation references in the message
    while ((match = citationRegex.exec(messageText)) !== null) {
      const citationNumber = parseInt(match[1]);
      
      // Only process if the citation number is valid
      if (citationNumber > 0 && citationNumber <= citations.length) {
        // Add text before the citation
        if (match.index > lastIndex) {
          parts.push(messageText.substring(lastIndex, match.index));
        }
        
        // Add the citation component
        parts.push(
          <CitationCircle 
            key={`citation-${match.index}`} 
            number={citationNumber} 
            citation={citations[citationNumber - 1]} 
          />
        );
        
        lastIndex = match.index + match[0].length;
      }
    }
    
    // Add any remaining text
    if (lastIndex < messageText.length) {
      parts.push(messageText.substring(lastIndex));
    }
    
    setProcessedContent(parts.length > 0 ? parts : message);
  }, [message, citations]);
  
  return (
    <div className="citations-container">
      {isLoading ? (
        <div className="flex items-center">
          <span className="mr-2">{message}</span>
          <span className="text-sm text-gray-500 animate-pulse">Loading citations...</span>
        </div>
      ) : (
        <div>{processedContent}</div>
      )}
      
      {/* Display all citations at the bottom when no citation markers in text */}
      {citations.length > 0 && !message.match(/\[\d+\]/) && (
        <div className="mt-4 pt-2 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Sources:</p>
          <div className="flex flex-wrap gap-2">
            {citations.map((citation, index) => (
              <CitationCircle 
                key={bottom-citation-${index}} 
                number={index + 1} 
                citation={citation} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Hook to handle citation loading for a specific message
export function useCitations(messageId: string, streamDuration: number = 300) {
  const [citations, setCitations] = useState<Citation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (!messageId) return;
    
    let timeoutId: ReturnType<typeof setTimeout>;
    let retryCount = 0;
    const maxRetries = 3;
    
    const fetchCitations = async () => {
      try {
        setIsLoading(true);
        
        // Fetch citations for this specific message
        const response = await fetch(/api/citations?messageId=${messageId});
        if (!response.ok) {
          throw new Error('Failed to fetch citations');
        }
        
        const data = await response.json();
        if (data.citations && data.citations.length > 0) {
          setCitations(data.citations);
          return true; // Citations found
        }
        return false; // No citations yet
      } catch (err) {
        if (retryCount >= maxRetries) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          console.error('Error fetching citations:', err);
        }
        return false;
      } finally {
        setIsLoading(false);
      }
    };
    
    // Initial fetch
    fetchCitations();
    
    // Set up polling if citations aren't available immediately
    if (streamDuration > 0) {
      const checkAndFetch = async () => {
        const found = await fetchCitations();
        retryCount++;
        
        // If citations found or max retries reached, stop polling
        if (found || retryCount >= maxRetries) return;
        
        // Otherwise, set up next poll with exponential backoff
        const delay = Math.min(2000 * Math.pow(2, retryCount), 30000);
        timeoutId = setTimeout(checkAndFetch, delay);
      };
      
      // Start polling after initial stream delay
      timeoutId = setTimeout(checkAndFetch, Math.min(streamDuration * 1000 / 3, 10000));
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [messageId, streamDuration]);
  
  return { citations, isLoading, error };
}

// Message component with citation support
export function MessageWithCitations({
  message,
  messageId,
  streamDuration = 300,
}: {
  message: string;
  messageId: string;
  streamDuration?: number;
}) {
  const { citations, isLoading } = useCitations(messageId, streamDuration);
  
  return (
    <Citations 
      message={message} 
      citations={citations} 
      isLoading={isLoading} 
    />
  );
}
