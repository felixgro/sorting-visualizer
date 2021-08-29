import { Algorithm } from './Algorithm';

export class CocktailShakerSort extends Algorithm {
    private ltr = true;
    private index = 0;

    protected onReset() {
        this.index = 0;
        this.ltr = true;
    }

    protected async sort() {
        const a = this.data[this.index],
            b = this.ltr ? this.data[this.index + 1] : this.data[this.index - 1];

        if (a.state === 'sorted' && b.state === 'sorted') return this.done();

        a.state = 'active';

        if (this.state !== 'sorting') return;

        if (!b || b.state === 'sorted') {
            a.state = 'sorted';

            this.ltr = !this.ltr;
            this.ltr ? this.index++ : this.index--;
            return await this.sort();
        } else {
            b.state = 'active';
        }

        if (this.ltr) {
            (a.val > b.val) ? await a.swapWith(b, this.data) : await this.sleep();
            this.index++;
        } else {
            (a.val < b.val) ? await a.swapWith(b, this.data) : await this.sleep();
            this.index--;
        }

        a.state = 'idle';
        b.state = 'idle';

        return await this.sort();
    }
}