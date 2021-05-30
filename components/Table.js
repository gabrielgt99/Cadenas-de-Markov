import { Input } from './Input.js';

export function Table(tam) {
	const d = document;
	const $table = d.createElement('table');
	$table.classList = 'table table-hover';
	const $tHead = d.createElement('thead'),
		$trHead = d.createElement('tr');

	const $fragmentHead = d.createDocumentFragment();
	for (const p of tam) {
		const $th = d.createElement('th');
		$th.textContent = p;
		$fragmentHead.appendChild($th);
	}
	$trHead.appendChild($fragmentHead);
	$tHead.appendChild($trHead);

	const $tBody = d.createElement('tbody');

	for (const t of tam) {
		const $trBody = d.createElement('tr'),
			$fragmentBody = d.createDocumentFragment();

		for (const b of tam) {
			const $td = d.createElement('td');
			$td.appendChild(Input(b, 'number', 'valFin'));
			$fragmentBody.appendChild($td);
		}
		$trBody.appendChild($fragmentBody);
		$tBody.appendChild($trBody);
	}
	$table.appendChild($tHead);

	$tHead.style.display = 'none';

	$table.appendChild($tBody);
	return $table;
}
