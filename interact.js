function calculateZ(str) {
    let n = str.length;
    let Z = Array(n).fill(0); 
    let L, R, k;
    let rVal = [];
    let lVal = [];
    rVal.push(0);
    lVal.push(0);

    L = R = 0;
    for (let i = 1; i < n; ++i) {
        if (i > R) {
            L = R = i;
            while (R<n && str[R-L] === str[R])
                R++;
            Z[i] = R-L;
            R--;
        }
        else {
            k = i-L;
            if (Z[k] < R-i+1)
                Z[i] = Z[k];
            else {
                L = i;
                while (R<n && str[R-L] === str[R])
                    R++;
                Z[i] = R-L;
                R--;
            }
        }
    }

    for (let i=1; i<n; i++){
        if (Z[i] > 0){
            let lIdx = i;
            while (i < lIdx+Z[lIdx]){
              lVal.push(lIdx);
              rVal.push(lIdx+Z[lIdx]-1);
              i++;
            }
            i--;
        }
        else{
          rVal.push(rVal[i-1]);
          lVal.push(lVal[i-1]);
        }
      }

    return {Z, rVal, lVal};
}

// function findUniquePatterns(text) {
//     // let n = str.length;
//     // let {Z, rVal, lVal} = calculateZ(text);
//     // let patternMap = new Map();
//     // for (let i=1; i<n; i++){
//     //     if (rVal[i] != rVal[i-1]){
//     //         let letter = str[1];
//     //         if (lVal[i] == rVal[i] && !patternMap.has(letter))
//     //             patternMap.set(letter, 1);
//     //         else if (lVal[i] < rVal[i]){
//     //             let subString = str.substring(lVal[i], rVal[i]+1);
//     //             if (!patternMap.has(subString))
//     //                 patternMap.set(subString, subString.length);
//     //         }
//     //         console.log();
//     //     }
//     // }

//     // // sort them in descending order
//     // Array.from(patternMap.keys()).sort((a, b) => {
//     // if (a > b) return -1;
//     // if (a < b) return 1;
//     // return 0;
//     // });
//     // return patternMap;
//     ///////////
//     let patterns = new Set();

//     for(let i = 0; i < text.length; i++) {
//         for(let j = i+1; j <= text.length; j++) {
//             patterns.add(text.slice(i, j));
//         }
//     }

//     let patternArray = Array.from(patterns);
//     patternArray.sort((a, b) => b.length - a.length); // sort by length, longest first

//     return patternArray;
// } 

function findUniquePatterns(text) {
    let {Z, rVal, lVal} = calculateZ(text);
    let patternMap = new Map();
    for (let i=1; i<text.length; i++){
        if (rVal[i] != rVal[i-1]){
            let letter = text[1];
            if (lVal[i] == rVal[i] && !patternMap.has(letter))
                patternMap.set(letter, 1);
            else if (lVal[i] < rVal[i]){
                let subString = text.substring(lVal[i], rVal[i]+1);
                if (!patternMap.has(subString))
                    patternMap.set(subString, subString.length);
            }
        }
    }

    // Convert the map into an array of [key, value] pairs
    let patternArray = Array.from(patternMap.entries());

    // Sort the array based on the second element (value) in descending order
    patternArray.sort((a, b) => b[1] - a[1]);

    // Print out the array, which is now sorted by value in descending order
    // for(let pair of patternArray) {
    //     console.log(`${pair[0]}: ${pair[1]}`);
    // }

    // If you want to return the sorted array from the function, use the following line:
    return patternArray;
}

function populateTable(text, pattern) {
    let {Z, rVal, lVal} = calculateZ(text);
    
    let table = document.getElementById('output');

    // Clear table
    table.innerHTML = '';

    // Populate Index row
    let indexRow = table.insertRow(-1);
    indexRow.insertCell(0).innerHTML = 'Index';
    for (let i = 0; i < text.length; i++) {
        indexRow.insertCell(i+1).innerHTML = i;
    }

    // Populate Text row
    let textRow = table.insertRow(-1);
    textRow.insertCell(0).innerHTML = 'Text';
    for (let i = 0; i < text.length; i++) {
        textRow.insertCell(i+1).innerHTML = text.charAt(i);
    }

    // Populate Z Value row
    let zRow = table.insertRow(-1);
    zRow.insertCell(0).innerHTML = 'Z Value';
    //zRow.insertCell(1).innerHTML = '/';
    for (let i = 1; i <= text.length; i++) {
        zRow.insertCell(i).innerHTML = Z[i-1];
    }

    //Populate R Value row
    let rRow = table.insertRow(-1);
    rRow.insertCell(0).innerHTML = 'R Value';
    for (let i = 1; i <= text.length; i++){
        rRow.insertCell(i).innerHTML = rVal[i-1];
    }

    // Populate L Value row
    let lRow = table.insertRow(-1);
    lRow.insertCell(0).innerHTML = 'L Value';
    for (let i = 1; i <= text.length; i++) {
        lRow.insertCell(i).innerHTML = lVal[i-1];
    }
}

// function search() {
//     let textInput = document.getElementById('text');
//     // Check if text input is valid
//     if (!textInput.checkValidity()) {
//         // If not, make it glow red and stop function execution
//         textInput.style.border = "2px solid red";
//         textInput.style.boxShadow = "0 0 5px red";
//         return;
//     }
//     // If it is valid, reset the border and box shadow
//     textInput.style.border = "";
//     textInput.style.boxShadow = "";

//     let text = textInput.value;

//     let pattern = document.getElementById('pattern').value;
//     let patternOutput = document.getElementById('pattern-output');

//     if(pattern === '') {
//         let patternArray = findUniquePatterns(text);
//         patternOutput.innerHTML = `Total patterns found: ${patternArray.length}<br>`;
//         patternOutput.innerHTML += `Longest pattern: "${patternArray[0][0]}", Length: ${patternArray[0][1]}<br><br>`;
//         for(let pair of patternArray) {
//             let pattern = pair[0];
//             let length = pair[1];
//             patternOutput.innerHTML += `Pattern: ${pattern}, Length: ${length}<br>`;
//             populateTable(text, pattern);
//         }
//     } else {
//         let index = searchString(text, pattern);
//         if(index >= 0) {
//             patternOutput.innerHTML = `Pattern: "${pattern}"<br>`;
//             populateTable(text, pattern);
//         } else {
//             patternOutput.innerHTML = 'Pattern not found in text.';
//         }
//     }
// }
function searchString(text, pattern) {
    let result = [];
    let Z = calculateZ(pattern + '$' + text).Z; // Z values are returned as the Z field in an object
    for(let i = pattern.length + 1; i < Z.length; i++) {
        if(Z[i] === pattern.length) {
            result.push(i - pattern.length - 1); // save all indices where pattern is found
        }
    }
    return result; // return an array with all found indices
}

function search() {
    let textInput = document.getElementById('text');
    let pattern = document.getElementById('pattern').value;
    let patternOutput = document.getElementById('pattern-output');

    // Clear pattern output
    patternOutput.innerHTML = '';

    // Check if text input is valid
    if (!textInput.checkValidity()) {
        // If not, make it glow red and stop function execution
        textInput.style.border = "2px solid red";
        textInput.style.boxShadow = "0 0 5px red";
        return;
    }
    // If it is valid, reset the border and box shadow
    textInput.style.border = "";
    textInput.style.boxShadow = "";

    let text = textInput.value;

    if(pattern === '') {
        let patternArray = findUniquePatterns(text);
        patternOutput.innerHTML = `Total patterns found: ${patternArray.length}<br>`;
        patternOutput.innerHTML += `Longest pattern: "${patternArray[0][0]}", Length: ${patternArray[0][1]}<br><br>`;
        for(let pair of patternArray) {
            let pattern = pair[0];
            let length = pair[1];
            patternOutput.innerHTML += `Pattern: ${pattern}, Length: ${length}<br>`;
            populateTable(text, pattern);
        }
    } else {
        let indices = searchString(text, pattern);
        if(indices.length > 0) {
            patternOutput.innerHTML = `Pattern: "${pattern}" found at indices: ${indices.join(', ')}<br>`;
            populateTable(text, pattern);
        } else {
            patternOutput.innerHTML = 'Pattern not found in text.';
        }
    }
}

var starCount = 100; 

for (var i = 0; i < starCount; i++) {
  var star = document.createElement("div");
  star.className = "star";
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";
  star.style.animationDelay = (Math.random() * 10) + "s"; /* Updated to match new animation duration */
  star.style.animationDuration = (Math.random() * 3 + 2) + "s"; /* Updated to match new animation duration */
  star.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
  document.getElementById('title-section').appendChild(star);
}
