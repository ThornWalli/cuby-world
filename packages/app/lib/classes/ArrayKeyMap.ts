export class ArrayKeyMap<K extends readonly unknown[], V> {
  private _map = new Map<string, V>();

  private static keyFromArray(arr: readonly unknown[]): string {
    // robustere Serialisierung → unterscheidet Typen klar
    return JSON.stringify(arr);
  }

  set(key: K, value: V): this {
    this._map.set(ArrayKeyMap.keyFromArray(key), value);
    return this;
  }

  get(key: K): V | undefined {
    return this._map.get(ArrayKeyMap.keyFromArray(key));
  }

  has(key: K): boolean {
    return this._map.has(ArrayKeyMap.keyFromArray(key));
  }

  delete(key: K): boolean {
    return this._map.delete(ArrayKeyMap.keyFromArray(key));
  }

  clear(): void {
    this._map.clear();
  }

  get size(): number {
    return this._map.size;
  }

  *entries(): IterableIterator<[K, V]> {
    for (const [k, v] of this._map.entries()) {
      yield [JSON.parse(k) as K, v];
    }
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  *keys(): IterableIterator<K> {
    for (const k of this._map.keys()) {
      yield JSON.parse(k) as K;
    }
  }

  values(): IterableIterator<V> {
    return this._map.values();
  }

  forEach(callback: (value: V, key: K, map: this) => void): void {
    for (const [k, v] of this._map.entries()) {
      callback(v, JSON.parse(k) as K, this);
    }
  }
}
