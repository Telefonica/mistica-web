import * as React from 'react';
import {createUseStyles} from './jss';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    grid: {
        display: 'grid',
        [theme.mq.largeDesktop]: {
            gridColumnGap: 24,
            gridTemplateColumns: 'repeat(12, 1fr)',
        },
        [theme.mq.desktop]: {
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridColumnGap: 16,
        },
        [theme.mq.tablet]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            gridColumnGap: 16,
        },
        [theme.mq.mobile]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            gridColumnGap: 16,
        },
    },
    span1: {
        gridColumn: 'span 1',
    },
    span3: {
        [theme.mq.desktopOrBigger]: {
            gridColumn: 'span 3',
        },
        [theme.mq.tabletOrSmaller]: {
            gridColumn: 'span 1',
        },
    },
    span4: {
        [theme.mq.desktopOrBigger]: {
            gridColumn: 'span 4',
        },
        [theme.mq.tabletOrSmaller]: {
            gridColumn: 'span 1',
        },
    },
    span5: {
        [theme.mq.desktopOrBigger]: {
            gridColumn: 'span 5',
        },
        [theme.mq.tabletOrSmaller]: {
            gridColumn: 'span 1',
        },
    },
    span6: {
        [theme.mq.desktopOrBigger]: {
            gridColumn: 'span 6',
        },
        [theme.mq.tabletOrSmaller]: {
            gridColumn: 'span 1',
        },
    },
    span8: {
        [theme.mq.desktopOrBigger]: {
            gridColumn: 'span 8',
        },
        [theme.mq.tabletOrSmaller]: {
            gridColumn: 'span 1',
        },
    },
    span9: {
        [theme.mq.desktopOrBigger]: {
            gridColumn: 'span 9',
        },
        [theme.mq.tabletOrSmaller]: {
            gridColumn: 'span 1',
        },
    },
    span10: {
        [theme.mq.desktopOrBigger]: {
            gridColumn: 'span 10',
        },
        [theme.mq.tabletOrSmaller]: {
            gridColumn: 'span 1',
        },
    },
}));

type PropsChildren = {
    template?: undefined;
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
};

type PropsTemplate6_6 = {
    template: '6+6';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    dataAttributes?: DataAttributes;
};

type PropsTemplate8_4 = {
    template: '8+4';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    dataAttributes?: DataAttributes;
};

type PropsTemplate4_6 = {
    template: '4+6';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    dataAttributes?: DataAttributes;
};

type PropsTemplate5_4 = {
    template: '5+4';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    dataAttributes?: DataAttributes;
};

type PropsTemplate3_9 = {
    template: '3+9';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    dataAttributes?: DataAttributes;
};

type PropsTemplate10 = {
    template: '10';
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
};

type Props =
    | PropsChildren
    | PropsTemplate6_6
    | PropsTemplate8_4
    | PropsTemplate4_6
    | PropsTemplate5_4
    | PropsTemplate3_9
    | PropsTemplate10;

const GridLayout: React.FC<Props> = (props) => {
    const classes = useStyles();
    const dataAttributes = getPrefixedDataAttributes(props.dataAttributes);

    if (props.template === '6+6') {
        return (
            <div className={classes.grid} {...dataAttributes}>
                <div className={classes.span6}>{props.left}</div>
                <div className={classes.span6}>{props.right}</div>
            </div>
        );
    }

    if (props.template === '8+4') {
        return (
            <div className={classes.grid} {...dataAttributes}>
                <div className={classes.span8}>{props.left}</div>
                <div className={classes.span4}>{props.right}</div>
            </div>
        );
    }

    if (props.template === '4+6') {
        return (
            <div className={classes.grid} {...dataAttributes}>
                <div className={classes.span4}>{props.left}</div>
                <div className={classes.span1} />
                <div className={classes.span6}>{props.right}</div>
                <div className={classes.span1} />
            </div>
        );
    }

    if (props.template === '5+4') {
        return (
            <div className={classes.grid} {...dataAttributes}>
                <div className={classes.span1} />
                <div className={classes.span5}>{props.left}</div>
                <div className={classes.span1} />
                <div className={classes.span4}>{props.right}</div>
                <div className={classes.span1} />
            </div>
        );
    }

    if (props.template === '3+9') {
        return (
            <div className={classes.grid} {...dataAttributes}>
                <div className={classes.span3}>{props.left}</div>
                <div className={classes.span9}>{props.right}</div>
            </div>
        );
    }

    if (props.template === '10') {
        return (
            <div className={classes.grid} {...dataAttributes}>
                <div className={classes.span1} />
                <div className={classes.span10}>{props.children}</div>
                <div className={classes.span1} />
            </div>
        );
    }

    return (
        <div className={classes.grid} {...dataAttributes}>
            {props.children}
        </div>
    );
};

export default GridLayout;
