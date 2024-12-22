import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import validateTask from "@/helper/validation/create-task"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Portal from "@/components/Portal"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

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
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
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
            taskStartDate: new Date(),
            taskDueDate: new Date(), 
            taskPriority: "medium",
            taskStatus: "pending",
            taskNotes: "",
            taskTags: [],
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
                taskTags: Array.isArray(data.taskTags) ? data.taskTags : []
            };

            const res = await axios.post(`${endpoint}/api/v1/managment/tasks`, formattedData, {
                headers: {"Content-Type":"application/json"},
                withCredentials: true
            })
            setMsg(res.data.message)
            form.reset()
        } catch (error: any) {
            console.log(error)
            // setError(error.response.data.message)
        } finally {
            setLoading(false)
            setTimeout(() => {
                setShowForm(false);
                setMsg('');
            }, 3000)
        }
    }

    return (
        <>
            <Button 
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
                Create Task
            </Button>

            {showForm && (
                <Portal>
                    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 z-50 overflow-y-auto">
                        <div className="min-h-[calc(100vh-2rem)] flex items-center py-4 sm:py-8">
                            <div className="w-full max-w-3xl bg-gradient-to-b from-slate-900 to-slate-800/95 rounded-2xl shadow-2xl shadow-purple-900/20 relative mx-auto border border-slate-700/50">
                                <button 
                                    onClick={() => setShowForm(false)}
                                    className="absolute top-5 right-5 text-slate-400 hover:text-white z-10 p-2.5 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                                    aria-label="Close form"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-7 rounded-t-2xl sticky top-0 z-[1] border-b border-slate-700/50 backdrop-blur-sm">
                                    <div className="space-y-2 max-w-xl">
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Create New Task</h2>
                                        <p className="text-slate-400 text-sm leading-relaxed">Fill in the task details below. Fields marked with * are required.</p>
                                    </div>
                                </div>

                                <div className="overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="divide-y divide-slate-700/50">
                                            <div className="p-7 space-y-10">
                                                {/* Basic Information Section */}
                                                <div className="space-y-5">
                                                    <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
                                                        <span>Basic Information</span>
                                                        <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent ml-4"></div>
                                                    </h3>
                                                    <div className="grid gap-6">
                                                        <FormField
                                                            control={form.control}
                                                            name="taskTitle"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Task Title *</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Enter a descriptive title" {...field} 
                                                                            className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-200 rounded-lg text-slate-200 placeholder:text-slate-400" />
                                                                    </FormControl>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        
                                                        <FormField
                                                            control={form.control}
                                                            name="taskDescription"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Description *</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea 
                                                                            placeholder="Provide detailed task description" 
                                                                            {...field} 
                                                                            className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-200 rounded-lg text-slate-200 placeholder:text-slate-400 min-h-[120px] resize-y" 
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Assignment Section */}
                                                <div className="space-y-5">
                                                    <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
                                                        <span>Assignment Details</span>
                                                        <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent ml-4"></div>
                                                    </h3>
                                                    <div className="grid gap-6 sm:grid-cols-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="taskAssigneeId"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Assignee *</FormLabel>
                                                                    <Select onValueChange={field.onChange}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-lg text-slate-200">
                                                                                <SelectValue placeholder="Select team member" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent className="bg-slate-800 border-slate-700 rounded-lg max-h-[200px]">
                                                                            {data?.users.map((user: any) => (
                                                                                <SelectItem key={user._id} value={user._id} className="text-slate-200 focus:bg-slate-700">
                                                                                    {user.firstName}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="associatedProjectId"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Project *</FormLabel>
                                                                    <Select onValueChange={field.onChange}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-lg text-slate-200">
                                                                                <SelectValue placeholder="Select project" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent className="bg-slate-800 border-slate-700 rounded-lg max-h-[200px]">
                                                                            {data?.projects.map((project: any) => (
                                                                                <SelectItem key={project._id} value={project._id} className="text-slate-200 focus:bg-slate-700">
                                                                                    {project.projectName}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Schedule Section */}
                                                <div className="space-y-5">
                                                    <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
                                                        <span>Schedule</span>
                                                        <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent ml-4"></div>
                                                    </h3>
                                                    <div className="grid gap-6 sm:grid-cols-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="taskStartDate"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Start Date *</FormLabel>
                                                                    <Popover>
                                                                        <PopoverTrigger asChild>
                                                                            <FormControl>
                                                                                <Button
                                                                                    variant={"outline"}
                                                                                    className={cn(
                                                                                        "w-full pl-3 text-left font-normal bg-slate-800/50 text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-slate-200",
                                                                                        !field.value && "text-slate-400"
                                                                                    )}
                                                                                >
                                                                                    {field.value ? (
                                                                                        new Intl.DateTimeFormat("en-US", { 
                                                                                            day: "2-digit", 
                                                                                            month: "long", 
                                                                                            year: "numeric" 
                                                                                        }).format(new Date(field.value))
                                                                                    ) : (
                                                                                        <span>Pick a date</span>
                                                                                    )}
                                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                                </Button>
                                                                            </FormControl>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent 
                                                                            className="bg-slate-800 border-slate-700 p-0" 
                                                                            align="start"
                                                                        >
                                                                            <Calendar
                                                                                mode="single"
                                                                                selected={field.value ? new Date(field.value) : undefined}
                                                                                onSelect={field.onChange}
                                                                                disabled={(date) => {
                                                                                    const today = new Date();
                                                                                    today.setHours(0, 0, 0, 0);
                                                                                    return date < today;
                                                                                }}
                                                                                initialFocus
                                                                                className="bg-slate-800 text-slate-200"
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="taskDueDate"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Due Date *</FormLabel>
                                                                    <Popover>
                                                                        <PopoverTrigger asChild>
                                                                            <FormControl>
                                                                                <Button
                                                                                    variant={"outline"}
                                                                                    className={cn(
                                                                                        "w-full pl-3 text-left font-normal bg-slate-800/50 text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-slate-200",
                                                                                        !field.value && "text-slate-400"
                                                                                    )}
                                                                                >
                                                                                    {field.value ? (
                                                                                        new Intl.DateTimeFormat("en-US", { 
                                                                                            day: "2-digit", 
                                                                                            month: "long", 
                                                                                            year: "numeric" 
                                                                                        }).format(new Date(field.value))
                                                                                    ) : (
                                                                                        <span>Pick a date</span>
                                                                                    )}
                                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                                </Button>
                                                                            </FormControl>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent 
                                                                            className="bg-slate-800 border-slate-700 p-0" 
                                                                            align="start"
                                                                        >
                                                                            <Calendar
                                                                                mode="single"
                                                                                selected={field.value ? new Date(field.value) : undefined}
                                                                                onSelect={field.onChange}
                                                                                disabled={(date) => {
                                                                                    const today = new Date();
                                                                                    today.setHours(0, 0, 0, 0);
                                                                                    return date < today;
                                                                                }}
                                                                                initialFocus
                                                                                className="bg-slate-800 text-slate-200"
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Task Details Section */}
                                                <div className="space-y-5">
                                                    <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
                                                        <span>Task Details</span>
                                                        <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent ml-4"></div>
                                                    </h3>
                                                    <div className="grid gap-6 sm:grid-cols-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="taskPriority"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Priority *</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-lg text-slate-200">
                                                                                <SelectValue placeholder="Set priority" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent className="bg-slate-800 border-slate-700 rounded-lg">
                                                                            <SelectItem value="low" className="text-slate-200 focus:bg-slate-700">Low</SelectItem>
                                                                            <SelectItem value="medium" className="text-slate-200 focus:bg-slate-700">Medium</SelectItem>
                                                                            <SelectItem value="urgent" className="text-slate-200 focus:bg-slate-700">Urgent</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="taskStatus"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Status *</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 transition-colors rounded-lg text-slate-200">
                                                                                <SelectValue placeholder="Set status" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent className="bg-slate-800 border-slate-700 rounded-lg">
                                                                            <SelectItem value="pending" className="text-slate-200 focus:bg-slate-700">Pending</SelectItem>
                                                                            <SelectItem value="inprocess" className="text-slate-200 focus:bg-slate-700">In Process</SelectItem>
                                                                            <SelectItem value="complete" className="text-slate-200 focus:bg-slate-700">Complete</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Additional Information Section */}
                                                <div className="space-y-5">
                                                    <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
                                                        <span>Additional Information</span>
                                                        <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent ml-4"></div>
                                                    </h3>
                                                    <div className="grid gap-6 sm:grid-cols-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="taskTags"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Tags</FormLabel>
                                                                    <FormControl>
                                                                        <Input 
                                                                            value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                                                                            onChange={(e) => {
                                                                                const value = e.target.value;
                                                                                field.onChange(value.split(',').map(tag => tag.trim()).filter(Boolean));
                                                                            }}
                                                                            placeholder="e.g. frontend, urgent, bug-fix"
                                                                            className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-200 rounded-lg text-slate-200 placeholder:text-slate-400"
                                                                        />
                                                                    </FormControl>
                                                                    <FormDescription className="text-xs text-slate-400">
                                                                        Separate tags with commas
                                                                    </FormDescription>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="taskNotes"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-sm font-medium text-slate-200">Notes</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Additional notes or references" {...field} 
                                                                            className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-200 rounded-lg text-slate-200 placeholder:text-slate-400" />
                                                                    </FormControl>
                                                                    <FormMessage className="text-red-400 text-xs mt-1.5" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/75 p-5 flex items-center justify-between">
                                                <div className="flex items-center space-x-2 text-slate-400">
                                                    <span className="text-red-400">*</span>
                                                    <span className="text-sm">Required fields</span>
                                                </div>
                                                <div className="flex justify-end space-x-4">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setShowForm(false)}
                                                        className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-colors px-5"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 px-6 min-w-[120px] font-medium"
                                                    >
                                                        {loading ? (
                                                            <div className="flex items-center space-x-2">
                                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                                <span>Creating...</span>
                                                            </div>
                                                        ) : (
                                                            "Create Task"
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                            {msg && (
                                                <div className="fixed bottom-6 right-6 p-4 bg-green-900/90 border border-green-500/50 rounded-lg shadow-lg max-w-sm animate-in slide-in-from-right duration-300">
                                                    <p className="text-green-300 text-sm font-medium flex items-center space-x-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>{msg}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    )
}