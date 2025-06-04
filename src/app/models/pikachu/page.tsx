"use client";

import { ModelUploader, type Model } from "@/components/custom/ModelUploader";
import React from "react";

const pikachuModel: Model = {
  name: "Pikachu",
  description:
    "A class-balanced model trained to improve functional group detection in underrepresented or rare categories by reducing false negatives.",
  capabilities: [
    "Enhanced detection of low-frequency functional groups (e.g. sulfoxide, hydrazine, phosphine)",
    "Trained using class-balanced loss to reduce bias toward common classes",
    "Improves F-score for low-sample targets like hydrazine (F1: 0.53) and sulfoxide (F1: 0.56)",
    "Critical for pharmaceutical R&D and novel compound characterization",
    "Maintains competitive average precision while boosting recall for minority classes",
  ],
};

const PikachuPage = () => {
  return (
    <div className="pt-8 pr-15">
      <ModelUploader
        model={pikachuModel}
        onFileSelect={(file) => console.log(file)}
      ></ModelUploader>
    </div>
  );
};
export default PikachuPage;
