import { getResume } from "@/action/resume";
import React from "react";
import ResumeBuilder from "./_components/resume-builder";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const resume = async () => {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2 mx-2">
        <Link href={"/dashboard"}>
          <Button variant={"link"} className={"gap-2 pl-0"}>
            <ArrowLeft className="h-4 w-4" />
            Back to Industry Insights
          </Button>
        </Link>
      </div>
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
};

export default resume;
