import { useEffect, useState } from "react";

export default function Expire({message}:{message:string}) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-11/12 max-w-lg p-8 mx-auto rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-red-500/20 rounded-full animate-pulse"></div>
            <div className="text-6xl mb-2 relative animate-bounce">⚠️</div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            {message}
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg text-gray-300 leading-relaxed">
              Your authentication token has expired. For security reasons, you will be redirected to the login page in{" "}
              <span className="font-bold text-purple-400 inline-block min-w-[1.5rem]">
                {countdown}
              </span>{" "}
              seconds.
            </p>
            
            <div className="text-sm text-gray-400">
              Please log in again to continue using the application.
            </div>
          </div>

          <div className="w-full bg-gray-700/50 h-2 rounded-full mt-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}