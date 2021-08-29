import { DataRect } from '../DataRect';

type SortingState = 'idle' | 'sorting' | 'done';

export abstract class Algorithm {
    public data: DataRect[];

    protected state: SortingState = 'idle';

    protected onStart() { };
    protected onPause() { };
    protected onReset() { };

    protected abstract sort(): any;

    public start() {
        if (this.state !== 'idle') return;

        this.state = 'sorting';
        this.onStart();
        this.sort();
    }

    public pause() {
        if (this.state !== 'sorting') return;

        this.state = 'idle';
        this.onPause();
    }

    public reset() {
        this.state = 'idle';
        this.onReset();
    }

    public done() {
        this.state = 'done';
    }
}