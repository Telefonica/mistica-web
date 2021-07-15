import * as React from 'react';
import {createUseStyles} from './jss';

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
    span4: {
        [theme.mq.desktopOrBigger]: {
            gridColumn: 'span 4',
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
}));

type PropsChildren = {
    template?: undefined;
    children: React.ReactNode;
};

type PropsTemplate6_6 = {
    template: '6+6';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
};

type PropsTemplate8_4 = {
    template: '8+4';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
};

type PropsTemplate4_6 = {
    template: '4+6';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
};

type Props = PropsChildren | PropsTemplate6_6 | PropsTemplate8_4 | PropsTemplate4_6;

const GridLayout: React.FC<Props> = (props) => {
    const classes = useStyles();

    if (props.template === '6+6') {
        return (
            <div className={classes.grid}>
                <div className={classes.span6}>{props.left}</div>
                <div className={classes.span6}>{props.right}</div>
            </div>
        );
    }

    if (props.template === '8+4') {
        return (
            <div className={classes.grid}>
                <div className={classes.span8}>{props.left}</div>
                <div className={classes.span4}>{props.right}</div>
            </div>
        );
    }

    if (props.template === '4+6') {
        return (
            <div className={classes.grid}>
                <div className={classes.span4}>{props.left}</div>
                <div className={classes.span1} />
                <div className={classes.span6}>{props.right}</div>
                <div className={classes.span1} />
            </div>
        );
    }

    return <div className={classes.grid}>{props.children}</div>;
};

export default GridLayout;
