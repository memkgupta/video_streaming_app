import { Button } from '@/components/ui/button';
import { FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { VideoDetailsForm } from '@/types';
import React from 'react'
import { useForm } from 'react-hook-form';
import { ThumbnailInput } from '../thumbnail-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VideoDetails = () => {
      const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoDetailsForm>();



  const onSubmit = (data: VideoDetailsForm) => {
   
    console.log("Form submitted", data);
  };
  return (
    <div>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter video title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="What's your video about?"
          {...register("description")}
        />
      </div>

      {/* Thumbnail */}
      {/* <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          {...register("thumbnail")}
        />
      </div> */}
<FormField 
name='thumbnail'
control={control}

render={({field})=>(
    <ThumbnailInput onChange={field.onChange}/>
)}
/>


      {/* Visibility */}
<FormField
    name='visibility'
    control={control}
    render={({field})=>( <div className="space-y-2">
      <Label>Visibility</Label>
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="unlisted">Unlisted</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
    </div>)}
/>

      {/* Submit */}
      <Button type="submit">Save Details</Button>

      {/* {submittedData && (
        <pre className="text-sm bg-muted p-4 rounded">
          {JSON.stringify(submittedData, null, 2)}
        </pre>
      )} */}
    </form>
    </div>
  )
}

export default VideoDetails