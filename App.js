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
	$div.appendChild(Buttons('mainBtn', 'Siguiente', 'ml-1'));

	d.addEventListener('click', (e) => {
		if (e.target.matches('#btn-mainBtn')) {
			const $input = d.getElementById('input-mainInput');
			const value = Number($input.value);

			removeAlert();
			if (!isNaN(value) && value > 0) {
			} else {
				const $alert = Div('alert', 'alert alert-danger mt-1');
				$alert.appendChild(TextNode(`Error, el numero debe ser mayor a 0`));
				$main.appendChild($alert);
			}
		}
	});

	function removeAlert() {
		const $currentAlert = d.getElementById('div-alert');
		if ($currentAlert) $currentAlert.remove();
	}
}
