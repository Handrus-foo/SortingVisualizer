import {swap} from './helpers';

export function heapSort(array) {
    let n = array.length;
    let animations = [];

    animations.push(["disable"]);

    //Sets the coloring of the heap into different colors
    //based on different levels of the heap.
    animations.push(["color", 0, "Red"]);
    for (let i = 1; i < 3; i++) {
        animations.push(["color", i, "DarkOrange"]);
    }
    for (let i = 3; i < 7; i++) {
        animations.push(["color", i, "yellow"]);
    }
    for (let i = 7; i < 15; i++) {
        animations.push(["color", i, "LimeGreen"]);
    }
    for (let i = 15; i < 31; i++) {
        animations.push(["color", i, "ForestGreen"]);
    }
    for (let i = 31; i < 63; i++) {
        animations.push(["color", i, "DodgerBlue"]);
    }
    for (let i = 63; i < 127; i++) {
        animations.push(["color", i, "Violet"]);
    }
    for (let i = 127; i < 150; i++) {
        animations.push(["color", i, "DarkViolet"]);
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(animations, array, n, i);
    }

    //Sets a wait time so you can take in the heap
    for (let i = 0; i < 250; i++) {
        animations.push(["wait"]);
    }

    //Pushes biggest element of the heap to the back and colors it black
    for (let i = n - 1; i >= 0; i--) {
        swap(array, i, 0);
        animations.push(["color", i, "black"]);
        animations.push(["swap", i, 0]);
        

        maxHeapify(animations, array, i, 0);
    }

    //Ripples a blue color through the array bars.
    for (let i = 0; i < array.length; i++) {
        animations.push(["color", i, "rgb(8, 93, 204)"]);
    }

    animations.push(["able"]);

    return animations;
}

function maxHeapify(animations, array, n, root) {
    let largest = root;
    let l = 2 * root + 1;
    let r = 2 * root + 2;

    if (l < n && array[largest] < array[l]) {
        largest = l;
    }

    if (r < n && array[largest] < array[r]) {
        largest = r;
    }

    if (largest !== root) {
        swap(array, root, largest);
        animations.push(["swap", root, largest]);

        maxHeapify(animations, array, n, largest);
    }
}