function multiply(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = 1, bNumCols = b.length,
    m = new Array(bNumCols);  // initialize array of rows
    for (var i = 0; i<bNumCols; ++i){
        aux = 0
        for (var j = 0; j<aNumRows; j++){
            aux += b[j] * a[j][i]
            console.log(b[j], " * ", a[j][i])
        }
        
        m[i] = aux
        console.log("####", m[i], "####")
    }
    return m;
  }
  
  function display(m) {
    for (var r = 0; r < m.length; ++r) {
      document.write('&nbsp;&nbsp;'+m[r].join(' ')+'<br />');
    }
  }
  
var a = [[0,0.5,0.5]
        ,[0.75,0,0.25]
        ,[1,0,0]],
    b = [0,1,0];


document.write('matrix a:<br />');
display(a);
document.write('matrix b:<br />');
//display(b);
document.write('a * b =<br />');

ant1 = b
ant2 = b
for (var i = 0; i<20; ++i){
    if (ant2 == b)
        console.log("entra")
    console.log("")
    b = multiply(a, b)
    
    
    ant1 = ant2
    
    
    ant2 = b
}
