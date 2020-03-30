import { json2ts } from './json2ts/json2ts';
import { Writer } from './json2ts/writer/Writer';

/**
 * This is just an example on how to use the JSON to Interface package.
 */

const trigger: HTMLElement | null = window.document.querySelector('.js-trigger');
const input: HTMLTextAreaElement | null = window.document.querySelector('.js-input');
const output: HTMLElement | null = window.document.querySelector('.js-output');
const status: HTMLElement | null = window.document.querySelector('.js-status');

if (trigger !== null && input !== null && output !== null && status !== null) {
    trigger.addEventListener('click', (): void => {
        try {
            const writer: Writer = new Writer(json2ts(input.value, 'root'));

            // tslint:disable-next-line no-inner-html
            output.innerHTML = writer.write();
            status.className = '';
            status.innerText = '✅ Compile successful';
        } catch (e) {
            output.innerText = '';
            status.className = 'error';
            status.innerText = `❌ Error compiling: ${(<Error>e).toString()}`;
        }
    });
}
