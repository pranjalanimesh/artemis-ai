"use client";
import React, { useMemo, useState } from "react";

export type DocumentPreviewProps = {
  fileUrl: string;
  initialPage?: number;
  className?: string;
};

export default function DocumentPreview({ fileUrl, initialPage = 1, className }: DocumentPreviewProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const isDrive = useMemo(() => /https?:\/\/(?:drive|docs)\.google\.com\/.*\/preview/i.test(fileUrl), [fileUrl]);

  const computedSrc = useMemo(() => {
    if (!fileUrl) return "";
    if (isDrive) return fileUrl; // Google Drive preview does not support page param
    return fileUrl.includes("#")
      ? fileUrl.replace(/#.*$/, `#page=${currentPage}`)
      : `${fileUrl}#page=${currentPage}`;
  }, [fileUrl, currentPage, isDrive]);

  const canPage = !isDrive;

  return (
    <div className={`flex flex-col h-full ${className ?? ""}`}>
      {/* Force remount so hash changes always apply */}
      <iframe
        key={computedSrc}
        src={computedSrc}
        className="w-full flex-1 -mt-6"
        allow="autoplay"
      />
    </div>
  );
}
