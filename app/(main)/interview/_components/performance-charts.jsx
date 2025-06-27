"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Brain } from "lucide-react";
import { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PerformanceChart = ({ assessments }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const data = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(data);
    }
  }, [assessments]);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={"text-3xl font-bold"}>
            Performance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-2">
                          <p className="text-sm font-bold text-primary">
                            Score: {payload[0].value}%
                          </p>
                          <p>{payload[0].payload.date}</p>
                        </div>
                      );
                    }
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceChart;
