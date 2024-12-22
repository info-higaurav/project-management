"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { format, differenceInYears, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  emailAddress: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  userRole: z.enum(["manager", "admin", "user"]),
  dateOfBirth: z.date().refine((date) => {
    const age = differenceInYears(new Date(), date);
    return age >= 18;
  }, "You must be at least 18 years old"),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    pinCode: z.string(),
    country: z.string(),
  }),
})

export default function CreateUser() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      userRole: "manager",
      dateOfBirth: undefined,
      address: {
        street: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
      },
    },
  })

  const calculateAge = (date: Date) => {
    return differenceInYears(new Date(), date);
  };

  const formatDisplayDate = (date: Date) => {
    return format(date, "dd/MM/yyyy");
  };



  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const inputValue = e.target.value;
    
    // Allow typing in the input field
    if (inputValue === "") {
      field.onChange(undefined);
      return;
    }

    // Only try to parse if we have a complete date format
    if (inputValue.length === 10) {
      try {
        const [day, month, year] = inputValue.split('/').map(Number);
        const parsedDate = new Date(year, month - 1, day);
        
        if (isValid(parsedDate)) {
          const age = calculateAge(parsedDate);
          if (age < 18) {
            form.setError("dateOfBirth", {
              type: "manual",
              message: "You must be at least 18 years old"
            });
          } else {
            form.clearErrors("dateOfBirth");
            field.onChange(parsedDate);
          }
        }
      } catch (error) {
        form.setError("dateOfBirth", {
          type: "manual",
          message: "Please enter a valid date in DD/MM/YYYY format"
        });
      }
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-indigo-500/30 transition-all p-6 space-y-8 shadow-xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Create New User</h2>
          <p className="text-gray-400">Add a new user to your organization</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white placeholder:text-gray-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Doe" 
                        className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white placeholder:text-gray-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white placeholder:text-gray-500" 
                      {...field} 
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
                      className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">User Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="manager" className="text-white hover:bg-gray-700">Manager</SelectItem>
                      <SelectItem value="admin" className="text-white hover:bg-gray-700">Admin</SelectItem>
                      <SelectItem value="user" className="text-white hover:bg-gray-700">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-300">Date of Birth</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={field.value ? formatDisplayDate(field.value) : field.value === undefined ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow direct typing
                          if (value.length <= 10) {
                            // Auto-add slashes
                            let formattedValue = value.replace(/\D/g, '');
                            if (formattedValue.length >= 2) {
                              formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
                            }
                            if (formattedValue.length >= 5) {
                              formattedValue = formattedValue.slice(0, 5) + '/' + formattedValue.slice(5);
                            }
                            e.target.value = formattedValue;
                            handleDateInput(e, field);
                          }
                        }}
                        className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white"
                      />
                    </FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-10 p-0",
                            "bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800"
                          )}
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              const age = calculateAge(date);
                              if (age < 18) {
                                form.setError("dateOfBirth", {
                                  type: "manual",
                                  message: "You must be at least 18 years old"
                                });
                              } else {
                                form.clearErrors("dateOfBirth");
                              }
                              field.onChange(date);
                            }
                          }}
                          initialFocus
                          className="bg-gray-800 text-white rounded-md border-gray-700"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {field.value && (
                    <p className="text-sm text-gray-400 mt-1">
                      Age: {calculateAge(field.value)} years
                    </p>
                  )}
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Address</h3>
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Street</FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">City</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">State</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Pin Code</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Country</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-900/50 border-gray-700 focus:border-indigo-500/50 text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-indigo-900 hover:from-indigo-700 hover:to-indigo-900 text-white">
              Create User
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}