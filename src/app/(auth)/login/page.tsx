"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";




export default function LoginForm() {
  const [error, setError] = useState("")
  const router = useRouter();
  //const { data: session, status: sessionStatus} = useSession();


  /*Check session status
  useEffect(() => {
    if (sessionStatus === "authenticated"){
      router.replace("/");
    }
  }, [sessionStatus, router])

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>
  }*/

  //check if email is valid
  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const handleSubmit = async () => {


    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;


    if (!isValidEmail(email)) {
      setError("Email is not valid")
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters")
      return;
    } 

    const res = await signIn("credentials", {
      redirect: false,
      email, 
      password
    })

    if (res?.status === 401) {
      setError("Invalid email or password")
    } else if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.url) {
      console.log("Authentication Success")
      router.replace("/");
    } else {
      setError("An unknown error occurred");
    }
    


  };
  
  return (
   // sessionStatus != "authenticated" && (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="flex justify-center">
              <p className="text-red-600 text-[14px]">{error && error}</p>
            </div>
            <Button onClick={handleSubmit} type="button" className="w-full">
              Login
            </Button>
            <Button onClick={() => {signIn("github")}} variant="outline" className="w-full">
              Login with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
