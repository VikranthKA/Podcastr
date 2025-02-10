"use client";
import React from 'react'
import PodcastCard from '@/components/podcast/PodcastCard'
import { podcastData } from '@/constants'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Home = () => {
  const trendingPodcasts = useQuery(api?.podcasts?.getTrendingPodcasts);


  // console.log( 
  //   process.env.CONVEX_DEPLOYMENT,"1",
  //   process.env.NEXT_PUBLIC_CONVEX_URL,"2",
  //   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,"3",
  //   process.env.CLERK_SECRET_KEY,"4",
  //   process.env.CLERK_WEBHOOK_SECRET,"5",
  //   "home")
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className="text-20 font-bold text-white-1">
          Trending Potcasts

        </h1>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white-1">
          {/* {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)} */}
        </main>
        <div className="podcast_grid">

          {trendingPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
            <PodcastCard
              key={_id}
              imgURL={imageUrl}
              title={podcastTitle}
              description={podcastDescription}
              podcastId={_id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
