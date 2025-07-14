import { client } from '@/sanity/lib/client'
import React from 'react'
import StartupCard, { StartupCardType } from './StartupCard'

export default async function UserStartups({user}:{user:any}){
    const startups = await client.fetch(
        `*[_type == "startup" && defined(slug.current) && author._ref == $id] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    author->{name,bio,image,_id},
    description,
    views,
    category,
    image,  
}`
    ,{id:user._id})
    console.log("startups",startups)
    return(
        <>
            {
                startups.length > 0 ? (
                    startups.map((startup:StartupCardType)=>(
                        <StartupCard key={startup._id} post={startup} />
                    ))
                ):(
                    <div className="flex-1 flex flex-col gap-4 lg:mt-5">
                        <p className="no-result">No startups found</p>
                    </div>
                )            }
        </>
    )
}