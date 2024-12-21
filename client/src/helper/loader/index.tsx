import { PropagateLoader } from 'react-spinners'

export const Loader = () => {
    return (
        <div className="w-full h-dvh flex justify-center items-center bg-gradient-to-br from-[#0A0F1C] to-[#151923] relative overflow-hidden">
            {/* Decorative gradient blurs */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-[128px]" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full filter blur-[128px]" />
            </div>

            <div className="relative z-10">
                <PropagateLoader
                    color="#60A5FA" 
                    cssOverride={{
                        backgroundColor: 'transparent'
                    }}
                />
            </div>
        </div>
    )
}