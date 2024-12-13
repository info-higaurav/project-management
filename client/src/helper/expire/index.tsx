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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-purple-500 to-blue-500">
      <div className="max-w-md w-full mx-4 p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold">{message}</h1>
          <p className="text-lg text-white/80">
            Your authentication token has expired. For security reasons, you will be redirected to the login page in {countdown} seconds.
          </p>
          <div className="text-sm text-white/60 mt-4">
            Please log in again to continue using the application.
          </div>
        </div>
      </div>
    </div>
  );
}