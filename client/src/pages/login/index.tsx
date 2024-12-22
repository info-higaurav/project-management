import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useState } from "react"
import * as z from "zod"
import { NavLink, useNavigate } from "react-router-dom"
import { Copy } from "lucide-react"

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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog"

import loginValidationSchema from "@/helper/validation/login validation"
import Fade from "@/helper/motion/fade/fade"
import { LogIn } from "lucide-react"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showCredentials, setShowCredentials] = useState(false)
  const [copySuccess, setCopySuccess] = useState<string>('')
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

  const handleDemoCredentials = () => {
    setShowCredentials(true)
  }

  const credentials = {
    admin: {
      email: 'admin@gmail.com',
      password: 'Admin@12345'
    },
    manager: {
      email: 'manager@gmail.com',
      password: 'Manager@12345'
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(`${type} copied!`)
      setTimeout(() => setCopySuccess(''), 2000)
    } catch (err) {
      setCopySuccess('Failed to copy!')
    }
  }

  const handleAutoFill = (email: string, password: string) => {
    form.setValue('emailAddress', email)
    form.setValue('password', password)
    setShowCredentials(false)
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
              <Button
                type="button"
                variant="outline"
                onClick={handleDemoCredentials}
                className="mt-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300"
              >
                View Demo Credentials 👀
              </Button>
              <Dialog open={showCredentials} onOpenChange={setShowCredentials}>
                <DialogContent className="bg-gray-900/95 border border-gray-800 backdrop-blur-xl max-w-[95vw] w-full sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                  <div className="space-y-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        Demo Credentials
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Choose an account type to explore the application
                      </DialogDescription>
                    </DialogHeader>

                    {/* Admin Section */}
                    <div className="p-3 sm:p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <h4 className="text-base sm:text-lg font-medium text-emerald-400">Admin Access</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 mb-4">Full access to all features including user management and system settings</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-gray-800/50 p-2 rounded-md">
                            <p className="text-emerald-300 text-xs sm:text-sm break-all pr-2">Email: {credentials.admin.email}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/20 flex-shrink-0"
                              onClick={() => copyToClipboard(credentials.admin.email, 'Admin email')}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between bg-gray-800/50 p-2 rounded-md">
                            <p className="text-emerald-300 text-xs sm:text-sm break-all pr-2">Password: {credentials.admin.password}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/20 flex-shrink-0"
                              onClick={() => copyToClipboard(credentials.admin.password, 'Admin password')}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            onClick={() => handleAutoFill(credentials.admin.email, credentials.admin.password)}
                            className="w-full mt-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 text-xs sm:text-sm"
                          >
                            <LogIn className="w-4 h-4 mr-2" />
                            Auto-fill Admin Credentials
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Manager Section */}
                    <div className="p-3 sm:p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h4 className="text-base sm:text-lg font-medium text-emerald-400">Manager Access</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 mb-4">Access to project management and team collaboration features</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-gray-800/50 p-2 rounded-md">
                            <p className="text-emerald-300 text-xs sm:text-sm break-all pr-2">Email: {credentials.manager.email}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/20 flex-shrink-0"
                              onClick={() => copyToClipboard(credentials.manager.email, 'Manager email')}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between bg-gray-800/50 p-2 rounded-md">
                            <p className="text-emerald-300 text-xs sm:text-sm break-all pr-2">Password: {credentials.manager.password}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/20 flex-shrink-0"
                              onClick={() => copyToClipboard(credentials.manager.password, 'Manager password')}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            onClick={() => handleAutoFill(credentials.manager.email, credentials.manager.password)}
                            className="w-full mt-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 text-xs sm:text-sm"
                          >
                            <LogIn className="w-4 h-4 mr-2" />
                            Auto-fill Manager Credentials
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {copySuccess && (
                    <p className="text-emerald-300 text-xs sm:text-sm text-center mt-4">
                      {copySuccess}
                    </p>
                  )}
                </DialogContent>
              </Dialog>
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