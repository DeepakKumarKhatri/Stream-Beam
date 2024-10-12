"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertCircle, Camera, Loader2, Twitch, Twitter, Youtube } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const profileSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must not exceed 20 characters" }),
  displayName:  z.string().max(50, { message: "Display name must not exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters" }),
  twitterHandle: z.string().max(15, { message: "Twitter handle must not exceed 15 characters" }),
  youtubeChannel: z.string().max(100, { message: "YouTube channel URL must not exceed 100 characters" }),
  twitchUsername: z.string().max(25, { message: "Twitch username must not exceed 25 characters" }),
  contentCategory: z.string(),
  isPartner: z.boolean(),
  allowDonations: z.boolean(),
  showSubscriberCount: z.boolean(),
})

const mockAchievements = [
  { id: 1, name: "First Stream", description: "Completed your first live stream", date: "2023-01-15" },
  { id: 2, name: "100 Followers", description: "Reached 100 followers", date: "2023-02-28" },
  { id: 3, name: "24-Hour Stream", description: "Completed a 24-hour live stream", date: "2023-04-10" },
  { id: 4, name: "Charity Champion", description: "Raised $1000 for charity", date: "2023-05-20" },
  { id: 5, name: "Collab Star", description: "Collaborated with 10 different streamers", date: "2023-06-05" },
]

export default function UserProfile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "coolstreamer123",
      displayName: "Cool Streamer",
      email: "streamer@example.com",
      bio: "I'm a passionate gamer and streamer!",
      twitterHandle: "coolstreamer",
      youtubeChannel: "https://youtube.com/coolstreamer",
      twitchUsername: "coolstreamer",
      contentCategory: "gaming",
      isPartner: true,
      allowDonations: true,
      showSubscriberCount: true,
    },
  })

  function onSubmit(values) {
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      setUpdateSuccess(true)
      console.log(values)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Streamer Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your streamer profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="coolstreamer123" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public username. It must be unique on the platform.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Cool Streamer" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name displayed to your viewers during streams.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="streamer@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your email address is used for account recovery and notifications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell your viewers about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your bio appears on your profile and in search results.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="twitterHandle"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Twitter Handle</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                @
                              </span>
                              <Input className="rounded-l-none" placeholder="coolstreamer" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="youtubeChannel"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>YouTube Channel</FormLabel>
                          <FormControl>
                            <Input placeholder="https://youtube.com/coolstreamer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="twitchUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitch Username</FormLabel>
                        <FormControl>
                          <Input placeholder="coolstreamer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contentCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Content Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="gaming">Gaming</SelectItem>
                            <SelectItem value="irl">IRL</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="esports">Esports</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This helps viewers find your content.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPartner"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Partner Status</FormLabel>
                          <FormDescription>
                            You are currently a partner streamer
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allowDonations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Allow Donations</FormLabel>
                          <FormDescription>
                            Enable viewers to send you donations during streams
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="showSubscriberCount"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Show Subscriber Count</FormLabel>
                          <FormDescription>
                            Display your subscriber count publicly on your profile
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="@coolstreamer" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <Button className="mt-4">
                  <Camera className="mr-2 h-4 w-4" />
                  Change Picture
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Streaming Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Followers</span>
                  <span className="font-bold">10,567</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Subscribers</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Viewers</span>
                  <span className="font-bold">789</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Stream Time</span>
                  <span className="font-bold">1,500 hours</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {mockAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary">{achievement.name}</Badge>
                      <div className="flex-1">
                        <p className="text-sm">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(achievement.date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>Manage your connected social media accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Twitter className="h-6 w-6 text-[#1DA1F2]" />
                  <div>
                    <p className="font-medium">Twitter</p>
                    <p className="text-sm text-muted-foreground">@coolstreamer</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Youtube className="h-6 w-6 text-[#FF0000]" />
                  <div>
                    <p className="font-medium">YouTube</p>
                    <p className="text-sm text-muted-foreground">Cool Streamer</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Twitch className="h-6 w-6 text-[#9146FF]" />
                  <div>
                    <p className="font-medium">Twitch</p>
                    <p className="text-sm text-muted-foreground">coolstreamer</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {updateSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your profile has been updated successfully.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}