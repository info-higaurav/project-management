import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Main() {
  const [currentStep, setCurrentStep] = useState(0);
  const workflowSteps = [
    {
      title: "Project Dashboard",
      animation: (
        <motion.div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-xl border border-blue-500/20">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div 
              className="bg-blue-500/10 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-400">24</div>
              <div className="text-sm text-gray-400">Active Tasks</div>
            </motion.div>
            <motion.div 
              className="bg-purple-500/10 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-purple-400">89%</div>
              <div className="text-sm text-gray-400">Completion</div>
            </motion.div>
            <motion.div 
              className="bg-green-500/10 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-green-400">12</div>
              <div className="text-sm text-gray-400">Team Members</div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div 
              className="bg-white/5 p-4 rounded-lg"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-white">Website Redesign</span>
                </div>
                <span className="text-sm text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">In Progress</span>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/5 p-4 rounded-lg"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-white">Mobile App Development</span>
                </div>
                <span className="text-sm text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/5 p-4 rounded-lg"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Marketing Campaign</span>
                </div>
                <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full">Completed</span>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )
    },
    {
      title: "Team Collaboration",
      animation: (
        <motion.div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-[#151923] flex items-center justify-center"
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                >
                  <span className="text-white font-medium">T{i}</span>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="ml-4 px-4 py-2 bg-purple-500/10 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-purple-400 text-sm">+3 others online</span>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div 
              className="flex items-start gap-4 p-4 bg-white/5 rounded-lg"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-medium">JD</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">John Doe</span>
                  <span className="text-sm text-gray-400">2m ago</span>
                </div>
                <p className="text-gray-300">Updated the design system components</p>
                <div className="mt-2 flex gap-2">
                  <span className="px-2 py-1 bg-blue-500/10 rounded text-xs text-blue-400">Design</span>
                  <span className="px-2 py-1 bg-purple-500/10 rounded text-xs text-purple-400">UI</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 p-4 bg-white/5 rounded-lg"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-medium">AS</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">Alice Smith</span>
                  <span className="text-sm text-gray-400">5m ago</span>
                </div>
                <p className="text-gray-300">Completed the user authentication flow</p>
                <div className="mt-2 flex gap-2">
                  <span className="px-2 py-1 bg-green-500/10 rounded text-xs text-green-400">Development</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )
    },
    {
      title: "Analytics & Insights",
      animation: (
        <motion.div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 p-8 rounded-xl border border-green-500/20">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <motion.div 
              className="bg-white/5 p-4 rounded-lg"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Task Completion</span>
                <span className="text-2xl font-bold text-green-400">87%</span>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "87%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/5 p-4 rounded-lg"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Team Velocity</span>
                <span className="text-2xl font-bold text-blue-400">92%</span>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="bg-white/5 p-4 rounded-lg"
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <h4 className="text-white mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {[
                { label: "Tasks Created", value: 24, color: "bg-blue-500" },
                { label: "Tasks Completed", value: 18, color: "bg-green-500" },
                { label: "In Progress", value: 6, color: "bg-yellow-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-gray-400">{item.label}</div>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${item.color}`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${(item.value / 24) * 100}%` }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                  <div className="w-8 text-right text-sm text-gray-400">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % workflowSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0F1C] to-[#151923]">
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full filter blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Streamline Your
                <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Project Workflow
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Real-time collaboration, powerful analytics, and intuitive task management - everything you need to deliver successful projects.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <NavLink to="/signup">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                    Start Free Trial
                  </button>
                </NavLink>
                
                <NavLink to="/">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Watch Demo
                  </button>
                </NavLink>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 relative">
                
                <div className="text-center mb-8">
                  <motion.h3 
                    className="text-2xl font-semibold text-white mb-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {workflowSteps[currentStep].title}
                  </motion.h3>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {workflowSteps[currentStep].animation}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-center mt-8 gap-2">
                  {workflowSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 rounded-full bg-white/20"
                      animate={{
                        scale: currentStep === index ? [1, 1.2, 1] : 1,
                        backgroundColor: currentStep === index ? "rgb(59, 130, 246)" : "rgba(255, 255, 255, 0.2)"
                      }}
                      transition={{ duration: 1, repeat: currentStep === index ? Infinity : 0 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}