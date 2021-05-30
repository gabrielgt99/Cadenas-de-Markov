import { Buttons } from './Buttons.js';
import { Div } from './Div.js';
import { Span } from './Span.js';
import { TextNode } from './TextNode.js';

export function Alert(id, text) {
	const $alert = Div(id, 'alert alert-danger alert-dismissible fade show mt-3');
	$alert.setAttribute('role', 'alert');
	$alert.appendChild(TextNode(text));

	const $btn = Buttons(id, '', 'btn-close');
	$btn.setAttribute('data-bs-dismiss', 'alert');
	$btn.setAttribute('arial-label', 'Close');

	$alert.appendChild($btn);

	return $alert;
}
