export interface JDXData {
    x: number[];
    y: number[][];
}

export interface JDXMetadata {
    [key: string]: string | number;
}

export interface JDXFile {
    metadata: JDXMetadata;
    data: JDXData;
}


export function parseJDXFile(content: string): JDXFile {

const lines = content.split(/\r?\n/);
const metadata: JDXFile['metadata'] = {};
const data: Partial<JDXData> = {
    x: [],
    y: [],
}
let inXYData = false;


for (const line of lines) {
    if (line.startsWith("##")) {
        // Metadata line
        const [key, ...rest] = line.substring(2).split("=");
        metadata[key.trim()] = rest.join("=").trim();
        if (key.trim() === "XYDATA") {
            inXYData = true;
        }
        continue;
    }
    if (inXYData && line.trim() && !line.startsWith("##")) {
        // XY data lines
        const nums = line.trim().split(/\s+/).map(Number);
        if (nums.length > 1) {
            // First number is X, rest are Y values
            const xValue = nums[0];
            const yValues = nums.slice(1);
                
            data.x!.push(xValue);
            data.y!.push(yValues); // Store all Y values as an array
        }
    }
    if (line.startsWith("##END=")) {
        inXYData = false;
        break;
    }
  }
    return JDXFile[metadata, data];
}