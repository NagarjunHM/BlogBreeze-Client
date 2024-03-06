import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import useStore from "@/store/useStore";
import { GoBell } from "react-icons/go";
import {
  User,
  Library,
  FileText,
  Settings,
  LogOut,
  SquarePen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import configureAxios from "@/hooks/configureAxios";

const Navbar = () => {
  const instance = configureAxios();
  const { isAuthenticated, resetValues } = useStore();
  const navigate = useNavigate();

  // function to logout the user
  const logoutUser = async () => {
    try {
      await instance.post("/user/logout");
      resetValues();
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="h-[57px]  flex items-center justify-between px-10 sticky top-0 backdrop-blur-xl z-10">
          <div className="text-3xl font-semibold tracking-tight cursor-pointer">
            <Link to="/">BlogBreeze</Link>
          </div>

          <div className="flex flex-row items-center gap-8">
            <Link to="/">
              <Button variant="outline" size="icon">
                <GoBell size="1.2rem" />
              </Button>
            </Link>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      // src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {/* <DropdownMenuLabel>
                    <p className="text-lg">My Account</p>
                  </DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  <Link to="/write">
                    <DropdownMenuItem className="text-lg text-muted-foreground">
                      <SquarePen className="w-5 h-5 mr-3" />
                      Write
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/profile">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-lg text-muted-foreground">
                      <User className="w-5 h-5 mr-3" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="text-lg text-muted-foreground">
                    <Library className="w-4 h-4 mr-3" />
                    Library
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-lg text-muted-foreground">
                    <FileText className="w-4 h-4 mr-3" />
                    Stories
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-lg text-muted-foreground">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-lg text-muted-foreground"
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
        <div className="h-[57px]  flex items-center justify-between px-10 sticky top-0 backdrop-blur-xl z-10">
          <div className="text-3xl font-semibold tracking-tight cursor-pointer">
            <Link to="/">BlogBreeze</Link>
          </div>
          <Button variant="secondary">Get Started</Button>
        </div>
      )}
    </>
  );
};

export default Navbar;
