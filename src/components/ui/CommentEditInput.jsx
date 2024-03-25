import React, { useState } from "react";
import { Textarea } from "./textarea";
import { Button } from "./button";
import InfiniteProgressBar from "./InfiniteProgressBar";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { userSlice } from "@/store/userSlice";
import { queryClient } from "@/main";
import { useToast } from "./use-toast";

const CommentEditInput = ({ input, setShowEditInput }) => {
  const [formData, setFormData] = useState(input.content);
  const instance = useAxios();
  const { token } = userSlice();
  const { toast } = useToast();

  console.log(input);
  const handleInput = (e) => {
    setFormData(e.target.value);
  };

  //   mutation function to update the comment
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      instance.put(
        `/comments/${input._id}`,
        { content: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => {
      setShowEditInput(false);
      toast({
        title: "comment updated",
      });
      queryClient.refetchQueries({
        queryKey: ["comments"],
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Errro",
        descritpion: error.response?.data || error.message,
      });
    },
  });

  //   function to update the comment
  const handleUpdate = () => {
    mutate();
  };

  return (
    <div className="flex flex-col gap-3 mx-3">
      {isPending && <InfiniteProgressBar />}

      <Textarea name="content" value={formData} onChange={handleInput} />

      <div className="text-right">
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </div>
  );
};

export default CommentEditInput;
