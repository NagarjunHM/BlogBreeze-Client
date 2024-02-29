import instance from "@/axios/axios";

// to register a new user
export const registerUserAPI = async (name, email, password) => {
  try {
    const res = await instance({
      url: "/user/register",
      method: "Post",
      data: { name, email, password },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

// to login a user
export const loginUserAPI = async (email, password) => {
  try {
    const res = await instance({
      url: "/user/login",
      method: "Post",
      data: { email, password },
    });

    return res;
  } catch (err) {
    throw err;
  }
};
