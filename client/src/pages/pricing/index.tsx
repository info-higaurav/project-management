export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      features: [
        "Up to 3 projects",
        "Basic task management",
        "Team collaboration",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "2,499",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Custom workflows", 
        "Priority support",
        "Team roles & permissions",
        "Advanced security"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "7,999",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security",
        "SLA guarantees",
        "24/7 phone support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your team's needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#1A1F2E]/50 backdrop-blur-lg p-8 rounded-xl border ${
                plan.popular 
                  ? "border-blue-500 shadow-lg shadow-blue-500/20" 
                  : "border-blue-500/10"
              } hover:border-blue-500/30 transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>
                <div className="flex items-center justify-center">
                  <span className="text-gray-400">₹</span>
                  <span className="text-4xl font-bold text-white mx-1">{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-lg font-semibold transition-all ${
                plan.popular
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-gray-500 mt-2">
            *All prices are in Indian Rupees (INR)
          </p>
        </div>
      </div>
    </div>
  );
}