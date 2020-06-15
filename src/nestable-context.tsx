// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';

const useDeepCompareMemoize = (value) => {
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

type Action<Value> =
    | {
          type: 'add',
          value: Value,
      }
    | {
          type: 'remove',
          value: Value,
      };
type Dispatch<Value> = (Action<Value>) => void;

type ProviderProps = {children: React.Node};

const isObject = (object: any): boolean %checks =>
    object !== null && typeof object === 'object' && !Array.isArray(object);

const createNestableContext = <Value>(
    defaultValue: Value
): ({
    Getter: React.ComponentType<{children: (value: Value) => React.Node}>,
    Provider: React.ComponentType<ProviderProps>,
    Setter: React.ComponentType<{value: Value}>,
    useValue: () => Value,
    useSetValue: (value: Value) => void,
}) => {
    const DispatchContext = React.createContext<Dispatch<Value>>(() => {});
    const ValueContext = React.createContext<Value>(defaultValue);

    let isProviderInstanceMounted: boolean = false;

    /*
    This component may have multiple children setting a value at the same time. When a child component mounts,
    it fires an action {type: 'add', value}, when a child component unmounts (or changes the value) it fires
    an action {type: 'remove', value}. See SetterComponent.

    This parent component keeps track of all the setted values, maintaining an array. The last value in the
    array is used as current value (fallbacks to defaultValue when the array is empty).
    The array is needed because we need to handle these edge cases:

    - Page 1 sets value X, and following page 2 doesn't set any value. We need to use defaultValue in this
    case.
    - Page 1 sets value X, page 2 sets value Y. While transitioning between both values X and Y are set at
    the same time, when Page 1 unmounts, value Y should be used.
    */
    const reducer = (values, action) => {
        switch (action.type) {
            case 'add':
                return [...values, action.value];
            case 'remove': {
                const idx = values.indexOf(action.value);
                return [...values.slice(0, idx), ...values.slice(idx + 1, values.length)];
            }
            default:
                throw new Error(`Unhandled action type ${(action.type: empty)}`);
        }
    };

    const Provider = ({children}: ProviderProps) => {
        React.useEffect(() => {
            if (!isProviderInstanceMounted) {
                isProviderInstanceMounted = true;
            } else {
                throw new Error('Provider is already mounted. Only one instance is allowed.');
            }

            return () => {
                if (isProviderInstanceMounted) {
                    isProviderInstanceMounted = false;
                }
            };
        }, []);

        const [values, dispatch] = React.useReducer<Array<Value>, Action<Value>>(reducer, []);
        let computedValue: Value = defaultValue;
        if (values.length) {
            if (isObject(values[0])) {
                computedValue = Object.assign({}, defaultValue, ...values);
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

    const useSetValue = (value) => {
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

    const Getter = ({children}: {children: (value: Value) => React.Node}) => children(useValue());

    return {Setter, Provider, Getter, useSetValue, useValue};
};

export default createNestableContext;
