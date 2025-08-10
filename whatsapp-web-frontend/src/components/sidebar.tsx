import { RiChatNewLine } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IconWrapper } from "./icon-wrapper";
import { CustomInput } from "./custom-input";
import { IoIosSearch } from "react-icons/io";
import userAvatar  from '@/assets/avatar.png'
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { GoSidebarCollapse } from "react-icons/go"
import { GoSidebarExpand } from "react-icons/go";
import type { ChatListItem } from "@/types/chatListItem";
import { fetchChatList } from "@/services/chatListService";
import { formatChatTimestamp } from "@/utils/formatChatTimestamp";

interface SidebarProps {
    userWaId : string,
    onSelectChat : React.Dispatch<React.SetStateAction<null | ChatListItem>>
}

export const Sidebar = ({ userWaId, onSelectChat } : SidebarProps) => {
    const [isOpen,setIsOpen] = useState(false)
    const [isLessThanSmallScreen,setIsLessThanSmallScreen] = useState(false)
    const filterLabels = ["All", "Unread", "Favourites", "Groups"]
    const [chatList, setChatList] = useState<ChatListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userWaId) return;

        (async () => {
        setLoading(true);
        const list = await fetchChatList(userWaId);
        
        setChatList(list);
        setLoading(false);
        })();
    }, [userWaId]);


    useEffect(() => {
        if(window.innerWidth < 768) {
            setIsOpen(false)
            setIsLessThanSmallScreen(true)
        } else {
            setIsOpen(true)
            setIsLessThanSmallScreen(false)
        }   
    },[])

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 768) {
                setIsOpen(false)
                setIsLessThanSmallScreen(true)
            } else {
                setIsOpen(true)
                setIsLessThanSmallScreen(false)
            }    
        }
        window.addEventListener('resize',handleResize)

        return () => {
            window.removeEventListener('resize',handleResize)
        }
    },[])

    const handleSidebarToggle = () => {
        setIsOpen((open) => !open)
         if(window.innerWidth < 768) {
                setIsLessThanSmallScreen(true)
            } else {
                setIsLessThanSmallScreen(false)
            } 
    }

    const leftIcons = [
        {
            id : 1,
            icon : <IoIosSearch className="text-white text-xl" />
        }
    ]
    
    return (
        <aside 
            className={`
                ${isOpen ? "w-[340px] md:w-[400px] lg:w-[490px]" : "w-[70px]"}
                ${isLessThanSmallScreen ? "absolute top-0 left-0 z-10" : "relative"} 
                border border-white/20 h-screen  bg-[var(--my-dark-color)] p-2 transition-all duration-300`
            }
        >
            <div className="flex justify-between items-center mt-1 px-2">
                {isOpen && <h1 className="text-white text-2xl font-semibold">WhatsApp</h1>}
                <div className="flex gap-3 items-center">
                    {isOpen ? (
                        <>
                            <IconWrapper>
                                <RiChatNewLine className="text-white text-xl"/>
                            </IconWrapper>
                            <IconWrapper>
                                <HiOutlineDotsVertical className="text-white text-xl" />
                            </IconWrapper>
                            {isLessThanSmallScreen && (
                                <IconWrapper onClick={() => setIsOpen((open) => !open)}>
                                    <GoSidebarExpand className="text-white text-xl" />
                                </IconWrapper>
                            )}
                        </>
                    ) : (
                        <IconWrapper onClick={handleSidebarToggle}>
                            <GoSidebarCollapse className="text-white text-xl"/>
                        </IconWrapper>
                    )}
                </div>
            </div>
            {isOpen && (
                <>
                    <CustomInput input='' setInput={() => {}} className="mt-4 mx-2" placeholder="Search or start a new chart" variant="search" leftIcons={leftIcons}/>
                    <div className="flex gap-2 mt-3 ml-3">
                        {filterLabels.map((label) => (
                            <button key={label} className="cursor-pointer px-3 py-0.5 flex items-center justify-center rounded-full ring-1 ring-white/30 text-white/70 hover:bg-white/20">{label}</button>
                        ))}
                    </div>
                    <div className="p-2 flex flex-col gap-2 h-[500px] border-b border-white/20 overflow-y-scroll">
                        {loading ? (
                            <p className="p-4 text-gray-500">Loading...</p>
                        ) : chatList.length === 0 ? (
                            <p className="p-4 text-gray-500">No chats yet</p>
                        ) : (
                            <>
                                {chatList.map(chat => (
                                    <button 
                                        key={chat.contactWaId}
                                        onClick={() => onSelectChat(chat)}
                                        className="flex gap-2 cursor-pointer hover:bg-slate-300/20 rounded-lg p-2">
                                        <Avatar className="size-13">
                                            <AvatarImage src={userAvatar} />
                                        </Avatar>
                                        <div className="flex flex-col gap-1 w-full">
                                            <div className="flex justify-between">
                                                <span className="text-md text-white">{chat.contactName || chat.contactWaId}</span>
                                                <span className="text-white/60 text-[13px]">{formatChatTimestamp(chat.lastMessageTimestamp)}</span>
                                            </div>
                                            <span className="text-white/70 text-sm line-clamp-1 text-start">{chat.lastMessage || '[No message]'}</span>
                                        </div>
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                </>
            )}
        </aside>
    )
}