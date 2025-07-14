import { z } from "zod"

export const formSchema = z.object({
    title:z.string().min(3,{message:"Title is required, must be at least 3 characters"}).max(100,{message:"Title must be less than 100 characters"}),
    description:z.string().min(20,{message:"Description is required, must be at least 20 characters"}).max(1000,{message:"Description must be less than 1000 characters"}),
    category:z.string().min(1,{message:"Category is required"}).max(100,{message:"Category must be less than 100 characters"}),
    link:z.string().url().refine(async (url)=>{
        try{
            const resp = await fetch(url,{method:"HEAD"})
            const contentType = resp.headers.get("content-type")
            if(contentType && contentType.includes("image")){
                return true
            }
            return false
        }catch(error){
            return false
        }
    },{message:"Invalid URL or not an image"}),
    pitch:z.string().min(10,{message:"Pitch is required, must be at least 10 characters"}).max(5000,{message:"Pitch must be less than 5000 characters"}),
})

