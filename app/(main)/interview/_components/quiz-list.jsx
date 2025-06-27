"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import QuizResult from "../mock/_components/quiz-result";

const QuizList = ({ assessments }) => {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  return (
    <div>
      <Card>
        <CardHeader
          className={
            "flex flex-row items-center justify-between space-y-0 pb-2"
          }
        >
          <div>
            <CardTitle className={"text-3xl md:text-4xl"}>
              Recent Quizzes
            </CardTitle>
            <CardDescription>
              Review your past quiz performances
            </CardDescription>
          </div>

          <Button onClick={() => router.push("/interview/mock")}>
            Start a new quiz
          </Button>
        </CardHeader>
        <CardContent>
          <div>
            {assessments.map((assessment, i) => {
              return (
                <Card
                  className={
                    "cursor-pointer hover:bg-muted/50 transition-colors"
                  }
                  onClick={() => setSelectedQuiz(assessment)}
                  key={assessment.id}
                >
                  <CardHeader>
                    <CardTitle>Quiz {i + 1}</CardTitle>
                    <CardDescription>
                      <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                      <div>
                        {format(
                          new Date(assessment.createdAt),
                          "MMMM dd, yyyy HH:mm"
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            onStartNew={() => router.push("/interview/mock")}
            hideStartNew
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizList;
