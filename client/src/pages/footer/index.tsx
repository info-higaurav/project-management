export default function Footer() {
  return (
    <footer className="bg-[#0A0F1C] text-gray-400 py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ProjectFlow
              </span>
            </h3>
            <p className="text-sm leading-relaxed">
              Empowering teams with smart project management solutions for better collaboration and productivity.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
              <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">GitHub</span>
                📂
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-lg font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Integrations</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Updates</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Tutorials</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">About</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-sm">
            © 2024 
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mx-1">
              ProjectFlow
            </span>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
