import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { userSlice } from "@/store/userSlice";
import { FaComments } from "react-icons/fa6";

const Comment = () => {
  const { isAuthenticated } = userSlice();
  return (
    <Sheet variant="bottom">
      <SheetTrigger asChild>
        <div>
          <FaComments className="w-5 h-5" />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto ">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>
        {isAuthenticated && (
          <div className="mt-5 mr-5">
            <CommentInput />
          </div>
        )}

        <div className="mt-5 overflow-auto">
          <CommentList />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Comment;
