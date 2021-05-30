function multiply(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = 1, bNumCols = b.length,
    m = new Array(bNumCols);  // initialize array of rows
    for (var i = 0; i<bNumCols; ++i){
        aux = 0
        for (var j = 0; j<aNumRows; j++){
            aux += b[j] * a[j][i]
            // console.log(b[j], " * ", a[j][i])
        }
        m[i] = aux.toFixed(2);
        // console.log("####", m[i], "####")
    }
    return m;
  }

function stedayState(a,b){
    let states = [,,]

    for (var i = 0; i<1000; ++i){
        b = multiply(a, b);
        // console.log("");
        states[0] = states[1]
        states[1] = states[2]
        states[2] = b

        // console.log(states[0]);
        // console.log(states[1]);
        // console.log(states[2]);

        if(states[2] == states[1] || states[2] == states[0])
            break;
    }
}

var a = [[0,0.5,0.5]
        ,[0.75,0,0.25]
        ,[1,0,0]],
    b = [0,1,0];

stedayState(a,b)