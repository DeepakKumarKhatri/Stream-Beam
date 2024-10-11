"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Search,
  UserPlus,
  Users,
  Shield,
  AlertTriangle,
} from "lucide-react";

// Mock data
const followers = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alice_j",
    status: "online",
    role: "moderator",
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bob_s",
    status: "offline",
    role: "subscriber",
  },
  {
    id: 3,
    name: "Charlie Brown",
    username: "charlie_b",
    status: "online",
    role: "follower",
  },
  {
    id: 4,
    name: "Diana Prince",
    username: "wonder_woman",
    status: "online",
    role: "subscriber",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    username: "mission_possible",
    status: "offline",
    role: "follower",
  },
];

const blockedUsers = [
  {
    id: 101,
    name: "Troll McTrollface",
    username: "troll123",
    reason: "Repeated harassment",
  },
  {
    id: 102,
    name: "Spam Bot",
    username: "totally_not_a_bot",
    reason: "Excessive spam",
  },
];

export default function AudienceManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFollowers, setSelectedFollowers] = useState([]);

  const filteredFollowers = followers.filter(
    (follower) =>
      follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFollowerSelection = (id) => {
    setSelectedFollowers((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Audience Management</h1>

        <Tabs defaultValue="followers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="blocked">Blocked Users</TabsTrigger>
          </TabsList>

          <TabsContent value="followers">
            <Card>
              <CardHeader>
                <CardTitle>Manage Followers</CardTitle>
                <CardDescription>
                  View and manage your followers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search followers..."
                      className="w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="moderator">Moderators</SelectItem>
                      <SelectItem value="subscriber">Subscribers</SelectItem>
                      <SelectItem value="follower">Followers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ScrollArea className="h-[400px] w-full rounded-md border">
                  <div className="p-4">
                    {filteredFollowers.map((follower) => (
                      <div
                        key={follower.id}
                        className="flex items-center space-x-4 py-2"
                      >
                        <Checkbox
                          checked={selectedFollowers.includes(follower.id)}
                          onCheckedChange={() =>
                            toggleFollowerSelection(follower.id)
                          }
                        />
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40`}
                            alt={follower.name}
                          />
                          <AvatarFallback>{follower.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {follower.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            @{follower.username}
                          </p>
                        </div>
                        <Badge
                          variant={
                            follower.status === "online"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {follower.status}
                        </Badge>
                        <Badge>{follower.role}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Make Moderator</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              <span>Block User</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={
                      selectedFollowers.length === filteredFollowers.length
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedFollowers(
                          filteredFollowers.map((f) => f.id)
                        );
                      } else {
                        setSelectedFollowers([]);
                      }
                    }}
                  />
                  <Label>Select All</Label>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">Export Selected</Button>
                  <Button>Message Selected</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="blocked">
            <Card>
              <CardHeader>
                <CardTitle>Blocked Users</CardTitle>
                <CardDescription>Manage users you've blocked</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border">
                  <div className="p-4">
                    {blockedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-4 py-2"
                      >
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40`}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            @{user.username}
                          </p>
                        </div>
                        <Badge variant="destructive">Blocked</Badge>
                        <Button variant="ghost" size="sm">
                          Unblock
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User to Block List
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Audience Insights</CardTitle>
            <CardDescription>Get to know your audience better</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Total Followers</h3>
                <p className="text-3xl font-bold">10,234</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <Shield className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Moderators</h3>
                <p className="text-3xl font-bold">15</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <AlertTriangle className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Blocked Users</h3>
                <p className="text-3xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
