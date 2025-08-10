import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import userAvatar  from '@/assets/avatar.png'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { IconWrapper } from "./icon-wrapper";

export const ChatHeader = () => {

    return (
        <div className="flex h-16 bg-[var(--my-dark-color)] justify-between items-center px-5">
            <div className="flex gap-3 items-center">
                <Avatar className="size-11">
                    <AvatarImage src={userAvatar}/>
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center">
                    <span className="text-white font-semibold text-md">Murugan</span>
                    <span className="text-[14px] text-gray-400">Click here for contact info</span>
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