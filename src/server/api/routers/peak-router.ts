import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "src/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { 
  analysisRequestSchema,
  analysisResultSchema,
  batchAnalysisResultSchema,
  modelTypeSchema
} from "src/lib/schemas";
import { parseJDXFile } from "src/lib/jdx-parser";
import { MODEL_REGISTRY } from "src/lib/model-info";
import { inferModel } from "src/lib/inference-interface";

export const peakRouter = createTRPCRouter({
  // Get all available models with metadata
  getModels: publicProcedure.query(() => {
    const models = Object.entries(MODEL_REGISTRY).map(([id, info]) => ({
      id,
      ...info
    }));
    
    // // Group models by category for easier UI organization
    // const groupedModels = models.reduce((acc, model) => {
    //   if (!acc[model.category]) {
    //     acc[model.category] = [];
    //   }
    //   acc[model.category].push(model);
    //   return acc;
    // }, {} as Record<string, typeof models>);
    
    return {
      models,
      // groupedModels,
      totalModels: models.length
    };
  }),

  // Analyze spectra with a single model
  analyzeSingle: publicProcedure
    .input(analysisRequestSchema)
    .output(analysisResultSchema)
    .mutation(async ({ input }) => {
      const startTime = Date.now();
      
      try {
        // Parse JDX file
        const jdxData = parseJDXFile(input.file.content);
        
        // Get model info
        const modelType = input.modelTypes[0];
        if (!modelType) {
          throw new Error("No model type provided.");
}
        const modelInfo = MODEL_REGISTRY[modelType];
        if (!modelInfo) {
          throw new Error(`Unknown model type: ${input.modelTypes}`);
        }
        
        // Run PyTorch model
        const analysis = await inferModel(jdxData, modelType, input.confidence_threshold);
        
        const processingTime = Date.now() - startTime;
        
        return {
          modelType: modelType,
          modelInfo,
          predictions: analysis.predictions,
          overall_confidence: analysis.overall_confidence,
          processing_time_ms: processingTime,
          metadata: {
            filename: input.file.filename,
            file_size: input.file.size,
            analysis_timestamp: new Date().toISOString(),
          }
        };
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Failed to analyze spectra: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }),

  // Analyze spectra with multiple models (batch)
  analyzeBatch: publicProcedure
    .input(analysisRequestSchema)
    .output(batchAnalysisResultSchema)
    .mutation(async ({ input }) => {
      const startTime = Date.now();
      
      try {
        // Parse JDX file once
        const jdxData = parseJDXFile(input.file.content);
        
        // Analyze with each selected model
        const results = [];
        for (const modelType of input.modelTypes) {
          const modelStartTime = Date.now();
          
          const modelInfo = MODEL_REGISTRY[modelType];
          if (!modelInfo) {
            console.warn(`Unknown model type: ${modelType}, skipping...`);
            continue;
          }
          
          const analysis = await inferModel(jdxData, modelType, input.confidence_threshold);
          
          results.push({
            modelType,
            modelInfo,
            predictions: analysis.predictions,
            overall_confidence: analysis.overall_confidence,
            processing_time_ms: Date.now() - modelStartTime,
            metadata: {
              filename: input.file.filename,
              file_size: input.file.size,
              analysis_timestamp: new Date().toISOString(),
            }
          });
        }
        
        const totalProcessingTime = Date.now() - startTime;
        
        return {
          results,
          total_processing_time_ms: totalProcessingTime,
          metadata: {
            filename: input.file.filename,
            file_size: input.file.size,
            analysis_timestamp: new Date().toISOString(),
            models_analyzed: results.length,
          }
        };
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Failed to analyze spectra: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }),

  // Validate JDX file without running analysis
  validateFile: publicProcedure
    .input(z.object({
      filename: z.string(),
      content: z.string(),
      size: z.number(),
    }))
    .query(({ input }) => {
      try {
        // Validate file extension
        if (!input.filename.toLowerCase().endsWith('.jdx')) {
          return { valid: false, error: 'File must have .jdx extension' };
        }
        
        // Validate file size
        if (input.size > 10 * 1024 * 1024) {
          return { valid: false, error: 'File size must be less than 10MB' };
        }
        
        // Parse and validate JDX content
        const jdxData = parseJDXFile(input.content);
        
        return {
          valid: true,
          metadata: {
            title: jdxData.metadata.title,
            dataType: jdxData.metadata.dataType,
            xUnits: jdxData.metadata.xUnits,
            yUnits: jdxData.metadata.yUnits,
            nPoints: jdxData.metadata.nPoints,
            xRange: { 
              min: jdxData.metadata.firstX,
              max: jdxData.metadata.lastX
            },
            yRange: { 
              min: jdxData.metadata.minY, 
              max: jdxData.metadata.maxY 
            }
          }
        };
      } catch (error) {
        return {
          valid: false,
          error: `Invalid JDX file: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    }),

  // Get models by category for organized UI display
  getModelsByCategory: publicProcedure
    .input(z.object({
      category: z.enum(['original', 'extended', 'weighted', 'control', 'horizontal', 'vertical', 'linearcomb']).optional()
    }))
    .query(({ input }) => {
      const allModels = Object.entries(MODEL_REGISTRY).map(([id, info]) => ({
        id,
        ...info
      }));
      
      if (input.category) {
        return allModels.filter(model => model.category === input.category);
      }
      
      return allModels;
    }),


    // Analyze with the Primary Choice model (0_model_extended.pt)
primaryChoice: publicProcedure
  .input(analysisRequestSchema)
  .output(analysisResultSchema)
  .mutation(async ({ input }) => {
    const startTime = Date.now();
    try {
      const jdxData = parseJDXFile(input.file.content);
      const modelType = "0_model_extended";
      const modelInfo = MODEL_REGISTRY[modelType];
      if (!modelInfo) throw new Error(`Unknown model type: ${modelType}`);
      const analysis = await inferModel(jdxData, modelType, input.confidence_threshold);
      return {
        modelType,
        modelInfo,
        predictions: analysis.predictions,
        overall_confidence: analysis.overall_confidence,
        processing_time_ms: Date.now() - startTime,
        metadata: {
          filename: input.file.filename,
          file_size: input.file.size,
          analysis_timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Primary Choice analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }),

// Analyze with the Robust Choice model (100_model_vertical.pt)
robustChoice: publicProcedure
  .input(analysisRequestSchema)
  .output(analysisResultSchema)
  .mutation(async ({ input }) => {
    const startTime = Date.now();
    try {
      const jdxData = parseJDXFile(input.file.content);
      const modelType = "100_model_vertical";
      const modelInfo = MODEL_REGISTRY[modelType];
      if (!modelInfo) throw new Error(`Unknown model type: ${modelType}`);
      const analysis = await inferModel(jdxData, modelType, input.confidence_threshold);
      return {
        modelType,
        modelInfo,
        predictions: analysis.predictions,
        overall_confidence: analysis.overall_confidence,
        processing_time_ms: Date.now() - startTime,
        metadata: {
          filename: input.file.filename,
          file_size: input.file.size,
          analysis_timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Robust Choice analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }),

// Analyze with the Precision Choice model (0_model_weighted.pt)
precisionChoice: publicProcedure
  .input(analysisRequestSchema)
  .output(analysisResultSchema)
  .mutation(async ({ input }) => {
    const startTime = Date.now();
    try {
      const jdxData = parseJDXFile(input.file.content);
      const modelType = "0_model_weighted";
      const modelInfo = MODEL_REGISTRY[modelType];
      if (!modelInfo) throw new Error(`Unknown model type: ${modelType}`);
      const analysis = await inferModel(jdxData, modelType, input.confidence_threshold);
      return {
        modelType,
        modelInfo,
        predictions: analysis.predictions,
        overall_confidence: analysis.overall_confidence,
        processing_time_ms: Date.now() - startTime,
        metadata: {
          filename: input.file.filename,
          file_size: input.file.size,
          analysis_timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Precision Choice analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }),

});