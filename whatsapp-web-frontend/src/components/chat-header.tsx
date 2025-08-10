import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import userAvatar  from '@/assets/avatar.png'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { IconWrapper } from "./icon-wrapper";
import type { ChatListItem } from "@/types/chatListItem";


type ChatHeaderProps = {
    activeChat: ChatListItem | null
}

export const ChatHeader = ({ activeChat }: ChatHeaderProps) => {

    return (
        <div className="flex h-16 bg-[var(--my-dark-color)] justify-between items-center px-5">
            <div className="flex gap-3 items-center">
                <Avatar className="size-11">
                    <AvatarImage src={userAvatar}/>
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center">
                    <span className="text-white font-semibold text-md">{activeChat?.contactName}</span>
                    <span className="text-[14px] text-gray-400">{activeChat?.contactWaId}</span>
                </div>
            </div>
            <div className="flex gap-4">
                <IconWrapper>
                    <IoIosSearch className="text-white text-xl"/>
                </IconWrapper>
                <IconWrapper>
                    <HiOutlineDotsVertical className="text-white text-xl"/>
                </IconWrapper>
            </div>
        </div>
    )
}