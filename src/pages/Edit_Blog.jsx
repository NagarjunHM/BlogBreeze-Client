// import React, { useState, useEffect } from "react";
// import { Label } from "@/components/ui/label";
// import Editor from "@/components/ui/Editor";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxios from "@/hooks/useAxios";
// import InfiniteProgressBar from "@/components/ui/InfiniteProgressBar";
// import { useToast } from "@/components/ui/use-toast";
// import { useParams } from "react-router-dom";
// import { userSlice } from "@/store/userSlice";

// const Edit_Blog = () => {
//   const [formError, setFormError] = useState({});
//   const instance = useAxios();
//   const { toast } = useToast();
//   const { token } = userSlice();
//   const { blogId } = useParams();

//   const [formData, setFormData] = useState({
//     title: "",
//     picture: "",
//     description: "",
//     content: "",
//   });

//   // querying the blog
//   const { data, error, isLoading, isSuccess } = useQuery({
//     queryKey: ["blogs", blogId],
//     queryFn: async () => {
//       const response = await instance.get(`/blogs/${blogId}`);
//       console.log(response);
//       return response.data;
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setFormData({
//         title: data.title || "",
//         picture: data.picture || "",
//         description: data.description || "",
//         content: data.content || "",
//       });
//     }
//   }, [data]);

//   const handleInput = (e) => {
//     const { name, type } = e.target;
//     const value = type === "file" ? e.target.files[0] : e.target.value;

//     // Validate file type for the 'picture' input
//     if (type === "file" && value) {
//       const allowedImageTypes = [
//         "image/jpeg",
//         "image/png",
//         "image/gif",
//         "image/webp",
//       ];

//       if (!allowedImageTypes.includes(value.type)) {
//         alert("Please select a valid image file (JPEG, PNG, or GIF).");
//         e.target.value = null; // Clear the file input
//         return;
//       }
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     let errors = {};

//     if (!formData.title || formData.title.trim() === "") {
//       errors.title = "Blog title cannot be empty";
//     }

//     setFormError(errors);

//     // Return true if there are no errors, indicating the form is valid
//     return Object.keys(errors).length === 0;
//   };

//   const { mutate, isPending } = useMutation({
//     mutationFn: () =>
//       instance.put(`/blogs/${blogId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       }),
//     onSuccess: () => {
//       // Handle success
//       toast({
//         title: "Blog updated successfully",
//       });
//     },
//     onError: (error) => {
//       // Handle error
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error.response?.data || error.message,
//       });
//     },
//   });

//   const handleBlogSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       mutate();
//     }
//   };

//   console.log(formData);
//   return (
//     <div className="m-10">
//       {isLoading ? <InfiniteProgressBar /> : null}
//       <div>
//         <form onSubmit={handleBlogSubmit} className="flex flex-col gap-5">
//           <div className="grid gap-1.5">
//             <Label htmlFor="title">Blog title</Label>
//             <Input
//               placeholder="Title for your blog."
//               id="title"
//               className="w-full"
//               name="title"
//               value={formData.title}
//               onChange={handleInput}
//             />
//             {formError.title ? (
//               <li className="text-sm text-red-600">{formError.title}</li>
//             ) : null}
//           </div>

//           <div className="grid w-full max-w-sm items-center gap-1.5">
//             <Label htmlFor="picture">Cover picture</Label>
//             <Input
//               id="picture"
//               name="picture"
//               type="file"
//               onChange={handleInput}
//             />
//           </div>

//           <div className="grid gap-1.5">
//             <Label htmlFor="description">Description</Label>
//             <Input
//               placeholder="Description of your blog."
//               id="description"
//               name="description"
//               className="w-full"
//               value={formData.description}
//               onChange={handleInput}
//             />
//           </div>

//           <div className="relative">
//             <Editor className="w-full" />
//           </div>

//           <div className="ml-auto">
//             <Button type="submit">Save</Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Edit_Blog;
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import Editor from "@/components/ui/Editor"; // Assuming you have an Editor component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import InfiniteProgressBar from "@/components/ui/InfiniteProgressBar";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { userSlice } from "@/store/userSlice";

const Edit_Blog = () => {
  const [formError, setFormError] = useState({});
  const instance = useAxios();
  const { toast } = useToast();
  const { token } = userSlice();
  const { blogId } = useParams();

  const [blogData, setBlogData] = useState({
    title: "",
    picture: "",
    description: "",
    content: "",
  });

  // Fetch the blog data
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["blogs", blogId],
    queryFn: async () => {
      const response = await instance.get(`/blogs/${blogId}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setBlogData({
        title: data.title || "",
        picture: data.picture || "",
        description: data.description || "",
        content: data.content || "",
      });
    }
  }, [data, isSuccess]);

  // Function to handle input change
  const handleInput = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files[0] : e.target.value;
    setBlogData({ ...blogData, [name]: value });
  };

  // Function to validate form
  const validateForm = () => {
    let errors = {};

    if (!blogData.title || blogData.title.trim() === "") {
      errors.title = "Blog title cannot be empty";
    }

    setFormError(errors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(errors).length === 0;
  };

  // Mutation function to update the blog
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      instance.put(`/blogs/${blogId}`, blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      toast({
        title: "Blog updated successfully",
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

  // Function to handle blog submission
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="m-10">
      {isPending ? <InfiniteProgressBar /> : null}
      <div>
        <form onSubmit={handleBlogSubmit} className="flex flex-col gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="title">Blog title</Label>
            <Input
              placeholder="Title for your blog."
              id="title"
              className="w-full"
              name="title"
              value={blogData.title}
              onChange={handleInput}
            />
            {formError.title && (
              <li className="text-sm text-red-600">{formError.title}</li>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              placeholder="Description of your blog."
              id="description"
              name="description"
              className="w-full"
              value={blogData.description}
              onChange={handleInput}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Cover picture</Label>
            <Input
              id="picture"
              name="picture"
              type="file"
              onChange={handleInput}
            />
          </div>

          {blogData.picture &&
          typeof blogData.picture === "string" &&
          blogData.picture.includes("uploads") ? (
            <img
              src={`http://localhost:5000/${blogData.picture}`}
              alt="Cover "
              className="w-44 aspect-auto"
            />
          ) : (
            <img
              src={
                blogData.picture instanceof Blob
                  ? URL.createObjectURL(blogData.picture)
                  : ""
              }
              alt="Cover"
              className="w-44 aspect-auto"
            />
          )}

          <div className="relative">
            <Editor
              newBlog={blogData}
              setNewBlog={setBlogData}
              className="w-full"
            />
          </div>

          <div className="ml-auto">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_Blog;
