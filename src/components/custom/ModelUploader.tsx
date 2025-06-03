import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnalysisResults, type AnalysisResult } from "./AnalysisResults";

const API_ENDPOINTS = {
  pichu: "https://api.peakachu.ai/v1/pichu/analyze",
  pikachu: "https://api.peakachu.ai/v1/pikachu/analyze",
  raichu: "https://api.peakachu.ai/v1/raichu/analyze",
};

export type Model = {
  name: string;
  description: string;
  capabilities: string[];
};

type ModelUploaderProps = {
  model: Model;
  onFileSelect?: (file: File) => void;
};

export function ModelUploader({ model, onFileSelect }: ModelUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(
    null,
  );

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      // Extract model name without .pt extension (already handled in the model prop)
      formData.append("model", model.name.toLowerCase());
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform the API response into our AnalysisResult format
      const analysisResult: AnalysisResult = {
        functionalGroups: data.predictions.map(
          (prediction: number, index: number) => ({
            name: `Group ${index + 1}`,
            confidence: prediction,
          }),
        ),
        modelConfidence: Math.max(...data.predictions),
      };

      setAnalysisResults(analysisResult);
    } catch (error) {
      console.error("Error analyzing file:", error);
      // You might want to add error handling UI here
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0]!;
        setFile(selectedFile);
        onFileSelect?.(selectedFile);
        await analyzeFile(selectedFile);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "chemical/x-jdx": [".jdx", ".dx"] },
    multiple: false,
  });

  const handleClear = () => {
    setFile(null);
    setAnalysisResults(null);
    onFileSelect?.(null as any);
  };

  return (
    <Card className="border-yellow-200 pt-4 shadow-sm transition-all hover:border-yellow-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-yellow-600">{model.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div>
          <p className="mb-4">{model.description}</p>
          <ul className="list-disc pl-5 marker:text-yellow-500">
            {model.capabilities.map((cap, idx) => (
              <li key={idx}>{cap}</li>
            ))}
          </ul>
        </div>

        <div
          {...getRootProps()}
          className={`my-8 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-150 ${
            isDragActive
              ? "border-yellow-400 bg-yellow-50"
              : "border-yellow-200 hover:border-yellow-300"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-sm font-medium">Selected: {file.name}</p>
          ) : (
            <p className="text-sm text-gray-600">
              Drag & drop a <code className="text-yellow-600">.jdx</code> or{" "}
              <code className="text-yellow-600">.dx</code> file here,
              <br /> or click to browse
            </p>
          )}
        </div>

        {file && (
          <Button
            variant="secondary"
            className="mt-4 border-yellow-200 bg-yellow-50 hover:bg-yellow-100"
            onClick={handleClear}
          >
            Clear File
          </Button>
        )}

        {(isAnalyzing || analysisResults) && (
          <AnalysisResults
            results={analysisResults as AnalysisResult}
            isLoading={isAnalyzing}
          />
        )}
      </CardContent>
    </Card>
  );
}
