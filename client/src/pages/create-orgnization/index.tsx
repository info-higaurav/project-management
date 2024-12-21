import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface CreateOrganizationProps {
    onClose: () => void;
    setShowCreateForm: (show: boolean) => void;
}

const formSchema = z.object({
    organizationName: z.string()
        .min(3, "Organization name must be at least 3 characters")
        .max(50, "Organization name cannot exceed 50 characters")
        .regex(/^[a-zA-Z0-9\s-_]+$/, {
            message: "Name can only contain letters, numbers, spaces, hyphens and underscores"
        })
        .transform(val => val.trim()),
    organizationDescription: z.string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description cannot exceed 500 characters")
        .transform(val => val.trim())
})
// @ts-ignore
export default function CreateOrganization({ onClose, setShowCreateForm }: CreateOrganizationProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isClosing, setIsClosing] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            organizationName: "",
            organizationDescription: "",
        },
    })

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowCreateForm(false);
        }, 300);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            setError("");
            setSuccess("");
            
            const endpoint = import.meta.env.VITE_API_URL;
            await axios.post(`${endpoint}/api/v1/admin/organizations`, values, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            setSuccess("Organization created successfully!");
            form.reset();
            setTimeout(() => {
                handleClose();
            }, 1000);
            
        } catch (err: any) {
            setError(err.response?.data.message || "Failed to create organization");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn(
            "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            isClosing && "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-[48%]"
        )}>
            <div className={cn(
                "w-full max-w-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 duration-300",
                isClosing && "data-[state=closed]:slide-out-to-left-1/2"
            )}>
                <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-gray-700/50 space-y-3 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Create Organization
                            </CardTitle>
                            <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={handleClose}
                                className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </Button>
                        </div>
                        <CardDescription className="text-gray-400 text-lg">
                            Create a new organization to manage your projects and team members efficiently.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8">
                        {error && (
                            <Alert variant="destructive" className="border border-red-500/20 bg-red-500/10">
                                <AlertDescription className="text-red-400">{error}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert className="border border-green-500/20 bg-green-500/10">
                                <AlertDescription className="text-green-400">{success}</AlertDescription>
                            </Alert>
                        )}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="organizationName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300 text-lg font-medium">Organization Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter organization name" 
                                                    {...field} 
                                                    disabled={isLoading}
                                                    className="h-12 bg-gray-800/50 border border-gray-700 focus:border-indigo-500 text-white placeholder:text-gray-500 rounded-xl transition-colors"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="organizationDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300 text-lg font-medium">Description</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder="Enter organization description" 
                                                    className="resize-none h-32 bg-gray-800/50 border border-gray-700 focus:border-indigo-500 text-white placeholder:text-gray-500 rounded-xl transition-colors" 
                                                    {...field} 
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-4 pt-8">
                                    <Button 
                                        type="submit" 
                                        className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg 
                                                    className="animate-spin h-5 w-5" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle 
                                                        className="opacity-25" 
                                                        cx="12" 
                                                        cy="12" 
                                                        r="10" 
                                                        stroke="currentColor" 
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path 
                                                        className="opacity-75" 
                                                        fill="currentColor" 
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Creating...
                                            </span>
                                        ) : (
                                            "Create Organization"
                                        )}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        className="flex-1 h-12 border border-gray-700 hover:bg-gray-800/50 text-gray-300 hover:text-white text-lg font-medium rounded-xl transition-colors"
                                        onClick={handleClose}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}