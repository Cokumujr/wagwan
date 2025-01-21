import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server"
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { getUserByClerkId } from "@/actions/user.action";
import { MapPinIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { Button } from "./button";


async function Sidebar() {

    const authUser = await currentUser();
    if (!authUser) return <UnAuthenticatedSidebar />; 

    const user =await getUserByClerkId(authUser.id);
    if (!user) return <UnAuthenticatedSidebar />;
    console.log({user});

    return (
      <div className="sticky top-20">
        <Card className="border-custom-purple-200 dark:border-custom-purple-900 bg-white dark:bg-gray-950">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Link
                href={`/profile/${user.username}`}
                className="flex flex-col items-center justify-center group"
              >
                <Avatar className="w-20 h-20 border-2 border-custom-purple-200 dark:border-custom-purple-800 ring-2 ring-custom-purple-100 dark:ring-custom-purple-900 ring-offset-2 transition-all duration-200 group-hover:ring-custom-purple-300 dark:group-hover:ring-custom-purple-700">
                  <AvatarImage src={user.image || "/avatar.png"} />
                </Avatar>
  
                <div className="mt-4 space-y-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-custom-purple-600 dark:group-hover:text-custom-purple-400 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{user.username}
                  </p>
                </div>
              </Link>
  
              {user.bio && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  {user.bio}
                </p>
              )}
  
              <div className="w-full">
                <Separator className="my-4 bg-custom-purple-100 dark:bg-custom-purple-900" />
                <div className="flex justify-between px-4">
                  <div className="text-center">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {user._count.following.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Following
                    </p>
                  </div>
                  <Separator orientation="vertical" className="bg-custom-purple-100 dark:bg-custom-purple-900" />
                  <div className="text-center">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {user._count.followers.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Followers
                    </p>
                  </div>
                </div>
                <Separator className="my-4 bg-custom-purple-100 dark:bg-custom-purple-900" />
              </div>
  
              <div className="w-full space-y-3 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-300 hover:text-custom-purple-600 dark:hover:text-custom-purple-400 transition-colors">
                  <MapPinIcon className="w-4 h-4 mr-2 text-custom-purple-500 dark:text-custom-purple-400" />
                  {user.location || "No location"}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <LinkIcon className="w-4 h-4 mr-2 shrink-0 text-custom-purple-500 dark:text-custom-purple-400" />
                  {user.website ? (
                    <a 
                      href={`${user.website}`} 
                      className="hover:text-custom-purple-600 dark:hover:text-custom-purple-400 truncate transition-colors" 
                      target="_blank"
                    >
                      {user.website}
                    </a>
                  ) : (
                    "No website"
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
    }
    
    export default Sidebar;

    const UnAuthenticatedSidebar = () => (
      <div className="sticky top-20">
        <Card className="border-custom-purple-200 dark:border-custom-purple-900 bg-white dark:bg-gray-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-xl font-semibold bg-gradient-to-r from-custom-purple-600 to-custom-purple-500 bg-clip-text text-transparent dark:from-custom-purple-400 dark:to-custom-purple-300">
              Welcome Back!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-gray-600 dark:text-gray-300">
              Login to access your profile and connect with others.
            </p>
            <div className="space-y-3">
              <SignInButton mode="modal">
                <Button 
                  className="w-full border-custom-purple-200 dark:border-custom-purple-800 text-custom-purple-600 dark:text-custom-purple-400 hover:bg-custom-purple-50 dark:hover:bg-custom-purple-900/50 hover:border-custom-purple-300 dark:hover:border-custom-purple-700 transition-all" 
                  variant="outline"
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button 
                  className="w-full bg-custom-purple-600 hover:bg-custom-purple-700 dark:bg-custom-purple-500 dark:hover:bg-custom-purple-600 text-white shadow-sm hover:shadow-md transition-all" 
                  variant="default"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </CardContent>
        </Card>
      </div>
    );