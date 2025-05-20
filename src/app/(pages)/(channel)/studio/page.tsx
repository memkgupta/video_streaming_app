"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, EyeIcon, UsersIcon, VideoIcon, MessageSquare } from "lucide-react";
import Image from "next/image";
import React from "react";

// --- Dummy Data ---

const stats = [
  {
    title: "Subscribers",
    value: "1.2K",
    change: 5.2,
    icon: <UsersIcon className="w-5 h-5 text-muted-foreground" />,
  },
  {
    title: "Views",
    value: "43.8K",
    change: -3.4,
    icon: <EyeIcon className="w-5 h-5 text-muted-foreground" />,
  },
  {
    title: "Videos",
    value: 24,
    change: 0,
    icon: <VideoIcon className="w-5 h-5 text-muted-foreground" />,
  },
];

const recentUploads = [
  {
    id: "1",
    title: "Mastering TypeScript",
    thumbnail: "/placeholder-thumbnail.png",
    status: "Published",
    views: 1250,
  },
  {
    id: "2",
    title: "Intro to Next.js App Router",
    thumbnail: "/placeholder-thumbnail.png",
    status: "Scheduled",
    views: 0,
  },
];

const recentSubscribers = [
  {
    name: "Devendra Singh",
    profile: "/profile.png",
    joined: "2 hours ago",
  },
  {
    name: "Kriti Mehra",
    profile: "/profile.png",
    joined: "1 day ago",
  },
];

const recentComments = [
  {
    user: "Ankit Sharma",
    avatar: "/profile.png",
    comment: "This was super helpful, thanks bro!",
    time: "3 hours ago",
  },
  {
    user: "Shreya Jain",
    avatar: "/profile.png",
    comment: "Can you make a video on advanced routing?",
    time: "1 day ago",
  },
];

// --- Main Page ---

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-sm flex items-center gap-1 mt-1 ${stat.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stat.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(stat.change)}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Uploads */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Uploads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentUploads.map((video) => (
            <Card key={video.id} className="flex items-center p-4 gap-4">
              <div className="relative w-28 h-16 flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={video.thumbnail}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-medium line-clamp-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {video.status} • {video.views} views
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Subscribers and Comments */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Subscribers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Subscribers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSubscribers.map((sub, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  src={sub.profile}
                  alt={sub.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-sm text-muted-foreground">{sub.joined}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentComments.map((comment, index) => (
              <div key={index} className="flex items-start gap-3">
                <Image
                  src={comment.avatar}
                  alt={comment.user}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{comment.user}</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    {comment.time}
                  </p>
                  <p className="text-sm">{comment.comment}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
