let values = [];
let brickWidth = 2;
var swaps = 0;
var comparisons = 0;

let continueSorting = true;

function stopSorting() {
    continueSorting = false;
}

function waitforme(ms)  {
    return new Promise( resolve => { setTimeout(resolve, ms); });
}

function resetButtonClick(){
    setup();
    stopSorting();
    cleanContainerDiv();
    resetArray();
    swaps = 0;
    comparisons = 0;
    document.getElementById("algorithm").innerHTML = "&nbsp;";
    document.getElementById("swaps").innerHTML = "Swaps: " + swaps;
    document.getElementById("comparisons").innerHTML = "Comparisons: " + comparisons;
    document.getElementById("time-complexity-best").innerHTML = "Best Case: ";
    document.getElementById("time-complexity-average").innerHTML = "Average Case: ";
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: ";
    document.getElementById("space-complexity").innerHTML = "Space Complexity: ";
}

function cleanContainerDiv(){
    var containerDiv = document.getElementsByClassName("container")[0];
    containerDiv.innerHTML = "" ;  
}

function setup(){
    values.length = 1500; // Array size or number of bricks
    cleanContainerDiv();
    resetArray();
    document.getElementById("algorithm").innerHTML = "&nbsp;";
    document.getElementById("swaps").innerHTML = "Swaps: " + swaps;
    document.getElementById("comparisons").innerHTML = "Comparisons: " + comparisons;
    document.getElementById("time-complexity-best").innerHTML = "Best Case: ";
    document.getElementById("time-complexity-average").innerHTML = "Average Case: ";
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: ";
    document.getElementById("space-complexity").innerHTML = "Space Complexity: ";
}

function buildArray(array){
    var containerDiv = document.getElementsByClassName("container")[0];
    containerDiv.innerHTML = "" ;  
    for(var i=0; i< array.length; i++){
        containerDiv.appendChild(createBrick(array[i]));
    }   
}

function SortBuiltArray(array){
    var containerDiv = document.getElementsByClassName("container")[0];
    
    for(var i=0; i< array.length; i++){
        var currentBrick = containerDiv.getElementsByTagName('span')[i];        
        currentBrick.style.height = array[i] + "px";                
    }   
}

function createBrick(height){

    var tempSpan = document.createElement("span");
    tempSpan.style.height = height + "px";
    tempSpan.style.width = brickWidth + "px";
    tempSpan.style.display = "inline-block";
    tempSpan.style.background = "white";
    tempSpan.style.marginLeft = "0px";
    tempSpan.style.marginRight = "0px";

    return tempSpan;
}

function resetArray(){
    for(var i=0; i < values.length; i++){
        values[i] = Math.floor(Math.random() * 1000 + 5);          
    }    
    buildArray(values);
}

async function GreenLine(values){
    var containerDiv = document.getElementsByClassName("container")[0];
    for(var i=0; i< values.length; i++){
        containerDiv.getElementsByTagName('span')[i].style.background = "#237d2c";
        // Wait 0.1 seconds

        if (i % 8 == 0){
            SortBuiltArray(values);
            await waitforme(0);
        }
    } 
}

/*****************************Bubblesort */
async function BubbleSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Bubble Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n^2)$"; 
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    for(var i=0; i< values.length; i++){
        for(var j=0; j< values.length -i -1; j++){
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            var a = values[j];
            var b = values[j+1];
            if(a>b)
            {   
                swap(values, j, j+1);
            }

            if (j % 300 == 0){
                SortBuiltArray(values);
                await waitforme(0);
            }
        }
    }
    GreenLine(values);
}


function swap(arr, a, b){
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    document.getElementById("swaps").innerHTML = "Swaps: " + ++swaps;
}

/***************************** QuickSort ***************************** */

async function QuickSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Quick Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await quicksort(values, 0, values.length - 1);
    SortBuiltArray(values); // Update the UI after sorting completes

    GreenLine(values);
}

async function quicksort(arr, low, high) {
    if (low < high) {
        var pivotIndex = await partition(arr, low, high); // Wait for partition to complete
        await quicksort(arr, low, pivotIndex - 1); // Wait for the left subarray to be sorted
        await quicksort(arr, pivotIndex + 1, high); // Wait for the right subarray to be sorted
    }
}

async function partition(arr, low, high) {
    var pivot = arr[high];
    var i = low - 1;
    for (var j = low; j < high; j++) {
        if (!continueSorting) return;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }

        if (j % 5 == 0){
            SortBuiltArray(values); // Update the UI after each swap
            await waitforme(0); // Wait for a short time for visualization
        }
    }
    swap(arr, i + 1, high);
    SortBuiltArray(values); // Update the UI after partitioning completes
    await waitforme(0); // Wait for a short time for visualization
    return i + 1;
}

/**************************** MergeSort ***************************** */
async function MergeSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Merge Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await mergesort(values, 0, values.length - 1);

    GreenLine(values);
}

async function mergesort(arr, left, right) {
    if (left < right) {
        var middle = Math.floor((left + right) / 2);
        await mergesort(arr, left, middle);
        await mergesort(arr, middle + 1, right);
        await merge(arr, left, middle, right);
    }
}

async function merge(arr, left, middle, right) {
    var n1 = middle - left + 1;
    var n2 = right - middle;

    var L = new Array(n1);
    var R = new Array(n2);

    for (var i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[middle + 1 + j];

    var i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (!continueSorting) return;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        document.getElementById("swaps").innerHTML = "Swaps: " + ++swaps;
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;

        if (j % 5 == 0 || i % 5 == 0){
            SortBuiltArray(values);
            await waitforme(0);
        }
    }

    while (i < n1) {
        if (!continueSorting) return;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        arr[k] = L[i];
        i++;
        k++;
        if (i % 5 == 0){
            SortBuiltArray(values);
            await waitforme(0);
        }
    }

    while (j < n2) {
        if (!continueSorting) return;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        arr[k] = R[j];
        j++;
        k++;
        if (j % 5 == 0){
            SortBuiltArray(values);
            await waitforme(0);
        }
    }
}

/***************************** SelectionSort *********************************** */

async function SelectionSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Selection Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await selectionSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function selectionSort(arr) {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        if (!continueSorting) return;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        var minIndex = i;
        for (var j = i + 1; j < n; j++) {
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (arr[j] < arr[minIndex]) {
                document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            swap(arr, i, minIndex);
            SortBuiltArray(values);
            await waitforme(0);
        }
    }
}

/************************************ InsertionSort ************************************ */
async function InsertionSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Insertion Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await insertionSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function insertionSort(arr) {
    var n = arr.length;
    for (var i = 1; i < n; i++) {
        if (!continueSorting) return;
        var key = arr[i];
        var j = i - 1;
        while (j >= 0 && arr[j] > key) {
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            document.getElementById("swaps").innerHTML = "Swaps: " + ++swaps;
            arr[j + 1] = arr[j];
            j--;

            if (j % 180 == 0){
                SortBuiltArray(values);
                await waitforme(0);
            }
        }
        arr[j + 1] = key;

        if (i % 180 == 0){
            SortBuiltArray(values);
            await waitforme(0);
        }

    }

    return arr;
}

/************************** HeapSort ********************************** */
async function HeapSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Heap Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await heapSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function heapSort(arr) {
    var n = arr.length;
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }
    for (var i = n - 1; i > 0; i--) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        if (!continueSorting) return;
        swap(arr, 0, i);
        if (i % 5 == 0){
            SortBuiltArray(values);
            await waitforme(0);
        }
        await heapify(arr, i, 0);
    }
}

async function heapify(arr, n, i) {
    var largest = i;
    var left = 2 * i + 1;
    var right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        largest = right;
    }

    if (largest !== i) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        swap(arr, i, largest);
        if (i % 5 == 0){
            SortBuiltArray(values);
            await waitforme(0);
        }
        await heapify(arr, n, largest);
    }
}

/***********************Count Sort */
async function CountSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Count Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n+k)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n+k)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n+k)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(n+k)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    document
    continueSorting = true;
    await countSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function countSort(arr) {
    // Find the maximum element in the array
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            max = arr[i];
        }
    }

    // Create a count array to store the count of each unique element
    const count = new Array(max + 1).fill(0);

    // Store the count of each element in the count array
    for (let i = 0; i < arr.length; i++) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        count[arr[i]]++;
    }

    // Modify the count array to store the actual position of each element in the sorted array
    for (let i = 1; i < count.length; i++) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        count[i] += count[i - 1];
    }

    // Create a temporary array to store the sorted result
    const result = new Array(arr.length);

    // Build the result array by placing elements in their correct position based on the count array
    for (let i = arr.length - 1; i >= 0; i--) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        document.getElementById("swaps").innerHTML = "Swaps: " + ++swaps;
        result[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // Copy the result array back to the original array
    for (let i = 0; i < arr.length; i++) {

        if (!continueSorting) return;

        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        document.getElementById("swaps").innerHTML = "Swaps: " + ++swaps;
        arr[i] = result[i];

        
        SortBuiltArray(values); // Update UI after each element is placed
        await waitforme(0); // Wait for a short time for visualization
    }
}

/***********************Bucket Sort */
async function BucketSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Bucket Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n+k)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n+k)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(n+k)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await bucketSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function bucketSort(arr) {
    // Determine the range of input values
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    // Determine the number of buckets
    const numBuckets = Math.ceil(Math.sqrt(arr.length));

    // Initialize the buckets
    const buckets = Array.from({ length: numBuckets }, () => []);

    // Distribute elements into buckets
    for (let i = 0; i < arr.length; i++) {
        if (!continueSorting) return;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        const bucketIndex = Math.floor((arr[i] - min) / (max - min + 1) * numBuckets);
        buckets[bucketIndex].push(arr[i]);
    }

    // Sort each bucket (you can use any sorting algorithm here)
    for (let i = 0; i < buckets.length; i++) {
        if (!continueSorting) return;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        buckets[i].sort((a, b) => a - b); // Using built-in Array.sort() for simplicity

        if (i % 5 == 0){
            SortBuiltArray(values); // Update UI after each bucket is sorted
            await waitforme(0); // Wait for a short time for visualization
        }
    }

    // Concatenate sorted buckets into the original array
    let index = 0;
    for (let i = 0; i < buckets.length; i++) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        for (let j = 0; j < buckets[i].length; j++) {
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            document.getElementById("swaps").innerHTML = "swaps: " + ++swaps;
            arr[index++] = buckets[i][j];
            SortBuiltArray(values); // Update UI after each element is placed
            await waitforme(0); // Wait for a short time for visualization
        }
    }
}

/***********************Comb Sort */
async function CombSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Comb Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $\\Omega(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await combSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function combSort(arr) {
    const shrinkFactor = 1.3; // Shrink factor to determine the gap

    let gap = arr.length; // Initialize the gap as the length of the array
    let sorted = false; // Flag to track if a swap occurred

    while (gap > 1 || sorted) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        gap = Math.floor(gap / shrinkFactor); // Update the gap using the shrink factor
        if (gap < 1) {
            gap = 1; // Ensure the gap is at least 1
        }
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;

        let i = 0;
        sorted = false; // Reset the sorted flag

        while (i + gap < arr.length) {
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (arr[i] > arr[i + gap]) {
                swap(arr, i, i + gap); // Swap elements if they are out of order
                sorted = true; // Set the sorted flag to true
                
                if (i % 2 == 0){
                    SortBuiltArray(values); // Update UI after each swap
                    await waitforme(0); // Wait for a short time for visualization
                }
            }
            i++;
        }
    }
}

/***********************Shell Sort */

async function ShellSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Shell Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n\\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n \\log^2 n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await shellSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function shellSort(arr) {
    const n = arr.length;
    let gap = Math.floor(n / 2); // Start with a large gap and reduce it

    // Continue reducing the gap until it becomes 1
    while (gap > 0) {
        // Perform insertion sort for each gap
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;

            // Shift elements until the correct position for temp is found
            while (j >= gap && arr[j - gap] > temp) {
                if (!continueSorting) return;
                document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
                document.getElementById("swaps").innerHTML = "Swaps: " + ++swaps;
                arr[j] = arr[j - gap];
                j -= gap;

                if (j % 2 == 0){
                    SortBuiltArray(values); // Update UI after each element shift
                    await waitforme(0); // Wait for a short time for visualization
                }
            }

            // Place temp in its correct position
            arr[j] = temp;
        }

        // Reduce the gap for the next iteration
        gap = Math.floor(gap / 2);
    }
}

/****************************************Gnome Sort  */
async function GnomeSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Gnome Sort";

    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);

    continueSorting = true;
    await gnomeSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function gnomeSort(arr) {
    let index = 0;

    while (index < arr.length) {
        if (!continueSorting) return;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        if (index === 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            swap(arr, index, index - 1);
            index--;
        }

        if (index % 200 === 0){
            SortBuiltArray(values); // Update UI after each swap
            await waitforme(0); // Wait for a short time for visualization
        }
    }
}

/***********************Cocktail Shaker Sort */
async function CocktailShakerSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Cocktail Shaker Sort";

    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);

    continueSorting = true;
    await cocktailShakerSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function cocktailShakerSort(arr) {
    let swapped = true;
    let start = 0;
    let end = arr.length - 1;

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (arr[i] > arr[i + 1]) {
                document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
                swap(arr, i, i + 1);
                swapped = true;
            }
        }

        //sleep for 0.02 seconds
        await new Promise(resolve => setTimeout(resolve, 20));

        SortBuiltArray(values); // Update UI after each swap
        await waitforme(0); // Wait for a short time for visualization

        start++;
    }
}

/*************************************Tim Sort */

async function TimSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Tim Sort";

    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n \\log n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);

    continueSorting = true;

    await timSort(values);
    SortBuiltArray(values);

    GreenLine(values);
}

async function timSort(arr) {
    const minRun = 200;

    // Helper function to merge two sorted runs
    async function merge(arr, start, mid, end) {
        const leftSize = mid - start + 1;
        const rightSize = end - mid;
        const leftArray = new Array(leftSize);
        const rightArray = new Array(rightSize);

        for (let i = 0; i < leftSize; i++) {
            leftArray[i] = arr[start + i];
        }

        for (let j = 0; j < rightSize; j++) {
            rightArray[j] = arr[mid + 1 + j];
        }

        let i = 0, j = 0, k = start;

        while (i < leftSize && j < rightSize) {

            if (!continueSorting) return;

            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (leftArray[i] <= rightArray[j]) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            k++;
            if (k % 20 == 0){
                SortBuiltArray(values); // Update UI after each comparison
                await waitforme(0); // Wait for a short time for visualization
            }
        }

        while (i < leftSize) {
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            arr[k] = leftArray[i];
            i++;
            k++;
            if (i % 20 == 0){
                SortBuiltArray(values); // Update UI after each comparison
                await waitforme(0); // Wait for a short time for visualization
            }
        }

        while (j < rightSize) {
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            arr[k] = rightArray[j];
            j++;
            k++;
            if (j % 20 == 0){
                SortBuiltArray(values); // Update UI after each comparison
                await waitforme(0); // Wait for a short time for visualization
            }
        }
    }

    // Helper function to insert sort a run
    async function insertSort(arr, start, end) {
        for (let i = start + 1; i <= end; i++) {
            let j = i;
            while (j > start && arr[j] < arr[j - 1]) {
                if (!continueSorting) return;
                document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
                swap(arr, j, j - 1);
                j--;
                if (j % 20 == 0){
                    SortBuiltArray(values); // Update UI after each swap
                    await waitforme(0); // Wait for a short time for visualization
                }
            }
        }
    }

    // Start sorting the array using Tim Sort
    const n = arr.length;
    for (let i = 0; i < n; i += minRun) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        await insertSort(arr, i, Math.min(i + minRun - 1, n - 1));
    }

    for (let size = minRun; size < n; size *= 2) {
        for (let start = 0; start < n; start += 2 * size) {
            if (!continueSorting) return;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            const mid = start + size - 1;
            const end = Math.min(start + 2 * size - 1, n - 1);
            await merge(arr, start, mid, end);
        }
    }
}

/*******************Odd-even sort */

async function OddEvenSortButtonClick(){
    document.getElementById("algorithm").innerHTML = "Odd-Even Sort";
    document.getElementById("time-complexity-best").innerHTML = "Best Case: $O(n)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-best")]);
    document.getElementById("time-complexity-average").innerHTML = "Average Case: $O(n^2)$";    
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-average")]);
    document.getElementById("time-complexity-worst").innerHTML = "Worst Case: $O(n^2)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("time-complexity-worst")]);
    document.getElementById("space-complexity").innerHTML = "Space Complexity: $O(1)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("space-complexity")]);
    continueSorting = true;
    await oddEvenSort(values);
    SortBuiltArray(values);
    GreenLine(values);
}

async function oddEvenSort(arr) {
    const n = arr.length;
    let sorted = false;

    while (!sorted && continueSorting) {
        document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
        sorted = true;

        // Perform odd-even sort for odd indices
        for (let i = 1; i < n - 1; i += 2) {
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                sorted = false;

                if (i % 100 == 0){
                    SortBuiltArray(values); // Update UI after each swap
                    await waitforme(0); // Wait for a short time for visualization
                }
            }
        }

        // Perform odd-even sort for even indices
        for (let i = 0; i < n - 1; i += 2) {
            document.getElementById("comparisons").innerHTML = "Comparisons: " + ++comparisons;
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                sorted = false;

                if (i % 100 == 0){
                    SortBuiltArray(values); // Update UI after each swap
                    await waitforme(0); // Wait for a short time for visualization
                }
            }
        }
    }
}

