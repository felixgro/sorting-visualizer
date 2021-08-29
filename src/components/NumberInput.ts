import { config } from '../state/config';
import { generateUniqueId } from '../utils/uid';

class NumberInput extends HTMLElement {
    private inputElement: HTMLInputElement;
    private uid: string;

    constructor() {
        super();
        this.uid = generateUniqueId();
    }

    get label(): string {
        return this.getAttribute('label');
    }

    get configKey(): string {
        return this.getAttribute('config-key');
    }

    get value(): number {
        return parseInt(this.getAttribute('value'));
    }

    set value(n: number) {
        this.setAttribute('value', `${n}`);
        if (this.inputElement) this.inputElement.value = `${n}`;
    }

    connectedCallback() {
        this.value = config.get(this.configKey);
        this.render();

        this.inputElement = this.querySelector('input');
        this.inputElement.addEventListener('keyup', this.onNumberChange.bind(this));

        this.querySelector('button.increment').addEventListener('click', this.onButtonClick.bind(this));
        this.querySelector('button.decrement').addEventListener('click', this.onButtonClick.bind(this));
    }

    onButtonClick(e: PointerEvent) {
        let value = parseInt(this.inputElement.value);

        ((e.target as HTMLButtonElement).classList.contains('increment'))
            ? value++ : value--;

        this.value = value;
        this.onNumberChange();
        e.preventDefault();
    }

    onNumberChange() {
        config.update(this.configKey, this.inputElement.value);
    }

    render() {
        this.innerHTML = `
            <label for="${this.uid}">${this.label}</label>
            <div class="number-input">
                <div class="number-controls">
                    <button class="increment" tabindex="-1">
                        <img src="./src/assets/arrow-up.svg" />
                    </button>
                    <button class="decrement" tabindex="-1">
                        <img src="./src/assets/arrow-down.svg" />
                    </button>
                </div>
                <input type="number" id="${this.uid}" value="${this.value}" />
            </div>
        `;
    }
}

window.customElements.define('number-input', NumberInput);