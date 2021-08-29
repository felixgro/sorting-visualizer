export const swapArrayItems = <T>(arr: T[], a: T, b: T) => {
    const indexA = arr.indexOf(a);
    const indexB = arr.indexOf(b);
    arr[indexA] = b;
    arr[indexB] = a;
}