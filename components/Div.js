export function Div(id, classes) {
	const $div = document.createElement('div');
	$div.setAttribute('id', `div-${id}`);
	if (classes) $div.className = classes;
	return $div;
}
