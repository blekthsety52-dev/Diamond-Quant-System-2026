import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from './ui/Shared';
import { FileText, Code } from 'lucide-react';

interface FileViewerProps {
  title: string;
  content: string;
  language?: string;
  icon?: React.ElementType;
}

export function FileViewer({ title, content, language = 'markdown', icon: Icon = FileText }: FileViewerProps) {
  return (
    <Card className="h-full flex flex-col bg-gray-950/50">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/60 sticky top-0 z-10">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400 uppercase tracking-wider font-mono text-xs">{title}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-300">
        {language === 'markdown' ? (
          <div className="prose prose-invert prose-sm max-w-none prose-headings:font-mono prose-code:text-emerald-400 prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <pre className="font-mono text-xs leading-relaxed">
            <code className="language-solidity text-indigo-300">
              {content}
            </code>
          </pre>
        )}
      </div>
    </Card>
  );
}
