import { Algorithm } from './Algorithm';

export class BubbleSort extends Algorithm {
    private index = 0;

    protected onReset() {
        this.index = 0;
    }

    protected async sort() {
        const a = this.data[this.index],
            b = this.data[this.index + 1];

        if (a.state === 'sorted') return;
        a.state = 'active';
        if (this.state !== 'sorting') return;

        if (!b || b.state === 'sorted') {
            a.state = 'sorted';
            this.index = 0;
            return await this.sort();
        } else {
            b.state = 'active';
        }

        if (b.val < a.val) {
            await a.swapWith(b, this.data);
        } else {
            await this.sleep();
        }

        this.index++;
        a.state = 'idle';
        b.state = 'idle';

        return await this.sort();
    }
}