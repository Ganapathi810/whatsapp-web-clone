type MessageBubbleProps = {
  children: React.ReactNode;
  align: "left" | "right";
  isFirstMessageInConversation?: boolean;
  timestamp?: string;
};

export const MessageBubble = ({
  children,
  align,
  isFirstMessageInConversation,
  timestamp
}: MessageBubbleProps) => {

    const timeString = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
        <div
            className={`flex items-start ${
                align === "right" ? "justify-end" : "justify-start"
            }`}
        >
            {align === "left" && isFirstMessageInConversation && (
                <div
                className="w-0 h-0  border-r-[10px]  border-r-[var(--my-light-color)] border-b-[10px] border-b-transparent" />
            )}

            <div
                className={`px-3 py-1.5 rounded-lg max-w-xs flex flex-col items- ${
                align === "right"
                    ? `bg-[#114F2A] ${isFirstMessageInConversation ? "rounded-tr-none" : "mr-2"}  `
                    : `${isFirstMessageInConversation ? "rounded-tl-none" : "ml-2.5"} bg-[var(--my-light-color)] `
                }`}
            >
                <span className="text-white text-[15px]">{children}</span>
                <span className="text-white text-[11px]">{timeString}</span>
            </div>

            {align === "right" && isFirstMessageInConversation && (
                <div
                className="w-0 h-0  border-l-[10px]  border-l-[#114F2A] border-b-[10px] border-b-transparent" />
            )}
        </div>
  );
};
