'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { channelSchema } from '@/schemas/channel.schema'
import { ImageSelector } from '@/components/utils/image-selector/image-selector'
import { FormField } from '@/components/ui/form'


type ChannelFormData = z.infer<typeof channelSchema>

export default function ChannelForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ChannelFormData>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: '',
      description: '',
      banner: '',
      profile: '',
      handle: '',
      links: [{ title: '', url: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  })

  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [profilePreview, setProfilePreview] = useState<string | null>(null)

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'banner' | 'profile'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setValue(type, url)
    if (type === 'banner') setBannerPreview(url)
    else setProfilePreview(url)
  }

  const onSubmit = (data: ChannelFormData) => {
    console.log('Form data', data)
    // API call logic
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto py-10 px-4">
      <div className="space-y-2">
        <Label htmlFor="name">Channel Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="handle">Channel Handle</Label>
        <Input id="handle" {...register('handle')} />
        {errors.handle && <p className="text-red-500 text-sm">{errors.handle.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register('description')} />
      </div>

     <FormField
     control={control}
     name='profile'
     render={({field})=>{
        return(
             <div className="space-y-2">
        <Label htmlFor="profile">Profile Picture</Label>
       <ImageSelector key={"profile"} isRound preview={field.value} setImage={field.onChange} type='profile' />
        
        
      </div>
        )
     }}
     />

      <FormField
      control={control}
      name='banner'
      render={({field})=>(
        <div className="space-y-2">
        <Label htmlFor="banner">Banner</Label>
        
        <ImageSelector key={"banner"} isRound={false} preview={field.value?field.value:""} setImage={field.onChange} type='banner' size={{height:400,width:900}}/>
      </div>
      )}
      />

      <div className="space-y-4">
        <Label className="text-lg">Links</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <Input
                placeholder="Title"
                {...register(`links.${index}.title` as const)}
              />
              {errors.links?.[index]?.title && (
                <p className="text-sm text-red-500">
                  {errors.links[index]?.title?.message}
                </p>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <Input
                placeholder="https://"
                {...register(`links.${index}.url` as const)}
              />
              {errors.links?.[index]?.url && (
                <p className="text-sm text-red-500">
                  {errors.links[index]?.url?.message}
                </p>
              )}
            </div>
            <Button type="button" variant="ghost" onClick={() => remove(index)}>
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ title: '', url: '' })}>
          Add Link
        </Button>
      </div>

      <Button type="submit" className="mt-6">
        Save Channel Settings
      </Button>
    </form>
  )
}
