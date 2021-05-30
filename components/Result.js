import { TextNode } from './TextNode.js';

export function Result(tam) {
	const d = document;
	const $table = d.createElement('table');
	$table.classList = 'table table-hover';
	const $tHead = d.createElement('thead'),
		$trHead = d.createElement('tr');

	$trHead.classList.add('text-center');

	const $fragmentHead = d.createDocumentFragment();
	const $states = d.createElement('th');
	$states.textContent = 'Estado';
	$fragmentHead.appendChild($states);

	let aux = 0;

	for (const p of tam[0]) {
		const $th = d.createElement('th');
		$th.textContent = String.fromCharCode(97 + aux);
		$fragmentHead.appendChild($th);
		aux++;
	}
	$trHead.appendChild($fragmentHead);
	$tHead.appendChild($trHead);

	const $tBody = d.createElement('tbody');
	let pos = 1;
	for (const t of tam) {
		const $trBody = d.createElement('tr'),
			$fragmentBody = d.createDocumentFragment();
		$trBody.setAttribute('id', `trBody-${pos}`);
		console.log(t);

		const $tdState = d.createElement('td');
		$tdState.classList = 'text-center';
		$tdState.appendChild(TextNode(`E${pos}`));
		$fragmentBody.appendChild($tdState);

		for (const b of t) {
			const $td = d.createElement('td');
			$td.classList = 'text-center';
			$td.appendChild(TextNode(b));
			$fragmentBody.appendChild($td);
		}
		$trBody.appendChild($fragmentBody);
		$tBody.appendChild($trBody);
		pos++;
	}
	$table.appendChild($tHead);

	$table.appendChild($tBody);
	return $table;
}
