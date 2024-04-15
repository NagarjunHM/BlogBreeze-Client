import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { Library, FileText, Settings, LogOut, SquarePen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "./SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { userSlice } from "@/store/userSlice";
import useAxios from "@/hooks/useAxios";
import { CiUser } from "react-icons/ci";
import { PiBooksThin } from "react-icons/pi";

const Navbar = () => {
  const instance = useAxios();
  const { isAuthenticated, resetValues, id, name, profilePicture } =
    userSlice();
  const navigate = useNavigate();

  // function to logout the user
  const logoutUser = async () => {
    try {
      await instance.post("/users/logout");
      resetValues();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="h-[57px]  flex items-center  justify-between  px-10 sticky top-0 bg-black/10 backdrop-blur-sm z-20">
          <div className="flex items-center gap-5">
            <Link
              className="text-3xl font-semibold tracking-wide cursor-pointer"
              to="/"
            >
              BlogBreeze
            </Link>
            <div className="hidden cursor-text sm:block">
              <SearchBar />
            </div>
          </div>

          <div className="flex flex-row items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="hidden text-sm sm:block">{name}</div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={`http://localhost:5000/${profilePicture}`}
                      alt="@shadcn"
                    />
                    <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-60">
                  <Link to="/create-blog">
                    <DropdownMenuItem className="flex items-baseline text-xl">
                      <SquarePen className="w-4 h-4 mr-3" />
                      Write blog
                    </DropdownMenuItem>
                  </Link>

                  {/* <DropdownMenuSeparator /> */}
                  <Link to={`/users/${id}`}>
                    <DropdownMenuItem className="flex items-center text-xl">
                      <CiUser className="mr-3 " />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  {/* <DropdownMenuItem className="flex items-baseline text-xl">
                    <PiBooksThin className="mr-3" />
                    Library
                  </DropdownMenuItem> */}
                  {/* <Link to="/stories">
                    <DropdownMenuItem className="flex items-baseline text-xl">
                      <FileText className="w-4 h-4 mr-3" />
                      Stories
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="flex items-baseline text-xl">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-baseline text-xl"
                    onClick={logoutUser}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[57px]  flex items-center  justify-between  px-10 sticky top-0 bg-black/10 backdrop-blur-sm z-20">
          <div className="flex items-center gap-5">
            <Link
              className="text-3xl font-semibold tracking-wide cursor-pointer"
              to="/"
            >
              BlogBreeze
            </Link>
            <div className="hidden cursor-text sm:block">
              <SearchBar />
            </div>
          </div>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
