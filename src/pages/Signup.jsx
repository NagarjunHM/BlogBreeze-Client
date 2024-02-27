import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="absolute top-0 flex flex-col items-center justify-center size-full">
      <Card className="min-w-[400px] border-none shadow=none m-5">
        <CardHeader className="mb-10">
          <CardTitle className="text-5xl text-center">
            Join BlogBreeze.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid items-center w-[400px] gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Enter your password" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="repassword">Re-password</Label>
                <Input id="repassword" placeholder="Re-enter your password" />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4">
          <div>
            <Button>Sign up</Button>
          </div>

          <div className="">
            <span className="mr-2">Already have an account?</span>
            <Link to="/signin">
              <span className="text-xl text-green-400 cursor-pointer hover:border-b hover:border-green-400 ">
                Sign in
              </span>
            </Link>
          </div>
        </CardFooter>
      </Card>
      <div className="text-center text-muted-foreground">
        Click “Sign up" to agree to BlogBreeze’s Terms of Service and
        acknowledge that BlogBreeze’s Privacy Policy applies to you.
      </div>
    </div>
  );
};

export default Signup;
