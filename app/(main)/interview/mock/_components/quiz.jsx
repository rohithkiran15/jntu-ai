"use client";
import { generateQuiz, saveQuizResult } from "@/action/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hook/use-fetch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./quiz-result";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion + 1 === quizData.length) {
      finishQuiz();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((ans, index) => {
      if (ans === quizData[index].correctAnswer) {
        score++;
      }
    });
    return (score / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz submitted successfully!");
    } catch (error) {
      toast.error("Error submitting quiz, please try again." || error.message);
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz will contain 10 questions related to your industry.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={generateQuizFn}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div>
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
        </CardHeader>
        <CardContent className={"space-y-4"}>
          <p className="text-lg font-medium">{question.question}</p>

          <RadioGroup
            className={"space-y-2"}
            onValueChange={handleAnswer}
            value={answers[currentQuestion]}
          >
            {question.options.map((option, index) => (
              <div key={option + index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && (
            <div className="mt-4 p-2 border rounded-md bg-muted text-muted-foreground">
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!showExplanation && (
            <Button
              variant="outline"
              onClick={() => setShowExplanation(true)}
              disabled={!answers[currentQuestion]}
            >
              Show Explanation
            </Button>
          )}

          <Button
            onClick={handleNext}
            className={"ml-auto"}
            disabled={!answers[currentQuestion] || savingResult}
          >
            {savingResult && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {currentQuestion + 1 === quizData.length ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
