"use client"
import React, { useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import { User } from "@/types"
import { ImageSelector } from "@/components/utils/image-selector/image-selector"
type Props = {
  user: User
  onUpdate: (updatedData: Partial<User>) => void
}
const AccountSettings = ({ user, onUpdate }: Props) => {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    avatar: user.avatar || "",
    theme: user.theme || "system",
    language: user.language || "en",
  })

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleAvatarUpload = (url:string) => {
    console.log(url)
    setForm({...form,avatar:url});
  }

  const saveChanges = () => {
    onUpdate(form)
    console.log("Updated data: ", form)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="space-y-4">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />

            <Label>Email</Label>
            <Input value={form.email} readOnly />

            <Label>Bio</Label>
            <Textarea value={form.bio} onChange={(e) => handleChange("bio", e.target.value)} />

            <Label>Avatar</Label>
            <div className="flex items-center gap-4">
              <ImageSelector isRound preview={form.avatar} setImage={handleAvatarUpload} type="profile" />
            
            </div>
          </div>
        </TabsContent>

  

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="space-y-4">
            <Label>Theme</Label>
            <Select value={form.theme} onValueChange={(val) => handleChange("theme", val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Label>Language</Label>
            <Select value={form.language} onValueChange={(val) => handleChange("language", val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              {/* <Switch
                id="notifications"
                checked={form.notifications}
                onCheckedChange={(val) => handleChange("notifications", val)}
              /> */}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <Button onClick={saveChanges}>Save Changes</Button>
      </div>
    </div>
  )
}

export default AccountSettings
