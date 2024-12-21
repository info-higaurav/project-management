export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-20">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Our Platform
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Empowering teams to achieve more through intelligent project management
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-8">
            <div 
              className="group transform transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/30 bg-[#1A1F2E]/50 backdrop-blur-lg p-8 rounded-2xl border border-blue-500/10 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-400">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                Building the future of work through intuitive project management tools that unlock team potential and drive success.
              </p>
            </div>

            <div 
              className="group transform transition-all duration-300 hover:scale-[1.02] hover:border-purple-400/30 bg-[#1A1F2E]/50 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/10 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 group-hover:text-purple-400">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To simplify project management while delivering powerful tools that transform how teams collaborate, plan, and achieve goals.
              </p>
            </div>

            <div 
              className="group transform transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/30 bg-[#1A1F2E]/50 backdrop-blur-lg p-8 rounded-2xl border border-blue-500/10 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-400">Our Values</h2>
              <ul className="text-gray-300 space-y-4">
                <li className="flex items-center gap-3 group/item">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 group-hover/item:scale-125 transition-transform"></span>
                  <span className="group-hover/item:text-white transition-colors">Innovation at our core</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 group-hover/item:scale-125 transition-transform"></span>
                  <span className="group-hover/item:text-white transition-colors">Customer-centric approach</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 group-hover/item:scale-125 transition-transform"></span>
                  <span className="group-hover/item:text-white transition-colors">Continuous improvement</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 group-hover/item:scale-125 transition-transform"></span>
                  <span className="group-hover/item:text-white transition-colors">Trust and transparency</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse"/>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[100px] animate-pulse"/>
            <div 
              className="relative group transform transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/30 bg-[#1A1F2E]/50 backdrop-blur-lg p-10 rounded-2xl border border-blue-500/10 shadow-lg"
            >
              <div className="space-y-10">
                <div className="flex items-start gap-6 group/item transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl shadow-inner">🚀</div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-2 group-hover/item:text-blue-400">Launch Fast</h3>
                    <p className="text-gray-300 leading-relaxed">Get started in minutes with our intuitive setup process</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group/item transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl shadow-inner">🤝</div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-2 group-hover/item:text-purple-400">Collaborate Seamlessly</h3>
                    <p className="text-gray-300 leading-relaxed">Work together efficiently with real-time updates</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group/item transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl shadow-inner">📈</div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-2 group-hover/item:text-blue-400">Scale With Confidence</h3>
                    <p className="text-gray-300 leading-relaxed">Grow your projects without any limitations</p>
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