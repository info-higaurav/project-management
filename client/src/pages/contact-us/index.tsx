export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-12 md:py-20 overflow-auto">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Have questions or feedback? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1A1F2E]/50 backdrop-blur-lg p-6 md:p-10 rounded-2xl border border-blue-500/10 shadow-xl">
            <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-7">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-[15px] font-medium mb-2">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-3.5 bg-[#0A0F1C] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-[15px] transition-all placeholder:text-gray-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-[15px] font-medium mb-2">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3.5 bg-[#0A0F1C] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-[15px] transition-all placeholder:text-gray-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-300 text-[15px] font-medium mb-2">Subject *</label>
                <select 
                  id="subject"
                  required
                  className="w-full px-4 py-3.5 bg-[#0A0F1C] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-[15px] transition-all"
                >
                  <option value="" className="text-gray-500">Please select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="pricing">Pricing Questions</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 text-[15px] font-medium mb-2">Message *</label>
                <textarea
                  id="message"
                  required
                  className="w-full px-4 py-3.5 bg-[#0A0F1C] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-[15px] h-36 resize-none transition-all placeholder:text-gray-500"
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1A1F2E] text-[15px]"
              >
                Send Message
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-gray-700/50 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group flex flex-col items-center md:items-start space-y-3 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium text-[15px]">Email</span>
                </div>
                <a href="mailto:ai.higaurav@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors text-[15px]">ai.higaurav@gmail.com</a>
              </div>
              
              <div className="group flex flex-col items-center md:items-start space-y-3 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium text-[15px]">Phone</span>
                </div>
                <a href="tel:+917217396015" className="text-blue-400 hover:text-blue-300 transition-colors text-[15px]">+91 7217396015</a>
              </div>

              <div className="group flex flex-col items-center md:items-start space-y-3 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium text-[15px]">Hours</span>
                </div>
                <p className="text-gray-400 text-[15px]">Mon-Fri 10AM-6PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
