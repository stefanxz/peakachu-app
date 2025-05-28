"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface PerformanceData {
  f1: number[];
  precision: number[];
  recall: number[];
  frequency: number[];
  ap: number[];
  presence_acc: number[];
  absence_acc: number[];
}

interface EMRData {
  numFGs: number[];
  individualEMR: number[];
  accumulativeEMR: number[];
  frequency: number[];
}

const ModelEvaluationDashboard: React.FC = () => {
  const [currentData, setCurrentData] = useState<number[]>([]);
  const [sortMetric, setSortMetric] = useState<keyof PerformanceData>("f1");
  const [minFreq, setMinFreq] = useState<number>(0);

  const functionalGroups = [
    "Hydrazine",
    "Enol",
    "Sulfoxide",
    "Phosphine",
    "Imine",
    "Alkyne",
    "Sulfide",
    "Carbamate",
    "Enamine",
    "Acyl halide",
    "Alkene",
    "Haloalkane",
    "Thiol",
    "Azo compound",
    "Hydrazone",
    "Aldehyde",
    "Thial",
    "Amide",
    "Sulfone",
    "Isocyanate",
    "Ketone",
    "Thioamide",
    "Imide",
    "Sulfonic acid",
    "Phenol",
    "Amine",
    "Ester",
    "Isothiocyanate",
    "Acid anhydride",
    "Ether",
    "Sulfonamide",
    "Alcohol",
    "Sulfonate",
    "Carboxylic acid",
    "Nitrile",
    "Arene",
    "Alkane",
  ];

  const performanceData: PerformanceData = {
    f1: [
      0.533333, 0.54902, 0.564103, 0.618182, 0.631579, 0.658683, 0.665362,
      0.666667, 0.677778, 0.696429, 0.709271, 0.717545, 0.720721, 0.723404,
      0.731544, 0.734177, 0.734177, 0.753701, 0.78125, 0.790698, 0.796371, 0.8,
      0.809756, 0.809756, 0.817624, 0.843446, 0.843737, 0.851485, 0.851852,
      0.853689, 0.866894, 0.86751, 0.890756, 0.894316, 0.894952, 0.912174,
      0.947004,
    ],
    precision: [
      0.837209, 0.823529, 0.916667, 0.73913, 0.857143, 0.948276, 0.878553,
      0.966667, 0.824324, 0.866667, 0.897494, 0.844629, 0.895522, 0.85, 0.872,
      0.899225, 0.899225, 0.883281, 0.925926, 1.0, 0.896708, 0.96, 0.864583,
      0.821782, 0.909429, 0.904781, 0.926523, 0.877551, 0.92, 0.931496,
      0.962121, 0.924444, 0.981481, 0.930684, 0.967552, 0.916019, 0.927247,
    ],
    recall: [
      0.391304, 0.411765, 0.407407, 0.53125, 0.5, 0.504587, 0.535433, 0.508772,
      0.575472, 0.58209, 0.58631, 0.623702, 0.603015, 0.62963, 0.630058,
      0.620321, 0.620321, 0.657277, 0.675676, 0.653846, 0.716228, 0.685714,
      0.761468, 0.798077, 0.742655, 0.789898, 0.774532, 0.826923, 0.793103,
      0.787879, 0.78882, 0.817182, 0.815385, 0.860684, 0.832487, 0.908361,
      0.967622,
    ],
    frequency: [
      366, 138, 107, 130, 286, 435, 2538, 227, 425, 269, 5375, 8473, 796, 434,
      694, 749, 749, 1706, 298, 103, 4410, 281, 438, 417, 3950, 11406, 5339,
      207, 234, 12010, 644, 15271, 259, 4678, 1577, 24400, 32244,
    ],
    ap: [
      0.595658, 0.606818, 0.580773, 0.620662, 0.638138, 0.639889, 0.69661,
      0.62636, 0.674519, 0.706618, 0.783514, 0.812765, 0.715951, 0.736316,
      0.764159, 0.764764, 0.760908, 0.769113, 0.717987, 0.76566, 0.844984,
      0.808393, 0.839162, 0.801925, 0.863832, 0.920255, 0.898998, 0.889378,
      0.855878, 0.933599, 0.843376, 0.943518, 0.920124, 0.924809, 0.90611,
      0.979116, 0.983857,
    ],
    presence_acc: [
      0.391304, 0.411765, 0.407407, 0.53125, 0.5, 0.504587, 0.535433, 0.508772,
      0.575472, 0.58209, 0.58631, 0.623702, 0.603015, 0.62963, 0.630058,
      0.620321, 0.620321, 0.657277, 0.675676, 0.653846, 0.716228, 0.685714,
      0.761468, 0.798077, 0.742655, 0.789898, 0.774532, 0.826923, 0.793103,
      0.787879, 0.78882, 0.817182, 0.815385, 0.860684, 0.832487, 0.908361,
      0.967622,
    ],
    absence_acc: [
      0.99933, 0.999715, 0.999905, 0.999429, 0.999427, 0.999713, 0.995258,
      0.999905, 0.998755, 0.999427, 0.990221, 0.971171, 0.998647, 0.99885,
      0.998458, 0.998745, 0.998745, 0.996344, 0.999618, 1.0, 0.990364, 0.999809,
      0.998755, 0.998276, 0.992364, 0.969205, 0.991099, 0.999428, 0.999619,
      0.976935, 0.999519, 0.962104, 0.999905, 0.992002, 0.998917, 0.885766,
      0.753821,
    ],
  };

  const emrData: EMRData = {
    numFGs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    individualEMR: [
      0.711957, 0.643329, 0.554252, 0.567616, 0.587407, 0.562329, 0.455859,
      0.388889, 0.357143, 0.3, 0.0,
    ],
    accumulativeEMR: [
      0.711957, 0.656748, 0.586542, 0.577431, 0.580498, 0.577785, 0.570481,
      0.568614, 0.568052, 0.567798, 0.567744,
    ],
    frequency: [803, 3007, 8267, 10766, 10353, 5987, 2356, 486, 125, 31, 6],
  };

  useEffect(() => {
    updateData();
  }, [sortMetric, minFreq]);

  const updateData = () => {
    // Filter by frequency
    const filteredIndices = Array.from(
      { length: functionalGroups.length },
      (_, i) => i,
    ).filter(
      (i) =>
        performanceData.frequency[i] !== undefined &&
        performanceData.frequency[i] >= minFreq,
    );

    // Sort by selected metric
    filteredIndices.sort(
      (a, b) =>
        (performanceData[sortMetric][a] ?? 0) -
        (performanceData[sortMetric][b] ?? 0),
    );

    setCurrentData(filteredIndices);
  };

  const performanceChartData = [
    {
      x: currentData.map((i) => functionalGroups[i] ?? ""),
      y: currentData.map((i) => performanceData.f1[i] ?? 0),
      type: "bar" as const,
      name: "F1-Score",
      marker: { color: "rgba(102, 126, 234, 0.8)" },
      text: currentData.map((i) =>
        performanceData.f1[i] !== undefined
          ? performanceData.f1[i].toFixed(3)
          : "N/A",
      ),
      textposition: "outside" as const,
    },
    {
      x: currentData.map((i) => functionalGroups[i] ?? ""),
      y: currentData.map((i) => performanceData.precision[i] ?? 0),
      type: "bar" as const,
      name: "Precision",
      marker: { color: "rgba(118, 75, 162, 0.8)" },
    },
    {
      x: currentData.map((i) => functionalGroups[i] ?? ""),
      y: currentData.map((i) => performanceData.recall[i] ?? 0),
      type: "bar" as const,
      name: "Recall",
      marker: { color: "rgba(255, 99, 132, 0.8)" },
    },
  ];

  const frequencyChartData = [
    {
      x: currentData.map((i) => performanceData.frequency[i] ?? 0),
      y: currentData.map((i) => performanceData.f1[i] ?? 0),
      mode: "markers" as const,
      type: "scatter" as const,
      text: currentData.map((i) => functionalGroups[i] ?? ""),
      marker: {
        size: currentData.map(
          (i) => Math.log(performanceData.frequency[i] ?? 1) * 3,
        ),
        color: currentData.map((i) => performanceData.f1[i] ?? 0),
        colorscale: "Viridis" as const,
        showscale: true,
        colorbar: { title: { text: "F1-Score" } },
      },
    },
  ];

  const precisionRecallChartData = [
    {
      x: currentData.map((i) => performanceData.recall[i] ?? 0),
      y: currentData.map((i) => performanceData.precision[i] ?? 0),
      mode: "markers" as const,
      type: "scatter" as const,
      text: currentData.map((i) => functionalGroups[i] ?? ""),
      marker: {
        size: 12,
        color: currentData.map((i) => performanceData.f1[i] ?? 0),
        colorscale: "RdYlBu" as const,
        showscale: true,
        colorbar: { title: "F1-Score" },
      },
    },
  ];

  const emrChartData = [
    {
      x: emrData.numFGs,
      y: emrData.individualEMR,
      type: "bar" as const,
      name: "Individual EMR",
      marker: { color: "rgba(102, 126, 234, 0.8)" },
    },
    {
      x: emrData.numFGs,
      y: emrData.accumulativeEMR,
      type: "scatter" as const,
      mode: "lines+markers" as const,
      name: "Cumulative EMR",
      line: { color: "rgba(255, 99, 132, 1)", width: 3 },
      yaxis: "y" as const,
    },
    {
      x: emrData.numFGs,
      y: emrData.frequency,
      type: "scatter" as const,
      mode: "lines+markers" as const,
      name: "Sample Count",
      line: { color: "rgba(54, 162, 235, 1)", width: 2 },
      yaxis: "y2" as const,
    },
  ];

  const accuracyChartData = [
    {
      x: currentData.map((i) => functionalGroups[i] ?? ""),
      y: currentData.map((i) => performanceData.presence_acc[i] ?? 0),
      type: "bar" as const,
      name: "Presence Accuracy",
      marker: { color: "rgba(102, 126, 234, 0.8)" },
    },
    {
      x: currentData.map((i) => functionalGroups[i] ?? ""),
      y: currentData.map((i) => performanceData.absence_acc[i] ?? 0),
      type: "bar" as const,
      name: "Absence Accuracy",
      marker: { color: "rgba(118, 75, 162, 0.8)" },
    },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-gradient-to-br from-yellow-400 to-yellow-600 p-6">
      <div className="rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-center text-4xl font-bold text-transparent">
          Functional Group Classification Model
        </h1>
        <p className="mb-8 text-center text-xl text-gray-600">
          Performance Analysis Dashboard - Spectroscopy ML Model Evaluation
        </p>

        {/* Metric Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-center text-white shadow-lg">
            <div className="mb-1 text-3xl font-bold">0.752</div>
            <div className="text-sm opacity-90">Average F1-Score</div>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-center text-white shadow-lg">
            <div className="mb-1 text-3xl font-bold">0.914</div>
            <div className="text-sm opacity-90">Average Precision</div>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-center text-white shadow-lg">
            <div className="mb-1 text-3xl font-bold">0.695</div>
            <div className="text-sm opacity-90">Average Recall</div>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-center text-white shadow-lg">
            <div className="mb-1 text-3xl font-bold">56.8%</div>
            <div className="text-sm opacity-90">Overall EMR</div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <label className="min-w-[120px] font-semibold text-gray-700">
                Sort by:
              </label>
              <select
                value={sortMetric}
                onChange={(e) =>
                  setSortMetric(e.target.value as keyof PerformanceData)
                }
                className="rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm transition-colors focus:border-indigo-500 focus:outline-none"
              >
                <option value="f1">F1-Score</option>
                <option value="precision">Precision</option>
                <option value="recall">Recall</option>
                <option value="frequency">Frequency</option>
                <option value="ap">Average Precision</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="min-w-[120px] font-semibold text-gray-700">
                Min Frequency:
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                value={minFreq}
                step="50"
                onChange={(e) => setMinFreq(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="min-w-[50px] text-sm text-gray-600">
                {minFreq}
              </span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Performance Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              Performance Metrics by Functional Group
            </h3>
            <Plot
              data={performanceChartData}
              layout={{
                barmode: "group",
                xaxis: { tickangle: -45 },
                yaxis: { title: { text: "Score" }, range: [0, 1] },
                margin: { b: 120, t: 20, l: 60, r: 20 },
                font: { size: 11 },
                showlegend: true,
                legend: { orientation: "h", y: -0.3 },
                autosize: true,
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: "400px" }}
            />
          </div>

          {/* Frequency Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              Frequency vs Performance
            </h3>
            <Plot
              data={frequencyChartData}
              layout={{
                xaxis: {
                  title: { text: "Sample Frequency (log scale)" },
                  type: "log",
                },
                yaxis: { title: { text: "F1-Score" }, range: [0, 1] },
                hovermode: "closest",
                margin: { t: 20, b: 60, l: 60, r: 20 },
                autosize: true,
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: "400px" }}
            />
          </div>

          {/* Precision Recall Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              Precision vs Recall Trade-off
            </h3>
            <Plot
              data={precisionRecallChartData}
              layout={{
                xaxis: { title: { text: "Recall" }, range: [0, 1] },
                yaxis: { title: { text: "Precision" }, range: [0, 1] },
                margin: { t: 20, b: 60, l: 60, r: 20 },
                autosize: true,
                shapes: [
                  {
                    type: "line",
                    x0: 0,
                    y0: 1,
                    x1: 1,
                    y1: 0,
                    line: { color: "rgba(128, 128, 128, 0.5)", dash: "dot" },
                  },
                ],
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: "400px" }}
            />
          </div>

          {/* EMR Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              Exact Match Rate by # of FGs
            </h3>
            <Plot
              data={emrChartData}
              layout={{
                xaxis: { title: { text: "Number of Functional Groups" } },
                yaxis: { title: { text: "Exact Match Rate" }, range: [0, 1] },
                yaxis2: {
                  title: { text: "Sample Count" },
                  overlaying: "y",
                  side: "right",
                },
                legend: { orientation: "h", y: -0.2 },
                margin: { t: 20, b: 80, l: 60, r: 60 },
                autosize: true,
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: "400px" }}
            />
          </div>

          {/* Accuracy Chart - Full Width */}
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl lg:col-span-2">
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              Presence vs Absence Accuracy
            </h3>
            <Plot
              data={accuracyChartData}
              layout={{
                barmode: "group",
                xaxis: { tickangle: -45 },
                yaxis: { title: { text: "Accuracy" }, range: [0, 1] },
                margin: { b: 120, t: 20, l: 60, r: 20 },
                font: { size: 10 },
                showlegend: true,
                legend: { orientation: "h", y: -0.25 },
                autosize: true,
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: "400px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelEvaluationDashboard;
