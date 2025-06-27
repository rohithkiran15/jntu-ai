import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      {" "}
      NotFound
      <Link href={"/"}>
        <Button>Home</Button>
      </Link>{" "}
    </div>
  );
};

export default NotFound;
