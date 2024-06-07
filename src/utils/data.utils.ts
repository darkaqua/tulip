export const compare = (a, b) => !a || b.some((arg, i) => arg !== a[i]);
