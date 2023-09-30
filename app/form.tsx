"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  company_uen: z.string().refine((value) => {
    // Check if the length is between 9 and 10 characters
    if (value.length < 9 || value.length > 10) return false;
  
    // Check if the last character is a capital letter
    const lastCharacter = value.charAt(value.length - 1);
    if (!/[A-Z]/.test(lastCharacter)) return false;
  
    // Check if all other characters are numbers
    const numericPart = value.slice(0, -1); // Exclude the last character
    if (!/^\d+$/.test(numericPart)) return false;
  
    return true;
  }, {
    message: "Invalid Singapore UEN format",
  }),
  company_name: z.string().min(2, {
    message: "Minimum 2 characters required",
  }),
  full_name: z.string().min(2, {
    message: "Minimum 2 characters required",
  }),
  position_within_company: z.string().min(2, {
    message: "Minimum 2 characters required",
  }),
  email: z.string().refine((value) => {
    const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(value);
  }, {
    message: "Enter a valid email",
  }),
  re_enter_email: z.string().refine((value) => {
    const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(value);
  }, {
    message: "Enter a valid email",
  }),
  mobile_number: z.string().refine((value) => {
    // Regular expression to validate Singapore mobile numbers with country code.
    const singaporeMobileNumberRegex = /^\+65\d{8}$/;
    return singaporeMobileNumberRegex.test(value);
  }, {
    message: "Enter a 8-digit Mobile Number",
  }),
}).refine((check) => check.email === check.re_enter_email, {path: ['re_enter_email'], message: 'Email does not match'});

export function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-around items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <FormField
                        control={form.control}
                        name="company_uen"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Company UEN</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your company UEN" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-around items-center space-y-4 md:flex-col md:space-y-5">
                <div className="md:flex md:space-x-4 md:space-y-0 space-y-4 w-full">
                    <div className="w-full md:w-1/2">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <FormField
                            control={form.control}
                            name="position_within_company"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Position within company</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="md:flex md:space-x-4 md:space-y-0 md:w-full space-y-4 w-full">
                    <div className="w-full md:w-1/2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <FormField
                            control={form.control}
                            name="re_enter_email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Re-enter Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="md:flex md:space-x-4 md:space-y-0 md:w-full space-y-4 w-full">
                    <div className="w-full md:w-1/2">
                        <FormField
                            control={form.control}
                            name="mobile_number"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Mobile Number</FormLabel>
                                <FormControl>
                                    <Input type="tel" minLength={10} maxLength={10} defaultValue="+65" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
        

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
