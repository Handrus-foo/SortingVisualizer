export function insertionSort(array) {
    let animations = [];

    animations.push(["disable"]);
    animations.push(["color", 0, "green"]);


    //Treats back part of the array as sorted
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i-1;

        //Goes through each element in the sorted array until key is where it belongs.
        while (key < array[j] && j >= 0) {
            animations.push(["swap", j, j + 1]);
            animations.push(["color", j, "green"]);
            array[j+1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;

        if (i + 1 !== array.length) {
            animations.push(["color", i + 1, "red"]);
        }
    }

    //Ripples a black color through the arrayBars
    for (let i = 0; i < 150; i++) {
        animations.push(["color", i, "black"]);
    }
    animations.push(["reset"]);
    animations.push(["able"]);

    return animations;
}