

const DashboardSkeleton = () => {
  return (
    <div className="w-full h-dvh p-4 space-y-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Search Bar Skeleton */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="h-10 bg-white/20 rounded-lg animate-pulse"></div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Projects Card Skeleton */}
        <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm shadow-lg border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-white/20 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-20 bg-white/20 rounded animate-pulse"></div>
          <div className="mt-2 h-4 w-40 bg-white/20 rounded animate-pulse"></div>
        </div>

        {/* Team Performance Card Skeleton */}
        <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm shadow-lg border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-white/20 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-20 bg-white/20 rounded animate-pulse"></div>
          <div className="mt-2 h-4 w-40 bg-white/20 rounded animate-pulse"></div>
        </div>

        {/* Upcoming Deadlines Card Skeleton */}
        <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm shadow-lg border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-white/20 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-20 bg-white/20 rounded animate-pulse"></div>
          <div className="mt-2 h-4 w-40 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Content Area Skeleton */}
      <div className="mt-8 space-y-4">
        <div className="h-12 bg-white/20 rounded animate-pulse shadow-sm"></div>
        <div className="h-12 bg-white/20 rounded animate-pulse shadow-sm"></div>
        <div className="h-12 bg-white/20 rounded animate-pulse shadow-sm"></div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
