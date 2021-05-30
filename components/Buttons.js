import { TextNode } from './TextNode.js';

export function Buttons(id, text, clasess) {
	const $btn = document.createElement('button');
	$btn.type = 'button';
	$btn.appendChild(TextNode(text));
	$btn.setAttribute('id', `btn-${id}`);
	if (clasess) $btn.classList = clasess;
	return $btn;
}
