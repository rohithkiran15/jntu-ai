import { getCoverLetters } from "@/action/cover-letter";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div className="container mx-auto space-y-4 py-6">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
          <Link href={"/dashboard"}>
            <Button variant={"link"} className={"gap-2 pl-0"}>
              <ArrowLeft className="h-4 w-4" />
              Back to Industry Insights
            </Button>
          </Link>
        </div>

        {/* NEW: Heading and button aligned in one row */}
        <div className="flex items-center justify-between">
          <h1 className="text-6xl font-bold gradient-title">
            My Cover Letters
          </h1>
          <Link href="/ai-cover-letter/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {/* CoverLetterList renders here */}
        <CoverLetterList coverLetters={coverLetters} />
      </div>
    </div>
  );
}
