type ComputeCallback<Observable> = ((data: Observable) => void);
type ObserveCallback = (newValue: any, oldValue: any) => void;

export const reactive = <ObservableObject extends { [key: string]: any }>(data: ObservableObject): ReactiveObject<ObservableObject> => new ReactiveObject(data);

export class ReactiveObject<Observable> {
    private registeredObservers: { [key: string]: ObserveCallback[] } = {};
    private registeredComputes: { [key: string]: (data: Observable) => void } = {};
    private registeredObserveAll: Array<(changedProp: string, data: Observable) => void> = [];

    private initialData: Observable;

    constructor(
        public data: Observable
    ) {
        this.initialData = { ...data };
    }

    get(key: string): any {
        if (this.registeredComputes[key])
            return this.registeredComputes[key].call(this, this.data);

        return this.data[key];
    }

    update(key: string, value: any) {
        const callbacks = this.registeredObservers[key];
        const prevValue = this.data[key];

        this.data[key] = value;

        if (callbacks) for (const callback of callbacks) callback.call(this, this.data[key], prevValue);
        this.registeredObserveAll.forEach(fn => fn.call(this, key, this.data));
    }

    observe(key: keyof Observable, onUpdate: ObserveCallback, immediate = false) {
        if (!this.registeredObservers[key as string])
            this.registeredObservers[key as string] = [];

        if (immediate)
            onUpdate.call(this, this.data[key], this.data[key]);

        this.registeredObservers[key as string].push(onUpdate);
    }

    observeAll(onUpdate: (changedProp: string, data: Observable) => void) {
        this.registeredObserveAll.push(onUpdate);
    }

    compute(key: string, fn: (data: Observable) => void) {
        this.registeredComputes[key] = fn;
    }

    computeMany(computes: { [key: string]: (data: Observable) => void }) {
        for (const key in computes) this.compute(key, computes[key]);
    }

    reset(callObservers = false) {
        if (callObservers) {
            for (const key in this.initialData) this.update(key, this.initialData[key]);
        } else {
            this.data = this.initialData;
        }
    }
}