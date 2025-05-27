export interface JDXFileData {
    x: number[];
    y: number[][];
}

export interface JDXFileMetadata {
    [key: string]: string | number;
}

export interface JDXFile {
    metadata: JDXFileMetadata;
    data: JDXFileData;
}


export function parseJDXFile(content: string): JDXFile {
    const lines = content.split(/\r?\n/);
    const metadata: JDXFile['metadata'] = {};
    const data: JDXFile['data'] = {
        x: [],
        y: [],
    }
    let inXYData = false;

    for (const line of lines) {    
        if (inXYData && line.trim() && !line.startsWith("##")) {
            // XY data lines
            const nums = line.trim().split(/\s+/).map(Number);
            if (nums.length > 1) {
                // First number is X, rest are Y values
                const xValue = nums[0];
                const yValues = nums.slice(1);
                if (typeof xValue === 'number' && !isNaN(xValue)) {
                    data.x.push(xValue);
                    data.y.push(yValues); // Store all Y values as an array
                }
            }
        } else if (line.trim().startsWith('##TITLE=')) {
            metadata.title = line.trim().substring(8);
        } else if (line.trim().startsWith('##DATA TYPE=')) {
            metadata.dataType = line.trim().substring(12);
        } else if (line.trim().startsWith('##XUNITS=')) {
            metadata.xUnits = line.trim().substring(9);
        } else if (line.trim().startsWith('##YUNITS=')) {
            metadata.yUnits = line.trim().substring(9);
        } else if (line.trim().startsWith('##FIRSTX=')) {
            metadata.firstX = parseFloat(line.trim().substring(9));
        } else if (line.trim().startsWith('##LASTX=')) {
            metadata.lastX = parseFloat(line.trim().substring(8));
        } else if (line.trim().startsWith('##NPOINTS=')) {
            metadata.nPoints = parseInt(line.trim().substring(10));
        } else if (line.trim().startsWith('##MAXY=')) {
            metadata.maxY = parseFloat(line.trim().substring(8));
        } else if (line.trim().startsWith('##MINY=')) {
            metadata.minY = parseFloat(line.trim().substring(8));
        } else if (line.trim().startsWith('##XYDATA=')) {
            inXYData = true;
        } else if (line.startsWith("##END=")) {
            inXYData = false;
            break;
        }
    }
        return {metadata, data} as JDXFile;
}