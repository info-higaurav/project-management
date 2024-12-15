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
import {useState } from "react"
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
})

export default function CreateProject() {
    const [managers, setManagers] = useState([])
    const [mloading, setMloading]=useState(false)
    const [merr , setMerr]=useState('')

    const [ploading, setPloading]=useState(false)
    const [perror, setPerror]=useState('')
    const [pmsg, setPmsg]=useState('')
    //@ts-ignore
    const [error, setError] = useState('')
    //@ts-ignore
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    console.log(merr, perror)
    
   async function handleManagersList(){
          try {
            setMloading(true)
            const accessToken = localStorage.getItem("accessToken") || "";
            const endpoint = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${endpoint}/api/v1/admin/managers`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              withCredentials: true
            })
            console.log(response.data.data)
            setManagers(response.data.data)
          } catch (error:any) {
            setMerr(error.response.data.message)
          }finally{
            setMloading(false)
          }
        
}

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            projectStartDate: "",
            projectEndDate: "",
            projectDescription: "",
            projectManagerId: "",
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
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleManagersList} variant="outline" className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-full">
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
                            name="projectManagerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Project Manager</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white/10 text-white border-white/20 rounded-xl">
                                                <SelectValue placeholder={mloading ? 'Loading...' : 'Select Project Manager'} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-indigo-900 border-white/20 rounded-xl">
                                        {
                                                managers?.map((manager)=>{
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