type AllKeys<T> = T extends unknown ? keyof T : never;
export type Id<T> = T extends infer U ? {[K in keyof U]: U[K]} : never;
type _ExclusifyUnion<T, K extends PropertyKey> = T extends unknown
    ? Id<T & Partial<Record<Exclude<K, keyof T>, never>>>
    : never;

// https://juhanajauhiainen.com/posts/how-to-type-an-object-with-exclusive-or-properties-in-typescript
export type ExclusifyUnion<T> = _ExclusifyUnion<T, AllKeys<T>>;
