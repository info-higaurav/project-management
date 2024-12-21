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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useEffect, useState } from "react"
import axios from "axios"
import { Loader } from "@/helper/loader"
import Expire from "@/helper/expire"

const formSchema = z.object({
    projectName: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    projectStartDate: z.string(),
    projectEndDate: z.string(),
    projectDescription: z.string().min(10, {
        message: "Project description must be at least 10 characters.",
    }),
    projectManagerId: z.string(),
    projectOrgnizationId: z.string(),
})

export default function CreateProject() {
    const [organizationsList, setOrganizationsList] = useState([])
    const [managersList, setManagersList] = useState([])

    const [ploading, setPloading]=useState(false)
    const [perror, setPerror]=useState('')
    const [pmsg, setPmsg]=useState('')
    //@ts-ignore
    // @ts-ignore
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            projectStartDate: "",
            projectEndDate: "",
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
            
            if (response.status === 201) {
                form.reset();
                console.log(response.data.message)  
                setPmsg(response.data.message)
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
            setOpen(false)
           },2000)
        }
    }

    const formatDate = (date: string) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return <Loader />
    }
    if (error) {
        return <Expire message={error} />
    }

    useEffect(()=>{
        const getManagersAndOrganizations = async () => {
            try {
                const endpoint = import.meta.env.VITE_API_URL;
                const [managersResponse, organizationsResponse] = await Promise.all([
                    axios.get(`${endpoint}/api/v1/admin/managers`, {
                        withCredentials: true
                    }),
                    axios.get(`${endpoint}/api/v1/admin/organizations`, {
                        withCredentials: true
                    })
                ]);

                if (managersResponse.data?.data) {
                    setManagersList(managersResponse.data.data);
                }

                if (organizationsResponse.data?.data) {
                    setOrganizationsList(organizationsResponse.data.data);
                }

            } catch (error: any) {
                console.error('Error fetching data:', error);
                setError(error.response?.data?.message || 'Failed to fetch data');
            }
        };

        getManagersAndOrganizations();
    },[])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200">
                    + New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Create New Project</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
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

                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="projectStartDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 font-medium">Start Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                className="bg-gray-800/50 text-white border-gray-700 focus:border-indigo-500 rounded-lg transition-colors duration-200"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    const formattedDate = formatDate(e.target.value);
                                                    e.target.setAttribute('data-display', formattedDate);
                                                }}
                                            />
                                        </FormControl>
                                        <div className="text-sm text-indigo-300 mt-1">
                                            {field.value && formatDate(field.value)}
                                        </div>
                                        <FormMessage className="text-rose-400" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="projectEndDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 font-medium">End Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                className="bg-gray-800/50 text-white border-gray-700 focus:border-indigo-500 rounded-lg transition-colors duration-200"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    const formattedDate = formatDate(e.target.value);
                                                    e.target.setAttribute('data-display', formattedDate);
                                                }}
                                            />
                                        </FormControl>
                                        <div className="text-sm text-indigo-300 mt-1">
                                            {field.value && formatDate(field.value)}
                                        </div>
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
                                            className="h-32 resize-none bg-gray-800/50 text-white placeholder:text-gray-400 border-gray-700 focus:border-indigo-500 rounded-lg transition-colors duration-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-rose-400" />
                                </FormItem>
                            )}
                        />

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
                                        <SelectContent className="bg-gray-800 border-gray-700 rounded-lg">
                                            {organizationsList?.map((org)=>(
                                                <SelectItem 
                                                    key={(org as any)._id}
                                                    value={(org as any)._id} 
                                                    className="text-white hover:bg-gray-700/50"
                                                >
                                                    {(org as any).organizationName}
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
                                        <SelectContent className="bg-gray-800 border-gray-700 rounded-lg">
                                            {managersList?.map((manager)=>(
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

                        <div className="flex justify-end gap-4 mt-8">
                            <DialogTrigger asChild>
                                <Button variant="outline" type="button" className="text-gray-200 border-gray-700 hover:bg-gray-800 rounded-lg px-6">
                                    Cancel
                                </Button>
                            </DialogTrigger>
                            <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg px-6 shadow-lg hover:shadow-xl transition-all duration-200">
                                Create Project
                            </Button>
                        </div>

                        {ploading && (
                            <div className="text-center text-indigo-400 animate-pulse mt-4">Creating project, please wait...</div>
                        )}
                        {pmsg && !ploading && (
                            <div className="text-center text-emerald-400 mt-4">{pmsg}</div>
                        )}
                        {perror && (
                            <div className="text-center text-rose-400 mt-4">{perror}</div>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}