"use client";

import ModelEvaluationDashboard from "@/components/custom/ModelEvaluationDashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="w-full p-4">
      <Card className="w-full rounded-xl border-yellow-200 shadow-sm transition-all hover:border-yellow-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-yellow-600">
            Model Performance Dashboard
          </CardTitle>
        </CardHeader>
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
