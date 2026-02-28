interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 text-xs text-neutral-400 uppercase">
        {language}
      </div>
      <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 overflow-x-auto text-sm font-mono text-neutral-800">
        <code>{code}</code>
      </pre>
    </div>
  );
}
