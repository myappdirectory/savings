import {Directive, ElementRef, Renderer, Input} from 'angular2/core';

@Directive({
	selector: '.textbox',
	host: {	
		'(focus)': 'onFocus($event)',
		'(blur)': 'onBlur($event)',
		'(keyup)': 'onKeyup($event)'
	}
})
export class MdInput {
	onFocus($event) {
		$event.currentTarget.parentElement.classList.add('focused');
	}
	onBlur($event) {
		$event.currentTarget.parentElement.classList.remove('focused');
	}
	onKeyup($event) {
		if($event.currentTarget.value) {
			$event.currentTarget.parentElement.classList.add('filled');
		} else {
			$event.currentTarget.parentElement.classList.remove('filled');
		}
	}
}

@Directive({
	selector: '.checkbox',
	host: {
		'(click)': 'onClick($event)'
	}
})
export class MdCheckbox {	
	onClick($event) {
		if($event.currentTarget.checked) {
			$event.currentTarget.parentElement.classList.add('checked');
		} else {
			$event.currentTarget.parentElement.classList.remove('checked');
		}
	}
}
