export default function ContactUs() {
  return (
    <div className="bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24 overflow-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about our project management platform? We're here to help!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1A1F2E]/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/10">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#0A0F1C] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#0A0F1C] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-[#0A0F1C] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Pricing Questions</option>
                  <option>Feature Request</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 bg-[#0A0F1C] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white h-32"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all">
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-700 grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-blue-400 text-2xl mb-2">📧</div>
                <p className="text-gray-400">ai.higaurav@gmail.com</p>
              </div>
              <div>
                <div className="text-blue-400 text-2xl mb-2">📞</div>
                <p className="text-gray-400">+91 7217396015</p>
              </div>
              <div>
                <div className="text-blue-400 text-2xl mb-2">🌎</div>
                <p className="text-gray-400">Mon-Fri 10AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
