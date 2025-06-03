"use client";

import ModelCard from "@/components/custom/ModelCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const page = () => {
  const models = [
    {
      name: "Pichu",
      description:
        "Pichu is a lightweight model for predicting functional groups in IR spectra, designed for quick and efficient analysis.",
      image: "/pictures/pichu.png",
    },
    {
      name: "Pikachu",
      description:
        "Pikachu is a more advanced model that provides detailed predictions of functional groups in complex IR spectra.",
      image: "/pictures/pikachu.png",
    },
    {
      name: "Raichu",
      description:
        "Raichu is our most powerful model, capable of handling large datasets and providing high accuracy in functional group predictions.",
      image: "/pictures/raichu.png",
    },
  ];
  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-yellow-500">Peakachu!</span>
        </h1>
        <p className="p-4 text-lg">
          This is our prediction tool for predicting Functional Groups in
          molecules and mixtures of molecules using Convolutional Neural
          Networks (CNNs), applied on IR spectra. Light weight and easy to use,
          Peakachu is designed to help you quickly identify functional groups in
          your IR spectra data. Gotta analyse 'em all!
        </p>
      </div>
      <div className="flex justify-center pb-4">
        {models.map((model) => (
          <ModelCard
            key={model.name}
            name={model.name}
            description={model.description}
            image={model.image}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 pb-10">
        <p className="text-lg">
          Want to learn more about the performance of our model(s)?
        </p>
        <Link href="/dashboard">
          <Button className="gap-2 border border-yellow-300 bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
            <BarChart3 className="h-5 w-5" />
            View Performance Dashboard
          </Button>
        </Link>
      </div>
    </>
  );
};

export default page;
