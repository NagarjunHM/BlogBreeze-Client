import React, { useState } from "react";

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

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  //   handle form input data
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  //   function to validate the form
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
      newErrors.password = [];
      newErrors.password.push("password is required");
      isValid = false;
    } else if (formData.password.length > 15) {
      newErrors.password = [];
      newErrors.password.push("password is too long");
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = [];
      newErrors.password.push("password is short");
      isValid = false;
    } else {
      newErrors.password = [];
      let regex1 = /[a-z]/;
      if (!regex1.test(formData.password))
        newErrors.password.push("atleast 1 lower case character");
      let regex2 = /[A-Z]/;
      if (!regex2.test(formData.password))
        newErrors.password.push("atleast 1 upper case character");
      let regex3 = /[\d]/;
      if (!regex3.test(formData.password))
        newErrors.password.push("atleast 1 digit");
      let regex4 = /[!@#$%^&*.?]/;
      if (!regex4.test(formData.password))
        newErrors.password.push("atleast 1 special character");
    }

    console.log(newErrors);
    setErrors(newErrors);
    return isValid;
  };

  //   function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="absolute top-0 flex flex-col items-center justify-center size-full">
      <Card className="w-[400px] border-none shadow-none m-5">
        <CardHeader className="mb-10">
          <CardTitle className="text-5xl text-center">Welcome Back.</CardTitle>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent>
            <div className="grid items-center w-full gap-4">
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
              {errors.email ? (
                <li className="text-sm text-red-400">{errors.email}</li>
              ) : (
                <></>
              )}
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
              {errors.password ? (
                <div className="text-sm text-red-400">
                  {errors.password.map((password, index) => (
                    <li key={index}>{password}</li>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-start gap-4">
            <div>
              <Button type="submit">Sign in</Button>
            </div>

            <div className="">
              <span className="mr-2">No account?</span>
              <Link to="/signup">
                <span className="text-xl text-green-400 cursor-pointer hover:border-b hover:border-green-400 ">
                  Create One
                </span>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
      <div className="text-center text-muted-foreground">
        Click “Sign in” to agree to BlogBreeze’s Terms of Service and
        acknowledge that BlogBreeze’s Privacy Policy applies to you.
      </div>
    </div>
  );
};

export default Signin;
