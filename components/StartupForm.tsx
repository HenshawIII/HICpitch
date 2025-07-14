"use client"

import { signOut } from '@/auth'
import React, { useState,useActionState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createStartup } from '@/lib/actions'

export default function StartupForm() {
    const router = useRouter()
    const {toast} = useToast()
const [errors,setErrors] = useState<Record<string,string>>({})
const [pitch,setPitch] = useState<string>("")
// const [isPending,setIsPending] = useState<boolean>(false)
const handleSubmit = async (prevState:any,formData:FormData)=>{
    try {
        const formValues = {
            title:formData.get("title"),
            description:formData.get("description"),
            category:formData.get("category"),
            link:formData.get("link"),
            pitch,
        }
        await formSchema.parseAsync(formValues)

        console.log(formValues)
        
        const result = await createStartup(prevState,formData,pitch)
        console.log(result)
        if(result.status === "SUCCESS"){
            toast({
                title:"Startup created successfully",
                description:"Your startup has been created successfully",
                variant:"default"
            })

            router.push(`/startup/${result._id}`)
    }

        return{...prevState,error:"",status:"success",result}
    } catch (error) {

        if(error instanceof z.ZodError){
            const fieldErrors = error.flatten().fieldErrors
            // console.log(fieldErrors,error)
            setErrors(fieldErrors as unknown as Record<string,string>)
            console.log("errors",errors)

            toast({
                title:"Invalid form data",
                description:"Please check your form data and try again",
                variant:"destructive"
            })

            return{...prevState,error:"Invalid form data",status:"ERROR"}
        }   

        toast({
            title:"An unexpected error has occurred",
            description:"Please try again",
            variant:"destructive"
        })

        return{...prevState,error:"An unexpected error has occurred",status:"ERROR"}
    }
   
}

const [state,formAction,isPending] = useActionState(handleSubmit,{error:"",status:""})

    return (
        <>
          <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input name="title" id="title" type="text" placeholder='Enter your startup title' className='startup-form_input' required placeholder='Enter your startup title' />
                {errors.title && <p className='startup-form_error'>{errors.title[0]}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea name="description" id="description" type="text" placeholder='Enter your startup description' className='startup-form_textarea' required placeholder='Enter your startup description' />
                {errors.description && <p className='startup-form_error'>{errors.description[0]}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <Input name="category" id="category" type="text" placeholder='Startup category' className='startup-form_input' required placeholder='Enter your startup category' />
                {errors.category && <p className='startup-form_error'>{errors.category[0]}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">Link</label>
                <Input name="link" id="link" type="text" placeholder='Enter your startup link' className='startup-form_input' required placeholder='Enter your Image URL' />
                {errors.link && <p className='startup-form_error'>{errors.link[0]}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch</label>
                <MDEditor value={pitch} onChange={(value)=>setPitch(value as string)} id="pitch" preview="edit" height={300} style={{borderRadius:"20",overflow:"hidden"}} textareaProps={{
                    placeholder:"Describe your startupand what problem it solves"
                }} previewOptions={{
                    disallowedElements:["style"]
                }} />
                {errors.pitch && <p className='startup-form_error'>{errors.pitch[0]}</p>}
            </div>

            <Button type="submit" className='startup-form_btn' disabled={isPending}>{isPending ? "Submitting..." : "Submit"}<Send className='size-6 ml-1'/></Button>   
          </form>
        </>
    )
}