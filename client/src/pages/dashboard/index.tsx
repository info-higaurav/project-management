import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Dashboard() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      message: "New team member joined Project X",
      time: "2 minutes ago"
    },
    {
      id: 2, 
      message: "Meeting scheduled for tomorrow",
      time: "1 hour ago"
    },
    {
      id: 3,
      message: "Project deadline updated",
      time: "3 hours ago"
    }
  ];

  const drawerTabs = [
    { name: "Home", icon: "🏠" },
    { name: "Team", icon: "👥" },
    { name: "Users", icon: "👤" },
    { name: "Projects", icon: "📁" },
    { name: "Tasks", icon: "✓" },
    { name: "Calendar", icon: "📅" },
    { name: "Reports", icon: "📊" },
    { name: "Documents", icon: "📄" },
    { name: "Messages", icon: "💬" },
    { name: "Analytics", icon: "📈" },
    { name: "Settings", icon: "⚙️" }
  ];

  const renderContent = () => {
    if (activeTab === "Home") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Project Stats Card */}
          <div className="bg-black/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Active Projects</h3>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-sm text-white/70">4 projects due this week</p>
          </div>

          {/* Team Performance Card */}
          <div className="bg-black/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Team Performance</h3>
              <span className="text-3xl">📈</span>
            </div>
            <p className="text-3xl font-bold text-white">87%</p>
            <p className="text-sm text-white/70">Tasks completed on time</p>
          </div>

          {/* Upcoming Deadlines Card */}
          <div className="bg-black/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
              <span className="text-3xl">⏰</span>
            </div>
            <p className="text-3xl font-bold text-white">5</p>
            <p className="text-sm text-white/70">Deadlines within 7 days</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 rounded-md w-12 p-2.5 border-none backdrop-blur-lg text-white border border-white/20"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Left Drawer - Mobile */}
      <div className={`
        fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition duration-200 ease-in-out z-30
        w-72 backdrop-blur-xl bg-black/20 md:relative flex flex-col
      `}>
        <div className="relative flex-shrink-0 flex flex-col items-center p-8 border-b border-white/10">
          {/* Close button for mobile - top right of profile section */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden absolute top-2 right-2 p-2 rounded-full bg-transparent text-white hover:bg-white/10"
          >
            ✕
          </button>
          
          <div className="w-28 h-28 rounded-full ring-4 ring-purple-500/30 shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">John Doe</h3>
          <p className="text-sm text-white/70">Senior Project Manager</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <ul className="p-6 space-y-3">
            {drawerTabs.map((tab) => (
              <li key={tab.name}>
                <button 
                  onClick={() => {
                    setActiveTab(tab.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.name 
                      ? "bg-white/20 text-white" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="mr-3 text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-[calc(100%-18rem)] overflow-hidden">
        {/* Top Bar */}
        <header className="bg-black/10 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 sm:px-8 py-4">
            <div className="w-full max-w-xl">
              <div className="relative">
                <Input 
                  type="search"
                  placeholder="Search anything..."
                  className="w-full pl-12 pr-4 py-2.5 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  🔍
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative w-10 h-10 rounded-full hover:bg-white/20 text-white transition-colors"
                >
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  🔔
                </Button>

                {isNotificationsOpen && (
                  <div className="absolute  right-0 mt-4 w-72 sm:w-96 bg-black/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 py-2 z-50">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className="px-4 py-3  hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        <p className="text-sm text-white">{notification.message}</p>
                        <p className="text-xs text-white/70 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button 
                variant="ghost"
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </main>
      </div>

      <style>
        {`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
          }
        `}
      </style>
    </div>
  );
}
