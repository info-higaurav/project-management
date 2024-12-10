export const Loader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                    
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-[loading_2s_ease-in-out_infinite]" 
                        style={{width: '100%'}} 
                    />
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-3 h-3 rounded-full bg-white animate-bounce" />
                </div>
                <p className="mt-4 text-white font-medium text-lg tracking-wider">Loading...</p>
            </div>
        </div>
    )
}