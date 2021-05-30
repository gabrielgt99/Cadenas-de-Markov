export function Loader(id, classes) {
	const $img = document.createElement('img');
	$img.setAttribute('id', `svg-${id}`);
	$img.src = '../assets/loader.svg';
	if (classes) $img.classList = classes;
	return $img;
}
