import { algorithmMap } from '../algorithms/_map';
import { reactive } from '../utils/reactive';

export const config = reactive({
    algorithm: 'bubble-sort',
    width: 500,
    height: 200,
    amount: 50,
    margin: 5,
    min: 50,
    speed: 1
});

config.computeMany({
    algorithmInstance: ({ algorithm }) => {
        return algorithmMap.get(algorithm)
    },

    switchDuration: ({ speed }) => {
        return 120 / speed
    },

    barWidth: ({ width, margin, amount }) => {
        const w = (width - margin * (amount - 1)) / amount;

        return w > 0 ? w : 0;
    }
});