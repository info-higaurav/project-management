import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface ExpireProps {
  message?: string;
  countdownFrom?: number;
  redirectUrl?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  type?: 'failure' | 'success';
}

export default function Expire({
  message = "An error occurred",
  countdownFrom = 5,
  redirectUrl = "",
  title = "",
  subtitle = "",
  icon = "⚠️",
  type = 'success'
}: ExpireProps) {
  const [countdown, setCountdown] = useState(countdownFrom);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          if(redirectUrl){
            navigate(redirectUrl)
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const gradientClasses = type === 'failure' 
    ? 'from-red-500 to-red-800'
    : 'from-gray-700 to-gray-900';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-11/12 max-w-lg p-8 mx-auto rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-red-500/20 rounded-full animate-pulse"></div>
            <div className="text-6xl mb-2 relative animate-bounce">{icon}</div>
          </div>
          
          <h1 className={`text-3xl font-bold bg-gradient-to-r ${gradientClasses} bg-clip-text text-transparent`}>
            {message}
          </h1>
          
         

          {redirectUrl && (
            <>
             <div className="space-y-4">
             <p className="text-lg text-gray-300 leading-relaxed">
               {title}
               <span className="font-bold text-purple-400 inline-block min-w-[1.5rem]">
                 {countdown}
               </span>
               seconds.
             </p>
             
             <div className="text-sm text-gray-400">
               {subtitle}
             </div>
           </div>
            <div className="w-full bg-gray-700/50 h-2 rounded-full mt-8 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${gradientClasses} rounded-full transition-all duration-1000 ease-linear`}
              style={{ width: `${(countdown / countdownFrom) * 100}%` }}
            />
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}