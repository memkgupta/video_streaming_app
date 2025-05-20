'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import ChannelForm from '@/components/features/forms/ChannelDetailsForm'

const channelSchema = z.object({
  name: z.string().min(2),
  handle: z.string().min(2),
  description: z.string().optional(),
  profile: z.any().optional(),
  banner: z.any().optional(),
  keywords: z.string().optional(),
  country: z.string().optional(),
})

type ChannelSettingsForm = z.infer<typeof channelSchema>

export default function ChannelSettingsTabs() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChannelSettingsForm>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: '',
      handle: '',
      description: '',
      keywords: '',
      country: '',
    },
  })

  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  const onSubmit = (data: ChannelSettingsForm) => {
    console.log(data)
    // API call or upload logic here
  }

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      if (type === 'profile') setProfilePreview(url)
      else setBannerPreview(url)
    }
  }

  return (
   <>
   <ChannelForm/>
   </>
  )
}
