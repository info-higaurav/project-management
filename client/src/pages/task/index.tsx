import Expire from "@/helper/expire";
import { Loader } from "@/helper/loader";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Task() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const accessToken = localStorage.getItem("accessToken") || "";
                const endpoint = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${endpoint}/api/v1/admin/get-tasks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                setData(response.data.data)
            } catch (error: any) {
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
        return <Expire message={error} />
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">My Tasks</h2>
            <div className="grid gap-4">
                {data.map((task: any) => (
                    <div key={task._id} className="bg-black/10 backdrop-blur-xl p-6 rounded-lg border border-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{task.taskTitle}</h3>
                                <p className="text-white/70 mb-4">{task.taskDescription}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                task.taskPriority === 'urgent' ? 'bg-red-500/20 text-red-300' :
                                task.taskPriority === 'high' ? 'bg-orange-500/20 text-orange-300' :
                                'bg-blue-500/20 text-blue-300'
                            }`}>
                                {task.taskPriority}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-white/50 text-sm">Project</p>
                                <p className="text-white">{task.associatedProjectId.projectName}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-sm">Status</p>
                                <p className="text-white capitalize">{task.taskStatus}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-sm">Start Date</p>
                                <p className="text-white">{new Date(task.taskStartDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-sm">Due Date</p>
                                <p className="text-white">{new Date(task.taskDueDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            {task.taskTags.map((tag: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-sm text-white">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <img 
                                    src={task.taskAssignorId.profilePicture} 
                                    alt="Assignor"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div>
                                    <p className="text-sm text-white/50">Assigned by</p>
                                    <p className="text-sm text-white">
                                        {task.taskAssignorId.firstName} {task.taskAssignorId.lastName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}