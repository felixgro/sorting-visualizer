import { algorithmMap } from '../algorithms/_map';
import { generateUniqueId } from '../utils/uid';
import { config } from '../state/config';

class AlgorithmSelector extends HTMLElement {
    private configKey = 'algorithm';
    private uid: string;

    constructor() {
        super();
        this.uid = generateUniqueId();
    }

    get algorithms(): { [key: string]: string } {
        let algorithms = {};

        for (const alg of algorithmMap.keys())
            algorithms[alg] = alg.split('-').map(a => a.slice(0, 1).toUpperCase() + a.slice(1, a.length)).join(' ');

        return algorithms;
    }

    get value(): string {
        return this.getAttribute('value');
    }

    set value(v: string) {
        this.setAttribute('value', v);
        config.update(this.configKey, v);
    }

    connectedCallback() {
        this.value = config.get(this.configKey);
        this.render();

        this.querySelector('select').addEventListener('change', () => {
            config.update('algorithm', this.querySelector('select').value);
        });
    }

    render() {
        let template = `
            <label for="${this.uid}">Algorithm</label>
            <div class="selector">
                <button class="select-button" tabindex="-1">
                    <img src="./src/assets/arrow-down.svg" />
                </button>
                <select id="${this.uid}" name="${this.uid}">
            </div>
        `;

        Object.keys(this.algorithms).forEach((key) => {
            template += `<option value="${key}" ${this.value === this.algorithms[key] ? 'selected' : ''}>${this.algorithms[key]}</option>`
        });

        template += '</select>'

        this.innerHTML = template;
    }
}

window.customElements.define('algorithm-selector', AlgorithmSelector);