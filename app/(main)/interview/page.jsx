import { getAssessments } from "@/action/interview";
import React from "react";
import StatsCards from "./_components/stats-card";
import PerformanceChart from "./_components/performance-charts";
import QuizList from "./_components/quiz-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const InterviewPage = async () => {
  const assessments = await getAssessments();
  return (
    <div className="container mx-auto space-y-4 py-6">
      <div className="flex flex-col space-y-2 mx-2">
        <Link href={"/dashboard"}>
          <Button variant={"link"} className={"gap-2 pl-0"}>
            <ArrowLeft className="h-4 w-4" />
            Back to Industry Insights
          </Button>
        </Link>
      </div>
      <h1 className="text-6xl font-bold mb-5">Interview Preparation</h1>
      <div className="space-y-5">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
};

export default InterviewPage;
