import React from "react";

const page = () => {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Welcome to Peakachu!</h1>
      <p className="text-lg">
        This is our prediction tool for predicting Functional Groups in
        molecules and mixtures of molecules using Convolutional Neural Networks
        (CNNs), applied on IR spectra. Light weight and easy to use, Peakachu is
        designed to help you quickly identify functional groups in your IR
        spectra data.
      </p>
    </div>
  );
};

export default page;
