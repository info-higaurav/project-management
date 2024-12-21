export default function HowItWork() {
  return (
    <section className="bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-[128px]" />
          <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-500 rounded-full filter blur-[128px]" />
        </div>

        <div className="relative">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
              How Our Project Management{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Works
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              A streamlined workflow designed to enhance team productivity and deliver exceptional results
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="group bg-[#1A1F2E]/40 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                  <span className="text-blue-400 font-bold text-xl">01</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Project Initiation</h3>
                <p className="text-gray-300 leading-relaxed">Create your project workspace, define clear objectives, and bring your team together in one collaborative environment.</p>
              </div>

              {/* Step 2 */}
              <div className="group bg-[#1A1F2E]/40 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                  <span className="text-purple-400 font-bold text-xl">02</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Task Management</h3>
                <p className="text-gray-300 leading-relaxed">Organize work into manageable tasks, assign team members, and track progress with intuitive visual tools.</p>
              </div>

              {/* Step 3 */}
              <div className="group bg-[#1A1F2E]/40 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                  <span className="text-blue-400 font-bold text-xl">03</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Monitor & Optimize</h3>
                <p className="text-gray-300 leading-relaxed">Get real-time insights into project performance, identify areas for improvement, and make data-driven decisions.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transform transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}