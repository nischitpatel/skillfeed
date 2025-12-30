type Props = {
    role: "user" | "assistant";
    content: string;
  };
  
  export default function ChatMessage({ role, content }: Props) {
    const isUser = role === "user";
  
    return (
      <div
        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[80%] rounded-lg px-4 py-2 text-sm leading-relaxed
            ${
              isUser
                ? "bg-[rgb(var(--primary))] text-white"
                : "bg-gray-100 text-gray-800"
            }
          `}
        >
          {content}
        </div>
      </div>
    );
  }
  