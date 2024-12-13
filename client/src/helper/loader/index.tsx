export const Loader = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-[loading_2s_ease-in-out_infinite]" 
                        style={{width: '100%'}} 
                    />
                </div>
                <div className="mt-2 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
                </div>
                <p className="mt-2 text-white font-medium text-sm tracking-wider">Loading...</p>
            </div>
        </div>
    )
}