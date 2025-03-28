import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Header from './Header'
import Carousel from './Carousel'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const RightSidebar = () => {
  const user  = useUser()
  const topPodcasters = useQuery(api.user.getTopUserByPodcastCount)

  return (
<section className='right_sidebar text-white-1'>
  <SignedIn>
    <Link href={`/profile/${user?.id}`} 
    className='flex gap-3 pb-12'>
    <UserButton/>
    <div className="flex w-full items-center justify-between">

    </div>

    </Link>
    <h1 className='text-16 truncate font-semibold text-white-1'>

      {user?.firstName}
    </h1>
    <Image
      src="/icons/right-arrow.svg"
      alt='image'
      width={24}
      height={24}
    />

  </SignedIn>
  <section>
    <Header headerTitle='Fans Like you'/>
    <Carousel fansLikeDetail={topPodcasters!}/>
  </section>

Rightbar
</section>
  )
}

export default RightSidebar
