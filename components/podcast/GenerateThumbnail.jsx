import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '../ui/textarea'
import { Loader } from 'lucide-react'
import { Input } from '../ui/input'

const GenerateThumbnail = ({
    setImage,setImageStorageId,image,imagePrompt,setImagePrompt
}) => {
    const [isAiThumbnail,setIsAiThumbnail] = useState(false)
    const [IsImageLoading,setIsImageLoading] = useState<Boolean>(false)
    const imageRef = useRef<HTMLInputElement>(null)
  return (
    <div className='genereate_thumbnail'>
        <Button
        type='button'
        variant='plain'
        onClick={()=>setIsAiThumbnail(true)}
        className={cn("",{
            'bg-black-6':isAiThumbnail
        })}
        
        >
            Use AI to generate thumbnail
        </Button>
        <Button
        type='button'
        variant='plain'
        onClick={()=>setIsAiThumbnail(false)}
        className={cn("",{
            'bg-black-6':!isAiThumbnail
        })}
                
        >
            Use AI to generate thumbnail
        </Button>
        {isAiThumbnail ? <div className='flex flex-col gap-5'>
            <div className="flex flex-col gap-2.5">
                <Label className='text-16 font-bold text-white-1'>
                    AI Prompt to generate Image/Thumbnail

                </Label>
                <Textarea
                    className='input-class font-light focus-visible:ring-offset-orange-1 ' placeholder='Provide text to generate thumnail' rows={5}
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                />
            </div>
            <div className=" w-full max-w-[200px]">
                <Button type="submit"
                onClick={generatePodcast}
                className="text-16 bg-orange-1 font-bold text-white-1 ">
                    {IsImageLoading ? (
                        <>
                            Generating
                            <Loader size={20} className="animate-spin ml-2" />
                        </>
                    ) : (
                        'Generate'
                    )}
                </Button>
            </div>
        </div> : <div className='image_div' onClick={()=>imageRef?.current?.click()}>
            <Input
                type='file'
                className='hidden'
                ref={imageRef}

                    

            />

        </div>}
      
    </div>
  )
}

export default GenerateThumbnail
