import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "@/helper/loader";

import CreateTask from "../create-task";

export default function ManageTask({userRole}:{userRole:string}) {
    const [data, setData] = useState<any[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const endpoint = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${endpoint}/api/v1/managment/tasks`, {
                    headers: {
                      "Content-Type":"application/json" 
                    },
                    withCredentials: true
                })
                setData(response.data.data)
            } catch (error: any) {
                console.log(error)
                setError(error.response.data.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    if (loading) {
        return <Loader />
    }
    if (error) {
        return <div className="flex w-full justify-center items-center">
            <h1 className="text-white font-bold text-xl">There is no task </h1>
        </div>
    }
console.log(error)
    return (
        <div className="min-h-screen bg-gradient-to-br bg-black/10 backdrop-blur-xl p-6 rounded-2xl border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Manage Tasks</h1>
                    {
                        userRole === "manager" && (
                            <CreateTask />
                        )
                    }
                </div>

                {data.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-white/70 text-lg">No tasks available</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {data.map((task) => (
                            <div key={task._id} className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-white">{task.taskTitle}</h3>
                                    <div className="flex gap-3">
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            task.taskPriority === 'urgent' ? 'bg-red-500/20 text-red-300' :
                                            task.taskPriority === 'high' ? 'bg-orange-500/20 text-orange-300' :
                                            'bg-blue-500/20 text-blue-300'
                                        }`}>
                                            {task.taskPriority}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            task.taskStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                            task.taskStatus === 'in progress' ? 'bg-blue-500/20 text-blue-300' :
                                            'bg-green-500/20 text-green-300'
                                        }`}>
                                            {task.taskStatus}
                                        </span>
                                    </div>
                                </div>
                                
                                <p className="text-white/70 mb-4">{task.taskDescription}</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-white/50 text-sm">Start Date</p>
                                        <p className="text-white">{new Date(task.taskStartDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-sm">Due Date</p>
                                        <p className="text-white">{new Date(task.taskDueDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-sm">Project</p>
                                        <p className="text-white">{task.associatedProjectId.projectName}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-sm">Assignee</p>
                                        <p className="text-white">{task.taskAssigneeId.firstName} {task.taskAssigneeId.lastName}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {task.taskTags.map((tag: string, index: number) => (
                                        <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}