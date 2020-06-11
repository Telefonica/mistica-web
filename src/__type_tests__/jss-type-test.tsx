/*
 * This file is just to verify the types in jss module work fine when used to style components.
 * You may see warnings/errors in this file if you touch jss types. Those errors/warnings may
 * be indicative of a bad typing.
 */

import * as React from 'react';
import {createSheet, withSheet, createUseStyles} from '../jss';

const sheet = createSheet({
    a: {color: 'blue'},
});

// sheet.a type is mapped to string
sheet.a.toLowerCase();
// @ts-expect-error b doesn't exist
sheet.b.toLowerCase();
// @ts-expect-error a.color no longer accessible
sheet.a.color;

type Props = {
    n: number;
    s: string;
    classes: typeof sheet;
};

const Component: React.FC<Props> = ({n, s, classes}) => (
    <div className={classes.a}>
        {n} and {s}
        <div
            // @ts-expect-error - missingClass does not exist in classes
            className={classes.missingClass}
        >
            no
        </div>
    </div>
);

let i;

// OK
i = <Component classes={{a: 'c'}} n={1} s="a" />;
// @ts-expect-error s should be a string
i = <Component classes={{a: 'c'}} n={1} s={2} />;
// @ts-expect-error n should be a number
i = <Component classes={{a: 'c'}} n="1" s="a" />;

const StyledComponent = withSheet(sheet)(Component);
// OK
i = <StyledComponent n={1} s="a" />;

i = (
    <StyledComponent
        n={1}
        // @ts-expect-error - s should be a string
        s={2}
    />
);

i = (
    <StyledComponent
        // @ts-expect-error - n should be a number
        n="1"
        s="a"
    />
);

// OK
i = <StyledComponent.WrappedComponent classes={{a: 'c'}} n={1} s="a" />;
// @ts-expect-error s should be a string
i = <StyledComponent.WrappedComponent classes={{a: 'c'}} n={1} s={2} />;
// @ts-expect-error n should be a number
i = <StyledComponent.WrappedComponent classes={{a: 'c'}} n="1" s="a" />;

const useStylesWithClassA = createUseStyles(() => ({
    a: {color: 'blue'},
}));

const ComponentUsesStylesWithClassA: React.FC = () => {
    const classes = useStylesWithClassA();
    classes.a as string;
    return <div className={classes.a} />;
};

const useStylesWithClassB = createUseStyles(() => ({
    b: {color: 'blue'},
}));

const ComponentUsesStylesWithClassB: React.FC = () => {
    const classes = useStylesWithClassB();
    return (
        <>
            <div
                // @ts-expect-error - class "a" does not exist
                className={classes.a}
            />
            <div className={classes.b} />
        </>
    );
};

const useStylesWithTheme = createUseStyles((theme) => ({
    a: {
        // OK
        backgroundColor: theme.colors.background,
        // @ts-expect-error - unknown property does not exist
        borderColor: theme.colors.unknown,
    },
}));

const ComponentUsesStylesWithTeme: React.FC = () => {
    const classes = useStylesWithTheme();
    return <div className={classes.a} />;
};

/**
 * Note: style props are typed as a "Record<string, any>"
 *
 * This is not ideal but TS lacks some features to allow this (or at least I was unable to do it better)
 * We can review createUseStyles typings when any of these issues get resolved:
 *
 * - https://github.com/Microsoft/TypeScript/issues/10571
 * - https://github.com/microsoft/TypeScript/issues/14400
 */
const useStylesWithProps = createUseStyles(() => ({
    a: {
        // "color" should be inferred as "string" but it is "any"
        color: ({color}) => color,
    },
    b: {
        '& > div': {
            // This should trigger an error because "unknown" is not passed to "useStyles" function
            color: ({unknown}) => unknown,
        },
    },
}));

const ComponentUsesStylesWithProps: React.FC = () => {
    const classes = useStylesWithProps({color: 'red'});

    return (
        <>
            <div className={classes.a} />
            <div className={classes.b} />
            <div
                // @ts-expect-error - class "c" does not exist
                className={classes.c}
            />
        </>
    );
};

const ComponentUsesStylesWithWrongProps: React.FC = () => {
    // @ts-expect-error - not an object
    useStylesWithProps('error');
    // @ts-expect-error - not an object
    useStylesWithProps(null);
    return <></>;
};
