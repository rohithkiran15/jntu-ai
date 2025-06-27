"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

const QuizResult = ({ result, hideStartNew = false, onStartNew }) => {
  if (!result) {
    return null;
  }
  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">
            {result.quizScore.toFixed(1)}%
          </h3>
          <Progress value={result.quizScore} className={"w-full"} />
        </div>

        {result.improvementTip && (
          <div className="mt-4 text-center text-lg font-semibold text-gray-700">
            Improvement Tip: {result.improvementTip}
          </div>
        )}

        <div className="space-y-4 mt-4">
          <h3 className="font-medium">Question Review</h3>
          {result.questions.map((q, index) => (
            <div
              key={q.id || index}
              className="border rounded-md shadow-sm bg-white"
            >
              <div className="flex items-start justify-between p-4 border-b border-gray-200">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 " />
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>

              <div className="text-sm bg-muted p-2 rounded">
                <p className="font-medium">Explanation: </p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="flex justify-center mt-4">
          <Button
            onClick={onStartNew}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
};

export default QuizResult;
