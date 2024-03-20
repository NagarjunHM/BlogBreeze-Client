import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircleMore } from "lucide-react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { userSlice } from "@/store/userSlice";

const Comment = () => {
  const { isAuthenticated } = userSlice();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <MessageCircleMore />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>What are your thoughts</SheetDescription>
        </SheetHeader>
        {isAuthenticated && (
          <div className="mt-2">
            <CommentInput />
          </div>
        )}

        <div className="mt-2">
          <CommentList />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Comment;
