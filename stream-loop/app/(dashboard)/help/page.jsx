"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Book, HelpCircle, MessageSquare, Search } from 'lucide-react'

const faqs = [
  {
    question: "How do I start streaming?",
    answer: "To start streaming, go to your Dashboard and click on the 'Start Stream' button. Make sure you have your stream key set up in your streaming software (OBS, Streamlabs, etc.)."
  },
  {
    question: "What are the recommended stream settings?",
    answer: "We recommend streaming at 720p60fps with a bitrate of 3500-5000 kbps for most streamers. For more detailed recommendations, check our streaming guide in the Documentation section."
  },
  {
    question: "How do I monetize my streams?",
    answer: "You can monetize your streams through subscriptions, donations, and ad revenue. To enable these features, go to your Settings page and look for the 'Monetization' section."
  },
  {
    question: "What should I do if I experience technical issues while streaming?",
    answer: "If you encounter technical issues, first check your internet connection and streaming software settings. If the problem persists, you can reach out to our support team through the 'Contact Support' tab."
  },
  {
    question: "How can I grow my audience?",
    answer: "Growing your audience takes time and effort. Some tips include streaming regularly, engaging with your viewers, collaborating with other streamers, and promoting your streams on social media. Check our Creator Academy for more detailed strategies."
  },
]

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[400px]">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Inquiry</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Describe your issue or question" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Support Ticket</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>Explore additional support options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>Live Chat Support</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <Book className="h-6 w-6 mb-2" />
                <span>Video Tutorials</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <HelpCircle className="h-6 w-6 mb-2" />
                <span>Community Forums</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}