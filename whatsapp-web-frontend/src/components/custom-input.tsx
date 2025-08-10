import { useState } from "react"
import { IconWrapper } from "./icon-wrapper"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"


type IconType = {
    id : number,
    icon : React.ReactNode
}

type CustomInputProps = {
    placeholder : string,
    variant : "search" | "message",
    leftIcons : IconType[],
    rightIcons ?: IconType[],
    className ?: string,
    input : string,
    setInput : React.Dispatch<React.SetStateAction<string>>,
    onSend?: () => void;
}


export const CustomInput = ({ placeholder, variant, leftIcons, rightIcons, className, input, setInput, onSend  } : CustomInputProps ) => {

    const onMessageSent = () => {
        if (onSend) {
            onSend();
        } else {
            setInput("");
        }
    }
    
    return (
        <div className={cn(
            "rounded-full flex items-center justify-between",
            variant === 'search' && "bg-white/10 hover:ring hover:ring-white/20 focus-within:bg-black focus-within:ring-2 focus-within:ring-green-500",
            variant === 'message' && "bg-[var(--my-light-color)] p-2 mx-3",
            className
        )}>
            <div className="flex gap-2 items-center">
                {leftIcons && leftIcons.map((Icon) => (
                    <IconWrapper key={Icon.id}>
                        {Icon.icon}
                    </IconWrapper>
                ))}
            </div>
            <Input placeholder={placeholder} value={input} onChange={(e) => setInput(e.target.value)}/>
            <IconWrapper  
                className={`${input.length > 0 ? "bg-green-500 hover:bg-green-600" : "hover:bg-green-500"}`}
                onClick={onMessageSent}
            >
                 {rightIcons && rightIcons.length > 0 && (
                    <>
                    {input.length === 0
                        ? rightIcons[0].icon
                        : rightIcons[rightIcons.length - 1]?.icon}
                    </>
                )}
            </IconWrapper>
        </div>
    )

}