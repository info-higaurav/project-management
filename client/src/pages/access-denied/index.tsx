export const AccessDenied = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-8">
            <div className="bg-black/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 max-w-lg w-full">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">🚫</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-white/70 mb-6">
                        Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
                    </p>
                    <div className="text-sm text-white/50">
                        Error Code: 403 - Forbidden
                    </div>
                </div>
            </div>
        </div>
    )
}