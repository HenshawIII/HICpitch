import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth ,signIn,signOut} from '@/auth'
import logo from '@/public/logr.png'

const Navbar = async () => {
  const session = await auth()
  // console.log(session)  

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans text-black w-full'>
        <nav className=' flex justify-between items-center'>
            <Link href="/">
                <Image src={logo} alt='' width={144} height={30}/>
            </Link>

            <div className='flex flex-row items-center gap-5'> 
        {
          session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form action={async () => {
                "use server"
                await signOut({redirectTo:"/"})}} className=' text-gray-600 hover:text-gray-800 '>
                <button type='submit'> LogOut</button > 
              </form>

              <Link href={`user/${session.user.id}`}>
                {/* <span>{session?.user?.name}</span> */}
                <Image src={session?.user?.image || ""} alt={session?.user?.name || ""} width={32} height={32} className='rounded-full' />
              </Link>

            </>
          ):(<>
          <form action={async ()=>{
            "use server"
            await signIn('github')}} className=' text-gray-600 hover:text-gray-800'>
            <button type='submit'>
              Login
            </button>
          </form>
          </>)
        }
        </div>
        </nav>

       
    </header>
  )
}

export default Navbar