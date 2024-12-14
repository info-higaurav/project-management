export default function Cards (){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Project Stats Card */}
        <div className="bg-black/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Active Projects</h3>
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-white">12</p>
          <p className="text-sm text-white/70">4 projects due this week</p>
        </div>

        {/* Team Performance Card */}
        <div className="bg-black/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font -semibold text-white">Team Performance</h3>
            <span className="text-3xl">📈</span>
          </div>
          <p className="text-3xl font-bold text-white">87%</p>
          <p className="text-sm text-white/70">Tasks completed on time</p>
        </div>

        {/* Upcoming Deadlines Card */}
        <div className="bg-black/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
            <span className="text-3xl">⏰</span>
          </div>
          <p className="text-3xl font-bold text-white">5</p>
          <p className="text-sm text-white/70">Deadlines within 7 days</p>
        </div>
      </div>
    )
}