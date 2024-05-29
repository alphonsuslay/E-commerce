  "use client"
  import Link from "next/link"

  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { useState } from "react"
  import { useRouter } from "next/navigation"

  export default function RegisterForm() {
    const [error, setError] = useState("")
    const router = useRouter();

    //check if email is valid
    const isValidEmail = (email: string) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }

    const handleSubmit = async () => {
      const firstName = (document.getElementById("first-name") as HTMLInputElement).value;
      const lastName = (document.getElementById("last-name") as HTMLInputElement).value;

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

      try {
        const res = await fetch("/api/register",{
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        })

        if (res.status === 400){
          setError("Email is already in use")
        }
        if (res.status === 200) {
          setError("")
          router.push('/login');
        }
      } catch (error) {
        setError("Error, try again");
        console.log(error);
      }

    };  

    return (
      <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="flex justify-center">
              <p className="text-red-600 text-[14px]">{error && error}</p>
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
  )}
