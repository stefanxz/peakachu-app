"use client";

import ModelCard from "@/components/custom/ModelCard";

const page = () => {
  const models = [
    {
      name: "Pichu",
      description:
        "Pichu is a lightweight model for predicting functional groups in IR spectra, designed for quick and efficient analysis.",
      image: "/pics/pichu.png",
    },
    {
      name: "Pikachu",
      description:
        "Pikachu is a more advanced model that provides detailed predictions of functional groups in complex IR spectra.",
      image: "/pics/peakachu-logo.png",
    },
    {
      name: "Raichu",
      description:
        "Raichu is our most powerful model, capable of handling large datasets and providing high accuracy in functional group predictions.",
      image: "/pics/raichu.png",
    },
  ];
  return (
    <>
      <div className="p-8">
        <h1 className="mb-4 text-3xl font-bold">Welcome to Peakachu!</h1>
        <p className="p-2 text-lg">
          This is our prediction tool for predicting Functional Groups in
          molecules and mixtures of molecules using Convolutional Neural
          Networks (CNNs), applied on IR spectra. Light weight and easy to use,
          Peakachu is designed to help you quickly identify functional groups in
          your IR spectra data. Gotta analyse 'em all!
        </p>
        <p className="p-2 text-lg">
          Want to learn more about the performance of our model(s)? Check out
          our metrics{" "}
          <a
            href="https://claude.ai/public/artifacts/6c41bcdf-94ec-48b7-b45d-d7ec7776d24f"
            className="text-yellow-500 hover:underline"
          >
            here!
          </a>
        </p>
      </div>
      <div className="flex justify-center p-8">
        {models.map((model) => (
          <ModelCard
            key={model.name}
            name={model.name}
            description={model.description}
            image={model.image}
          />
        ))}
      </div>
    </>
  );
};

export default page;
