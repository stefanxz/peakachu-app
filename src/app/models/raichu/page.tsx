"use client";
import { ModelUploader, type Model } from "@/components/custom/ModelUploader";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const RaichuModel: Model = {
  name: "Raichu",
  description:
    "Our most powerful model, combining advanced architectures and extensive training data to provide state-of-the-art functional group detection across all scenarios.",
  capabilities: [
    "Best-in-class accuracy across all 37 functional groups",
    "Handles noisy spectra, shifted spectra, and is fine-tuned for propanol-ester artificial mixtures",
    "Ideal for research and quality control in advanced applications",
  ],
};

const RaichuPage = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold text-yellow-600">
          {RaichuModel.name} Model
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
        model={RaichuModel}
        onFileSelect={(file) => console.log(file)}
      />
    </div>
  );
};

export default RaichuPage;
