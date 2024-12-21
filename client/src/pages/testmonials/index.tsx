export default function Testmonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "The Project Flow",
      content: "This platform has revolutionized how we manage projects. The real-time collaboration features are game-changing.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen", 
      role: "Team Lead",
      company: "The Project Flow",
      content: "The analytics and insights have helped us identify bottlenecks and improve our workflow significantly.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Product Owner",
      company: "The Project Flow",
      content: "Intuitive interface, powerful features, and excellent support. This tool has everything we need.",
      avatar: "👩‍💻"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-[128px]" />
          <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-500 rounded-full filter blur-[128px]" />
        </div>

        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
              What Our Users{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Are Saying
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover how teams are transforming their workflow with our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-[#1A1F2E]/40 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full text-3xl group-hover:scale-110 transition-transform duration-300">
                  {testimonial.avatar}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed italic mb-8">"{testimonial.content}"</p>
                <div className="border-t border-gray-700/50 pt-6">
                  <p className="text-white font-semibold text-lg mb-1">{testimonial.name}</p>
                  <p className="text-gray-400 mb-1">{testimonial.role}</p>
                  <p className="text-blue-400 font-medium">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}