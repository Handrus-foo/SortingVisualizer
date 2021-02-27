export function mergeSort(animations, array, left, right) {
    if (right - left > 1) {
        var mid = left + ((right - left) >> 1);

        mergeSort(animations, array, left, mid);
        mergeSort(animations, array, mid, right);

        merge(animations, array, left, mid, right);
    }
}

function merge(animations, array, left, mid, right) {
    let temp = [];
    let length = mid - left;
    //Save left subarray
    for (let i = 0; i < length; i++) {
        temp[i] = array[left + i];
    }
    //Merge subarrays
    let i = 0;
    let j = mid;
    let k = left;
	
    while (i < length && j < right) {
        animations.push(["color", k, "orange"]);
        if (temp[i] <= array[j]) {
            array[k] = temp[i];
            animations.push(["push", k, temp[i]]);
            k += 1;
            i += 1;
        } else {
            array[k] = array[j];
            animations.push(["push", k, array[j]]);
            k += 1;
            j += 1;
        }
    }

    //Copies the remaining elements
    while (i < length) {
        array[k] = temp[i];
        animations.push(["push", k, temp[i]]);
        animations.push(["color", k, "orange"]);

        k += 1;
        i += 1;
    }
    
    animations.push(["color", k - 1, "rgb(8, 93, 204)"]);

}