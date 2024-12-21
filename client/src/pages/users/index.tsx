import Expire from "@/helper/expire";
import { Loader } from "@/helper/loader";
import axios from "axios";
import { useEffect } from "react";

import { useState } from "react"

export default function Users() {
    const [data , setData] = useState<any>([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState("")

  useEffect(()=>{
    (async()=>{
      try {
        setLoading(true)
        const accessToken = localStorage.getItem("accessToken") || "";
        const endpoint = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${endpoint}/api/v1/admin/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        })
        setData(response.data.data)
      } catch (error:any) {
        setError(error.response.data.message)
      }finally{
        setLoading(false)
      }
      
    })()
  },[])

  if(loading){
    return <div className="flex justify-center items-center relative h-full">
        <Loader/>
    </div>
  }
  if(error){
    return <Expire message={error}/>
  }
  if(data.length === 0){
    return <div className="flex justify-center items-center relative h-full">
        <p className="text-white text-2xl font-bold">No users found</p>
    </div>
  }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-xl">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <h1 className="text-3xl font-bold text-white">Team Members</h1>
                    <span className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-300 rounded-full">
                        {data?.length} members
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.map((user:any) => (
                        <div key={user.id} className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-16 h-16 rounded-full ring-2 ring-indigo-500/30 overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
                                    {user.profilePicture ? (
                                        <img 
                                            src={user.profilePicture}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                const nextElement = target.parentElement?.querySelector('span');
                                                if (nextElement instanceof HTMLElement) {
                                                    target.style.display = 'none';
                                                    nextElement.style.display = 'block';
                                                }
                                            }}
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-white">
                                            {user.firstName[0]}{user.lastName[0]}
                                        </span>
                                    )}
                                    <span className="text-2xl font-bold text-white" style={{display: 'none'}}>
                                        {user.firstName[0]}{user.lastName[0]}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {user.firstName} {user.lastName}
                                    </h3>
                                    <p className="text-indigo-300 capitalize">{user.userRole.replace('_', ' ')}</p>
                                </div>
                            </div>

                            <div className="space-y-3 border-t border-gray-700/50 pt-4">
                                <div>
                                    <label className="text-gray-400 text-sm">Email</label>
                                    <p className="text-white">{user.emailAddress}</p>
                                </div>
                                
                                <div>
                                    <label className="text-gray-400 text-sm">Status</label>
                                    <p className="text-white flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${
                                            user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                                        }`}></span>
                                        {user.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
