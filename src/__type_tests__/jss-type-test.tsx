/*
 * This file is just to verify the types in jss module work fine when used to style components.
 * You may see warnings/errors in this file if you touch jss types. Those errors/warnings may
 * be indicative of a bad typing.
 */

import * as React from 'react';
import {createUseStyles} from '../jss';

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
