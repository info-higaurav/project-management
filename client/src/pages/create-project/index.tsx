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
            console.error(error); // Using console.error for errors
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
                <Button  variant="outline" className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-full">
                    + New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl sm:max-w-[600px] bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900 border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">Create New Project</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="projectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter project name" className="bg-white/10 text-white placeholder:text-gray-400 border-white/20 rounded-xl" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-300" />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="projectStartDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Start Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                className="bg-white/10 text-white border-white/20 rounded-xl"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    const formattedDate = formatDate(e.target.value);
                                                    e.target.setAttribute('data-display', formattedDate);
                                                }}
                                            />
                                        </FormControl>
                                        <div className="text-sm text-gray-300 mt-1">
                                            {field.value && formatDate(field.value)}
                                        </div>
                                        <FormMessage className="text-red-300" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="projectEndDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">End Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                className="bg-white/10 text-white border-white/20 rounded-xl"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    const formattedDate = formatDate(e.target.value);
                                                    e.target.setAttribute('data-display', formattedDate);
                                                }}
                                            />
                                        </FormControl>
                                        <div className="text-sm text-gray-300 mt-1">
                                            {field.value && formatDate(field.value)}
                                        </div>
                                        <FormMessage className="text-red-300" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="projectDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Project Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter project description"
                                            className="h-24 resize-none bg-white/10 text-white placeholder:text-gray-400 border-white/20 rounded-xl"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-300" />
                                </FormItem>
                            )}
                        />

                        
<FormField
                            control={form.control}
                            name="projectOrgnizationId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Organization</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white/10 text-white border-white/20 rounded-xl">
                                                <SelectValue placeholder="Select Organization"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-indigo-900 border-white/20 rounded-xl">
                                        {
                                                organizationsList?.map((org)=>{
                                                    return(
                                                        <>
                                                            <SelectItem value={(org as any)._id} className="text-white">{org.organizationName}</SelectItem>
                                                        </>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-300" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="projectManagerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Project Manager</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white/10 text-white border-white/20 rounded-xl">
                                                <SelectValue placeholder="Select Project Manager"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-indigo-900 border-white/20 rounded-xl">
                                        {
                                                managersList?.map((manager)=>{
                                                    return(
                                                        <>
                                                            <SelectItem value={(manager as any)._id}>{(manager as {firstName: string; lastName: string})?.firstName} {(manager as {firstName: string; lastName: string})?.lastName}</SelectItem>
                                                        </>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-300" />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <DialogTrigger asChild>
                                <Button variant="outline" type="button" className="text-white border-white/20 hover:bg-white/10 rounded-full">
                                    Cancel
                                </Button>
                            </DialogTrigger>
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
                                Create Project
                            </Button>
                        
                        </div>
                        {ploading && (
                                <div className=" mt-2 text-center text-white">Creating project, please wait...</div>
                            )}
                            {pmsg && !ploading && (
                                <div className="text-center text-white  mt-2">{pmsg}</div>
                            )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}