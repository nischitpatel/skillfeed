import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none text-gray-800">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
