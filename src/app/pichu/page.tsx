"use client";
import { ModelUploader, type Model } from "@/components/custom/ModelUploader";
import React from "react";

const PichuModel: Model = {
  name: "Pichu",
  description:
    "A fast and comprehensive model trained on standard IR spectra to detect all 37 functional groups. Designed for general-purpose use where accuracy and speed are both important.",
  capabilities: [
    "Covers all 37 functional groups commonly found in organic and inorganic compounds",
    "Optimized for high throughput: inference latency <100 ms/sample on CPU",
    "Achieves high mean F-score for prevalent classes (e.g. alkane: 0.947, arene: 0.912)",
    "Ideal for clean, lab-quality IR spectra",
    "Best suited for general analysis pipelines and high-volume screening workflows",
  ],
};

const PichuPage = () => {
  return (
    <div className="pt-8 pr-15">
      <ModelUploader
        model={PichuModel}
        onFileSelect={(file) => console.log(file)}
      ></ModelUploader>
    </div>
  );
};

export default PichuPage;
