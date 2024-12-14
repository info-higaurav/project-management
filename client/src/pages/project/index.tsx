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
            const response = await axios.get(`${endpoint}/api/v1/admin/get-projects`, {
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

    return (
        <div className="min-h-screen bg-gradient-to-br bg-black/10 backdrop-blur-xl p-6 rounded-2xl border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    {userRole === "admin" && <CreateProject />}
                </div>

                <div className="flex flex-col gap-6">
                    {data.map(project => (
                        <div 
                            key={project._id}
                            className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 w-full hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-white">{project.projectName}</h3>
                                        <span className="px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r from-blue-500/30 to-blue-600/30">
                                            Active
                                        </span>
                                    </div>
                                    
                                    <p className="text-white/70 text-sm mb-4">
                                        {project.projectDescription.length > 150 
                                            ? `${project.projectDescription.substring(0, 150)}...` 
                                            : project.projectDescription}
                                        {project.projectDescription.length > 150 && (
                                            <button className="text-purple-400 hover:text-purple-300 ml-2">
                                                Read more
                                            </button>
                                        )}
                                    </p>

                                    <div className="flex items-center gap-2 text-white/70 text-sm">
                                        <span>Manager:</span>
                                        <span className="text-purple-400">
                                            {project.projectManagerId.firstName} {project.projectManagerId.lastName}
                                        </span>
                                    </div>
                                </div>

                                <div className="md:w-[300px] space-y-3">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-white/50">Start Date</p>
                                            <p className="text-white">{new Date(project.projectStartDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/50">End Date</p>
                                            <p className="text-white">{new Date(project.projectEndDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-xs text-white/40">
                                        Created on {new Date(project.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}