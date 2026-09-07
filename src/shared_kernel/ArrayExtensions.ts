interface Array<T> {
    zipWith<U extends any[]>(...others: { [K in keyof U]: U[K][] }): [T, ...U][];
  }

Array.prototype.zipWith = function (...others: any[]) {
  const minLength = Math.min(this.length, ...others.map(arr => arr.length));
  return Array.from({ length: minLength }, (_, i) => [
    this[i], 
    ...others.map(arr => arr[i])
  ]);
} as any;