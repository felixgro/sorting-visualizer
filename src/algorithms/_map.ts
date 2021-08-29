import { Algorithm } from './Algorithm';
import { BubbleSort } from './BubbleSort';
import { MergeSort } from './MergeSort';
import { QuickSort } from './QuickSort';
import { CocktailShakerSort } from './CocktailShakerSort';

export const algorithmMap = new Map<string, Algorithm>([
    ['bubble-sort', new BubbleSort()],
    ['merge-sort', new MergeSort()],
    ['quick-sort', new QuickSort()],
    ['cocktail-sort', new CocktailShakerSort()],
]);