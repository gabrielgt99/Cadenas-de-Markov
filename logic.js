const calculateMarkov = {};
const equals = (x, y) => JSON.stringify(x) === JSON.stringify(y);

function multiply(a, b) {
	let aNumRows = a.length,
		aNumCols = a[0].length,
		bNumRows = 1,
		bNumCols = b.length,
		m = new Array(bNumCols); // initialize array of rows
	for (let i = 0; i < bNumCols; ++i) {
		let aux = 0;
		for (let j = 0; j < aNumRows; j++) {
			aux += b[j] * a[j][i];
			//   console.log(b[j], " * ", a[j][i])
		}
		m[i] = aux.toFixed(3);
		// console.log("####", m[i], "####")
	}
	return m;
}

let ans = [];

calculateMarkov.calcule = (a, b) => {
	// console.log("este es a ", a[0])
	// console.log("este es a ", a[1])
	// console.log("este es a ", a[2])
	// console.log("este es b ", b)
	let states = [, ,];

	for (let i = 0; i < 1000; ++i) {
		b = multiply(a, b);
		// console.log("");
		states[0] = states[1];
		states[1] = states[2];
		states[2] = b;

		ans.push(b);
		if (equals(states[2], states[1]) || equals(states[2], states[0])) {
			//   console.log(ans);
			break;
		}
	}
	return ans;
};

// let a = [[0, 0.5, 0.5],
//          [0.75, 0, 0.25],
//          [1, 0, 0],],
//   b = [0, 1, 0];

export default calculateMarkov;
