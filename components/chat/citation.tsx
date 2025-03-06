"use client";

import { Citation } from "@/types";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import Link from "next/link";
import { EMPTY_CITATION_MESSAGE } from "@/configuration/ui";

export function CitationCircle({
  number,
  citation,
}: {
  number: number;
  citation: Citation;
}) {
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="bg-gray-50 rounded-full px-2 py-0.5 hover:cursor-pointer hover:scale-105 inline-block text-sm font-medium text-gray-900"
          >
            {number} 
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-white p-2 rounded-md shadow-md border border-gray-200 max-w-xs">
          <p className="text-sm text-gray-700">
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
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
