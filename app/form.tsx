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
import FileUploadComponent from "@/components/ui/fileUpload"
import { FileWithPath } from "react-dropzone"

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

const handleFileUpload = (uploadedFiles: FileWithPath[]) => {
    // Handle the uploaded PDF files, e.g., send them to a server or process them.
    console.log('Uploaded Files:', uploadedFiles);
  };

const uploadTerms = [
    "PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months. Example: If today is 30 Sep 23, then please upload bank statements from Mar 23 to Aug 23 (both months inclusive)",
    "If your company is multi-banked, then please upload 6 months bank statements for each bank account",
    "If your file is password protected, we request you to remove the password and upload the file to avoid submission failure",
    "In case if you are facing any issue while uploading bank statements, Please contact us on support@credilinq.ai",
];

export function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
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
        <Card>
            <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-around items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <FileUploadComponent onUpload={handleFileUpload} />
                </div>
                <div className="w-full md:w-1/2">
                    {uploadTerms.map((terms, index) => (
                        <div
                        key={index}
                        className="mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 space-x-5"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            className="mx-auto text-2xl rounded-full bg-opacity-12"
                        >
                            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </svg>
                        <div className="space-y-1">
                        <p className="text-sm font-light leading-7 tracking-wide">
                            {terms.includes('support@credilinq.ai') ? (
                                terms.split('support@credilinq.ai').map((text, index) => (
                                    index === 0 ? (
                                        <span key={index}>{text}</span>
                                    ) : (
                                        <a
                                            key={index}
                                            href={`mailto:support@credilinq.ai`}
                                            onMouseOver={(e) => {
                                                if (e.target instanceof HTMLAnchorElement) {
                                                    e.target.href = `mailto:support@credilinq.ai`
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (e.target instanceof HTMLAnchorElement) {
                                                    e.target.href = '#'
                                                }
                                            }}
                                            style={{color: "rgb(96, 26, 121)"}}
                                        >
                                            support@credilinq.ai
                                        </a>
                                    )
                                ))
                            ) : (
                                terms
                            )}
                        </p>
                        </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
