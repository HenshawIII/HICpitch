"use server"

import { auth } from "@/auth"
import { formSchema } from "./validation"
import { toJSON } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"

export const createStartup = async(state:any,formData:FormData,pitch:string)=>{
    const session = await auth()
    if(!session){
        return toJSON({
            error:"Not signed in",
            status:"ERROR"
        })
    }
    try {
       const {title,description,category,link} = Object.fromEntries(
        Array.from(formData).filter(([key])=>key !== "pitch")
       )
       const slug = slugify(title as string,{lower:true,strict:true})

       try {
        const result = await writeClient.create({
            _type:"startup",
            title,
            description,
            category,
            image:link,
            slug:{
                _type:"slug",
                current:slug
            },
            author:{
                _type:"reference",
                _ref:session.user?.id
            },
            pitch,
        })

        return toJSON({
            ...result,
            error:"",
            status:"SUCCESS"
        })
       } catch (error) {
        console.log(error)
        return toJSON({
            error:JSON.stringify(error),
            status:"ERROR"
        })
       }
    } catch (error) {
        console.log(error)
        return toJSON({
            error:JSON.stringify(error),
            status:"ERROR"
        })
    }
}
