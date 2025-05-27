import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "src/server/api/trpc";
import { TRPCError } from "@trpc/server";

// Validation schemas
const jdxFileSchema = z.object({
  filename: z.string().regex(/\.jdx$/i, "File must have .jdx extension"),
  content: z.string().min(1, "File content cannot be empty"),
  size: z.number().max(10 * 1024 * 1024, "File size must be less than 10MB"),
});

// Router definition for model types
export const modelTypeSchema = z.enum([
  '0_model_extended',
  '0_model_original', 
  '0_model_weighted',
  '25_model_control',
  '50_model_control',
  '75_model_control',
  '100_model_control',
  '25_model_horizontal',
  '50_model_horizontal',
  '75_model_horizontal',
  '100_model_horizontal',
  '25_model_vertical',
  '50_model_vertical',
  '75_model_vertical',
  '100_model_vertical',
  '25_model_linearcomb',
  '50_model_linearcomb',
  '75_model_linearcomb',
  '100_model_linearcomb'
]);

// Analysis request schema, max 5 model types can be selected at once
export const analysisRequestSchema = z.object({
  file: jdxFileSchema,
  modelTypes: z.array(modelTypeSchema).min(1).max(5), // Limit potencial selection to 5 models at once
  confidence_threshold: z.number().min(0).max(1).default(0.5),
});


export const functionalGroupPredictionSchema = z.object({
  group_name: z.string(),
  confidence: z.number(),
  wavenumber_range: z.object({
    min: z.number(),
    max: z.number(),
  }),
  peak_intensity: z.number(),
});

// Analysis result schema for a single model type
export const analysisResultSchema = z.object({
  modelType: modelTypeSchema,
  modelInfo: z.object({
    name: z.string(),
    sample_count: z.number(),
    model_path: z.string(),
    description: z.string(),
  }),
  predictions: z.array(functionalGroupPredictionSchema),
  overall_confidence: z.number(),
  processing_time_ms: z.number(),
  metadata: z.object({
    filename: z.string(),
    file_size: z.number(),
    analysis_timestamp: z.string(),
  }),
});

//Aggregated analysis result schema for multiple model types selected
export const batchAnalysisResultSchema = z.object({
  results: z.array(analysisResultSchema),
  total_processing_time_ms: z.number(),
  metadata: z.object({
    filename: z.string(),
    file_size: z.number(),
    analysis_timestamp: z.string(),
    models_analyzed: z.number(),
  }),
});


