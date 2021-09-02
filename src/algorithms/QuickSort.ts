import { Algorithm } from './Algorithm';

export class QuickSort extends Algorithm {
    private initialized = false;

    onReset() {
        this.initialized = false;
    }

    protected async sort(fromIndex?: number, toIndex?: number) {
        if (!this.initialized) {
            this.initialized = true;
            fromIndex = 0;
            toIndex = this.data.length - 1;
        }

        if (fromIndex >= toIndex) {
            if (this.data[toIndex]) this.data[toIndex].state = 'sorted';
            return;
        }

        const index = await this.partition(fromIndex, toIndex);

        return await Promise.all([
            this.sort(fromIndex, index - 1),
            this.sort(index + 1, toIndex),
        ]);
    }

    private async partition(fromIndex: number, toIndex: number): Promise<number> {
        const pivot = this.data[toIndex];
        let pivotIndex = fromIndex;

        pivot.state = 'active';

        for (let i = fromIndex; i < toIndex; i++) {
            const current = this.data[i];
            current.state = 'active';

            if (current.val < pivot.val) {
                const pivotIndexElement = this.data[pivotIndex++];

                pivotIndexElement.state = 'active';
                await current.swapWith(pivotIndexElement, this.data);
                pivotIndexElement.state = 'idle';
            } else {
                await this.sleep();
            }
            current.state = 'idle';
        }

        await pivot.swapWith(this.data[pivotIndex], this.data);
        pivot.state = 'sorted';

        return pivotIndex;
    }
}