import { Input } from '/components/Input.js';
import { Span } from '/components/Span.js';
import { Div } from '/components/Div.js';
import { Buttons } from './components/Buttons.js';
import { TextNode } from './components/TextNode.js';

export async function App() {
	const d = document;
	const $main = d.getElementById('main');
	$main.appendChild(Div('main', 'border padding rounded'));

	const $div = d.getElementById('div-main');
	$div.appendChild(Span('mainSpan', 'Numero inicial:', 'mr-1'));
	$div.appendChild(Input('mainInput', 'number'));
	$div.appendChild(Buttons('mainBtn', 'Siguiente', 'btn btn-outline-dark'));

	d.addEventListener('click', (e) => {
		if (e.target.matches('#btn-mainBtn')) {
			const $input = d.getElementById('input-mainInput');
			const value = Number($input.value);

			removeAlert();
			if (!isNaN(value) && value > 1) {
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
				$divVector.appendChild(Buttons('mainVector', 'Siguiente', 'ml-1 mt-1'));
			} else {
				const $alert = Div('alert', 'alert alert-danger mt-1');
				$alert.appendChild(TextNode(`Error, el numero debe ser mayor a 1`));
				$main.appendChild($alert);
			}
		}

		if (e.target.matches('#btn-mainVector')) {
			const $vectors = d.querySelectorAll('.vectors');
			$vectors.forEach((el) => {});
		}
	});

	function removeAlert() {
		const $currentAlert = d.getElementById('div-alert');
		if ($currentAlert) $currentAlert.remove();
	}
}
