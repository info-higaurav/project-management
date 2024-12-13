export default function HowItWork() {
  return (
    <div className="bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How Our Project Management{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A streamlined workflow designed to enhance team productivity and project success
          </p>
        </div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-[#1A1F2E]/50 backdrop-blur-lg p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-400 font-bold">01</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Project Initiation</h3>
              <p className="text-gray-400">Create your project, set goals, and invite team members to collaborate in real-time.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1A1F2E]/50 backdrop-blur-lg p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-400 font-bold">02</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Task Management</h3>
              <p className="text-gray-400">Break down projects into manageable tasks, assign responsibilities, and track progress.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1A1F2E]/50 backdrop-blur-lg p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-400 font-bold">03</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Monitor & Optimize</h3>
              <p className="text-gray-400">Analyze performance metrics, identify bottlenecks, and optimize workflow in real-time.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}