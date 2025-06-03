"use client";

import React from "react";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type ModelCardProps = {
  name: string;
  description: string;
  image: string;
};

export default function ModelCard({
  name,
  description,
  image,
}: ModelCardProps) {
  return (
    <div className="m-10 max-w-md overflow-hidden rounded-lg border border-yellow-200 shadow-sm transition-all hover:border-yellow-300 hover:shadow-md">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="relative flex h-[200px] items-center justify-center p-6">
            <Image
              src={image}
              alt={name}
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
              className="max-h-full max-w-full"
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-yellow-200 hover:bg-yellow-300" />
        <ResizablePanel defaultSize={50}>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-yellow-600">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
