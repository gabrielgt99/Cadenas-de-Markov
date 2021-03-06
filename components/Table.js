import { Input } from './Input.js';

export function Table(tam) {
	const d = document;
	const $table = d.createElement('table');
	$table.classList = 'table table-hover table-responsive text-cencer';
	const $tHead = d.createElement('thead'),
		$trHead = d.createElement('tr');

	$trHead.classList.add('text-center');
	const $fragmentHead = d.createDocumentFragment();
	const $th2 = d.createElement('th');
	$th2.textContent = '';
	$fragmentHead.appendChild($th2);
	let aux = 0;
	for (const p of tam) {
		const $th = d.createElement('th');
		$th.classList = 'text-center';
		$th.textContent = String.fromCharCode(97 + aux);
		$fragmentHead.appendChild($th);
		aux++;
	}
	$trHead.appendChild($fragmentHead);
	$tHead.appendChild($trHead);

	const $tBody = d.createElement('tbody');

	let aux2 = 0;
	for (const t of tam) {
		const $trBody = d.createElement('tr'),
			$fragmentBody = d.createDocumentFragment();

		const $tdVar = d.createElement('td');
		$tdVar.classList = 'text-center';
		$tdVar.innerHTML = `<strong>${String.fromCharCode(97 + aux2)}</strong>`;
		$fragmentBody.appendChild($tdVar);

		for (const b of tam) {
			const $td = d.createElement('td');
			$td.classList = 'text-center';
			$td.appendChild(Input(b, 'number', 'valFin form-control'));
			$fragmentBody.appendChild($td);
		}
		$trBody.appendChild($fragmentBody);
		$tBody.appendChild($trBody);
		aux2++;
	}
	$table.appendChild($tHead);

	$table.appendChild($tBody);
	return $table;
}
