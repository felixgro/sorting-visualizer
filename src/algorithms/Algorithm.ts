import { DataRect } from '../DataRect';
import { config } from '../state/config';

type SortingState = 'idle' | 'sorting' | 'done';

export abstract class Algorithm {
    public data: DataRect[];

    protected state: SortingState = 'idle';

    protected onStart() { };
    protected onPause() { };
    protected onReset() { };

    protected abstract sort(...args: any[]): any;

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

    protected sleep() {
        return new Promise(resolve => setTimeout(resolve, config.get('switchDuration') / 2));
    }
}