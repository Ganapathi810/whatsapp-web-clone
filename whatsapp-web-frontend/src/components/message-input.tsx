import { CustomInput } from "./custom-input";
import { GoPlus } from "react-icons/go";
import { RiEmojiStickerLine } from "react-icons/ri";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";

interface MessageInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend : () => void
}

export const MessageInput = ({
  input,
  setInput,
  handleSend
}: MessageInputProps) => {


  const leftIcons = [
    {
      id: 1,
      icon: <GoPlus className="text-white text-xl" />,
    },
    {
      id: 2,
      icon: <RiEmojiStickerLine className="text-white text-xl" />,
    },
  ];

  const rightIcons = input.trim()
    ? [
        {
          id: 1,
          icon: <IoSendSharp className="text-xl text-gray-800" />
        },
      ]
    : [
        {
          id: 1,
          icon: <MdOutlineKeyboardVoice className="text-white text-xl" />,
        },
      ];

  return (
    <div className="mb-3">
      <CustomInput
        input={input}
        setInput={setInput}
        variant="message"
        placeholder="Type a message"
        leftIcons={leftIcons}
        rightIcons={rightIcons}
        onSend={handleSend}
      />
    </div>
  );
};
