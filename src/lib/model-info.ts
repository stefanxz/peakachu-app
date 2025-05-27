export interface ModelInfo {
name: string;
sample_count: number;
model_path: string;
description: string;
category: 'original' | 'extended' | 'weighted' | 'control' | 'horizontal' | 'vertical' | 'linearcomb';
}

export const MODEL_REGISTRY: Record<string, ModelInfo> = {

"0_model_extended": {
    name: "Extended Model",
    sample_count: 37,
    model_path: "0_model_extended.pt",
    description: "Extended training dataset with additional functional group samples",
    category: "extended"
},
"0_model_original": {
    name: "Original Model", 
    sample_count: 22,
    model_path: "0_model_original.pt",
    description: "Original baseline model with standard training set",
    category: "original"
},
"0_model_weighted": {
    name: "Weighted Model",
    sample_count: 37,
    model_path: "0_model_weighted.pt", 
    description: "Model with weighted loss function for balanced predictions",
    category: "weighted"
},
"25_model_control": {
    name: "25% Control Model",
    sample_count: 37,
    model_path: "25_model_control.pt",
    description: "Control model with 25% data augmentation",
    category: "control"
},
"50_model_control": {
    name: "50% Control Model",
    sample_count: 37,
    model_path: "50_model_control.pt",
    description: "Control model with 50% data augmentation",
    category: "control"
},
"75_model_control": {
    name: "75% Control Model",
    sample_count: 37,
    model_path: "75_model_control.pt",
    description: "Control model with 75% data augmentation", 
    category: "control"
},
"100_model_control": {
    name: "100% Control Model",
    sample_count: 37,
    model_path: "100_model_control.pt",
    description: "Control model with 100% data augmentation",
    category: "control"
},
"25_model_horizontal": {
    name: "25% Horizontal Model",
    sample_count: 37,
    model_path: "25_model_horizontal.pt",
    description: "Model with 25% horizontal data augmentation",
    category: "horizontal"
},
"50_model_horizontal": {
    name: "50% Horizontal Model", 
    sample_count: 37,
    model_path: "50_model_horizontal.pt",
    description: "Model with 50% horizontal data augmentation",
    category: "horizontal"
},
"75_model_horizontal": {
    name: "75% Horizontal Model",
    sample_count: 37,
    model_path: "75_model_horizontal.pt",
    description: "Model with 75% horizontal data augmentation",
    category: "horizontal"
},
"100_model_horizontal": {
    name: "100% Horizontal Model",
    sample_count: 37,
    model_path: "100_model_horizontal.pt",
    description: "Model with 100% horizontal data augmentation",
    category: "horizontal"
},
"25_model_vertical": {
    name: "25% Vertical Model",
    sample_count: 37,
    model_path: "25_model_vertical.pt",
    description: "Model with 25% vertical data augmentation",
    category: "vertical"
},
"50_model_vertical": {
    name: "50% Vertical Model",
    sample_count: 37,
    model_path: "50_model_vertical.pt", 
    description: "Model with 50% vertical data augmentation",
    category: "vertical"
},
"75_model_vertical": {
    name: "75% Vertical Model",
    sample_count: 37,
    model_path: "75_model_vertical.pt",
    description: "Model with 75% vertical data augmentation",
    category: "vertical"
},
"100_model_vertical": {
    name: "100% Vertical Model",
    sample_count: 37,
    model_path: "100_model_vertical.pt",
    description: "Model with 100% vertical data augmentation",
    category: "vertical"
},
"25_model_linearcomb": {
    name: "25% Linear Combination Model",
    sample_count: 37,
    model_path: "25_model_linearcomb.pt",
    description: "Model with 25% linear combination augmentation",
    category: "linearcomb"
},
"50_model_linearcomb": {
    name: "50% Linear Combination Model",
    sample_count: 37,
    model_path: "50_model_linearcomb.pt",
    description: "Model with 50% linear combination augmentation", 
    category: "linearcomb"
},
"75_model_linearcomb": {
    name: "75% Linear Combination Model",
    sample_count: 37,
    model_path: "75_model_linearcomb.pt",
    description: "Model with 75% linear combination augmentation",
    category: "linearcomb"
},
"100_model_linearcomb": {
    name: "100% Linear Combination Model",
    sample_count: 37,
    model_path: "100_model_linearcomb.pt",
    description: "Model with 100% linear combination augmentation",
    category: "linearcomb"
}

};