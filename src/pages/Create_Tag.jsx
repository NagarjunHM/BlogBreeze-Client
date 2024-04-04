import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"; // Import Axios
import { userSlice } from "@/store/userSlice";
import { useToast } from "@/components/ui/use-toast";
import useAxios from "@/hooks/useAxios";
import { Badge } from "@/components/ui/badge";
import SelectCreatable from "@/components/ui/SelectCreatable";

const Create_Tag = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [formError, setFormError] = useState({});
  const [tags, setTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const { token } = userSlice();
  const { toast } = useToast([]);
  const instance = useAxios();

  // Validate form
  const validateForm = () => {
    let errors = {};

    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Tag name cannot be empty";
    }

    setFormError(errors);

    return Object.keys(errors).length === 0;
  };

  // Mutation function to create a tag
  const createTag = useMutation({
    mutationFn: async () => {
      const response = await instance.post("/tags", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Tag creation successful",
      });
      setFormData({ name: "", description: "" });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data || error.message,
      });
    },
  });

  // Handle tag save function
  const handleSubmit = () => {
    if (validateForm()) {
      createTag.mutate();
    }
  };

  // Fetch tags based on input value
  const fetchData = async (value) => {
    try {
      const response = await instance.get(`/tags?tag=${value}`, {});
      setSearchResults(response.data);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  // Handle input
  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // Fetch tags based on input value
    if (e.target.value.trim() !== "") {
      fetchData(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await instance.get(`/tags?tag=${formData.name}`, {
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          // console.log("Error", error?.message);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel("Previous request canceled");
    };
  }, [formData.name]);

  useEffect(() => {
    // Determine whether to show the create tag button
    setShowCreateButton(
      formData.name.trim() !== "" && searchResults.length === 0
    );
  }, [formData.name, searchResults.length]);

  return (
    <div className="m-10">
      <div className="mb-10 text-5xl font-semibold">Create tag</div>
      <div className="flex flex-col gap-5 max-w-[800px]">
        {/* name */}
        <div className="flex flex-col">
          <Label htmlFor="name" className="mb-2">
            Tag name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Name of the tag"
            value={formData.name}
            onChange={handleInput}
          />
          {formError.name && (
            <li className="mt-2 text-sm text-red-600">{formError.name}</li>
          )}
        </div>

        {/* description */}
        <div className="flex flex-col">
          <Label htmlFor="description" className="mb-2">
            Tag description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Short info about the tag"
            value={formData.description}
            onChange={handleInput}
          />
          {formError.name && (
            <li className="mt-2 text-sm text-red-600">{formError.name}</li>
          )}
        </div>

        {searchResults.length > 0 && (
          <div>
            <div className="mb-2 text-muted-foreground">Tag already exists</div>
            <div className="flex flex-wrap gap-3 max-w-[800px]">
              {searchResults.map((tag) => (
                <div key={tag._id}>
                  <Badge>{tag.name}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {showCreateButton && (
          <div className="text-right">
            <Button onClick={handleSubmit}>Create New Tag</Button>
          </div>
        )}
      </div>

      <SelectCreatable />
    </div>
  );
};

export default Create_Tag;
