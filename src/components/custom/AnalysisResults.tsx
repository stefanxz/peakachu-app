import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface AnalysisResult {
  functionalGroups: {
    name: string;
    confidence: number;
  }[];
  modelConfidence: number;
}

interface AnalysisResultsProps {
  results: AnalysisResult;
  isLoading: boolean;
}

export function AnalysisResults({ results, isLoading }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <Card className="mt-6 border-yellow-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"></div>
            <span className="ml-3 text-yellow-600">Analyzing spectrum...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 border-yellow-200 shadow-sm transition-all hover:border-yellow-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-yellow-600">Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Functional Groups Section */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              Detected Functional Groups
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {results.functionalGroups.map((group, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-yellow-100 bg-yellow-50 p-3"
                >
                  <span className="font-medium text-yellow-700">
                    {group.name}
                  </span>
                  <span className="rounded-full bg-yellow-200 px-2 py-1 text-sm text-yellow-800">
                    {(group.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Model Confidence */}
          <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Overall Model Confidence
            </h3>
            <div className="relative h-4 w-full rounded-full bg-yellow-200">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-yellow-400"
                style={{ width: `${results.modelConfidence * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-center text-sm text-yellow-700">
              {(results.modelConfidence * 100).toFixed(1)}% confident in
              analysis
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
