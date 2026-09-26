"use client";

import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button type="button" className="admin-btn admin-btn--sm" onClick={copy}>
      {copied ? "Kopiert" : "Kopieren"}
    </button>
  );
}
