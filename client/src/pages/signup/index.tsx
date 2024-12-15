import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Schema for signup form validation
const signupSchema = z.object({
  emailAddress: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const { confirmPassword, ...data } = values;
    try {
      setIsLoading(true);
      const endpoint = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${endpoint}/api/v1/users/signup`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      
      if (response.status === 201) {
        form.reset();
        navigate("/dashboard");
        return;
      }
      
    } catch (error: any) {
      setError(error.response?.data.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side - Features */}
        <div className="w-full lg:w-1/2 text-white space-y-8 p-8">
          <div className="flex items-center text-2xl font-bold mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            Project Flow
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">Manage Projects Efficiently</h2>
            <ul className="space-y-6 text-xl">
              <li className="flex items-center">
                <span className="mr-3 p-2 bg-white/10 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
                Task Organization & Planning
              </li>
              <li className="flex items-center">
                <span className="mr-3 p-2 bg-white/10 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                Team Collaboration
              </li>
              <li className="flex items-center">
                <span className="mr-3 p-2 bg-white/10 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                Progress Tracking
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full max-w-[420px] bg-white/95 dark:bg-zinc-900/95 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="p-8">
            <div className="flex flex-col space-y-3 text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Get Started Today
              </h1>
              <p className="text-base text-muted-foreground">
                Join our project flow platform
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Email</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-50/50 placeholder:text-gray-400 dark:bg-zinc-800/50 rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" 
                          placeholder="sample@gmail.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Password</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-50/50 placeholder:text-gray-400 dark:bg-zinc-800/50 rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" 
                          type="password" 
                          placeholder="Create a secure password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-50/50 placeholder:text-gray-400 dark:bg-zinc-800/50 rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" 
                          type="password" 
                          placeholder="Verify your password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
                <Button 
                  className="w-full bg-gradient-to-r rounded-xl from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity text-lg font-medium h-11" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="mr-2 h-5 w-5 animate-spin">⌛</span>
                  )}
                  Create Account
                </Button>
                {error && <p className="text-center text-orange-600">{error}</p>}
              </form>
            </Form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-[#FF4B4B] hover:text-[#2EADA4] transition-colors font-medium"
              >
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
