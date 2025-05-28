import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]!);
        onFileSelect?.(acceptedFiles[0]!);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "chemical/x-jdx": [".jdx", ".dx"] },
    multiple: false,
  });

  return (
    <Card className="pt-4">
      <CardHeader>
        <CardTitle>{model.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{model.description}</p>
        <ul className="mb-4 list-disc pl-5">
          {model.capabilities.map((cap, idx) => (
            <li key={idx}>{cap}</li>
          ))}
        </ul>

        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-150 ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-200"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-sm font-medium">Selected: {file.name}</p>
          ) : (
            <p className="text-sm text-gray-600">
              Drag & drop a <code>.jdx</code> or <code>.dx</code> file here,
              <br /> or click to browse
            </p>
          )}
        </div>

        {file && (
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => {
              setFile(null);
              onFileSelect?.(null as any);
            }}
          >
            Clear File
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
