"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Loader2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const scheduleSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }).max(100, { message: "Title must not exceed 100 characters" }),
  description: z.string().max(500, { message: "Description must not exceed 500 characters" }),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  category: z.string().min(1, { message: "Please select a category" }),
  isRecurring: z.boolean(),
  notifyFollowers: z.boolean(),
})

const mockSchedule = [
  { id: 1, title: "Weekly Gaming Stream", date: new Date(2023, 5, 25), startTime: "18:00", endTime: "21:00", category: "Gaming" },
  { id: 2, title: "Q&A Session", date: new Date(2023, 5, 27), startTime: "14:00", endTime: "15:00", category: "IRL" },
  { id: 3, title: "Music Stream", date: new Date(2023, 5, 29), startTime: "20:00", endTime: "22:00", category: "Music" },
  { id: 4, title: "Charity Stream", date: new Date(2023, 6, 1), startTime: "12:00", endTime: "18:00", category: "Charity" },
  { id: 5, title: "Art Creation", date: new Date(2023, 6, 3), startTime: "16:00", endTime: "19:00", category: "Creative" },
]

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(mockSchedule)
  const [isAddingStream, setIsAddingStream] = useState(false)

  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      category: "",
      isRecurring: false,
      notifyFollowers: true,
    },
  })

  function onSubmit(values) {
    setIsAddingStream(true)
    // Simulate API call
    setTimeout(() => {
      setSchedule(prev => [...prev, { id: prev.length + 1, ...values }])
      setIsAddingStream(false)
      form.reset()
    }, 1000)
  }

  function deleteScheduledStream(id) {
    setSchedule(prev => prev.filter(stream => stream.id !== id))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Stream Schedule</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Streams</CardTitle>
              <CardDescription>View and manage your scheduled streams</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.map((stream) => (
                      <TableRow key={stream.id}>
                        <TableCell>{stream.title}</TableCell>
                        <TableCell>{format(stream.date, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{`${stream.startTime} - ${stream.endTime}`}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{stream.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => deleteScheduledStream(stream.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule New Stream</CardTitle>
              <CardDescription>Plan your upcoming streams</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stream Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your stream title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your stream" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
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
                            <SelectItem value="charity">Charity</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isRecurring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Recurring Stream</FormLabel>
                          <FormDescription>
                            Set this stream to repeat weekly
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
                    name="notifyFollowers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Notify Followers</FormLabel>
                          <FormDescription>
                            Send a notification to your followers when this stream is scheduled
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
                  <Button type="submit" disabled={isAddingStream}>
                    {isAddingStream && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isAddingStream ? "Scheduling..." : "Schedule Stream"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>View your scheduled streams in a calendar format</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={schedule.map(stream => stream.date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}