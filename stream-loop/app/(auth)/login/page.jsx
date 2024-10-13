"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    const resultAction = await dispatch(login(loginData));

    if (login.fulfilled.match(resultAction)) {
      router.push("/dashboard");
      console.log("Login successful:", resultAction.payload);
    } else {
      console.error("Login failed:", resultAction.payload.error);
      setLoginError(resultAction.payload.error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            {loginError && (
              <p className="font-bold text-[15px] underline text-red-600 text-center p-2">
                {loginError}!!
              </p>
            )}
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your Stream Loop account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Forgot password?
            </Link>
            <Link href="/register" className="text-sm text-muted-foreground ">
              Don't have an account?{" "}
              <span className="hover:text-primary">Sign up</span>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
