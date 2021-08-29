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

config.compute('algorithmInstance', ({ algorithm }) => algorithmMap.get(algorithm));

config.compute('switchDuration', ({ speed }) => 120 / speed);

config.compute('barWidth', ({ width, margin, amount }) => {
    const barWidth = (width - margin * (amount - 1)) / amount;
    return barWidth > 0 ? barWidth : 0;
});