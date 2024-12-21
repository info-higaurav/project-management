import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useState } from "react"
import * as z from "zod"
import { NavLink, useNavigate } from "react-router-dom"

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

import loginValidationSchema from "@/helper/validation/login validation"
import Fade from "@/helper/motion/fade/fade"


export default function Login() {
    const [loading , setLoading]=useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    // handling form data
    const form = useForm<z.infer<typeof loginValidationSchema>>({
        resolver: zodResolver(loginValidationSchema),
        defaultValues: {
            emailAddress: "",
            password: "",
            rememberMe: false,
        },
    })

    async function onSubmit(values: z.infer<typeof loginValidationSchema>) {
        try {
            setLoading(true)
            setError('')
        
            const endpoint = import.meta.env.VITE_API_URL;
            const res = await axios.post(
                `${endpoint}/api/v1/users/login`,
                values,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )

            if (res.status === 200) { // Use strict equality
                form.reset();
                navigate("/dashboard")
            }
        } catch (error: any) {
            console.error(error) // Use console.error for errors
            setError(error.response?.data.message)
        }
        finally {
            setLoading(false)
            
        }
    }

    return (
        <Fade>
        <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            {/* Left side - Workflow Animation */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
                <div className="text-white space-y-8">
                    <h2 className="text-4xl font-bold">Project Management Workflow</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="text-xl">Plan Projects</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="text-xl">Collaborate</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-lg">
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
                <Card className="w-full max-w-md backdrop-blur-sm bg-gray-900/90 shadow-2xl p-8 rounded-xl border border-gray-800">
                    <CardHeader className="space-y-1 text-center py-10">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-gray-400">
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
                                            <FormLabel className="text-gray-300">Email Address</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter your email" 
                                                    {...field}
                                                    className="rounded-lg placeholder:text-gray-500 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-white"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="password" 
                                                    placeholder="Enter your password" 
                                                    {...field}
                                                    className="rounded-lg placeholder:text-gray-500 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-white"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
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
                                                        className="border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-800"
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal text-gray-400">Remember me</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg py-2.5"
                                >
                                   {loading ? 'Loading...' : ' Sign In'}
                                </Button>
                                {error && <p className="text-center text-red-400">{error}</p>}
                            </form>
                        </Form>

                        <p className="mt-6 text-center text-sm text-gray-400">
                            Don't have an account?{' '}
                            <NavLink to="/signup" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                                Sign up
                            </NavLink>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
        </Fade>
    )
}