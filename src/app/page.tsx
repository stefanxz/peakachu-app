"use client";

import ModelCard from "@/components/custom/ModelCard";
import ModelEvaluationDashboard from "@/components/custom/ModelEvaluationDashboard";

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
      image: "/public/peackachu-logo.jpeg",
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
      <div className="p-4">
        <h1 className="text-3xl font-bold">
          Welcome to <p className="flex inline text-yellow-500">Peakachu!</p>
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
      <p className="pb-10 text-lg">
        Want to learn more about the performance of our model(s)? Check out our
        metrics below!
      </p>
      <ModelEvaluationDashboard></ModelEvaluationDashboard>
    </>
  );
};

export default page;
