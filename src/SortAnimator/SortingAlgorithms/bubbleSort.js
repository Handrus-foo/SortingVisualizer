import { swap } from './helpers';

export function bubbleSort(array) {
    let animations = []
    animations.push(["disable"]);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j+1]) {

                //Returns indicies of arrays needed to be swapped
                animations.push(["swap", j, j+1]);
                swap(array, j, j+1);
            }
        }
        //Changes already sorted bars to green
        animations.push(["color", array.length - 1 - i, "green"]);
    }

    //After array is sorted, changes the arrayBars to black in a ripple,
    //then changes color back to blue.
    for ( let i = 0; i < array.length; i++) {
        animations.push(["color", i, "black"]);
    }
    animations.push(["reset"]);
    animations.push(["able"])

    return animations;
};