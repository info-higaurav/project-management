export default function Testmonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "Tech Solutions Inc.",
      content: "This platform has revolutionized how we manage projects. The real-time collaboration features are game-changing.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen", 
      role: "Team Lead",
      company: "Innovation Labs",
      content: "The analytics and insights have helped us identify bottlenecks and improve our workflow significantly.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Product Owner",
      company: "Digital Dynamics",
      content: "Intuitive interface, powerful features, and excellent support. This tool has everything we need.",
      avatar: "👩‍💻"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Users{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover how teams are transforming their workflow with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-[#1A1F2E]/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all hover:transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-gray-400 italic mb-6">"{testimonial.content}"</p>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
                <p className="text-sm text-blue-400">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}