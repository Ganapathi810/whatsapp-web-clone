export const DateOrDay = ({ dateOrDay } : { dateOrDay : string}) => {
    
    return (
        <div className="flex justify-center items-center">
            <span className="py-1 rounded-md bg-[var(--my-light-color)] text-white/50 text-sm font-semibold px-3">{dateOrDay}</span>  
        </div>
    )
}