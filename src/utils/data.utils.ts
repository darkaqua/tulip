export const compare = (a: any, b: any) => !a || b.some((arg, i) => arg !== a[i]);
