import { PodcastCardProps } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const PodcastCard = ({
    imgUrl,title,description,podcastId
}:PodcastCardProps) => {
    const router = useRouter()

    const handleViews = ()=>{
        router.push(`/podcasts/${podcastId}`,{
            scroll:true
        })
        
    }
  return (
    <div className='cursor-pointer' key={podcastId} onClick={handleViews}>
        <figure className='flex flex-col gap-2'>
            <Image className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]' src={imgUrl} alt={title} width={174}  height={174}/>
        <div className='flex flex-col ' >
            <h1 className='text-16 truncate font-bold text-white-1'>{title}</h1>
            <h2 className='text-12 truncate font-normal caitalize text-white-1'>{description}</h2>
        </div>
        </figure>
      
    </div>
  )
}

export default PodcastCard
