import React, { useState } from "react";
import { Textarea } from "./textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { userSlice } from "@/store/userSlice";
import useAxios from "@/hooks/useAxios";
import { useToast } from "./use-toast";
import { useParams } from "react-router-dom";
import { queryClient } from "@/main";
import InfiniteProgressBar from "./InfiniteProgressBar";

const CommentInput = () => {
  const [formData, setFormData] = useState();
  const [formError, setFormError] = useState();
  const { blogId } = useParams();
  const { token } = userSlice();
  const instance = useAxios();
  const { toast } = useToast();

  //   function to handle input
  const handleInput = (e) => {
    setFormData(e.target.value);
  };

  //   mutation function to submit user comment
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      instance.post(
        `/comments/${blogId}`,
        { content: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),

    onSuccess: () => {
      toast({
        title: "Comment added",
      });
      queryClient.refetchQueries({
        queryKey: ["comments"],
      });
      setFormData("");
      setFormError("");
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data || error.message,
      });
    },
  });

  //   function to submit comments
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      mutate();
    } else {
      setFormError("comment cannot be empty");
    }
  };

  return (
    <div>
      {isPending && <InfiniteProgressBar />}
      <div className="flex flex-col gap-5 ">
        <div className="text-muted-foreground">What are your thoughts?</div>
        {formError ? (
          <li className="text-sm text-red-600">{formError}</li>
        ) : (
          <></>
        )}
        <div className="flex gap-4">
          <Label htmlFor="comment" className="text-right">
            Comment
          </Label>
          <Textarea name="comment" value={formData} onChange={handleInput} />
        </div>

        <div className="text-right">
          <Button onClick={handleSubmit} disabled={isPending}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
