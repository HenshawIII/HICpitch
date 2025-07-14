import { client } from '@/sanity/lib/client'
import { auth } from '@/auth'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import UserStartups from '@/components/UserStartups'


export default async function UserPage({params}:{params:Promise<{id:string}>}){
    const {id} = await params
    const session = await auth()
    const user = await client.fetch(
        `*[_type == "author" && _id == $id][0]{
            _id,
            id,
            username,
            email,
            bio,
            name,
            image,
        }`
    ,{id})
    if(!user){
        return notFound()
    }
    // console.log("user",user)
    return(
        <>
        <section className="profile_container">
            <div className="profile_card">
                <div className="profile_title">
                    <h3 className="uppercase text-center line-clamp-1 text-24-black">{user.name}</h3>
                </div>
                <Image src={user.image} alt={user.name} width={220} height={220} className='profile_image' />
                <p className='text-30-extrabold mt-7 text-center'>@{user.username}</p>
                <p className='text-14-normal mt-1 text-center'>{user.email}</p>
                <p className='text-14-normal mt-1 text-center'>{user.bio}</p>
            </div>
            <div className="flex-1 flex flex-col gap-4 lg:mt-5">
                <p className="text-30-bold">{session?.user?.id === user._id ? "Your" : "All"} Startups</p>
                <UserStartups user={user} />
            </div>
            
        </section>
       
        </>
    )
}   