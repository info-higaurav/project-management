import { NavLink } from "react-router-dom";
import HowItWork from "../how-it-work";
import Testmonials from "../testmonials";
import CallToAction from "../call-to-action";
import Pricing from "../pricing";
import About from "../about";
import ContactUs from "../contact-us";
import Footer from "../footer";

export default function Home() {
    return (
        <>
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-[#0A0F1C] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient-xy" />
                <div className="container mx-auto px-4 py-24 relative">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-block animate-bounce">
                                <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                                    Project Management Reimagined
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                                Transform Your{" "}
                                <div className="relative inline-block">
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                        Workflow
                                    </span>
                                    <div className="absolute -top-2 -right-4 animate-spin-slow">
                                        <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 4V2M12 22v-2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41M4 12H2M22 12h-2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"/>
                                </div>
                            </h1>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Streamline your projects with real-time tracking, team collaboration, and intelligent insights.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                            <NavLink to="/login">
                                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all group">
                                    <span className="flex items-center gap-2">
                                        Get Started
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                                </NavLink>
                                <button className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm group">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Watch Demo
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Animated Workflow Dashboard */}
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"/>
                            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse"/>
                            
                            <div className="relative bg-[#151923]/80 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
                                {/* Workflow Animation */}
                                <div className="absolute top-0 right-0 -mt-4 -mr-4">
                                    <div className="animate-spin-slow">
                                        <svg className="w-16 h-16 text-blue-400/20" viewBox="0 0 100 100">
                                            <defs>
                                                <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                                            </defs>
                                            <text fontSize="12">
                                                <textPath href="#circle">
                                                    WORKFLOW AUTOMATION • TASK MANAGEMENT •
                                                </textPath>
                                            </text>
                                        </svg>
                                    </div>
                                </div>

                                {/* Animated Connection Lines */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-flow-1" style={{top: '20%', left: '30%'}}/>
                                    <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-flow-2" style={{top: '60%', left: '70%'}}/>
                                    <div className="absolute w-1 h-1 bg-green-400 rounded-full animate-flow-3" style={{top: '40%', left: '50%'}}/>
                                </div>

                                {/* Project Stats with Hover Effects */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-blue-500/10 p-4 rounded-lg transform hover:scale-105 transition-all">
                                        <div className="text-2xl font-bold text-blue-400 animate-count-up">24</div>
                                        <div className="text-sm text-gray-400">Active Projects</div>
                                    </div>
                                    <div className="bg-purple-500/10 p-4 rounded-lg transform hover:scale-105 transition-all">
                                        <div className="text-2xl font-bold text-purple-400 animate-count-up">156</div>
                                        <div className="text-sm text-gray-400">Tasks Complete</div>
                                    </div>
                                    <div className="bg-green-500/10 p-4 rounded-lg transform hover:scale-105 transition-all">
                                        <div className="text-2xl font-bold text-green-400 animate-count-up">12</div>
                                        <div className="text-sm text-gray-400">Team Members</div>
                                    </div>
                                </div>

                                {/* Animated Workflow Steps */}
                                <div className="space-y-4">
                                    {[
                                        { name: "Planning Phase", progress: 100, status: "Completed" },
                                        { name: "Design Sprint", progress: 75, status: "In Progress" },
                                        { name: "Development", progress: 45, status: "Active" }
                                    ].map((step, index) => (
                                        <div key={index} 
                                            className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"/>
                                                    {step.name}
                                                </h3>
                                                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                                    {step.status}
                                                </span>
                                            </div>
                                            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div 
                                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress-fill"
                                                    style={{ width: `${step.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Live Activity Feed */}
                                <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
                                        <span>Live Activity Feed</span>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        {['Design review in progress...', 'New task assigned...', 'Sprint planning started...'].map((activity, i) => (
                                            <div key={i} className="text-gray-500 text-sm animate-fade-in" style={{animationDelay: `${i * 0.2}s`}}>
                                                {activity}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-gradient-to-b from-[#0A0F1C] to-[#151923] py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Smart Task Management", icon: "📋" },
                            { title: "Real-time Analytics", icon: "📊" },
                            { title: "Team Collaboration", icon: "👥" }
                        ].map((feature, index) => (
                            <div key={index} 
                                className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-6 rounded-xl hover:from-blue-500/10 hover:to-purple-500/10 transition-all cursor-pointer"
                            >
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
        <HowItWork/>
        <Testmonials/>
        <CallToAction/>
        <Pricing/>
        <About />
        <ContactUs/>
        <Footer/>

        </>

    );
}