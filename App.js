import { Input } from '/components/Input.js';
import { Span } from '/components/Span.js';
import { Div } from '/components/Div.js';
import { Buttons } from './components/Buttons.js';
import { Table } from './components/Table.js';
import { Alert } from './components/Alert.js';
import calculateMarkov from './logic.js';
import { Loader } from './components/Loader.js';
import { Result } from './components/Result.js';

export async function App() {
	//var DOM
	const d = document;
	const $main = d.getElementById('main');
	$main.appendChild(
		Div(
			'main',
			'border padding rounded d-grid gap-2 col-10 col-md-6 mx-auto pt-0 shadow'
		)
	);

	const $div = d.getElementById('div-main');
	$div.appendChild(
		Span(
			'mainSpan',
			'Numero Variables:',
			'text-center card-title border-bottom py-3'
		)
	);
	$div.appendChild(Input('mainInput', 'number', 'form-control'));
	$div.appendChild(Buttons('mainBtn', 'Siguiente', 'btn btn-outline-dark'));

	//var logic
	let ans = null;
	const vectorInicial = [];

	let nInicial = -1,
		matrizTransicion = [];

	d.addEventListener('click', (e) => {
		if (e.target.matches('#btn-mainBtn')) {
			const $input = d.getElementById('input-mainInput');
			const value = Number($input.value);

			removeAlert();
			if (!isNaN(value) && value > 1) {
				nInicial = value;
				$div.remove();
				const $fragment = d.createDocumentFragment();
				$fragment.appendChild(
					Span(
						'title',
						'Definición de Variables',
						'text-center card-title border-bottom py-3'
					)
				);
				for (let i = 0; i < value; i++) {
					const $mainRow = Div(
						`mainRow-${i}`,
						'row justify-content-center align-items-center'
					);
					const $row = Div(
						`row-${i}`,
						'row col-11 justify-content-center align-items-center border rounded py-2'
					);
					const $colVar = Div(`col-${i}`, 'col-3 text-center');
					const $colInput = Div(`colInput-${i}`, 'col-8 text-center');
					const text = String.fromCharCode(97 + i);
					$colVar.appendChild(
						Span('mainSpan', `${text}`, 'text-center card-title py-1')
					);
					$colInput.appendChild(
						Input(`vec-${i + 1}`, 'number', 'vectors w-100 form-control')
					);
					$row.appendChild($colVar);
					$row.appendChild($colInput);
					$mainRow.appendChild($row);
					$fragment.appendChild($mainRow);
				}
				$main.appendChild(
					Div(
						'vector',
						'border padding rounded d-grid gap-2 col-10 col-md-6 mx-auto pt-0 shadow'
					)
				);
				const $divVector = d.getElementById('div-vector');
				$divVector.appendChild($fragment);
				$divVector.appendChild(
					Buttons('vector', 'Siguiente', 'btn btn-outline-dark mt-3')
				);
			} else {
				$div.appendChild(Alert('alert', 'El numero debe ser mayor a 1'));
			}
		}

		if (e.target.matches('#btn-vector')) {
			const val = validarInput('vectors');
			removeAlert();
			if (!val) {
				const $divVector = d.getElementById('div-vector');
				$divVector.appendChild(Alert('alert', 'Debe llenar todos los campos'));
			} else {
				const $vectors = d.querySelectorAll('.vectors');
				$vectors.forEach((el) => {
					const value = Number(el.value);
					if (!isNaN(value)) vectorInicial.push(value);
				});

				const $divVector = d.getElementById('div-vector');
				$divVector.remove();
				let tam = [];
				for (let i = 0; i < nInicial; i++) tam.push(i);

				$main.appendChild(
					Div(
						'calcular',
						'border padding rounded d-grid gap-2 col-10 col-md-6 mx-auto pt-0 shadow'
					)
				);

				const $divCalcular = d.getElementById('div-calcular');
				$divCalcular.style.overflowX = 'auto';
				$divCalcular.appendChild(
					Span(
						'calcularSpan',
						'Matriz de Transición',
						'text-center card-title border-bottom py-3'
					)
				);
				$divCalcular.appendChild(Table(tam));

				$divCalcular.appendChild(
					Buttons('calcular', 'Calcular', 'btn btn-outline-dark')
				);
			}
		}

		if (e.target.matches('#btn-calcular')) {
			removeAlert();
			const val = validarInput('valFin');
			const $divCalcular = d.getElementById('div-calcular');

			if (!val) {
				$divCalcular.appendChild(
					Alert('alert', 'Debe rellenar todos los campos')
				);
				matrizTransicion = [];
			} else {
				const $calcular = d.querySelectorAll('.valFin');
				matrizTransicion = listToMatrix($calcular, nInicial);
				ans = calculateMarkov.calcule(matrizTransicion, vectorInicial);

				loader($divCalcular);
				if (ans) {
					removeLoader();
					$divCalcular.remove();

					$main.appendChild(
						Div(
							'response',
							'border padding rounded d-grid gap-2 col-10 col-md-6 mx-auto pt-0 shadow'
						)
					);

					const $divRes = d.getElementById('div-response');
					$divRes.style.overflowX = 'auto';
					$divRes.appendChild(
						Span(
							'response',
							'Resultado:',
							'text-center card-title border-bottom py-3'
						)
					);

					$divRes.appendChild(Result(ans));

					const $trBodyFinal = d.getElementById(`trBody-${ans.length}`);
					$trBodyFinal.classList = 'bg-primary bg-gradient text-white';
					const $td = $trBodyFinal.querySelectorAll('td');
					$td[0].textContent = 'Estado Estable';
					$divRes.appendChild(
						Buttons('reload', 'Aceptar', 'btn btn-outline-dark')
					);
					if (ans.length > 6) {
						d.getElementById('footer').style.position = 'sticky';
					}
				}

				//console.log(ans);
			}
		}

		if (e.target.matches('#btn-reload')) {
			location.reload();
		}
	});

	function removeLoader() {
		d.getElementById('svg-calculando').remove();
	}

	function loader($divCalcular) {
		const h = $divCalcular.clientHeight;
		const $span = d.getElementById('span-calcularSpan');
		const $table = $divCalcular.querySelector('table');
		const $btnCalc = d.getElementById('btn-calcular');
		$span.remove();
		$table.remove();
		$btnCalc.remove();
		$divCalcular.appendChild(Loader('calculando', 'py-3'));
		$divCalcular.classList.add('justify-content-center');
		$divCalcular.classList.add('align-content-center');
		$divCalcular.style.height = `${h}px`;
	}

	function listToMatrix(list, elementsPerSubArray) {
		var matrix = [],
			i,
			k;

		for (i = 0, k = -1; i < list.length; i++) {
			if (i % elementsPerSubArray === 0) {
				k++;
				matrix[k] = [];
			}

			matrix[k].push(Number(list[i].value));
		}

		return matrix;
	}

	function validarInput(clase) {
		let val = true;
		const $inputs = d.querySelectorAll(`.${clase}`);
		$inputs.forEach((el) => {
			const value = Number(el.value);
			if (isNaN(value) || !el.value.length > 0) val = false;
		});

		return val;
	}

	function removeAlert() {
		const $currentAlert = d.getElementById('div-alert');
		if ($currentAlert) $currentAlert.remove();
	}
}
