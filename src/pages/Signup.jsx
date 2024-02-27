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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // function to handle input
  const handleInput = (e) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  // function to validate the form
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // name
    if (formData.name === "") {
      newErrors.name = "name is required";
    } else if (formData.name.length < 4) {
      newErrors.name = "atleast 3 character long";
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

    if (formData.repassword === "") {
      newErrors.repassword = "repassword is required";
    } else if (formData.repassword !== formData.password) {
      newErrors.repassword = "password does not match";
    }

    console.log(newErrors);
    setErrors(newErrors);
    return isValid;
  };

  // function to handle form submission
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
      <Card className="min-w-[400px] border-none shadow-none m-5">
        <CardHeader className="mb-10">
          <CardTitle className="text-4xl text-center sm:text-5xl">
            Join BlogBreeze.
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleFormSubmit}>
          <CardContent>
            <div className="grid items-center w-[full] gap-4">
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
              {errors.name ? (
                <li className="text-sm text-red-400">{errors.name}</li>
              ) : (
                <></>
              )}
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
                  name="password"
                  type="password"
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
              {errors.repassword ? (
                <li className="text-sm text-red-400">{errors.repassword}</li>
              ) : (
                <></>
              )}
            </div>
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
        </form>
      </Card>
      <div className="text-center text-muted-foreground">
        Click “Sign up" to agree to BlogBreeze’s Terms of Service and
        acknowledge that BlogBreeze’s Privacy Policy applies to you.
      </div>
    </div>
  );
};

export default Signup;
