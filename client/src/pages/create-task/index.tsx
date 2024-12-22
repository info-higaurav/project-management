import { useState} from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import validateTask from "@/helper/validation/create-task"
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
    FormMessage
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
import {useQuery} from '@tanstack/react-query'

const loadTask = async()=>{
    const endpoint = import.meta.env.VITE_API_URL
    const [projectsResponse, usersResponse] = await Promise.all([
        axios.get(`${endpoint}/api/v1/admin/projects`, {
            headers: {"Content-Type":"application/json"},
            withCredentials: true
        }),
        axios.get(`${endpoint}/api/v1/managment/users`, {
            headers: {"Content-Type":"application/json"},
            withCredentials: true
        })
    ]);
    return {
        projects: projectsResponse.data.data,
        users: usersResponse.data.data
    }
}

export default function CreateTask() {
    // @ts-ignore
    const {data , isLoading , isError , error} = useQuery({queryKey:["projects","users"], queryFn:loadTask})
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    // @ts-ignore
    const [msg , setMsg]=useState('')

    if(isLoading){
        return <h1>loading...</h1>
    }
    if(isError){
        return <h1>There are some issue while fetcing data</h1>
    }
    
    const form = useForm({
        resolver: zodResolver(validateTask),
        defaultValues: {
            taskTitle: "",
            taskDescription: "",
            taskStartDate: "",
            taskDueDate: "", 
            taskPriority: "medium",
            taskStatus: "pending",
            taskNotes: "",
            taskTags: "",
            associatedProjectId: "",
            taskAssigneeId: ""
        }
    })



    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            
            const endpoint = import.meta.env.VITE_API_URL;
            
            const formattedData = {
                ...data,
                taskTags: data.taskTags.split(',').map((tag: string) => tag.trim())
            };

          const res =  await axios.post(`${endpoint}/api/v1/managment/tasks`, formattedData, {
                 headers: {"Content-Type":"application/json"},
                withCredentials: true
            })
            setMsg(res.data.message)
            form.reset()
        } catch (error: any) {
            // setError(error.response.data.message)
        } finally {
            setLoading(false)
            // setError('')
            setTimeout(()=>{
                setOpen(false);
                setMsg('');
            },3000)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                    Create Task
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-slate-900 to-slate-800 border-0 max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-0">
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-slate-700/50 p-6 rounded-t-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Create New Task</DialogTitle>
                        <DialogDescription className="text-slate-400">Fill in the details below to create a new task.</DialogDescription>
                    </DialogHeader>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
                        <div className="grid gap-6">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="taskTitle"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-semibold text-slate-200">Task Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter task title" {...field} 
                                                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200 placeholder:text-slate-400" />
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="taskAssigneeId"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-semibold text-slate-200">Assignee</FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200">
                                                            <SelectValue placeholder="Select assignee" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                                                        {data?.users.map((user: any) => (
                                                            <SelectItem key={user._id} value={user._id} className="text-slate-200 focus:bg-slate-700">
                                                                {user.firstName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="taskStartDate"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-semibold text-slate-200">Start Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} 
                                                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200" />
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="taskDueDate"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-semibold text-slate-200">Due Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} 
                                                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200" />
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="taskPriority"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-semibold text-slate-200">Priority</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200">
                                                            <SelectValue placeholder="Select priority" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                                                        <SelectItem value="low" className="text-slate-200 focus:bg-slate-700">Low</SelectItem>
                                                        <SelectItem value="medium" className="text-slate-200 focus:bg-slate-700">Medium</SelectItem>
                                                        <SelectItem value="urgent" className="text-slate-200 focus:bg-slate-700">Urgent</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="taskStatus"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-semibold text-slate-200">Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200">
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                                                        <SelectItem value="pending" className="text-slate-200 focus:bg-slate-700">Pending</SelectItem>
                                                        <SelectItem value="inprocess" className="text-slate-200 focus:bg-slate-700">In Process</SelectItem>
                                                        <SelectItem value="complete" className="text-slate-200 focus:bg-slate-700">Complete</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="associatedProjectId"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-sm font-semibold text-slate-200">Project</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200">
                                                        <SelectValue placeholder="Select project" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                                                    {/* @ts-ignore */}
                                                    {data.projects.map((project: any) => (
                                                        <SelectItem key={project._id} value={project._id} className="text-slate-200 focus:bg-slate-700">
                                                            {project.projectName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-500 font-medium text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="taskDescription"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-sm font-semibold text-slate-200">Task Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter task description" {...field} 
                                                    className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200 placeholder:text-slate-400 min-h-[100px]" />
                                            </FormControl>
                                            <FormMessage className="text-red-500 font-medium text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="taskTags"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-semibold text-slate-200">Tags (comma-separated)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. frontend, urgent, bug-fix" {...field} 
                                                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200 placeholder:text-slate-400" />
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="taskNotes"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-semibold text-slate-200">Notes</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Additional notes" {...field} 
                                                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-xl text-slate-200 placeholder:text-slate-400" />
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="px-2">
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
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