'use client';
import * as React from 'react';
import {isEqual} from './utils/helpers';

const useDeepCompareMemoize = (value: any) => {
    const ref = React.useRef();

    if (!isEqual(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
};

/**
 * This is like `useEffect` but with deep equal checks
 */
const useDeepCompareEffect: typeof React.useEffect = (create, inputs) =>
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(create, useDeepCompareMemoize(inputs));

type Action<Value> = Readonly<
    | {
          type: 'add';
          value: Value;
      }
    | {
          type: 'remove';
          value: Value;
      }
>;

type Dispatch<Value> = (action: Action<Value>) => void;

type ProviderProps = {children: React.ReactNode};

const isObject = (object: any): object is Record<string, unknown> =>
    object !== null && typeof object === 'object' && !Array.isArray(object);

export type NestableContext<Value> = {
    Getter: (props: {children: (value: Value) => React.ReactNode}) => JSX.Element;
    Provider: (props: ProviderProps) => JSX.Element;
    Setter: (props: {value: Value}) => null;
    useValue: () => Value;
    useSetValue: (value: Value) => void;
};

export const createNestableContext = <Value,>(
    defaultValue: Value,
    valuesReducer?: (values: Array<Value>) => Value
): NestableContext<Value> => {
    const DispatchContext = React.createContext<Dispatch<Value>>(() => {});
    const ValueContext = React.createContext<Value>(defaultValue);

    let providerInstances = 0;

    /*
    This component may have multiple children setting a value at the same time. When a child component mounts,
    it fires an action {type: 'add', value}, when a child component unmounts (or changes the value) it fires
    an action {type: 'remove', value}. See SetterComponent.

    This parent component keeps track of all the set values, maintaining an array. The last value in the
    array is used as current value (fallbacks to defaultValue when the array is empty).
    The array is needed because we need to handle these edge cases:

    - Page 1 sets value X, and following page 2 doesn't set any value. We need to use defaultValue in this
    case.
    - Page 1 sets value X, page 2 sets value Y. While transitioning between both values X and Y are set at
    the same time, when Page 1 unmounts, value Y should be used.
    */
    const reducer = (values: Array<Value>, action: Action<Value>): Array<Value> => {
        switch (action.type) {
            case 'add':
                return [...values, action.value];
            case 'remove': {
                const idx = values.indexOf(action.value);
                return [...values.slice(0, idx), ...values.slice(idx + 1, values.length)];
            }
            default:
                throw new Error(`Unhandled action type ${(action as any).type}`);
        }
    };

    const Provider = ({children}: ProviderProps) => {
        React.useEffect(() => {
            providerInstances++;

            if (providerInstances > 1 && process.env.NODE_ENV !== 'production') {
                console.warn(`Multiple NestableContext instances: ${providerInstances}`);
            }

            return () => {
                providerInstances--;
            };
        }, []);

        const [values, dispatch] = React.useReducer(reducer, []);
        let computedValue: Value = defaultValue;
        if (values.length) {
            if (isObject(values[0])) {
                if (valuesReducer) {
                    computedValue = valuesReducer(values);
                } else {
                    computedValue = Object.assign({}, defaultValue, ...values);
                }
            } else {
                computedValue = values[values.length - 1];
            }
        }

        return (
            <DispatchContext.Provider value={dispatch}>
                <ValueContext.Provider value={computedValue}>{children}</ValueContext.Provider>
            </DispatchContext.Provider>
        );
    };

    const useSetValue = (value: Value) => {
        const dispatch = React.useContext(DispatchContext);

        useDeepCompareEffect(() => {
            dispatch({type: 'add', value});
            return () => {
                dispatch({type: 'remove', value});
            };
        }, [value, dispatch]);
    };

    const useValue = () => React.useContext(ValueContext);

    const Setter = ({value}: {value: Value}) => {
        useSetValue(value);
        return null;
    };

    const Getter = ({children}: {children: (value: Value) => React.ReactNode}) => <>{children(useValue())}</>;

    return {Setter, Provider, Getter, useSetValue, useValue};
};
