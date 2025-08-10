import { cn } from "@/lib/utils"

interface IconWrapperProps {
    children : React.ReactNode, 
    className ?: string, 
    onClick ?: (...props : any[]) => void   
}

export const IconWrapper = ({ children, className, onClick } : IconWrapperProps) => {
    return (
        <button className={cn(
            "rounded-full hover:bg-gray-400/20 transition-colors duration-300  p-2.5 cursor-pointer",
            className
            )} 
            onClick={onClick}
        >
            {children}
        </button>
    )
}