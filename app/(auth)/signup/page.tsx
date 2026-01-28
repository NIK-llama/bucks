import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your username with your firstname and lastname below to create your account
          </CardDescription>
          <CardAction>
            <Link href="/signin">
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
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
                <Label htmlFor="firstname">Firstname</Label>
                <Input
                  id="firstname"
                  type="firstname"
                  placeholder="John"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Lastname</Label>
                <Input
                  id="lastname"
                  type="lastname"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Signin
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
