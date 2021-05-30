import { Input } from '/components/Input.js';
import { Span } from '/components/Span.js';
import { Div } from '/components/Div.js';
import { Buttons } from './components/Buttons.js';
import { TextNode } from './components/TextNode.js';
import { Table } from './components/Table.js';

export async function App() {
	//var DOM
	const d = document;
	const $main = d.getElementById('main');
	$main.appendChild(Div('main', 'border padding rounded'));

	const $div = d.getElementById('div-main');
	$div.appendChild(Span('mainSpan', 'Numero inicial:', 'mr-1'));
	$div.appendChild(Input('mainInput', 'number'));
	$div.appendChild(Buttons('mainBtn', 'Siguiente', 'btn btn-outline-dark'));

	//var logic
	const vectorInicial = [];

	let nInicial = -1,
		sendData = [];

	d.addEventListener('click', (e) => {
		if (e.target.matches('#btn-mainBtn')) {
			const $input = d.getElementById('input-mainInput');
			const value = Number($input.value);

			removeAlert();
			if (!isNaN(value) && value > 1) {
				nInicial = value;
				$div.remove();
				const $fragment = d.createDocumentFragment();
				for (let i = 0; i < value; i++) {
					const $divVec = Div(`value-${i + 1}`, 'mr-1 ml-1 mt-1 mb-1');

					$divVec.appendChild(TextNode(`Valor ${i + 1}: `));
					$divVec.appendChild(Input(`vec-${i + 1}`, 'number', 'vectors'));
					$fragment.appendChild($divVec);
				}
				$main.appendChild(Div('vector', 'border padding rounded'));
				const $divVector = d.getElementById('div-vector');
				$divVector.appendChild($fragment);
				$divVector.appendChild(
					Buttons('vector', 'Siguiente', 'btn btn-outline-dark')
				);
			} else {
				const $alert = Div('alert', 'alert alert-danger mt-1');
				$alert.appendChild(TextNode(`Error, el numero debe ser mayor a 1`));
				$main.appendChild($alert);
			}
		}

		if (e.target.matches('#btn-vector')) {
			const val = validarInput('vectors');
			removeAlert();
			if (!val) {
				const $alert = Div('alert', 'alert alert-danger mt-1');
				$alert.appendChild(TextNode(`Debe llenar todas las casillas`));
				$main.appendChild($alert);
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

				$main.appendChild(Table(tam));
				$main.appendChild(
					Buttons('calcular', 'Calcular', 'btn btn-outline-dark')
				);
			}
		}

		if (e.target.matches('#btn-calcular')) {
			removeAlert();
			const val = validarInput('valFin');

			if (!val) {
				sendData = [];
				const $alert = Div('alert', 'alert alert-danger mt-1');
				$alert.appendChild(TextNode(`Debe llenar todas las casillas`));
				$main.appendChild($alert);
			} else {
				const $calcular = d.querySelectorAll('.valFin');
				$calcular.forEach((el) => {
					const value = Number(el.value);
					if (!isNaN(value) && el.value.length > 0) sendData.push(value);
				});
			}
		}
	});

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
