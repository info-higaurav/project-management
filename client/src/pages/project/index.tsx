import { useEffect, useState } from "react";
import CreateProject from "../create-project";
import axios from "axios";
import { Loader } from "@/helper/loader";
import Expire from "@/helper/expire";

interface IProject {
    _id: string;
    projectName: string;
    projectStartDate: string;
    projectEndDate: string;
    projectDescription: string;
    projectManagerId: {
        _id: string;
        firstName: string;
        lastName: string;
        emailAddress: string;
        isEmailVerified: boolean;
        userRole: string;
        phoneNumber: string;
        dateOfBirth: string;
        address: {
            street: string;
            city: string;
            state: string;
            pinCode: string;
            country: string;
            _id: string;
        };
        profilePicture: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    projectOrgnizationId: {
        _id: string;
        organizationName: string;
        organizationDescription: string;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function Project({userRole}:{userRole:string}) {
    const [data, setData] = useState<IProject[]>([])
    const [err, setErr]=useState('')
    const [loading , setLoading]=useState(false)

    useEffect(()=>{
        (async()=>{
          try {
            setLoading(true)
            const accessToken = localStorage.getItem("accessToken") || "";
            const endpoint = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${endpoint}/api/v1/managment/projects`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              withCredentials: true
            })
            setData(response.data.data)
          } catch (error:any) {
            setErr(error.response.data.message)
          }finally{
            setLoading(false)
          }
          
        })()
      },[])
    
      if(loading){
        return <Loader/>
      }
      if(err){
        return <Expire message={err}/>
      }
console.log(data)
    return (
        <div className="min-h-screen bg-gradient-to-br bg-black/10 backdrop-blur-xl p-6 rounded-2xl border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    {userRole === "admin" && <CreateProject />}
                </div>

                <div className="flex flex-col gap-6">
                    {data.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-white/70">No projects found</p>
                        </div>
                    ) : (
                        data.map(project => (
                            <div 
                                key={project._id}
                                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 w-full hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row justify-between gap-8">
                                    {/* Left Side - Project Details */}
                                    <div className="flex-1 space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-semibold text-white tracking-tight">{project.projectName}</h3>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <span className="text-sm text-purple-400">
                                                    {project.projectOrgnizationId?.organizationName || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-black/20 rounded-xl p-4">
                                            <p className="text-white/80 text-sm leading-relaxed">
                                                {project.projectDescription.length > 200 
                                                    ? `${project.projectDescription.substring(0, 200)}...` 
                                                    : project.projectDescription}
                                                {project.projectDescription.length > 200 && (
                                                    <button className="text-purple-400 hover:text-purple-300 ml-2 font-medium">
                                                        Read more
                                                    </button>
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-6">
                                            <div className="space-y-1">
                                                <p className="text-white/40 text-xs uppercase tracking-wider">Start Date</p>
                                                <p className="text-white flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(project.projectStartDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-white/40 text-xs uppercase tracking-wider">End Date</p>
                                                <p className="text-white flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(project.projectEndDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                                                <span className="text-sm font-medium text-white">
                                                    {project.projectManagerId.firstName[0]}{project.projectManagerId.lastName[0]}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">
                                                    {project.projectManagerId.firstName} {project.projectManagerId.lastName}
                                                </p>
                                                <p className="text-white/60 text-sm flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {project.projectManagerId.emailAddress}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side - Status and Actions */}
                                    <div className="lg:w-[280px] flex flex-col justify-between gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
                                        <div className="space-y-6">
                                            <div className="flex flex-col items-start gap-4">
                                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                                                    new Date(project.projectEndDate) > new Date() 
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                    {new Date(project.projectEndDate) > new Date() ? '● Active' : '○ Completed'}
                                                </span>
                                                
                                                {userRole === "admin" && (
                                                    <div className="flex gap-2">
                                                        <button 
                                                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white flex items-center gap-2 text-sm"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        <button 
                                                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors text-white/80 hover:text-red-400 flex items-center gap-2 text-sm"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-white/60 text-sm">Progress</p>
                                                    <p className="text-white/80 text-sm font-medium">
                                                        {(() => {
                                                            const start = new Date(project.projectStartDate).getTime();
                                                            const end = new Date(project.projectEndDate).getTime();
                                                            const now = new Date().getTime();
                                                            const progress = ((now - start) / (end - start)) * 100;
                                                            return `${Math.min(Math.max(Math.round(progress), 0), 100)}%`;
                                                        })()}
                                                    </p>
                                                </div>
                                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                    {(() => {
                                                        const start = new Date(project.projectStartDate).getTime();
                                                        const end = new Date(project.projectEndDate).getTime();
                                                        const now = new Date().getTime();
                                                        const progress = ((now - start) / (end - start)) * 100;
                                                        return (
                                                            <div 
                                                                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                                                                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                                                            />
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-xs text-white/40">
                                            <div>
                                                <p>Created</p>
                                                <p className="mt-1">{new Date(project.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</p>
                                            </div>
                                            <div className="text-right">
                                                <p>Updated</p>
                                                <p className="mt-1">{new Date(project.updatedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}