"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

// Mock data
const recentStreams = [
  { id: 1, title: "My First Stream", date: "2023-05-15", viewers: 150 },
  { id: 2, title: "Q&A Session", date: "2023-05-18", viewers: 300 },
  { id: 3, title: "Gaming Night", date: "2023-05-20", viewers: 500 },
]

const viewerData = [
  { name: 'Mon', viewers: 400 },
  { name: 'Tue', viewers: 300 },
  { name: 'Wed', viewers: 520 },
  { name: 'Thu', viewers: 400 },
  { name: 'Fri', viewers: 600 },
  { name: 'Sat', viewers: 750 },
  { name: 'Sun', viewers: 680 },
]

const upcomingStreams = [
  { id: 1, title: "Weekly Update", date: new Date(2023, 5, 25, 14, 0) },
  { id: 2, title: "Collaboration Stream", date: new Date(2023, 5, 28, 20, 0) },
  { id: 3, title: "New Game Release", date: new Date(2023, 6, 1, 18, 0) },
]

export default function Dashboard() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, Streamer!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Views" value="10,500" />
        <StatsCard title="Followers" value="1,200" />
        <StatsCard title="Stream Time" value="45h 30m" />
        <StatsCard title="Average Viewers" value="250" />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2">Title</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Viewers</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStreams.map((stream) => (
                    <tr key={stream.id}>
                      <td className="py-2">{stream.title}</td>
                      <td className="py-2">{stream.date}</td>
                      <td className="py-2">{stream.viewers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Button asChild>
            <Link href="/dashboard/streams/new">Start New Stream</Link>
          </Button>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Viewer Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="viewers" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {upcomingStreams.map((stream) => (
                    <li key={stream.id} className="flex justify-between items-center">
                      <span>{stream.title}</span>
                      <Badge variant="secondary">
                        {stream.date.toLocaleString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: 'numeric', 
                          minute: 'numeric' 
                        })}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stream Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}