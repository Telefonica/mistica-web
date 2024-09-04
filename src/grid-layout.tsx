import * as React from 'react';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './grid-layout.css';
import classnames from 'classnames';
import DesktopContainerTypeContextProvider from './desktop-container-type-context';
import {applyCssVars} from './utils/css';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';

export type VerticalSpace = 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

type CommonProps = {
    verticalSpace?: VerticalSpace;
    collapseBreakpoint?: 'tablet' | 'mobile';
    dataAttributes?: DataAttributes;
};

type PropsChildren = {
    children: React.ReactNode;
};

type PropsTemplate6plus6 = {
    template: '6+6';
    left: React.ReactNode;
    right: React.ReactNode;
};

type PropsTemplate8plus4 = {
    template: '8+4';
    left: React.ReactNode;
    right: React.ReactNode;
};

type PropsTemplate4plus6 = {
    template: '4+6';
    left: React.ReactNode;
    right: React.ReactNode;
};

type PropsTemplate5plus4 = {
    template: '5+4';
    left: React.ReactNode;
    right: React.ReactNode;
};

type PropsTemplate3plus9 = {
    template: '3+9';
    left: React.ReactNode;
    right: React.ReactNode;
};

type PropsTemplate10 = {
    template: '10';
    children: React.ReactNode;
};

type PropsTemplate8 = {
    template: '8';
    children: React.ReactNode;
};

type Props = CommonProps &
    ExclusifyUnion<
        | PropsChildren
        | PropsTemplate6plus6
        | PropsTemplate8plus4
        | PropsTemplate4plus6
        | PropsTemplate5plus4
        | PropsTemplate3plus9
        | PropsTemplate10
        | PropsTemplate8
    >;

const GridLayout = ({
    dataAttributes,
    template,
    left,
    right,
    verticalSpace,
    collapseBreakpoint = 'tablet',
    children,
}: Props): JSX.Element => {
    const prefixedDataAttributes = getPrefixedDataAttributes(dataAttributes, 'GridLayout');

    const spanStyles = (n: number) => ({
        className: classnames(styles.span, {
            [styles.desktopLargeColumn]: n >= 10,
            [styles.desktopMediumColumn]: n > 5 && n < 10,
            [styles.desktopSmallColumn]: n <= 5,
        }),
        style: applyCssVars({[styles.vars.colSpan]: String(n)}),
    });

    const gridStyles = {
        className: classnames(styles.grid, {[styles.collapsedInTablet]: collapseBreakpoint === 'tablet'}),
        style: verticalSpace
            ? applyCssVars({
                  [styles.vars.verticalSpace]: `${verticalSpace}px`,
              })
            : undefined,
    };

    if (template === '6+6') {
        return (
            <div {...gridStyles} {...prefixedDataAttributes}>
                <DesktopContainerTypeContextProvider value="medium">
                    <div {...spanStyles(6)}>{left}</div>
                    <div {...spanStyles(6)}>{right}</div>
                </DesktopContainerTypeContextProvider>
            </div>
        );
    }

    if (template === '8+4') {
        return (
            <div {...gridStyles} {...prefixedDataAttributes}>
                <DesktopContainerTypeContextProvider value="medium">
                    <div {...spanStyles(8)}>{left}</div>
                </DesktopContainerTypeContextProvider>
                <DesktopContainerTypeContextProvider value="small">
                    <div {...spanStyles(4)}>{right}</div>
                </DesktopContainerTypeContextProvider>
            </div>
        );
    }

    if (template === '4+6') {
        return (
            <div {...gridStyles} {...prefixedDataAttributes}>
                <DesktopContainerTypeContextProvider value="small">
                    <div {...spanStyles(4)}>{left}</div>
                </DesktopContainerTypeContextProvider>
                <div {...spanStyles(1)} />
                <DesktopContainerTypeContextProvider value="medium">
                    <div {...spanStyles(6)}>{right}</div>
                </DesktopContainerTypeContextProvider>
                <div {...spanStyles(1)} />
            </div>
        );
    }

    if (template === '5+4') {
        return (
            <div {...gridStyles} {...prefixedDataAttributes}>
                <DesktopContainerTypeContextProvider value="small">
                    <div {...spanStyles(1)} />
                    <div {...spanStyles(5)}>{left}</div>
                    <div {...spanStyles(1)} />
                    <div {...spanStyles(4)}>{right}</div>
                    <div {...spanStyles(1)} />
                </DesktopContainerTypeContextProvider>
            </div>
        );
    }

    if (template === '3+9') {
        return (
            <div {...gridStyles} {...prefixedDataAttributes}>
                <DesktopContainerTypeContextProvider value="small">
                    <div {...spanStyles(3)}>{left}</div>
                </DesktopContainerTypeContextProvider>
                <DesktopContainerTypeContextProvider value="medium">
                    <div {...spanStyles(9)}>{right}</div>
                </DesktopContainerTypeContextProvider>
            </div>
        );
    }

    if (template === '10') {
        return (
            <div {...gridStyles} {...prefixedDataAttributes}>
                <div {...spanStyles(1)} />
                <DesktopContainerTypeContextProvider value="large">
                    <div {...spanStyles(10)}>{children}</div>
                </DesktopContainerTypeContextProvider>
                <div {...spanStyles(1)} />
            </div>
        );
    }

    if (template === '8') {
        return (
            <div {...gridStyles} {...prefixedDataAttributes}>
                <div {...spanStyles(2)} />
                <DesktopContainerTypeContextProvider value="medium">
                    <div {...spanStyles(8)}>{children}</div>
                </DesktopContainerTypeContextProvider>
                <div {...spanStyles(2)} />
            </div>
        );
    }

    return (
        <div {...gridStyles} {...prefixedDataAttributes}>
            {children}
        </div>
    );
};

export default GridLayout;
