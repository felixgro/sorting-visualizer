import { config } from '../state/config';
import { generateUniqueId } from '../utils/uid';

class SpeedSlider extends HTMLElement {
    private speedOptions = [0.5, 1, 2, 4];
    private configKey = 'speed';
    private uid: string;

    constructor() {
        super();
        this.uid = generateUniqueId();
    }

    get value(): number {
        return parseFloat(this.getAttribute('value'));
    }

    set value(n: number) {
        config.update(this.configKey, n);
        this.setAttribute('value', `${n}`);
    }

    connectedCallback() {
        this.value = config.get(this.configKey);
        this.render();

        this.querySelector('label').addEventListener('click', () => this.querySelector('button').focus());
        this.querySelectorAll('button').forEach(b => b.addEventListener('click', this.onButtonClick.bind(this)));
    }

    onButtonClick(e: PointerEvent) {
        const target = e.target as HTMLButtonElement,
            newValue = parseFloat(target.dataset.value);

        e.preventDefault();

        if (this.value !== newValue) {
            this.value = newValue;
            this.setNewActiveButton(target);
        }
    }

    setNewActiveButton(button: HTMLButtonElement) {
        this.querySelector('.active').classList.remove('active');
        button.classList.add('active');
    }

    render() {
        let template = `
            <label>Speed</label>
            <div class="speed-slider">
        `;

        this.speedOptions.forEach(v => {
            template += `<button class="speed-option ${v === this.value ? 'active' : ''}" data-value="${v}">${v}x</button>`
        });

        template += '</div>';

        this.innerHTML = template;
    }
}

window.customElements.define('speed-slider', SpeedSlider);