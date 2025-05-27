"use client";

import React from "react";
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
    <div className="max-w-md overflow-hidden rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-[200px] items-center justify-center p-6">
            <img src={image} alt={name} className="h-full object-contain" />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-semibold">{name}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
