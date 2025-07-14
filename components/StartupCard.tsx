import React from 'react'
import {formatDate} from '@/lib/utils'
import { Eye, EyeIcon } from 'lucide-react'
import Link from 'next/link' 
import Image from 'next/image'  
import image from '@/public/logo.png' 
import { Button } from './ui/button'

export interface StartupCardType {
    _id: string;
    _createdAt: string;
    title: string;
    description: string;
    image: string;
    author: {
        _id: string;
        name: string;
        image?: string;
    };
    views: number;
    category: string;
}

const StartupCard = ({post}:{post:StartupCardType}) => {
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date '>
                {formatDate(post?._createdAt)}
            </p>
            <div className='flex gap-1.5'>
            <EyeIcon className='size-6 text-primary'/>
            <span className='text-16-medium'>{post?.views}</span>
            </div>
        </div>

        <div className='flex-between mt-5 gap-5'> 
            <div className='flex-1'>
                <Link href={`/user/${post?.author._id}`}>
                <p className='line-clamp-1 text-16-medium'>
                     {post.author.name}
                </p>
                </Link>
                <Link href={`/startup/${post._id}`} >
                    <h3 className='text-26-bold line-clamp-1 '>
                        {post.title}
                    </h3>
                </Link>
                </div>
                <Link href={`/user/${post?.author._id}`}>
                <Image src={post?.author?.image || ""} alt={""} width={48} height={32} className='rounded-full '/>
                </Link>
            
        </div>

        <Link href={`/startup/${post._id}`}>
        <p className='startup-car_desc'>{post.description}</p>
            <Image src={post.image} className='startup-card_img ' alt=""  width={100} height={100} />
         </Link> 

         <div className='flex-between mt-5 gap-3'>
            <Link href={`?query=${post.category.toLowerCase()}`}>
            <p className='text-16-medium'> {post.category}</p>
            </Link>
            <Button className='startup-card_btn' asChild>
                <Link href={`/startup/${post._id}`}>
                    Details
                </Link>
            </Button>
         </div>
    </li>
  )
}

export default StartupCard