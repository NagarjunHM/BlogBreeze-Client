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
import { ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import configureAxios from "@/hooks/configureAxios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const instance = configureAxios();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setErrors(newErrors);
    return isValid;
  };

  // function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const res = await instance.post("/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setError(null);
        if (res.status === 201) {
          navigate("/signin");
        }
      } catch (err) {
        setError(err.response.data, err.response.status);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="absolute top-0 flex flex-col items-center justify-center size-full">
      {/* conditionally rendering the error */}

      {false ? (
        <div>
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      ) : (
        <></>
      )}
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
              {loading ? (
                <Button disabled>
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">Sign up</Button>
              )}
            </div>

            <div className="">
              <span className="mr-2">Already have an account?</span>
              {loading ? (
                <span className="text-xl cursor-pointer text-mute-foreground">
                  Sign in
                </span>
              ) : (
                <Link to="/signin">
                  <span className="text-xl text-green-400 cursor-pointer hover:border-b hover:border-green-400 ">
                    Sign in
                  </span>
                </Link>
              )}
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
