"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import StreamPreview from "@/components/StreamPreview";

const streamSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  description: z
    .string()
    .max(500, { message: "Description must not exceed 500 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.string().refine((value) => value.split(",").length <= 5, {
    message: "You can add up to 5 tags",
  }),
  isPrivate: z.boolean(),
  ageRestriction: z.enum(["all", "13+", "18+"]),
  quality: z.string(),
  chatEnabled: z.boolean(),
  donationsEnabled: z.boolean(),
  subscriptionRequired: z.boolean(),
  bitrate: z.number().min(1000).max(8000),
});

export default function NewStream() {
  const [streamSettings, setStreamSettings] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(streamSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
      isPrivate: false,
      ageRestriction: "all",
      quality: "720p",
      chatEnabled: true,
      donationsEnabled: true,
      subscriptionRequired: false,
      bitrate: 4000,
    },
  });

  function onSubmit(values) {
    setStreamSettings(values);
    setIsFormSubmitted(true);
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Set Up Your Stream</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Stream Details</CardTitle>
                <CardDescription>
                  Configure the basic details of your stream
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stream Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your stream title"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be the main title displayed for your stream.
                      </FormDescription>
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
                        <Textarea
                          placeholder="Describe your stream"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a brief description of what viewers can expect.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                        Choose the category that best fits your stream.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter tags, separated by commas"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add up to 5 tags to help viewers find your stream.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stream Settings</CardTitle>
                <CardDescription>
                  Configure advanced settings for your stream
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="isPrivate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Private Stream
                        </FormLabel>
                        <FormDescription>
                          Only allow specific users to view your stream
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
                  name="ageRestriction"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Age Restriction</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="all" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              All Ages
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="13+" />
                            </FormControl>
                            <FormLabel className="font-normal">13+</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="18+" />
                            </FormControl>
                            <FormLabel className="font-normal">18+</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stream Quality</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1080p">1080p</SelectItem>
                          <SelectItem value="720p">720p</SelectItem>
                          <SelectItem value="480p">480p</SelectItem>
                          <SelectItem value="360p">360p</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the quality of your stream.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bitrate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bitrate (kbps)</FormLabel>
                      <FormControl>
                        <Slider
                          min={1000}
                          max={8000}
                          step={500}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        Adjust the bitrate of your stream. Current:{" "}
                        {field.value} kbps
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="chatEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Chat</FormLabel>
                        <FormDescription>
                          Allow viewers to chat during your stream
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
                  name="donationsEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable Donations
                        </FormLabel>
                        <FormDescription>
                          Allow viewers to send donations during your stream
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
                  name="subscriptionRequired"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Subscribers Only
                        </FormLabel>
                        <FormDescription>
                          Only allow subscribers to view your stream
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
              </CardContent>
            </Card>
            <Button type="submit">Save Settings and Start Stream</Button>
          </form>
        </Form>

        {isFormSubmitted && streamSettings && (
          <StreamPreview streamSettings={streamSettings} />
        )}
      </motion.div>
    </div>
  );
}