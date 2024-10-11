"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from  '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { AlertCircle, Mic, MicOff, Video, VideoOff, Share2, Settings, Users, MessageSquare, DollarSign, BarChart2 } from 'lucide-react'

const initialChatMessages = [
  { id: 1, user: 'JohnDoe', message: 'Hello everyone!', timestamp: '19:30' },
  { id: 2, user: 'StreamFan123', message: 'Great stream as always!', timestamp: '19:31' },
  { id: 3, user: 'CoolViewer', message: 'Can you show that again?', timestamp: '19:32' },
]

export default function LiveStream() {
  const [isLive, setIsLive] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [chatMessages, setChatMessages] = useState(initialChatMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setViewerCount(prev => Math.min(prev + Math.floor(Math.random() * 10), 9999))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isLive])

  const handleStartStream = () => {
    setIsLive(true)
    // Here you would typically start the actual stream
    if (videoRef.current) {
      videoRef.current.src = '/placeholder.svg?height=720&width=1280'
      videoRef.current.play()
    }
  }

  const handleStopStream = () => {
    setIsLive(false)
    setViewerCount(0)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.src = ''
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        user: 'You',
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Live Stream</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <video ref={videoRef} className="w-full h-full object-cover" />
                  {!isLive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" onClick={handleStartStream}>Start Stream</Button>
                    </div>
                  )}
                  {isLive && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                      <Badge variant="secondary">{viewerCount} viewers</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stream Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <Button size="icon" variant={isMuted ? "destructive" : "secondary"} onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <MicOff /> : <Mic />}
                    </Button>
                    <Button size="icon" variant={isVideoOff ? "destructive" : "secondary"} onClick={() => setIsVideoOff(!isVideoOff)}>
                      {isVideoOff ? <VideoOff /> : <Video />}
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Share2 />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Settings />
                    </Button>
                  </div>
                  {isLive && <Button variant="destructive" onClick={handleStopStream}>End Stream</Button>}
                </div>
                <div className="space-y-2">
                  <Label>Audio Input Level</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stream Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chat">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat"><MessageSquare className="w-4 h-4 mr-2" /> Chat</TabsTrigger>
                    <TabsTrigger value="users"><Users className="w-4 h-4 mr-2" /> Users</TabsTrigger>
                    <TabsTrigger value="stats"><BarChart2 className="w-4 h-4 mr-2" /> Stats</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chat" className="space-y-4">
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      {chatMessages.map(message => (
                        <div key={message.id} className="flex items-start space-x-2 mb-4">
                          <Avatar>
                            <AvatarFallback>{message.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{message.user} <span className="text-xs text-gray-500">{message.timestamp}</span></p>
                            <p>{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="users">
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      {/* Mock user list */}
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-2 mb-2">
                          <Avatar>
                            <AvatarFallback>U{i+1}</AvatarFallback>
                          </Avatar>
                          <span>User {i+1}</span>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="stats">
                    <div className="space-y-4">
                      <div>
                        <Label>Peak Viewers</Label>
                        <p className="text-2xl font-bold">{Math.max(viewerCount, 100)}</p>
                      </div>
                      <div>
                        <Label>Average Watch Time</Label>
                        <p className="text-2xl font-bold">12m 30s</p>
                      </div>
                      <div>
                        <Label>Chat Messages</Label>
                        <p className="text-2xl font-bold">{chatMessages.length}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {/* Mock donation list */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarFallback>D{i+1}</AvatarFallback>
                        </Avatar>
                        <span>Donor {i+1}</span>
                      </div>
                      <Badge variant="secondary">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {Math.floor(Math.random() * 50) + 1}
                      </Badge>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}