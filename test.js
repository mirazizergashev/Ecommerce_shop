let test="Men asli Buxorolikman 6 da"

let ajrat=test.split(" ");
let s=0;
for (let i = 0; i < ajrat.length; i++) {
    if(! isNaN(ajrat[i])){
        s++;
    }
}

console.log("'"+test+"' gapida "+s+" ta son bor")