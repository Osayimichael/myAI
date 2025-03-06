"use client";

import { useState } from "react";
import { Citation } from "@/types";
import { Tooltip } from "react-tippy";
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
    <Tooltip
      title=""
      open={open}
      onRequestClose={() => setOpen(false)}
      position="bottom"
      trigger="mouseenter click"
      interactive
      html={
        <div className="bg-white p-2 rounded-md shadow-sm flex flex-col justify-center border border-gray-200">
          <p>
            {hasSourceUrl ? (
              <Link
                href={citation.source_url}
                target="_blank"
                className="text-blue-500 hover:underline text-sm"
              >
                {citation.source_description || citation.source_url}
              </Link>
            ) : (
              citation.source_description || EMPTY_CITATION_MESSAGE
            )}
          </p>
        </div>
      }
    >
      <sup
        onClick={() => setOpen(!open)}
        className="ml-1 text-xs text-gray-500 cursor-pointer"
      >
        [{number}]
      </sup>
    </Tooltip>
  );
}
