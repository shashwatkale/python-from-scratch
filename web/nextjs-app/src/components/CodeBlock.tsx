"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "python" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-xs font-mono text-zinc-500">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-zinc-50 dark:bg-zinc-950 text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
