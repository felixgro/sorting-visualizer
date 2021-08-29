type ObserveCallback = (newValue: any, oldValue: any) => void;

export const reactive = <ObservableObject extends { [key: string]: any }>(data: ObservableObject): ReactiveObject<ObservableObject> => new ReactiveObject(data);

export class ReactiveObject<ObservableObject> {
    private registeredObservers: { [key: string]: ObserveCallback[] } = {};
    private registeredComputes: { [key: string]: (data: ObservableObject) => void } = {};
    private registeredObserveAll: Array<(changedProp: string, data: ObservableObject) => void> = [];

    constructor(
        public data: ObservableObject
    ) { }

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

    observe(key: keyof ObservableObject, onUpdate: ObserveCallback, immediate = false) {
        if (!this.registeredObservers[key as string])
            this.registeredObservers[key as string] = [];

        if (immediate)
            onUpdate.call(this, this.data[key], this.data[key]);

        this.registeredObservers[key as string].push(onUpdate);
    }

    observeAll(onUpdate: (changedProp: string, data: ObservableObject) => void) {
        this.registeredObserveAll.push(onUpdate);
    }

    compute(key: string, fn: (data: ObservableObject) => void) {
        this.registeredComputes[key] = fn;
    }
}