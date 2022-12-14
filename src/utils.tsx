export default function calculatePairData(coordinatePairs: string[]): {
    closestPairInfo: { closestPair: string[], distance: number },
    furthestPairInfo: { furthestPair: string[], distance: number },
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

const closestPairCalc = (coordinatePairs: string[]) => {
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

const furthestPairCalc = (coordinatePairs: string[]) => {
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

const averageDistanceCalc = (coordinatePairs: string[]) => {
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