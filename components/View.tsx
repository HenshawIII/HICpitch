import React from 'react'
import Ping from './Ping'
import {client} from '@/sanity/lib/client'  
import {getStartupByViews} from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'

export default async function View({id}:{id:string}) {
    const {views:viewsCount} = await client.withConfig({useCdn:false}).fetch(getStartupByViews,{id})
    const viewsCountText = viewsCount === 1 ? "view" : "views"


    //TODO: increment views count

    await writeClient.patch(id).set({views:viewsCount+1}).commit()

    return (
        <div className="view-container">
           <div className="absolute -top-2 -right-2"> 
            <Ping/>
           </div>

           <p className="view-text">
            <span className="font-black">{viewsCount} {viewsCountText}</span>
           </p>
        </div>
    )
}