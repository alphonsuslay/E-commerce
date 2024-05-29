"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const handleInvalidfeatures = () => {
}

export default function HiWorld()  {
  return (
    <>
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Database Link</CardTitle>
            <CardDescription>
              MongoDB Database Connection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input placeholder="MongoDB URL" placeholder={process.env.MONGODB_URI} readOnly />
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={() => handleInvalidfeatures}>Save</Button>
          </CardFooter>
        </Card>

        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Stripe Secret</CardTitle>
            <CardDescription>
              Stripe Payment secret key
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input placeholder="MongoDB URL" placeholder={process.env.STRIPE_SECRET} readOnly />
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={() => handleInvalidfeatures}>Save</Button>
          </CardFooter>
        </Card>
    </div>
    </>
  );
}