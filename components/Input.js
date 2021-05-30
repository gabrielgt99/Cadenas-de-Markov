export function Input(id, type) {
	const $input = document.createElement('input');
	$input.setAttribute('id', `input-${id}`);
	$input.type = type;
	return $input;
}
