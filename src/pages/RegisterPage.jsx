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
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import InfiniteProgressBar from "@/components/ui/InfiniteProgressBar";
import { useToast } from "@/components/ui/use-toast";

const registerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const instance = useAxios();
  const navigate = useNavigate();
  const { toast } = useToast();

  // to handle input
  const handleInput = (e) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  // function to validateform
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // name
    if (formData.name === "") {
      newErrors.name = "name is required";
      isValid = false;
    } else if (formData.name.length < 4) {
      newErrors.name = "at least 3 characters long";
      isValid = false;
    }

    // email
    if (formData.email === "") {
      newErrors.email = "email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "invalid email";
      isValid = false;
    }

    // password
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
        newErrors.password.push("at least 1 lowercase character");

      let regex2 = /[A-Z]/;
      if (!regex2.test(formData.password))
        newErrors.password.push("at least 1 uppercase character");

      let regex3 = /\d/;
      if (!regex3.test(formData.password))
        newErrors.password.push("at least 1 digit");

      let regex4 = /[!@#$%^&*.?]/;
      if (!regex4.test(formData.password))
        newErrors.password.push("at least 1 special character");
    }

    // repassword
    if (formData.repassword === "") {
      newErrors.repassword = "repassword is required";
      isValid = false;
    } else if (formData.repassword !== formData.password) {
      newErrors.repassword = "passwords do not match";
      isValid = false;
    }

    if (newErrors.password.length > 0) isValid = false;
    setFormErrors(newErrors);
    return isValid;
  };

  // register mutation function
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data) =>
      instance.post("/users/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    onSuccess: (data) => {
      navigate("/login");
      toast({
        title: "Registered successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data || error.message,
      });
    },
  });
  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      mutate(formData);
    }
  };

  return (
    <>
      {isPending && <InfiniteProgressBar />}
      <div className="flex flex-col items-center justify-center w-screen h-[100vh] top-0 absolute transition-all duration-200">
        <p className="text-3xl font-medium text-center md:text-5xl">
          Join BlogBreeze
        </p>
        <Card className="max-w-[400px] sm:w-[400px] m-5 ">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <form className="w-full" onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid items-center w-full gap-4">
                {/* name */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleInput}
                    value={formData.name}
                  />
                </div>
                {formErrors.name ? (
                  <li className="text-sm text-destructive">
                    {formErrors.name}
                  </li>
                ) : (
                  <></>
                )}

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
                {formErrors.password ? (
                  <div className="text-sm text-red-400">
                    {formErrors.password.map((password, index) => (
                      <li key={index}>{password}</li>
                    ))}
                  </div>
                ) : (
                  <></>
                )}

                {/* repassword */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="repassword">Re-password</Label>
                  <Input
                    id="repassword"
                    name="repassword"
                    type="password"
                    placeholder="Re-enter your password"
                    onChange={handleInput}
                    value={formData.repassword}
                  />
                </div>
                {formErrors.repassword ? (
                  <li className="text-sm text-destructive">
                    {formErrors.repassword}
                  </li>
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
    </>
  );
};

export default registerPage;
