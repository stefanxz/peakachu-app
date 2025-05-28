"use client";
import { ModelUploader } from "@/components/custom/ModelUploader";
import React from "react";

const raichuModel = {
  name: "Raichu",
  description:
    "A robust model trained with heavy noise augmentation to simulate real-world conditions. Optimized for spectra with peak distortion, baseline drift, or instrumentation variability.",
  capabilities: [
    "Trained with 100% vertical noise augmentation for resilience to signal artifacts",
    "Outperforms baseline models under degraded conditions (e.g. industrial or legacy instruments)",
    "Maintains prediction stability across varying signal-to-noise ratios",
    "Recommended for production environments with uncontrolled acquisition conditions",
    "Most tolerant to low-SNR data without sacrificing average precision (e.g. alkane: AP 0.98)",
  ],
};

const RaichuPage = () => {
  return (
    <div className="pt-8 pr-15">
      <ModelUploader
        model={raichuModel}
        onFileSelect={(file) => console.log(file)}
      ></ModelUploader>
    </div>
  );
};

export default RaichuPage;
