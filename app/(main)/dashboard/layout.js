import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold">Industry Insights</h1>

        <Link href={"/onboarding"}>
          <Button variant={"outline"}>Change your Profile</Button>
        </Link>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
