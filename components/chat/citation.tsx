"use client";

import { Citation } from "@/types";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { EMPTY_CITATION_MESSAGE } from "@/configuration/ui";

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
            className="p-2 rounded-md shadow-md border border-gray-100 max-w-xs dark:bg-blue-600 dark:text-white bg-white"
            side="top"
            align="center"
            onPointerDownOutside={() => setOpen(false)} // Closes on outside click
          >
            <p className="text-sm text-gray-900">
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
