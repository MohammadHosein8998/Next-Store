"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link  from "next/link";
import { toast } from "sonner";

const SignOutLink = () => {
  const handleLogOut = () => {
    toast("logout event", {
      description: "log out is successful",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };
  return (
    <SignOutButton>
      <Link href="/" className="w-full text-left" onClick={handleLogOut}>
        Logout
      </Link>
    </SignOutButton>
  );
};

export default SignOutLink;
