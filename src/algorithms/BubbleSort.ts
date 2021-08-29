import { Algorithm } from './Algorithm';
import { sleep } from '../utils/sleep';
import { config } from '../state/config';

export class BubbleSort extends Algorithm {
    private p = 0;

    protected onReset() {
        this.p = 0;
    }

    protected async sort() {
        const a = this.data[this.p],
            b = this.data[this.p + 1];

        if (a.state === 'sorted') return this.done();

        a.state = 'active';

        if (this.state !== 'sorting') return;

        if (!b || b.state === 'sorted') {
            a.state = 'sorted';
            this.p = 0;
            return await this.sort();
        } else {
            b.state = 'active';
        }

        if (b.val < a.val) {
            await a.swapWith(b, this.data);
        } else {
            await sleep(config.get('switchDuration') / 2);
        }

        this.p++;
        a.state = 'idle';
        b.state = 'idle';

        return await this.sort();
    }
}