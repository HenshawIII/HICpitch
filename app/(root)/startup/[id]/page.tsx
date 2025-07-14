import {getPlaylists,getStartupById} from '@/sanity/lib/queries'
import {client} from '@/sanity/lib/client'
import {SanityLive,sanityFetch} from '@/sanity/lib/live'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import {Suspense} from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'
import { StartupCardType } from '@/components/StartupCard'
import StartupCard from '@/components/StartupCard'

const page = async ({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params
//   const {data:post} = await sanityFetch({query:getStartupBySlug,params:{slug:id}})

const post = await client.fetch(getStartupById,{id})
const {select:editorsPick} = await client.fetch(getPlaylists,{slug:"editors-pick"})
// console.log(post)
// console.log(editorsPick)
const md = markdownit()
const html = md.render(post.pitch)
if(!post) return notFound()
  return (
    <div>
       <section className='pink_container !min-h-[230px]'>
            <p className="tag">{formatDate(post._createdAt)}</p>
            <h1 className='heading'>{post.title}</h1>
            <p className="sub-heading !max-w-5xl">{post.description}</p>
       </section>
       <section className="section_container">
        <img src={post.image} alt="thumbnail" className='w-full h-auto rounded-xl' />
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
             <div className='flex-between gap-5'>
                    <Link href={`/user/${post.author._id}`} className='flex items-center gap-2 mb-3'>
                        <Image src={post.author.image} alt={`${post.author.name} avatar`} width={64} height={64} className='rounded-full drop-shadow-lg' />
                        <div>
                            <p className='text-20-medium'>{post.author.name}</p>
                            <p className='text-20-medium !text-black-300'>@{post.author.username}</p>
                        </div>
                    </Link>
                    <p className="category-tag">
                        {post.category}
                    </p>
             </div>
             <h3 className='text-30-bold'>Pitch Details</h3>
             {html ? <article className='prose max-w-4xl break-all font-work-sans' dangerouslySetInnerHTML={{__html:html}} /> : <p className="no-result">No pitch details</p>}
        </div>
        <hr className='divider' />

        {/*TODO: recommended startups */}
       {
        editorsPick.length > 0 ? (
            <div className='mx-auto max-w-4xl'>
                <h3 className='text-30-semibold'>Editors Pick</h3>
                <ul className='mt-7 card_grid-sm'>
                    {editorsPick.map((startup:StartupCardType,i:number)=>(
                        <StartupCard key={i} post={startup} />
                    ))}
                </ul>
            </div>
        ):(<p className='no-result'>No editors pick</p>)
       }


        <Suspense fallback={<Skeleton className='view_skeleton' />}>
            <View id={id} />
        </Suspense>
       </section>
    </div>
  )
}

export default page