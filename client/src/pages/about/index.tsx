export default function About() {
  return (
    <div className="bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Our Platform
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're on a mission to revolutionize project management and help teams work smarter
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="bg-[#1A1F2E]/50 backdrop-blur-lg p-6 rounded-xl border border-blue-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">Our Vision</h3>
              <p className="text-gray-400">
                To create the most intuitive and powerful project management platform that enables teams to achieve their full potential.
              </p>
            </div>

            <div className="bg-[#1A1F2E]/50 backdrop-blur-lg p-6 rounded-xl border border-purple-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
              <p className="text-gray-400">
                Empowering organizations with tools that transform how they plan, execute, and deliver projects.
              </p>
            </div>

            <div className="bg-[#1A1F2E]/50 backdrop-blur-lg p-6 rounded-xl border border-blue-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">Our Values</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• Innovation in everything we do</li>
                <li>• Customer success is our success</li>
                <li>• Continuous improvement</li>
                <li>• Transparency and trust</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"/>
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse"/>
            <div className="relative bg-[#1A1F2E]/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🚀</div>
                  <div>
                    <h4 className="text-white font-semibold">Launch Fast</h4>
                    <p className="text-gray-400">Quick setup, intuitive interface</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <h4 className="text-white font-semibold">Work Together</h4>
                    <p className="text-gray-400">Seamless team collaboration</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📈</div>
                  <div>
                    <h4 className="text-white font-semibold">Grow Better</h4>
                    <p className="text-gray-400">Scale with confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}