import React from 'react';
import './SortAnimator.css';
import { bubbleSort} from './SortingAlgorithms/bubbleSort';
import { insertionSort } from './SortingAlgorithms/insertionSort';
import { quickSort } from './SortingAlgorithms/quickSort';
import { mergeSort } from './SortingAlgorithms/mergeSort';
import { heapSort } from './SortingAlgorithms/heapSort';
import { swap } from './SortingAlgorithms/helpers';

export class SortAnimator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { array:[], buttonDisable:false, generateButtonDisable:false};
    }

    componentDidMount() {
        this.loadNewArray();
    }

    loadNewArray() {
        let tempArray = [];
        for (let i = 0; i < 150; i++) {
            tempArray.push(getRandomInt(5, 100));
        }

        //Ensures that Array box is constant from array to array
        tempArray[getRandomInt(0,150)] = 99;

        this.setState({ array:tempArray, buttonDisable:false });
    }

    bubbleSortAnimation() {
        let arrayBars = document.getElementsByClassName('arrayBar');
        let copyArray = [];

        //Making a copy of state array. When calling this.state.array, it
        //binds the info of the state array to the variable you are storing in it.
        for (let i = 0; i < this.state.array.length; i++) {
            copyArray.push(this.state.array[i]);
        }

        //Returns all animations, which will be performed on copyArray later
        let animations = bubbleSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {

                //Performs animations on copyArray
                this.animate(animations[i], copyArray, arrayBars);

            }, 2 * i);
        }
    }

    insertionSortAnimation() {
        let arrayBars = document.getElementsByClassName("arrayBar");
        let copyArray = [];

        for (let i = 0; i < this.state.array.length; i++) {
            copyArray.push(this.state.array[i]);
        }

        let animations = insertionSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                this.animate(animations[i], copyArray, arrayBars);
            }, 2 * i);
        }
    }

    quickSortAnimation() {
        let arrayBars = document.getElementsByClassName("arrayBar");
        let copyArray = [];

        for (let i = 0; i < this.state.array.length; i++) {
            copyArray.push(this.state.array[i]);
        }
        
        //Because Quick Sort is recursive, we have to load the "disable" and "able" steps here.
        let animations = quickSort([["disable"]], this.state.array, 0, this.state.array.length - 1);
        animations.push(["able"]);

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                this.animate(animations[i], copyArray, arrayBars)
            }, 6 * i);
        }
    }

    mergeSortAnimation() {
        let arrayBars = document.getElementsByClassName("arrayBar");
        let copyArray = [];
        let animations = [["disable"]];

        for (let i = 0; i < this.state.array.length; i++) {
            copyArray[i] = this.state.array[i];
        }

        mergeSort(animations, this.state.array, 0, this.state.array.length );

        animations.push(["able"]);

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                this.animate(animations[i], copyArray, arrayBars);
            }, 4 * i);
        }
    }
    
    heapSortAnimaton() {
        let arrayBars = document.getElementsByClassName("arrayBar");
        let copyArray = [];

        for (let i = 0; i < this.state.array.length; i++) {
            copyArray.push(this.state.array[i]);
        }

        let animations = heapSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                this.animate(animations[i], copyArray, arrayBars);
            }, 4 * i);
        }
    }

    animate(animationsElement, copyArray, arrayBars) {
        
        //Used in Merge Sort instead of swapping
        if (animationsElement[0] === "push") {
            copyArray[animationsElement[1]] = animationsElement[2]
            
            this.setState({ array:copyArray });
        }

        //Animates the swapping of two values.
        else if (animationsElement[0] === "swap") {
            swap(copyArray, animationsElement[1], animationsElement[2]);

            this.setState({ array:copyArray });
        }

        //Colors the specific arrayBar that is given.
        else if (animationsElement[0] === "color") {
            
            //Special Case for Merge Sort coloring
            if (animationsElement[2] === "orange") {
                if (animationsElement[1] !== 0) {
                    arrayBars[animationsElement[1] - 1].style.backgroundColor = "rgb(8, 93, 204)";
                }
                arrayBars[animationsElement[1]].style.backgroundColor = "orange";
            }

            else {
                arrayBars[animationsElement[1]].style.backgroundColor = animationsElement[2];
            }
        }

        //Colors a range of arrayBars. Used for Quick Sort animation.
        else if (animationsElement[0] === "colorrange") {
            for (let j = animationsElement[1]; j <= animationsElement[2]; j++) {
                arrayBars[j].style.backgroundColor = animationsElement[3];
            }
        }

        //Resets the array bars to be all blue.
        else if (animationsElement[0] === "reset") {
            for (let j = 0; j < 150; j++) {
                arrayBars[j].style.backgroundColor = "rgb(8, 93, 204)";
            }
        }

        //Disables all the buttons.
        else if (animationsElement[0] === "disable") {
            this.setState({ array:copyArray, buttonDisable:true, generateButtonDisable:true });
        }

        //Re-enables the "Generate New Array" button. 
        else if (animationsElement[0] === "able") {
            this.setState({ generateButtonDisable:false });
        }
    }
    
    render() {
        return (
            <div className="arrayContainer">
                {this.state.array.map((value, index) =>
                <div 
                    className="arrayBar" 
                    key={index}
                    style = {{
                        backgroundColor: "rgb(8, 93, 204)",
                        height: `${value*5}px`
                    }}>
                </div>
                )}
                <button 
                    className="button"
                    onClick={() => this.loadNewArray()}
                    disabled={this.state.generateButtonDisable}>
                    Generate New Array
                </button>
                <button
                    className="button"
                    onClick={() => this.bubbleSortAnimation()}
                    disabled={this.state.buttonDisable}>
                    Bubble Sort
                </button>
                <button
                    className="button"
                    onClick={() => this.insertionSortAnimation()}
                    disabled={this.state.buttonDisable}>
                    Insertion Sort
                </button>
                <button 
                    className="button"
                    onClick={() => this.quickSortAnimation()}
                    disabled={this.state.buttonDisable}>
                    Quick Sort
                </button>
                <button
                    className="button"
                    onClick={() => this.mergeSortAnimation()}
                    disabled={this.state.buttonDisable}>
                    Merge Sort
                </button>
                <button
                    className="button"
                    onClick={() => this.heapSortAnimaton()}
                    disabled={this.state.buttonDisable}>
                    Heap Sort
                </button>
            </div>
        )
    }
};

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max-min));
}
//With help from 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random