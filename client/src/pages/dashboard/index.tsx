
import axios from "axios";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { LogOut} from "lucide-react";

import Fade from "@/helper/motion/fade/fade";
import Expire from "@/helper/expire";

import Profile from "../profile";
import Users from "../users";
import { AccessDenied } from "../access-denied";
import Project from "../project";
import Task from "../task";
import ManageTask from "../manage-task";
import Cards from "../cards";
import ProfileCard from "../profile-card";
import DashboardSkeleton from "@/helper/skeleton/DashboardSkeleton";

import Organization from "../orgnization";

const loadDashboard = async() => {
  const endpoint = import.meta.env.VITE_API_URL;
  const response = await axios.get(`${endpoint}/api/v1/managment/profile`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  })
  return response.data.data
}

export default function Dashboard() {
    const {data=[], isLoading, isError , error} = useQuery({queryKey:["dashboard"], queryFn:loadDashboard})

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();



  if(isLoading){
    return <DashboardSkeleton/>
  }
  if(isError){
    return <Expire message={(error as any).response?.data.message} type="failure" redirectUrl="/signup" subtitle="Please sign up to continue"/>
  }

  const handleLogout = async() => {
    try {
      const endpoint = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${endpoint}/api/v1/users/logout`, {
        withCredentials: true
      })
      
      if(response.status === 200){
          navigate("/login")
      }
      
    } catch (error) {
      console.log(error)

    }
  }

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
    { name: "Profile", icon: "👤" },
    { name: "Team", icon: "👥" },
    { name: "Users", icon: "👤" },
    { name: "Projects", icon: "📁" },
    { name: "Tasks", icon: "✓" },
    { name: "Calendar", icon: "📅" },
    { name: "Reports", icon: "📊" },
    { name: "Documents", icon: "📄" },
    { name: "Messages", icon: "💬" },
    { name: "Analytics", icon: "📈" },
    { name: "Settings", icon: "⚙️" },
    { name: "Organizations", icon: "🏢" }
  ];

  const admin =["Home","Profile","Projects","Users","Organizations"]
  const manager =["Profile","Projects","Tasks"]
  const user =["Profile","Tasks"]


  const renderContent = () => {
    if (activeTab === "Home") {
      return (
      <Cards/>
      );
    } else if (activeTab === "Profile") {
      return <Profile data={data[0]} />;
    }else if(activeTab === "Users"){
      return data[0].userRole === "admin" ? <Users/> : <AccessDenied/>
    }else if (activeTab === "Projects"){
      const roles = ["admin","manager"]
      return roles.includes(data[0]?.userRole) ? <Project userRole={data[0]?.userRole}/> : <AccessDenied/>
    }else if(activeTab === "Tasks"){
      return data[0].userRole === "user" ? <Task/> : data[0].userRole === "manager" ? <ManageTask userRole={data[0]?.userRole}/> : <AccessDenied/>
    }else if(activeTab === "Organizations"){
      return data[0].userRole === "admin" ? <Organization/> : <AccessDenied/>
    }
    return null;
  };

  return (
    <Fade>
    <div    
    className="flex h-screen bg-gradient-to-br from-[#0A0F1C] to-[#151923] overflow-hidden">
      {/* Mobile Menu & Notification Container */}
      <div className="md:hidden fixed top-4 right-4 z-10 flex items-center space-x-2">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative w-10 h-10 rounded-full backdrop-blur-lg bg-white/5 text-white hover:bg-white/10"
          >
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
            🔔
          </Button>
        </div>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-md w-10 h-10 flex items-center justify-center backdrop-blur-lg bg-white/5 text-white hover:bg-white/10"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Left Drawer - Mobile */}
      <div className={`
        fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition duration-200 ease-in-out z-30
        w-72 backdrop-blur-xl bg-white/5 md:relative flex flex-col
      `}>
        <div className="relative flex-shrink-0 flex flex-col items-center p-8 border-b border-white/10">
          {/* Close button for mobile - top right of profile section */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden absolute top-2 right-2 p-2 rounded-full bg-transparent text-white hover:bg-white/10"
          >
            ✕
          </button>
          
          {data.length > 0 && (<ProfileCard data ={data[0]}/>)}
          
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <ul className="p-6 space-y-3">
            {
              data[0]?.userRole === "admin" && (
                drawerTabs.filter((tab) => admin.includes(tab.name))
                .map((tab) => {
                  return (
                    <li key={tab.name}>
                      <button 
                        onClick={() => {
                          setActiveTab(tab.name);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${
                          activeTab === tab.name 
                            ? "bg-blue-500/20 text-white" 
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="mr-3 text-xl">{tab.icon}</span>
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    </li>
                  )
                })
              )
            }

            {
              data[0]?.userRole === "manager" && (
                drawerTabs.filter((tab) => manager.includes(tab.name))
                .map((tab) => {
                  return (
                    <li key={tab.name}>
                      <button 
                        onClick={() => {
                          setActiveTab(tab.name);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${
                          activeTab === tab.name 
                            ? "bg-blue-500/20 text-white" 
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="mr-3 text-xl">{tab.icon}</span>
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    </li>
                  )
                })
              )
            }

            {
              data[0]?.userRole === "user" && (
                drawerTabs.filter((tab) => user.includes(tab.name))
                .map((tab) => {
                  return (
                    <li key={tab.name}>
                      <button 
                        onClick={() => {
                          setActiveTab(tab.name);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${
                          activeTab === tab.name 
                            ? "bg-blue-500/20 text-white" 
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="mr-3 text-xl">{tab.icon}</span>
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    </li>
                  )
                })
              )
            }

          </ul>
        </nav>

        {/* Logout Button in Drawer - Mobile Only */}
        <div className="md:hidden p-6 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={handleLogout}      
            className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl text-white hover:bg-white/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-[calc(100%-18rem)] overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white/5 backdrop-blur-xl rounded-b-2xl">
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 ">
            <div className="flex-1 max-w-[50%] md:max-w-xl">
              <div className="relative">
                <Input 
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8 pr-4 py-2 rounded-full border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 text-sm md:text-base"
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/50 text-sm">
                  🔍
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative w-10 h-10 rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  🔔
                </Button>
              </div>

              <Button 
                variant="ghost"
                onClick={handleLogout}
                className="flex justify-center items-center border border-white/10 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-all duration-300"
              >
                <LogOut className="w-5 h-5 mr-2"/>
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Notifications Dropdown - Positioned Relative to Screen */}
        {isNotificationsOpen && (
          <div className="fixed right-4 top-16 w-[calc(100%-2rem)] sm:w-96 bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 py-2 z-50 max-h-[80vh] overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors"
              >
                <p className="text-sm text-white">{notification.message}</p>
                <p className="text-xs text-white/70 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        )}

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
    </Fade>
  );
}
