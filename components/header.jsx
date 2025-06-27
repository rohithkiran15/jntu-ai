import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LetterTextIcon,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    //
    <header className="fixed h-28 top-0 w-full border-b bg-blue-400 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-blue-400/80">
      <nav className="mx-auto flex px-4 items-center justify-between">
        <Link href="https://jntuhceh.ac.in/">
          <Image
            src="/jntuhlogo.png"
            width={200}
            height={60}
            alt="JNTU Logo"
            //
            className="h-25 w-25 object-contain"
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-white border-white bg-red-500 hover:bg-white hover:text-blue-600">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/resume"} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href={"/interview"} className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Interview Preparation</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/ai-cover-letter"}
                    className="flex items-center gap-2"
                  >
                    <LetterTextIcon className="h-4 w-4" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Link href="/sign-in">
                <Button className="text-white border-white bg-red-500 hover:bg-white hover:text-blue-600 hover:cursor-pointer">
                  Sign In
                </Button>
              </Link>
            </SignInButton>
            <SignUpButton>
              <Button className="text-white border-white bg-red-500 hover:bg-white hover:text-blue-600 hover:cursor-pointer">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 !w-10 !h-10 rounded-full overflow-hidden",
                  avatarImage: "!w-10 !h-10 object-cover", // ADD THIS LINE
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
