import './components/AlgorithmSelector';
import './components/NumberInput';
import './components/SpeedSlider';

import { Sorter } from './Sorter';
import { config } from './state/config';


const svg = document.querySelector<SVGElement>('svg.visualizer')!;
const sorter = new Sorter(svg);

config.observeAll((changedProp) => {
    if (changedProp !== 'speed') sorter.reset();
});

// Keyboard Shortcuts
document.onkeydown = (e: KeyboardEvent) => {
    if (e.key === 's') sorter.start();
    if (e.key === 'p') sorter.pause();
    if (e.key === 'r') sorter.reset();
}

// Prevent reload on main form submission
document.querySelector<HTMLFormElement>('form.controls')?.addEventListener('submit', (e: Event) => e.preventDefault());