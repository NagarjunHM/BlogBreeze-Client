import React from "react";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-[100vh] top-0 absolute transition-all duration-200">
      <p className="text-3xl font-medium text-center md:text-5xl">
        Join BlogBreeze
      </p>
      <Card className="max-w-[400px] sm:w-[400px] m-5 ">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <form className="w-full">
          <CardContent>
            <div className="grid items-center w-full gap-4">
              {/* name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" name="name" />
              </div>
              {/* email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="Enter your email" />
              </div>
              {/* password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="repassword">Re-password</Label>
                <Input
                  id="repassword"
                  name="repassword"
                  type="password"
                  placeholder="Re-enter your password"
                />
              </div>

              {true && (
                <div className="flex  gap-4 text-destructive space-y-1.5 items-end">
                  <AlertCircle />
                  <span className="underline">
                    This is how the error appears
                  </span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-start gap-4">
            <div>
              <Button type="submit">Sign up</Button>
            </div>

            <div className="">
              <span className="mr-2">Already have an account?</span>

              <Link to="/login">
                <span className="text-xl text-green-600 cursor-pointer hover:border-b hover:border-green-600">
                  Sign in
                </span>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
      <div className="mx-5 text-center text-muted-foreground">
        Click “Sign up” to agree to BlogBreeze’s Terms of Service and
        acknowledge that BlogBreeze’s Privacy Policy applies to you.
      </div>
    </div>
  );
};

export default LoginPage;
