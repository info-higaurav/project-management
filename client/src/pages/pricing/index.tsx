import { motion } from "framer-motion";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      features: [
        "Up to 3 projects",
        "Basic task management",
        "Team collaboration",
        "Email support",
        "Basic reporting"
      ],
      limitations: [
        "Limited storage (1GB)",
        "No custom branding",
        "Basic integrations only"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "2,499",
      features: [
        "Unlimited projects",
        "Advanced analytics & insights", 
        "Custom workflows & automation",
        "Priority 24/7 support",
        "Team roles & permissions",
        "Enhanced security controls",
        "100GB storage",
        "API access"
      ],
      cta: "Start 14-Day Trial",
      popular: true,
      savings: "Save 20% yearly"
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Pro plus:",
        "Dedicated success manager",
        "Custom integrations",
        "Enterprise-grade security",
        "99.9% uptime SLA",
        "24/7 phone & email support",
        "Unlimited storage",
        "On-premise deployment option"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#151923] py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Simple,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your team. Start with a 14-day free trial - no credit card required.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col bg-[#1A1F2E]/50 backdrop-blur-lg p-8 rounded-2xl border ${
                plan.popular 
                  ? "border-blue-500 shadow-xl shadow-blue-500/20" 
                  : "border-blue-500/10"
              } hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-2`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  {plan.price !== "Custom" && <span className="text-gray-400 text-2xl">₹</span>}
                  <span className="text-5xl font-bold text-white mx-2">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
                </div>
                {plan.savings && (
                  <span className="text-green-400 text-sm font-medium">{plan.savings}</span>
                )}
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <svg className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.limitations && plan.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-start text-gray-500">
                      <svg className="w-5 h-5 text-gray-600 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-400">
            Questions? Contact our sales team at{" "}
            <a href="mailto:sales@company.com" className="text-blue-400 hover:text-blue-300">
              sales@company.com
            </a>
          </p>
          <p className="text-gray-500 text-sm">
            *All prices are in Indian Rupees (INR) and exclude GST
          </p>
        </motion.div>
      </div>
    </div>
  );
}