import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import InfiniteProgressBar from "@/components/ui/InfiniteProgressBar";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormError] = useState({});
  const instance = useAxios();
  const navigate = useNavigate();
  const { toast } = useToast();

  // handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // login validation function
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (formData.email === "") {
      newErrors.email = "email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "invalid email";
      isValid = false;
    }

    if (formData.password === "") {
      newErrors.password = ["password is required"];
      isValid = false;
    } else if (formData.password.length > 15) {
      newErrors.password = ["password is too long"];
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = ["password is short"];
      isValid = false;
    } else {
      newErrors.password = [];
      let regex1 = /[a-z]/;
      if (!regex1.test(formData.password))
        newErrors.password.push("atleast 1 lower case character");

      let regex2 = /[A-Z]/;
      if (!regex2.test(formData.password))
        newErrors.password.push("atleast 1 upper case character");

      let regex3 = /\d/;
      if (!regex3.test(formData.password))
        newErrors.password.push("atleast 1 digit");

      let regex4 = /[!@#$%^&*.?]/;
      if (!regex4.test(formData.password))
        newErrors.password.push("atleast 1 special character");

      if (newErrors.password.length > 0) {
        isValid = false;
      }
    }

    setFormError(newErrors);
    return isValid;
  };

  // login mutation function
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data) =>
      instance.post("/users/login", {
        email: data.email,
        password: data.password,
      }),
    onSuccess: (data) => {
      navigate("/", { replace: true });
      console.log(data);
      toast({
        title: "Login successful",
        description: "Welcome " + data.data.name,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response?.data || error.message,
      });
    },
  });

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      mutate(formData);
    }
  };

  return (
    <>
      {isPending && <InfiniteProgressBar />}
      <div className="flex flex-col items-center justify-center w-screen h-[100vh] top-0 absolute transition-all duration-200 top-57">
        <p className="text-3xl font-medium text-center md:text-5xl">
          Welcome Back
        </p>
        <Card className="max-w-[400px] sm:w-[400px] m-5">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
          </CardHeader>
          <form className="w-full" onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid items-center w-full gap-4">
                {/* email */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleInput}
                    value={formData.email}
                  />
                </div>
                {formErrors.email ? (
                  <li className="text-sm text-destructive">
                    {formErrors.email}
                  </li>
                ) : (
                  <></>
                )}

                {/* password */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInput}
                    value={formData.password}
                  />
                </div>
                {formErrors.password?.length ? (
                  <div className="text-sm text-red-400">
                    {formErrors.password.map((password, index) => (
                      <li key={index}>{password}</li>
                    ))}
                  </div>
                ) : (
                  <></>
                )}

                {error && (
                  <div className="flex  gap-4 text-destructive space-y-1.5 items-end">
                    <AlertCircle />
                    <span className="underline">
                      {error.response?.data || error.message}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Sign in
                </Button>
              </div>

              <div className="">
                <span className="mr-2">No account?</span>

                <Link to="/register" disabled={isPending}>
                  <span className="text-xl text-green-600 cursor-pointer hover:border-b hover:border-green-600">
                    Create One
                  </span>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
        <div className="mx-5 text-center text-muted-foreground">
          Click “Sign in” to agree to BlogBreeze’s Terms of Service and
          acknowledge that BlogBreeze’s Privacy Policy applies to you.
        </div>
      </div>
    </>
  );
};

export default LoginPage;
