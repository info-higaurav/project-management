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
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8">
            <div className="max-w-7xl mx-auto">
            <span className="text-orange-300 animate-pulse">{data?.length}</span>
                <h1 className="text-3xl font-bold text-white mb-8">Team Members </h1>
                
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.map((user:any) => (
                        <div key={user.id} className="bg-black/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-16 h-16 rounded-full ring-2 ring-purple-500/30 overflow-hidden flex items-center justify-center bg-purple-500">
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
                                    <p className="text-white/70 capitalize">{user.userRole.replace('_', ' ')}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <label className="text-white/50 text-sm">Email</label>
                                    <p className="text-white">{user.emailAddress}</p>
                                </div>
                                
                                <div>
                                    <label className="text-white/50 text-sm">Status</label>
                                    <p className="text-white flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${
                                            user.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
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
