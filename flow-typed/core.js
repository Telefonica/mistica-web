// This is copy&pasted from https://github.com/facebook/flow/blob/master/lib/core.js but with some methods
// overriden for convenience (Object.entries, Object.keys, Object.values)
// The default flow types for those methods are more sound, but less "practical" in the daily usage.
declare class Object {
    static (o: ?void): {[key: any]: any, ...};
    static (o: boolean): Boolean;
    static (o: number): Number;
    static (o: string): String;
    static <T>(o: T): T;
    static assign: Object$Assign;
    static create(o: any, properties?: PropertyDescriptorMap): any; // compiler magic
    static defineProperties(o: any, properties: PropertyDescriptorMap): any;
    static defineProperty<T>(o: any, p: any, attributes: PropertyDescriptor<T>): any;
    static entries<T>(object: T): Array<[$Keys<T>, $Values<T>]>;
    static freeze<T>(o: T): T;
    static fromEntries<K, V>(
        entries: Iterable<
            | [K, V]
            | {
                  0: K,
                  1: V,
                  ...
              }
        >
    ): {[K]: V, ...};

    static getOwnPropertyDescriptor<T>(o: $NotNullOrVoid, p: any): PropertyDescriptor<T> | void;
    static getOwnPropertyDescriptors(o: {...}): PropertyDescriptorMap;
    // This is documentation only. Object.getOwnPropertyNames is implemented in OCaml code
    // https://github.com/facebook/flow/blob/8ac01bc604a6827e6ee9a71b197bb974f8080049/src/typing/statement.ml#L6308
    static getOwnPropertyNames(o: $NotNullOrVoid): Array<string>;
    static getOwnPropertySymbols(o: $NotNullOrVoid): Array<symbol>;
    static getPrototypeOf: Object$GetPrototypeOf;
    static is<T>(a: T, b: T): boolean;
    static isExtensible(o: $NotNullOrVoid): boolean;
    static isFrozen(o: $NotNullOrVoid): boolean;
    static isSealed(o: $NotNullOrVoid): boolean;
    // This is documentation only. Object.keys is implemented in OCaml code.
    // https://github.com/facebook/flow/blob/8ac01bc604a6827e6ee9a71b197bb974f8080049/src/typing/statement.ml#L6308
    static keys<T>(o: T): Array<$Keys<T>>;
    static preventExtensions<T>(o: T): T;
    static seal<T>(o: T): T;
    static setPrototypeOf<T>(o: T, proto: ?{...}): T;
    static values<T>(object: T): Array<$Values<T>>;
    hasOwnProperty(prop: mixed): boolean;
    isPrototypeOf(o: mixed): boolean;
    propertyIsEnumerable(prop: mixed): boolean;
    toLocaleString(): string;
    toString(): string;
    valueOf(): mixed;
}
