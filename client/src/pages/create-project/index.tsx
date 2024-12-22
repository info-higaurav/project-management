import { zodResolver } from "@hookform/resolvers/zod"
import { useForm} from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
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
import {useState } from "react"
import axios from "axios"
import { Loader } from "@/helper/loader"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { createPortal } from "react-dom"
import { useQuery } from "@tanstack/react-query"

const formSchema = z.object({
    projectName: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    projectStartDate: z.preprocess((date) => new Date(date as string | number | Date), z.date().refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }, {
        message: "Start date cannot be in the past",
    })),
    projectEndDate: z.preprocess((date) => new Date(date as string | number | Date), z.date().refine((date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }, {
        message: "End date cannot be in the past",
    })),
    projectDescription: z.string().min(10, {
        message: "Project description must be at least 10 characters.",
    }),
    projectManagerId: z.string(),
    projectOrgnizationId: z.string(),
}).refine((data) => {
    const startDate = new Date(data.projectStartDate);
    const endDate = new Date(data.projectEndDate);
    return endDate >= startDate;
}, {
    message: "End date must be after or equal to start date",
    path: ["projectEndDate"],
});

const loadManagersAndOrgnizations = async () => {
    const endpoint = import.meta.env.VITE_API_URL;
    const [managersResponse, projectsResponse] = await Promise.all([
        axios.get(`${endpoint}/api/v1/admin/managers`, {
            withCredentials: true
        }),
        axios.get(`${endpoint}/api/v1/admin/organizations`, {
            withCredentials: true
        })
    ]);
    return {managers:managersResponse.data.data, organizations:projectsResponse.data.data}
}
export default function CreateProject() {
    const {data , isLoading , isError , error} = useQuery({queryKey:["projects","managers"], queryFn:loadManagersAndOrgnizations})
    const [ploading, setPloading] = useState(false)
    const [perror, setPerror] = useState('')
    const [pmsg, setPmsg] = useState('')
    const [showForm, setShowForm] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            projectStartDate: new Date(),
            projectEndDate: new Date(),
            projectDescription: "",
            projectManagerId: "",
            projectOrgnizationId: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setPloading(true)
            const endpoint = import.meta.env.VITE_API_URL;
            const response = await axios.post(
                `${endpoint}/api/v1/admin/projects`,
                values,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            console.log(response)
            if (response.status === 201) {
                form.reset();
                setPmsg(response.data.message)
                setTimeout(() => {
                    setShowForm(false)
                }, 2000);
                return;
            }

        } catch (error: any) {
            console.error(error);
            setPerror(error.response?.data.message);
        } finally {
           setPloading(false)
           setTimeout(()=>{
            setPmsg('')
            setPerror('')
           }, 2000)
        }
    }

    if (isLoading) return <Loader />
    if (isError) return <h1>{(error as any)?.response?.data.message}</h1>

    return (
        <div className="relative">
            <Button 
                variant="outline" 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setShowForm(true)}
            >
                + New Project
            </Button>

            {showForm && createPortal(
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto" style={{ zIndex: 50 }}>
                    <div className="w-full max-w-[800px] my-8 mx-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700/50 shadow-2xl relative">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Create New Project
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-gray-200 absolute right-4 top-4"
                                onClick={() => setShowForm(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="projectName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200 font-medium">Project Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter project name" className="bg-gray-800/50 text-white placeholder:text-gray-400 border-gray-700 focus:border-indigo-500 rounded-lg transition-colors duration-200" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-rose-400" />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="projectStartDate"
                                        render={({ field }) => (
                                            <FormItem className="relative">
                                                <FormLabel className="text-gray-200 font-medium">Start Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal bg-gray-800/50 text-white border-gray-700",
                                                                    !field.value && "text-gray-400"
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
                                                        className="bg-gray-900 border border-gray-700 p-0" 
                                                        align="start"
                                                        style={{ zIndex: 99999 }}
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
                                                            className="bg-gray-900 text-white rounded-lg"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage className="text-rose-400" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="projectEndDate"
                                        render={({ field }) => (
                                            <FormItem className="relative">
                                                <FormLabel className="text-gray-200 font-medium">End Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal bg-gray-800/50 text-white border-gray-700",
                                                                    !field.value && "text-gray-400"
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
                                                        className="bg-gray-900 border border-gray-700 p-0" 
                                                        align="start"
                                                        style={{ zIndex: 99999 }}
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => {
                                                                const today = new Date();
                                                                today.setHours(0, 0, 0, 0);
                                                                const startDate = form.getValues("projectStartDate");
                                                                return date < today || (startDate && date < new Date(startDate));
                                                            }}
                                                            initialFocus
                                                            className="bg-gray-900 text-white rounded-lg"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage className="text-rose-400" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="projectDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200 font-medium">Project Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter project description"
                                                    className="h-24 resize-none bg-gray-800/50 text-white placeholder:text-gray-400 border-gray-700 focus:border-indigo-500 rounded-lg transition-colors duration-200"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-rose-400" />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="projectOrgnizationId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200 font-medium">Organization</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-800/50 text-white border-gray-700 focus:border-indigo-500 rounded-lg transition-colors duration-200">
                                                            <SelectValue placeholder="Select Organization"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-gray-900 border-gray-700 rounded-lg">
                                                        {data?.organizations?.map((org: any) => (
                                                            <SelectItem 
                                                                key={org._id}
                                                                value={org._id} 
                                                                className="text-white hover:bg-gray-700/50"
                                                            >
                                                                {org.organizationName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-rose-400" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="projectManagerId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200 font-medium">Project Manager</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-800/50 text-white border-gray-700 focus:border-indigo-500 rounded-lg transition-colors duration-200">
                                                            <SelectValue placeholder="Select Project Manager"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-gray-900 border-gray-700 rounded-lg">
                                                        {data?.managers?.map((manager:any)=>(
                                                            <SelectItem 
                                                                key={(manager as any)._id}
                                                                value={(manager as any)._id}
                                                                className="text-white hover:bg-gray-700/50"
                                                            >
                                                                {(manager as {firstName: string; lastName: string})?.firstName} {(manager as {firstName: string; lastName: string})?.lastName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-rose-400" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                        className="bg-gray-800/50 text-gray-200 border-gray-700 hover:bg-gray-700/50 hover:text-white rounded-lg px-6 transition-all duration-200"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={ploading}
                                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg px-6 shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        {ploading ? "Creating..." : "Create Project"}
                                    </Button>
                                </div>

                                {perror && (
                                    <div className="text-center text-rose-400 mt-4">{perror}</div>
                                )}
                                {pmsg && (
                                    <div className="text-center text-emerald-400 mt-4">{pmsg}</div>
                                )}
                            </form>
                        </Form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}