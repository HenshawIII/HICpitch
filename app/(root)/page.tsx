import React from "react";
import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
// import { StartupCardType } from "@/components/StartupCard";
import {getStartups} from "@/sanity/lib/queries"
import {client} from "@/sanity/lib/client"
import {SanityLive,sanityFetch} from "@/sanity/lib/live"
import { auth } from "@/auth";

export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
 const query :any= (await searchParams).query

  // const posts = await client.fetch(getStartups)
  const params = {search:query || null}
  const {data:posts} = await sanityFetch({query:getStartups,params})

  // console.log(posts)

  const session = await auth()
  console.log(session)

// const posts = [ 
//   {
//     _createdAt: new Date("2023-10-01"),
//     views: 120,
//     author: { _id: 1, name: "John Doe" },
//     _id: 1,
//     description: "A new app for task management.",
//     image: "https://placehold.co/600x400",
//     category: "Productivity",
//     title: "TaskMaster"
//     },
//     {
//     _createdAt: new Date("2023-09-15"),
//     views: 85,
//     author: { _id: 2, name: "Jane Smith" },
//     _id: 2,
//     description: "An innovative platform for online learning.",
//     image: "https://placehold.co/600x400",
//     category: "Education",
//     title: "LearnHub"
//     },
//     {
//     _createdAt: new Date("2023-08-20"),
//     views: 200,
//     author: { _id: 3, name: "Alice Johnson" },
//     _id: 3,
//     description: "A social network for pet owners.",
//     image: "https://placehold.co/600x400",
//     category: "Social",
//     title: "PetConnect"
//     },
//     {
//     _createdAt: new Date("2023-07-30"),
//     views: 150,
//     author: { _id: 4, name: "Bob Brown" },
//     _id: 4,
//     description: "A marketplace for handmade crafts.",
//     image: "https://placehold.co/600x400",
//     category: "E-commerce",
//     title: "Crafty"
//     },
//     {
//     _createdAt: new Date("2023-06-25"),
//     views: 95,
//     author: { _id: 5, name: "Charlie Davis" },
//     _id: 5,
//     description: "An app for workout plans.",
//     image: "https://placehold.co/600x400",
//     category: "Health & Fitness",
//     title: "FitLife"
//   }
// ]

// console.log("What is this ?,Client/Server")

  return (
    <>
    <section className="pink_container">
    <h1 className="heading">Pitch your startup,<br/> Connect with entrepreneurs</h1>
    <p className="sub-heading !max-w-3xl">
      Sign in to create your pitch and connect with founders.
    </p>
    <SearchForm query={query}/>
    </section>
    
    <section className="section_container">
<p className="text-30-semibold ">
{query ? `Search results for "${query}"` : "All startups"}
</p>

    <ul className="mt-7 card_grid">
    {
      posts?.length>0?(
        posts.map((post:any,i:number)=>{
          return <StartupCard key={i} post={post}/>
        })
      ):(<p className="no-results">No results found</p>)
    }
    </ul>

    </section>
    <SanityLive/>
    </>
  );
}
