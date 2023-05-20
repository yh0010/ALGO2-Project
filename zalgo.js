function getZarr(str) {
    let Z = Array(n).fill(0);
    let n = str.length;
    let L, R, k;

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
    return Z;
}

function printZarr(str) {
    let n = str.length;
    let Z = Array(n).fill(0);
    getZarr(str, Z);

    //print index
    for (let i=0; i<n; i++)
      console.log(i, " ");
    console.log("\n");

    //print text
    for (let i=0; i<n; ++i){
      console.log(str[i], " ");
    }
    console.log("\n");

    //print z values
    for (let i=0; i<n; ++i){
        console.log(Z[i], " ");
    }
    console.log("\n");

    //print r and l values
    let rVal = [];
    let lVal = [];
    rVal.push(0);
    lVal.push(0);

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

    for (let i=0; i<rVal.length; i++)
      console.log(rVal[i], " ");
    console.log("\n");

    for (let i=0; i<lVal.length; i++)
      console.log(lVal[i], " ");
    console.log("\n");
}

function searchPattern(text, pattern) {
    if (!pattern) return;
    let concat = pattern + "$" + text;
    let l = pattern.length;
    let Z = Array(concat.length).fill(0);

    getZarr(concat, Z);
    let foundPattern = false;
    for (let i = 0; i < concat.length; ++i) {
        if (Z[i] === l) {
            console.log("Pattern found at index ", i - l - 1); // Subtract lengths of pattern and special character
            foundPattern = true;
        }
        if (i+1 === concat.length && !foundPattern){
          console.log("No matching pattern found");
        }
    }
}

let text = "AABAABCAXAABAABCYAAAAB";
let pattern = "AAB";

printZarr(text);

searchPattern(text, pattern);
