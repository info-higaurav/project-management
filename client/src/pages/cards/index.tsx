export default function Cards() {
  // Sample data for charts
  const monthlyData = [65, 59, 80, 81, 56, 55, 40, 70, 75, 68, 72, 78];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-6">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-indigo-300">Active Projects</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400">↑ 14%</span>
            <span className="text-indigo-300 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-emerald-300">Team Members</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400">↑ 6%</span>
            <span className="text-emerald-300 ml-2">new members</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 p-4 rounded-xl border border-rose-500/20 hover:border-rose-500/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/20 rounded-lg">
              <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-rose-300">Due Tasks</p>
              <p className="text-2xl font-bold text-white">5</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-rose-400">Due in 7 days</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-4 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-amber-300">Progress</p>
              <p className="text-2xl font-bold text-white">87%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400">↑ 12%</span>
            <span className="text-amber-300 ml-2">completion rate</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Timeline Chart */}
        <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">Project Timeline</h3>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between">
              {monthlyData.map((value, index) => (
                <div key={index} className="w-[7%] relative group">
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-sm transition-all duration-300 group-hover:from-indigo-400 group-hover:to-purple-400"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs py-1 px-2 rounded transition-opacity">
                    {value}%
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 pt-4 border-t border-gray-700">
              {months.map(month => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Task Distribution Pie Chart */}
        <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">Task Distribution</h3>
          <div className="flex items-center justify-center space-x-8">
            <div className="w-32 h-32 rounded-full border-8 border-indigo-500 relative">
              <div className="absolute inset-0 border-8 border-purple-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}></div>
              <div className="absolute inset-0 border-8 border-emerald-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 0 100%, 0 50%)' }}></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-white text-sm">In Progress (35%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-white text-sm">Completed (40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-white text-sm">Pending (25%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Team Performance</h3>
          <div className="space-y-4">
            {[
              { name: 'Frontend Team', progress: 92 },
              { name: 'Backend Team', progress: 87 },
              { name: 'Design Team', progress: 78 }
            ].map((team) => (
              <div key={team.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">{team.name}</span>
                  <span className="text-indigo-400">{team.progress}%</span>
                </div>
                <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{width: `${team.progress}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Activity Feed</h3>
          <div className="space-y-4">
            {[
              { text: 'New feature deployed to production', time: '2h ago', type: 'deploy' },
              { text: 'Team meeting completed', time: '4h ago', type: 'meeting' },
              { text: 'Project milestone achieved', time: '6h ago', type: 'milestone' },
              { text: 'New team member onboarded', time: '12h ago', type: 'team' }
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.text}</p>
                  <p className="text-indigo-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}