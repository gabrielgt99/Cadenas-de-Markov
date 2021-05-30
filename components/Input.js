export function Input(id, type, classes) {
	const $input = document.createElement('input');
	$input.setAttribute('id', `input-${id}`);
	$input.type = type;
	if (classes) $input.classList = classes;
	return $input;
}
