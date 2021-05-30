import { TextNode } from './TextNode.js';

export function Span(id, text, classes) {
	const $span = document.createElement('span');
	$span.setAttribute('id', `span-${id}`);

	$span.appendChild(TextNode(text));
	if (classes) $span.classList = classes;

	return $span;
}
