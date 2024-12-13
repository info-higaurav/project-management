export default function CallToAction() {
  return (
    <div className="bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Project Management?
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of teams who have already revolutionized their workflow with our powerful project management platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all group">
              <span className="flex items-center justify-center gap-2">
                Get Started Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all">
              Schedule Demo
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
