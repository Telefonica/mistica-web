import * as React from 'react';
import {createNestableContext} from '../nestable-context';

const Transition = ({a, b}: {a: React.ReactNode; b: React.ReactNode}) => {
    const [isAVisible, setAVisible] = React.useState(true);
    const [isBVisible, setBVisible] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            setBVisible(true);
        }, 1);
        setTimeout(() => {
            setAVisible(false);
        }, 2);
    }, []);

    return (
        <>
            {isAVisible && a}
            {isBVisible && b}
        </>
    );
};
export const Scenario1 = (): JSX.Element => {
    const {Provider, Getter, Setter} = createNestableContext<string>('nothing');
    return (
        <Provider>
            <Getter>{(value) => <span>{`The value is: ${value}`}</span>}</Getter>
            <Setter value="something" />
        </Provider>
    );
};
export const Scenario2 = (): JSX.Element => {
    const {Provider, Getter, Setter} = createNestableContext<string>('nothing');
    const A = () => {
        const [isVisible, setIsVisible] = React.useState(true);

        return (
            <>
                {isVisible && <Setter value="a" />}
                <button onClick={() => setIsVisible(!isVisible)}>toggle</button>
            </>
        );
    };
    return (
        <Provider>
            <Getter>{(value) => <span>{`The value is: ${value}`}</span>}</Getter>
            <A />
        </Provider>
    );
};
export const Scenario3 = (): JSX.Element => {
    const {Provider, Getter, Setter} = createNestableContext<string>('nothing');
    const A = () => {
        const [isVisible, setIsVisible] = React.useState(true);

        return (
            <>
                {isVisible && <Setter value="a" />}
                <button onClick={() => setIsVisible(!isVisible)}>toggle</button>
            </>
        );
    };
    const B = () => <Setter value="b" />;
    return (
        <Provider>
            <Getter>{(value) => <span>{`The value is: ${value}`}</span>}</Getter>
            <B />
            <A />
        </Provider>
    );
};
export const Scenario4 = (): JSX.Element => {
    const {Provider, Getter, Setter} = createNestableContext<string>('nothing');
    const C = () => <Setter value="c" />;
    const B = () => (
        <>
            <Setter value="b" />
            <C />
        </>
    );
    const A = () => (
        <>
            <Setter value="a" />
            <B />
        </>
    );
    return (
        <Provider>
            <Getter>{(value) => <span>{`The value is: ${value}`}</span>}</Getter>
            <A />
        </Provider>
    );
};
export const Scenario5 = (): JSX.Element => {
    const {Provider, Getter, Setter} = createNestableContext<string>('nothing');
    return (
        <Provider>
            <Getter>{(value) => <span>{`The value is: ${value}`}</span>}</Getter>
            <Transition a={<Setter value="a" />} b={<Setter value="b" />} />
        </Provider>
    );
};
export const Scenario6 = (): JSX.Element => {
    type Value = {foo?: string; bar?: string};
    const {Provider, Getter, Setter} = createNestableContext<Value>({});
    const C = () => <Setter value={{bar: 'c'}} />;
    const B = () => (
        <>
            <Setter value={{bar: 'b'}} />
            <C />
        </>
    );
    const A = () => (
        <>
            <Setter value={{foo: 'a'}} />
            <B />
        </>
    );
    return (
        <Provider>
            <Getter>{({foo, bar}) => `foo is ${foo} and bar is ${bar}`}</Getter>
            <A />
        </Provider>
    );
};
export const Scenario7 = (): JSX.Element => {
    type Value = {foo?: string; bar?: string; reset?: boolean};
    const valuesReducer = (values: Array<Value>): Value => {
        return values.reduce((acc, value) => {
            if (value.reset) {
                return value;
            }
            return {...acc, ...value};
        }, {});
    };
    const {Provider, Getter, Setter} = createNestableContext<Value>({}, valuesReducer);
    const C = () => <Setter value={{bar: 'c'}} />;
    const B = () => (
        <>
            <Setter value={{bar: 'b', reset: true}} />
            <C />
        </>
    );
    const A = () => (
        <>
            <Setter value={{foo: 'a'}} />
            <B />
        </>
    );
    return (
        <Provider>
            <Getter>{({foo, bar}) => `foo is ${foo} and bar is ${bar}`}</Getter>
            <A />
        </Provider>
    );
};
