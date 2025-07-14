import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { authorById } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user,account,profile,email,credentials}){ 
      // console.log(user,account,profile,email,credentials)
      const existingUser = await client.fetch(authorById,{id:profile?.id})
      if(!existingUser){
        await writeClient.create({
          _type:"author",
          id:profile?.id,
          name:user?.name,
          username:profile?.login,
          image:user?.image,
          email:user?.email,
          bio:profile?.bio || "",
        })
      }
      return true
    },
    async jwt({token,account,profile}){
      if(account && profile){
        const user = await client.fetch(authorById,{id:profile?.id})
        token.id = user?._id
      }
      return token
    },
    async session({session,token}){
      Object.assign(session.user,{
        id:token.id,
      })
      return session
    }
    
  }
})