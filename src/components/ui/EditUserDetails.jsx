import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./textarea";
import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { userSlice } from "@/store/userSlice";
import { useToast } from "./use-toast";
import { queryClient } from "@/main";

const EditUserDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    profilePicture: "",
  });
  const [formError, setFormError] = useState({});
  const instance = useAxios();
  const { id, token } = userSlice();
  const { toast } = useToast();

  const handleInput = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files[0] : e.target.value;

    // Validate file type for the 'picture' input
    if (type === "file" && value) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (!allowedImageTypes.includes(value.type)) {
        alert("Please select a valid image file (JPEG, PNG, or GIF).");
        e.target.value = null; // Clear the file input
        return;
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const { mutate, error, isPending } = useMutation({
    mutationFn: () =>
      instance.put(`users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      toast({
        title: "User details updated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data || error.message,
      });
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["users", id],
      });
    },
  });

  const handleSubmit = () => {
    // console.log(formData);
    mutate();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-sm font-semibold text-green-600 cursor-pointer hover:underline">
          Edit profile
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* name */}
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              className="col-span-3"
              value={formData.name}
              onChange={handleInput}
            />
          </div>

          {/* picture */}
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="profilePicture">Profile</Label>
            <Input
              type="file"
              id="profilePicture"
              name="profilePicture"
              className="col-span-3"
              onChange={handleInput}
            />
          </div>

          {/* about */}
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username">About</Label>
            <Textarea
              id="about"
              name="about"
              placeholder="a small brief about you"
              className="col-span-3"
              onChange={handleInput}
              value={formData.about}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDetails;
