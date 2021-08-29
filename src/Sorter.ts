import { Algorithm } from './algorithms/Algorithm';
import { DataRect } from './DataRect';
import { config } from './state/config';

export class Sorter {
    private data: DataRect[] = [];
    public algorithm: Algorithm;
    private svg: SVGElement;

    constructor(svg: SVGElement) {
        this.svg = svg;

        config.observe('algorithm', () => {
            this.algorithm = config.get('algorithmInstance');
        }, true);

        this.generateData();
    }

    public start() {
        this.algorithm.data = this.data;
        this.algorithm.start();
    }

    public pause() {
        this.algorithm.pause();
    }

    public reset() {
        this.clearData();
        this.generateData();
        this.algorithm.reset();
    }

    private generateData() {
        this.svg.setAttribute('viewBox', `0 0 ${config.get('width')} ${config.get('height')}`);

        for (let i = 0; i < config.get('amount'); i++) {
            const x = config.get('barWidth') * i + config.get('margin') * i;
            this.data.push(new DataRect(this.svg, x));
        }
    }

    private clearData() {
        this.data.forEach(dr => dr.el.remove());
        this.data = [];
    }
}