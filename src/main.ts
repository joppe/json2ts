import { json2ts } from 'app/json2ts';

/**
 * This is just an example on how to use the JSON to Interface package.
 */

const trigger: HTMLElement = window.document.querySelector('.js-trigger');
const input: HTMLTextAreaElement = window.document.querySelector('.js-input');
const output: HTMLElement = window.document.querySelector('.js-output');

trigger.addEventListener('click', (): void => {
    try {
        output.innerText = json2ts(input.value, 'root');
    } catch (e) {
        output.innerText = e.toString();
    }
});
