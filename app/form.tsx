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
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { PutBlobResult } from "@vercel/blob"
import UploadedFilesList from "@/components/ui/uploadedFilesList"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
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
  uploadedFiles: z.array(z.string()).refine((files) => {
    return files.length > 0;
  }, { message: "Please upload at least one file." }),
  terms_accept: z.boolean().optional().refine((value) => {
    console.log('terms_accept', value === true);
    return value === true;
  }, {
    message: 'You must accept the terms and conditions.',
  }),
}).refine((check) => check.email === check.re_enter_email, {path: ['re_enter_email'], message: 'Email does not match'});



const uploadTerms = [
    "PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months. Example: If today is 30 Sep 23, then please upload bank statements from Mar 23 to Aug 23 (both months inclusive)",
    "If your company is multi-banked, then please upload 6 months bank statements for each bank account",
    "If your file is password protected, we request you to remove the password and upload the file to avoid submission failure",
    "In case if you are facing any issue while uploading bank statements, Please contact us on support@credilinq.ai",
];

const termsConditions = [
    "I confirm that I am the authorized person to upload bank statements on behalf of my company",
    "I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated",
    "I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth",
    "I have read and understand the __terms_and_conditions__",
]

export function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    });

    const [blob, setBlob] = useState<PutBlobResult[]>([]);

    const handleFileUpload = async (uploadedFiles: FileWithPath[]) => {
        // Handle the uploaded PDF files, e.g., send them to a server or process them.
        console.log('Uploaded Files:', uploadedFiles);
        const fileNames = uploadedFiles.map((file) => file.name);
        // Update the form values with the array of file names
        form.setValue("uploadedFiles", fileNames);
        const newBlobs = [];

        for (const uploadedFile of uploadedFiles) {
            const response = await fetch(
              `/api/upload?filename=${uploadedFile.name}`,
              {
                method: 'POST',
                body: uploadedFile,
              },
            );

            if (response.ok) {
                const newBlob = (await response.json()) as PutBlobResult;
                newBlobs.push(newBlob);
            } else {
                console.error('File upload failed');
            }

        }
    
        setBlob(newBlobs);
    };
    
    async function onSubmit(form: z.infer<typeof formSchema>) {
        // Form values will be type-safe and validated.

        let requestBody = {
            company_uen: form.company_uen,
            company_name: form.company_name,
            full_name: form.full_name,
            position_within_company: form.position_within_company,
            email: form.email,
            phone: form.mobile_number,
            documents: blob.map((file) => ({
              file_name: file.pathname,
              path: file.url,
            })),
          };
        try {
            console.log('Form submitting:', form);
            // Send a POST request to the specified endpoint
            const response = await fetch('https://credilinq-backend.onrender.com/api/smehealthchecks', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });
        
            if (response.ok) {
              // Request was successful, handle the response as needed
              const responseData = await response.json();
              toast({
                title: "Wohoo!!",
                description: "Your details are submitted. We'll reach back shortly.",
              });
              console.log('Request was successful. Response:', responseData);
            } else {
              console.error('Request failed with status:', response.status);
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              });
            }
          } catch (error) {
            // network errors or other exceptions
            console.error('Request failed with error:', error);
          }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-5">
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
                                    <Input type="tel" minLength={11} maxLength={11} defaultValue="+65" {...field} />
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
                <div className="flex flex-col items-center space-y-5 w-full md:w-1/2">
                    <FileUploadComponent onUpload={handleFileUpload} />
                    {form.formState.errors.uploadedFiles && (
                        <FormMessage >
                        {form.formState.errors.uploadedFiles.message}
                        </FormMessage>
                    )}

                    {blob.length > 0 && (
                        <UploadedFilesList
                        files={blob.map((b) => ({
                            name: b.pathname,
                            url: b.url,
                        }))}
                        />
                    )}
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
        <Card>
            <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row w-full justify-around items-center space-y-4 md:space-x-4 md:space-y-0">
                <div className="flex flex-col w-full md:w-auto mx-5 space-x-2 space-y-5">
                        <FormField
                            control={form.control}
                            name="terms_accept"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-row space-x-2">
                                        <FormControl>
                                            <Checkbox id="terms1" checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                            {form.formState.errors.terms_accept && (
                                                <FormMessage >
                                                {form.formState.errors.terms_accept.message}
                                                </FormMessage>
                                            )}
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                            htmlFor="terms1"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Accept terms and conditions
                                            </label>
                                            <p className="text-sm text-muted-foreground">
                                                By ticking, you are confirming that you have understood and are agreeing to the details mentioned:
                                            </p>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    <div className="w-full md:w-auto">
                        {termsConditions.map((terms, index) => (
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
                                <p className="text-xs font-extralight leading-7 tracking-wide">
                                {terms.includes("__terms_and_conditions__") ? (
                                    terms.split("__terms_and_conditions__").map((text, subIndex) => (
                                        subIndex === 0 ? (
                                            <span key={subIndex}>{text}</span>
                                        ) : (
                                            <a
                                                key={subIndex}
                                                href="https://smehealthcheck.credilinq.ai/terms-and-conditions"
                                                style={{ color: "rgb(96, 26, 121)" }}
                                                target="_blank"
                                            >
                                                Terms & Conditions
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
                </div>
            </CardContent>
        </Card>

        <div className="flex ml-auto">
            <Button type="submit" className="ml-auto">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
