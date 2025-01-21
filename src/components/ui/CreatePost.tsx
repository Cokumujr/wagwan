"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./card";

import { Textarea } from "./textarea";
import { Avatar, AvatarImage } from "./avatar";
import { Button } from "./button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/actions/post.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

function CreatePost() {
     const {user} = useUser();
     const [content, setContent] = useState("");
     const [imageUrl,setImageUrl] = useState("");
     const [isPosting,setIsPosting] = useState(false);
     const [showImageUpload,setShowImageUpload] = useState(false);

     const handleSubmit = async () => {
        if(!content.trim() && !imageUrl) return 

        setIsPosting(true);
        try {
            const result = await createPost (content, imageUrl);
            if(result?.success){
                setContent("");
                setImageUrl("");
                setShowImageUpload(false);
                console.log("Post created successfully"); 
                toast.success("Post created successfully");
            }
        } catch (error) {
            console.error("Failed to create post", error);
            toast.error("Failed to create post");
        }finally{
            setIsPosting(false);
        }
     };
         

     return (
        <Card className="mb-6 border-custom-purple-200 dark:border-custom-purple-900">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Avatar className="w-12 h-12 border-2 border-custom-purple-200 dark:border-custom-purple-800">
                  <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                </Avatar>
                <Textarea
                  placeholder="What's on your mind?"
                  className="min-h-[100px] resize-none border-none focus-visible:ring-1 focus-visible:ring-custom-purple-400 dark:focus-visible:ring-custom-purple-600 p-2 text-base rounded-lg bg-custom-purple-50/50 dark:bg-custom-purple-900/20 placeholder:text-custom-purple-400/60 dark:placeholder:text-custom-purple-500/60"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isPosting}
                />
              </div>
            </div>

            {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}


            <div className="flex items-center justify-between border-t border-custom-purple-200 dark:border-custom-purple-900 pt-4 mt-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-custom-purple-600 dark:text-custom-purple-400 hover:bg-custom-purple-100/50 dark:hover:bg-custom-purple-900/50 transition-colors"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-4 mr-2" />
                Photo
              </Button>

              <Button
                className="bg-custom-purple-600 hover:bg-custom-purple-700 dark:bg-custom-purple-600 dark:hover:bg-custom-purple-700 text-white transition-colors"
                onClick={handleSubmit}
                disabled={(!content.trim() && !imageUrl) || isPosting}
              >
                {isPosting ? (
                  <>
                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <SendIcon className="size-4 mr-2" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )
}

export default CreatePost