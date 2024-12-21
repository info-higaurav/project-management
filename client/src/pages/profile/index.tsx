export default function Profile({ data }: any) {
  const {
    firstName,
    lastName,
    emailAddress,
    userRole,
    status,
    isEmailVerified,
    dateOfBirth,
    address,
    profilePicture,
    createdAt
  } = data;

  return (
    <div className="p-6 space-y-8">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full ring-4 ring-indigo-500/30 overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {firstName?.[0]}{lastName?.[0]}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center md:text-left">
                {firstName} {lastName}
              </h1>
              <div className="mt-2 flex flex-wrap gap-3">
                <span className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-300 rounded-full capitalize">
                  {userRole}
                </span>
                <span className="px-3 py-1 text-sm bg-green-500/20 text-green-300 rounded-full">
                  {status || 'Active'}
                </span>
                {isEmailVerified && (
                  <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-700/50">
            <div className="space-y-2">
              <h3 className="text-gray-400 text-sm font-medium">Email Address</h3>
              <p className="text-white">{emailAddress}</p>
            </div>

            {dateOfBirth && (
              <div className="space-y-2">
                <h3 className="text-gray-400 text-sm font-medium">Date of Birth</h3>
                <p className="text-white">
                  {new Date(dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}

            {address && (
              <div className="space-y-2">
                <h3 className="text-gray-400 text-sm font-medium">Address</h3>
                <p className="text-white">
                  {[
                    address.street,
                    address.city,
                    address.state,
                    address.country,
                    address.pincode
                  ].filter(Boolean).join(', ')}
                </p>
              </div>
            )}

            {createdAt && (
              <div className="space-y-2">
                <h3 className="text-gray-400 text-sm font-medium">Member Since</h3>
                <p className="text-white">
                  {new Date(createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
