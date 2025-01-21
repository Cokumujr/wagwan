"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2 text-custom-purple-600 dark:text-custom-purple-400 hover:bg-custom-purple-100/50 dark:hover:bg-custom-purple-900/50"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-custom-purple-600 dark:text-custom-purple-400 hover:bg-custom-purple-100/50 dark:hover:bg-custom-purple-900/50"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[300px] border-custom-purple-200 dark:border-custom-purple-900"
        >
          <SheetHeader>
            <SheetTitle className="text-custom-purple-600 dark:text-custom-purple-400">
              Menu
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 justify-start text-custom-purple-600 dark:text-custom-purple-400 hover:bg-custom-purple-100/50 dark:hover:bg-custom-purple-900/50" 
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 justify-start text-custom-purple-600 dark:text-custom-purple-400 hover:bg-custom-purple-100/50 dark:hover:bg-custom-purple-900/50" 
                  asChild
                >
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 justify-start text-custom-purple-600 dark:text-custom-purple-400 hover:bg-custom-purple-100/50 dark:hover:bg-custom-purple-900/50" 
                  asChild
                >
                  <Link href="/profile">
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-3 justify-start w-full text-custom-purple-600 dark:text-custom-purple-400 hover:bg-custom-purple-100/50 dark:hover:bg-custom-purple-900/50"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button className="w-full bg-custom-purple-600 hover:bg-custom-purple-700 text-white">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;