import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import axios from 'axios'
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

// Strong password validation schema
const formSchema = z.object({
  emailAddress: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol"),
  rememberMe: z.boolean().default(false)
})

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",
            password: "",
            rememberMe: false,
        },
    })
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const endpoint = import.meta.env.VITE_API_URL;            
                
            const res = await axios.post(
                `${endpoint}/api/v1/users/login`,
                values,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )
            if(res.status === 200){ // Use strict equality
                form.reset();
                navigate("/dashboard")
            }
        } catch (error: any) {
            console.error(error) // Use console.error for errors
            setErr(error.response?.data.message)
        }
        finally {
            // Clear error message after 2 seconds
            setTimeout(() => {
                setErr('')
            }, 2000)
        }
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            {/* Left side - Workflow Animation */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
                <div className="text-white space-y-8">
                    <h2 className="text-4xl font-bold">Project Management Workflow</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="text-xl">Plan Projects</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="text-xl">Collaborate</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <span className="text-xl">Track Progress</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 shadow-2xl p-8 rounded-xl">
                    <CardHeader className="space-y-1 text-center py-10">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Please sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="emailAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Email Address</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter your email" 
                                                    {...field}
                                                    className="rounded-lg placeholder:text-gray-400 border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="password" 
                                                    placeholder="Enter your password" 
                                                    {...field}
                                                    className="rounded-lg placeholder:text-gray-400 border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center justify-between">
                                    <FormField
                                        control={form.control}
                                        name="rememberMe"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox 
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="border-gray-300 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal text-gray-600">Remember me</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <a href="#" className="text-sm text-purple-600 hover:text-purple-500 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-2.5"
                                >
                                    Sign In
                                </Button>
                                {err && <p className="text-center text-red-600">{err}</p>}
                            </form>
                        </Form>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <NavLink to="/signup" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                                Sign up
                            </NavLink>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}