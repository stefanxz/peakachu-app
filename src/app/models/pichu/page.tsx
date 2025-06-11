"use client";
import { ModelUploader, type Model } from "@/components/custom/ModelUploader";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const PichuModel: Model = {
  name: "Pichu",
  description:
    "A fast and comprehensive model trained on standard IR spectra to detect all 37 functional groups. Designed for use with pure compounads",
  capabilities: [
    "Covers all 37 functional groups commonly found in organic and inorganic compounds",
    "Not optimized for noisy or complex spectra",
    "Ideal for clean, lab-quality IR spectra",
    "Best suited for general analysis pipelines and high-volume screening workflows",
  ],
};

const PichuPage = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold text-yellow-600">
          {PichuModel.name} Model
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
        model={PichuModel}
        onFileSelect={(file) => console.log(file)}
      />
    </div>
  );
};

export default PichuPage;
