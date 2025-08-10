import { formatDateLabel } from "@/utils/formatDatelabel";
import { DateOrDay } from "./date-or-day";
import { MessageBubble } from "./message-bubble";

export interface Message {
  senderWaId: string;
  text?: string;
  type: "text" | "image" | "audio" | "video" | "document";
  timestamp: string; 
}

interface MessageAreaProps {
  messages: Message[];
  loading: boolean;
}

export const MessageArea = ({
  messages,
  loading,
}: MessageAreaProps) => {

  if (loading) {
    return (
      <div className="h-[82vh] flex items-center justify-center text-gray-500">
        Loading messages...
      </div>
    );
  }

  const groupedMessages: Record<string, Message[]> = {};
  messages.forEach((msg) => {
    const label = formatDateLabel(msg.timestamp);
    if (!groupedMessages[label]) groupedMessages[label] = [];
    groupedMessages[label].push(msg);
  });

  return (
    <div className="h-[82vh] overflow-y-scroll px-3 sm:px-10 md:px-16 pt-10 flex flex-col gap-1">
      {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
        <div key={dateLabel} className="flex flex-col gap-1">
          <DateOrDay dateOrDay={dateLabel} />
          {msgs.map((msg, i) => {
            const prevMsg = i > 0 ? msgs[i - 1] : null;
            const isFirstMessageInConversation =
              !prevMsg || prevMsg.senderWaId !== msg.senderWaId;

            return (
              <MessageBubble
                key={i}
                align={msg.senderWaId === "918329446654" ? "right" : "left"} 
                isFirstMessageInConversation={isFirstMessageInConversation}
                timestamp={msg.timestamp}
              >
                {msg.type === "text" ? msg.text : `[${msg.type}]`}
              </MessageBubble>
            );
          })}
        </div>
      ))}

      {/* {isMessageSent && (
        <MessageBubble align="right" isFirstMessageInConversation>
          {input}
        </MessageBubble>
      )} */}
    </div>
  );
};
