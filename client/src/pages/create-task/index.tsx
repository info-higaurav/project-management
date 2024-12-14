import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CreateTask() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])
    const [msg , setMsg]=useState('')

    console.log(msg)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken") || "";
                const endpoint = import.meta.env.VITE_API_URL;
                
                const [projectsResponse, usersResponse] = await Promise.all([
                    axios.get(`${endpoint}/api/v1/admin/get-projects`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                        withCredentials: true
                    }),
                    axios.get(`${endpoint}/api/v1/admin/get-users`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                        withCredentials: true
                    })
                ]);

                setProjects(projectsResponse.data.data);
                setUsers(usersResponse.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const form = useForm({
        defaultValues: {
            taskTitle: "",
            taskDescription: "",
            taskStartDate: "",
            taskDueDate: "", 
            taskPriority: "low",
            taskStatus: "pending",
            taskNotes: "",
            taskTags: "",
            associatedProjectId: "",
            taskAssigneeId: ""
        }
    })

    const handleCreateTask = async () => {
        try {
            setLoading(true)
            const accessToken = localStorage.getItem("accessToken") || "";
            const endpoint = import.meta.env.VITE_API_URL;

            const [projectResponse, userResponse] = await Promise.all([
                axios.get(`${endpoint}/api/v1/admin/get-projects`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true
                }),
                axios.get(`${endpoint}/api/v1/admin/getusers`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true
                })
            ])
            console.log(userResponse, projectResponse)
            setProjects(projectResponse.data.data);
            setUsers(userResponse.data.data);
            
        } catch (error: any) {
            // setError(error.response.data.message)
            setError(error.response.data.message);
        } finally {
            setLoading(false)
            setError('')

        }
    }

    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            const accessToken = localStorage.getItem("accessToken") || "";
            const endpoint = import.meta.env.VITE_API_URL;
            
            const formattedData = {
                ...data,
                taskTags: data.taskTags.split(',').map((tag: string) => tag.trim())
            };

          const res =  await axios.post(`${endpoint}/api/v1/admin/create-task`, formattedData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true
            })
            setMsg(res.data.message)
            form.reset()
        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
            setError('')
            setTimeout(()=>{
                setOpen(false);
            },3000)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleCreateTask} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                    Create Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl text-white border border-white/10 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Create New Task</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Fill in the details to create a new task
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="taskTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/80">Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Task title" {...field} className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="taskDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/80">Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Task description" {...field} className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg min-h-[100px]" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="taskStartDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/80">Start Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="taskDueDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/80">Due Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="taskTags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/80">Tags (comma-separated)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. frontend, urgent, bug-fix" {...field} className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="taskPriority"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/80">Priority</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg">
                                                            <SelectValue placeholder="Select priority" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-slate-900 border-white/10">
                                                        <SelectItem value="low">Low</SelectItem>
                                                        <SelectItem value="medium">Medium</SelectItem>
                                                        <SelectItem value="high">High</SelectItem>
                                                        <SelectItem value="urgent">Urgent</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="taskStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/80">Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg">
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-slate-900 border-white/10">
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="in progress">In Progress</SelectItem>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="associatedProjectId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/80">Project</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg">
                                                        <SelectValue placeholder="Select project" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-900 text-white">
                                                    {projects.map((project: any) => (
                                                        <SelectItem key={project._id} value={project._id}>
                                                            {project.projectName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="taskAssigneeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/80">Assignee</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg">
                                                        <SelectValue placeholder="Select assignee" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-900 text-white">
                                                   
                                                    {users.map((user: any) => (
                                                        <SelectItem key={user._id} value={user._id} className="flex items-center gap-2">

                                                            <div className="flex gap-3 py-2">
                                                            {user.profilePicture ? (
                                                                <img 
                                                                    src={user.profilePicture} 
                                                                    alt={`${user.firstName} ${user.lastName}`}
                                                                    className="w-6 h-6 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-white">
                                                                    {user.firstName[0]}{user.lastName[0]}
                                                                </div>
                                                            )}
                                                            {user.firstName} {user.lastName}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="taskNotes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/80">Additional Notes</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Any additional notes or comments" {...field} className="bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors rounded-lg" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">{error}</p>}

                        <DialogFooter>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                            >
                                {loading ? "Creating..." : "Create Task"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}