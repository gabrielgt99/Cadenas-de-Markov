import { TextNode } from './TextNode.js';

export function Titles(id, text, type) {
	const $text = document.createElement(type);
	$text.appendChild(TextNode(text));
	$text.setAttribute('id', `title-${id}`);
	return $text;
}
