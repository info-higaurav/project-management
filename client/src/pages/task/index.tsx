import { Loader } from "@/helper/loader";
import axios from "axios";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const loadTasks = async () => {
    const endpoint = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${endpoint}/api/v1/managment/tasks`, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })
    return response.data.data
}
    
export default function Task() {
    const queryClient = useQueryClient();
    // @ts-ignore
    const { data, isLoading, isError, error } = useQuery({ queryKey: ["tasks"], queryFn: loadTasks })
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    const handleStatusChange = async (taskId: string, newStatus: string) => {
        setUpdatingStatus(taskId);
        try {
            const endpoint = import.meta.env.VITE_API_URL;
            await axios.patch(`${endpoint}/api/v1/managment/tasks`, 
                { taskId, taskStatus: newStatus },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            // Refetch tasks after update
            await queryClient.invalidateQueries({ queryKey: ["tasks"] });
        } catch (error) {
            console.error('Error updating task status:', error);
        } finally {
            setUpdatingStatus(null);
        }
    };

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <h1>something went wrong</h1>
    }

    return (
        <div className="rounded-2xl min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">My Tasks</h2>
                        <p className="text-slate-400">Manage and track your assigned tasks</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <select className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:bg-slate-800/70 transition-colors">
                            <option value="all">All Tasks</option>
                            <option value="pending">Pending</option>
                            <option value="inprocess">In Progress</option>
                            <option value="complete">Completed</option>
                        </select>
                        <select className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:bg-slate-800/70 transition-colors">
                            <option value="all">All Priorities</option>
                            <option value="urgent">Urgent</option>
                            <option value="high">High</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-6">
                    {data.map((task: any) => (
                        <div key={task._id} className="group bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-950/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors cursor-pointer truncate">
                                                {task.taskTitle}
                                            </h3>
                                            <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                                                task.taskPriority === 'urgent' ? 'bg-gradient-to-r from-red-500/20 to-red-400/20 text-red-300 border border-red-500/30' :
                                                task.taskPriority === 'high' ? 'bg-gradient-to-r from-orange-500/20 to-orange-400/20 text-orange-300 border border-orange-500/30' :
                                                'bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-300 border border-blue-500/30'
                                            }`}>
                                                {task.taskPriority}
                                            </span>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed line-clamp-2">{task.taskDescription}</p>
                                    </div>
                                    <div className="shrink-0">
                                        <Select 
                                            defaultValue={task.taskStatus}
                                            onValueChange={(value) => handleStatusChange(task._id, value)}
                                            disabled={updatingStatus === task._id}
                                        >
                                            <SelectTrigger className={`w-36 border-0 shadow-sm ${
                                                task.taskStatus === 'complete' ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-300' :
                                                task.taskStatus === 'inprocess' ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 text-yellow-300' :
                                                'bg-gradient-to-r from-purple-500/20 to-purple-400/20 text-purple-300'
                                            }`}>
                                                <SelectValue>
                                                    {updatingStatus === task._id ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                                            <span>Updating...</span>
                                                        </div>
                                                    ) : (
                                                        <span className="capitalize">{task.taskStatus}</span>
                                                    )}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-slate-700">
                                                <SelectItem value="pending" className="text-purple-300 hover:bg-purple-500/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                                        Pending
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="inprocess" className="text-yellow-300 hover:bg-yellow-500/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                        In Process
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="complete" className="text-green-300 hover:bg-green-500/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                                        Complete
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/30">
                                        <p className="text-slate-400 text-sm mb-1">Project</p>
                                        <p className="text-white font-medium truncate">{task.associatedProjectId.projectName}</p>
                                    </div>
                                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/30">
                                        <p className="text-slate-400 text-sm mb-1">Timeline</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <span>{new Date(task.taskStartDate).toLocaleDateString()}</span>
                                            <span className="text-slate-500">→</span>
                                            <span>{new Date(task.taskDueDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {task.taskTags.length > 0 && (
                                    <div className="flex gap-2 mb-6 flex-wrap">
                                        {task.taskTags.map((tag: string, index: number) => (
                                            <span key={index} className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-300 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/30 overflow-hidden">
                                                <img
                                                    src={task.taskAssignorId.profilePicture}
                                                    alt="Assignor"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/10337/10337609.png";
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400">Assigned by</p>
                                            <p className="text-sm text-white font-medium">
                                                {task.taskAssignorId.firstName} {task.taskAssignorId.lastName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}