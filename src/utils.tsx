export type closestPairInfo = {
    closestPair: string[],
    distance: number
};

export type furthestPairInfo = {
    furthestPair: string[], distance: number
};

// Calls the various calculators of coordinate pair data
// Have gone with this approach to make the code more expandable and have clear function names
export function calculatePairData(coordinatePairs: string[]): {
    closestPairInfo: closestPairInfo,
    furthestPairInfo: furthestPairInfo,
    averageDistance: number,
} {
    const splitCoordinates = coordinatePairs[0].split(' ');
    const furthestPairRes = furthestPairCalc(splitCoordinates);
    const closestPairRes = closestPairCalc(splitCoordinates);
    const averageDistanceRes = averageDistanceCalc(splitCoordinates);
    return {
        closestPairInfo: closestPairRes,
        furthestPairInfo: furthestPairRes,
        averageDistance: averageDistanceRes
    };
}

// Calculates closest coordinates pair and returns closestPairInfo object
export const closestPairCalc = (coordinatePairs: string[]) => {
    let closestPair: string[] = [];
    let closestDistance = Infinity;

    for (let i = 0; i < coordinatePairs.length; i++) {
        for (let j = i + 1; j < coordinatePairs.length; j++) {
            const [x1, y1] = coordinatePairs[i].split(',').map(Number);
            const [x2, y2] = coordinatePairs[j].split(',').map(Number);
            const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestPair = [x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1)];
            }
        }
    }
    return { closestPair: closestPair, distance: parseFloat((closestDistance).toFixed(2)) }
}

// Calculates furthest coordinates pair and returns furthestPairInfo object
export const furthestPairCalc = (coordinatePairs: string[]) => {
    let furthestPair: string[] = [];
    let furthestDistance = 0;

    for (let i = 0; i < coordinatePairs.length; i++) {
        for (let j = i + 1; j < coordinatePairs.length; j++) {
            const [x1, y1] = coordinatePairs[i].split(',').map(Number);
            const [x2, y2] = coordinatePairs[j].split(',').map(Number);
            const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
            if (distance > furthestDistance) {
                furthestDistance = distance;
                furthestPair = [x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1)];
            }
        }
    }
    return { furthestPair: furthestPair, distance: parseFloat((furthestDistance).toFixed(2)) }
}

// Calculates average distance and returns number
export const averageDistanceCalc = (coordinatePairs: string[]) => {
    let totalDistance = 0;
    let count = 0;
    for (let i = 0; i < coordinatePairs.length; i++) {
        for (let j = i + 1; j < coordinatePairs.length; j++) {
            const [x1, y1] = coordinatePairs[i].split(',').map(Number);
            const [x2, y2] = coordinatePairs[j].split(',').map(Number);
            const distance = Math.sqrt((Math.abs(x1) - Math.abs(x2)) ** 2 + (Math.abs(y1) - Math.abs(y2)) ** 2);
            totalDistance += distance;
            count++;
        }
    }
    return parseFloat((totalDistance / count).toFixed(2));
}


// Validates the string entry to meet acceptance criteria and returns boolean
export const validation = (coordinates: string) => {
    const formRegex = /^(\d+(?:\.\d+)?,\d+(?:\.\d+)?)(?:\s+(\d+(?:\.\d+)?,\d+(?:\.\d+)?))+$/;
    return formRegex.test(coordinates);
}
