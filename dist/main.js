import { json2ts } from 'app/json2ts';
const trigger = window.document.querySelector('.js-trigger');
const input = window.document.querySelector('.js-input');
const output = window.document.querySelector('.js-output');
trigger.addEventListener('click', () => {
    try {
        output.innerHTML = json2ts(input.value, 'root');
    }
    catch (e) {
        output.innerText = e.toString();
    }
});
//# sourceMappingURL=main.js.map