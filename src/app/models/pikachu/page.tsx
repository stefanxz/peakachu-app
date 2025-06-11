"use client";

import { ModelUploader, type Model } from "@/components/custom/ModelUploader";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const PikachuModel: Model = {
  name: "Pikachu",
  description:
    "An advanced model trained on a diverse dataset of IR spectra to detect all 37 functional groups with high accuracy.",
  capabilities: [
    "Covers all 37 functional groups with enhanced accuracy for complex cases",
    "Mid-level performance on noisy spectra",
    "Trained on shifted spectra",
  ],
};

const PikachuPage = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold text-yellow-600">
          {PikachuModel.name} Model
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
      <ModelUploader
        model={PikachuModel}
        onFileSelect={(file) => console.log(file)}
      />
    </div>
  );
};

export default PikachuPage;
