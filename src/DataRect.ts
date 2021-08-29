import { swapArrayItems } from './utils/swapArrayItems';
import { config } from './state/config';

const svgNS = 'http://www.w3.org/2000/svg';

type DataState = 'idle' | 'active' | 'sorted';

export class DataRect {
    public el: SVGRectElement;
    public val: number;

    private _state: DataState;

    constructor(
        svg: SVGElement,
        public x: number
    ) {
        this.val = config.get('min') + Math.random() * (config.get('height') - config.get('min'));

        this.el = document.createElementNS(svgNS, 'rect');
        this.el.setAttribute('width', `${config.get('barWidth')}`);
        this.el.setAttribute('height', `${this.val}`);
        this.el.setAttribute('x', `${x}`);
        this.el.setAttribute('y', `${config.get('height') - this.val}`);
        this.el.setAttribute('style', 'transition: all 160ms ease-out')

        this.state = 'idle';
        svg.appendChild(this.el);
    }

    set state(s: DataState) {
        this._state = s;
        let color: string;

        switch (s) {
            case 'idle':
                color = '#202029';
                break;
            case 'active':
                color = '#454C6A';
                break;
            case 'sorted':
                color = '#27e8a7';
                break;
        }

        this.el.setAttribute('fill', color);
    }

    get state(): DataState {
        return this._state;
    }

    async swapWith(other: DataRect, arr?: DataRect[]) {
        return new Promise((res) => {
            this.el.animate([
                { x: `${this.x}` },
                { x: `${other.x}px` }
            ], {
                duration: config.get('switchDuration'),
                fill: 'forwards'
            });

            other.el.animate([
                { x: `${other.x}` },
                { x: `${this.x}px` }
            ], {
                duration: config.get('switchDuration'),
                fill: 'forwards',
                easing: 'ease-out'
            });

            setTimeout(() => {
                [other.x, this.x] = [this.x, other.x];
                if (arr) swapArrayItems(arr, this, other);
                res(true);
            }, config.get('switchDuration'));
        });
    }
}