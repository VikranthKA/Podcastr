import Image from 'next/image'
import React from 'react'

const PodcastCard = ({
    imgURL,title,description,podcastId
}:{
    imgURL:string,
    title:string,
    description:string,
    podcastId:number

}) => {
  return (
    <div className='cursor-pointer'>
        <figure className='flex flex-col gap-2'>
            {/* <Image className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]' src={imgURL} alt={title} width={174}  height={174}/> */}
        <div className='flex flex-col ' >
            <h1 className='text-16 truncate font-bold text-white-1'>{title}</h1>
            <h2 className='text-12 truncate font-normal caitalize text-white-1'>{description}</h2>
        </div>
        </figure>
      
    </div>
  )
}

export default PodcastCard
