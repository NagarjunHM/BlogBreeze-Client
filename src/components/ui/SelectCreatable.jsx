import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "@/hooks/useAxios";
import { userSlice } from "@/store/userSlice";
import AsyncCreatableSelect from "react-select/async-creatable";
import { useMutation } from "@tanstack/react-query";

const SelectCreatable = () => {
  const instance = useAxios();
  const { token } = userSlice();

  const [selectedOption, setSelectedOption] = useState(null);

  // Cleanup function for cancelling Axios request
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    return () => {
      cancelTokenSource.cancel("Request cancelled");
    };
  }, []);

  // onchange search function
  const promiseOptions = async (inputValue) => {
    if (!inputValue.trim()) {
      return [];
    }

    try {
      const response = await instance.get(`/tags?tag=${inputValue}`);
      return response.data.map((tag) => ({
        value: tag._id,
        label: tag.name,
      }));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
      } else {
        console.log("Error", error.message);
      }
      return [];
    }
  };

  // Mutation function to create a tag
  const createTag = useMutation({
    mutationFn: async (inputValue) => {
      const response = await instance.post(
        "/tags",
        { name: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      const newOption = { value: data._id, label: data.name };
      setSelectedOption(newOption);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // function when a selection is changed
  const handleChange = (newValue) => {
    setSelectedOption(newValue);
  };

  // Function to handle tag creation
  const handleCreate = (inputValue) => {
    createTag.mutate(inputValue);
  };

  return (
    <div style={{ width: 300 }}>
      <AsyncCreatableSelect
        styles={{
          option: (defaultStyles, state) => ({
            ...defaultStyles,
            maxWidth: "382px",
            backgroundColor: state.isSelected ? "#F1F5F9" : "white",
            backgroundColor: state.isFocused ? "#F1F5F9" : "white",
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: "#E2E8F0",
            boxShadow: "none",
            maxWidth: "382px",
            fontSize: "0.875rem",
            "&:hover": {
              border: "1px solid #E2E8F0",
            },
            border: "1px solid #E2E8F0",
            borderRadius: "0.375rem",
          }),
        }}
        isClearable
        onChange={handleChange}
        onCreateOption={handleCreate}
        loadOptions={promiseOptions}
        value={selectedOption}
      />
    </div>
  );
};

export default SelectCreatable;
