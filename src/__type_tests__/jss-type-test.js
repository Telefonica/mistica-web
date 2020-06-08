// @flow
/**
 * This file is just to verify the types in jss module work fine when used to style components.
 * You may see warnings/errors in this file if you touch jss types. Those errors/warnings may
 * be indicative of a bad typing.
 */

import * as React from 'react';
import {createSheet, withSheet, createUseStyles} from '../jss';

const sheet = createSheet({
    a: {color: 'blue'},
});

type Props = {
    n: number,
    s: string,
    classes: typeof sheet,
};

const C = ({n, s, classes}: Props) => (
    <div className={classes.a}>
        {n} and {s}
        {/* $ExpectError missing property 'missingClass' */}
        <div className={classes.missingClass}>no</div>
    </div>
);

let i;

// OK
i = <C classes={{a: 'c'}} n={1} s="a" />;
// $ExpectError s should be a string
i = <C classes={{a: 'c'}} n={1} s={2} />;
// $ExpectError n should be a number
i = <C classes={{a: 'c'}} n="1" s="a" />;

const SC = withSheet(sheet)(C);
// OK
i = <SC n={1} s="a" />;
// $ExpectError s should be a string
i = <SC n={1} s={2} />;
// $ExpectError n should be a number
i = <SC n="1" s="a" />;

const useStyles = createUseStyles(() => ({
    a: {color: 'blue'},
}));

const C2 = () => {
    const classes = useStyles();
    (classes.a: string);
    return <div className={classes.a} />;
};

const useStylesWithoutA = createUseStyles(() => ({
    b: {color: 'blue'},
}));

const C3 = () => {
    const classes = useStylesWithoutA();
    return (
        <>
            {/* $ExpectError the 'a' class is missing */}
            <div className={classes.a} />
            <div className={classes.b} />
        </>
    );
};

type C4Props = {color: string};

const useStylesWithProps = createUseStyles(() => ({
    a: {
        // $ExpectError
        color: ({color}) => (color: string),
        // $ExpectError unknownProp is missing in C4Props
        background: ({unknownProp}) => unknownProp,
    },
}));

const C4 = (props: C4Props) => {
    useStylesWithProps();
    useStylesWithProps({foo: 1});
    const classes = useStylesWithProps(props);
    return <div className={classes.a} />;
};

type C5Props = {color: string};
type Theme = {white: string};

const useStylesWithTheme = createUseStyles((theme) => ({
    a: {
        // $ExpectError
        color: ({color}) => (color: string),
        // $ExpectError unknownProp is missing in C5Props
        background: ({unknownProp}) => unknownProp,
        backgroundColor: theme.colors.background,
        // $ExpectError unknown is missing in theme.colors
        borderColor: theme.colors.unknown,
    },
}));

const C5 = (props: C5Props) => {
    useStylesWithTheme();
    useStylesWithTheme({foo: 1});

    const classes = useStylesWithTheme(props);
    return <div className={classes.a} />;
};
