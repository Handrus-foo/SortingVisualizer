import {swap} from "./helpers";

export function quickSort(animations, array, startIndex, endIndex) {
    if (startIndex >= endIndex) {
        return;
    }

    let pivotIndex = partition(animations, array, startIndex, endIndex);

    quickSort(animations, array, startIndex, pivotIndex - 1);
    quickSort(animations, array, pivotIndex + 1, endIndex);
    return animations;
}

function partition(animations, array, startIndex, endIndex) {
    let pivotValue = array[endIndex];
    let pivotIndex = startIndex;

    animations.push(["colorrange", startIndex, endIndex, "red"]);

    for (let i = startIndex; i < endIndex; i++) {
        if (array[i] < pivotValue) {
            swap(array, i, pivotIndex);
            animations.push(["swap", i, pivotIndex]);
            pivotIndex += 1;
        }
    }
    
    swap(array, endIndex, pivotIndex);

    animations.push(["swap", endIndex, pivotIndex]);
    animations.push(["colorrange", startIndex, endIndex, "rgb(8, 93, 204)"]);
    
    return pivotIndex;
};
