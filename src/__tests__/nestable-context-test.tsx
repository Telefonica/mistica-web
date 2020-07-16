import * as React from 'react';
import createContext from '../nestable-context';
import {render, fireEvent, screen} from '@testing-library/react';

test('happy case', () => {
    const {Provider, Getter, Setter} = createContext<string>('nothing');

    render(
        <Provider>
            <Getter>{(value) => `The value is: ${value}`}</Getter>
            <Setter value="something" />
        </Provider>
    );

    expect(screen.getByText('The value is: something')).toBeInTheDocument();
});

test('When unmount, the default value is restored', async () => {
    const {Provider, Getter, Setter} = createContext<string>('nothing');

    const A = () => {
        const [isVisible, setIsVisible] = React.useState(true);

        return (
            <>
                {isVisible && <Setter value="a" />}
                <button onClick={() => setIsVisible(!isVisible)}>toggle</button>
            </>
        );
    };

    render(
        <Provider>
            <Getter>{(value) => `The value is: ${value}`}</Getter>
            <A />
        </Provider>
    );

    expect(screen.getByText('The value is: a')).toBeInTheDocument();
    fireEvent.click(screen.getByText('toggle'));
    expect(await screen.findByText('The value is: nothing')).toBeInTheDocument();
});

test('When unmount, the previous value is restored', async () => {
    const {Provider, Getter, Setter} = createContext<string>('nothing');

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

    render(
        <Provider>
            <Getter>{(value) => `The value is: ${value}`}</Getter>
            <B />
            <A />
        </Provider>
    );

    expect(screen.getByText('The value is: a')).toBeInTheDocument();
    fireEvent.click(screen.getByText('toggle'));
    expect(await screen.findByText('The value is: b')).toBeInTheDocument();
});

test('when nesting, the innermost component wins', () => {
    const {Provider, Getter, Setter} = createContext<string>('nothing');

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

    render(
        <Provider>
            <Getter>{(value) => `The value is: ${value}`}</Getter>
            <A />
        </Provider>
    );

    expect(screen.getByText('The value is: c')).toBeInTheDocument();
});

// This component simulates what a transition component does.
// First renders A, then A + B, then only B
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

test('works as expected with transitions', async () => {
    const {Provider, Getter, Setter} = createContext<string>('nothing');

    render(
        <Provider>
            <Getter>{(value) => `The value is: ${value}`}</Getter>
            <Transition a={<Setter value="a" />} b={<Setter value="b" />} />
        </Provider>
    );

    expect(await screen.findByText('The value is: b')).toBeInTheDocument();
});
