"use client";

import ModelEvaluationDashboard from "@/components/custom/ModelEvaluationDashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold text-yellow-600">
          Model Performance Dashboard
        </h1>
        <Link href="/">
          <Button
            variant="outline"
            className="gap-2 border border-yellow-300 bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <Card className="w-full rounded-xl border-yellow-200 shadow-sm transition-all hover:border-yellow-300 hover:shadow-md">
        <CardContent className="p-6">
          <p className="mb-8 text-lg">
            Explore detailed metrics and performance analysis of our models.
          </p>
          <div className="w-full">
            <ModelEvaluationDashboard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
