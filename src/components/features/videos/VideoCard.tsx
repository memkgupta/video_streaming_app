'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Video } from "@/types/index"
import { useRouter } from "next/navigation"
import Image from "next/image"

export const VideoCard = ({ video }: { video: Video }) => {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/watch/${video.id}`)}
      className="cursor-pointer hover:shadow-xl transition-shadow rounded-2xl"
    >
      <div className="relative h-48 w-full rounded-t-2xl overflow-hidden">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="pt-4 space-y-1">
        <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
        {/* <p className="text-xs text-muted-foreground">{video.}</p> */}
        {/* <p className="text-xs text-muted-foreground">{video.views.toLocaleString()} views • {new Date(video.uploadedAt).toLocaleDateString()}</p> */}
      </CardContent>
    </Card>
  )
}
