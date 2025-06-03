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
