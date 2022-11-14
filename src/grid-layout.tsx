import * as React from 'react';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {useScreenSize} from './hooks';
import ContainerTypeContext from './container-type-context';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './grid-layout.css';

import type {ContainerType, DataAttributes} from './utils/types';

type VerticalSpace = 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

type PropsChildren = {
    template?: undefined;
    children: React.ReactNode;
    verticalSpace?: VerticalSpace;
    dataAttributes?: DataAttributes;
};

type PropsTemplate6_6 = {
    template: '6+6';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    verticalSpace?: VerticalSpace;
    dataAttributes?: DataAttributes;
};

type PropsTemplate8_4 = {
    template: '8+4';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    verticalSpace?: VerticalSpace;
    dataAttributes?: DataAttributes;
};

type PropsTemplate4_6 = {
    template: '4+6';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    verticalSpace?: VerticalSpace;
    dataAttributes?: DataAttributes;
};

type PropsTemplate5_4 = {
    template: '5+4';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    verticalSpace?: VerticalSpace;
    dataAttributes?: DataAttributes;
};

type PropsTemplate3_9 = {
    template: '3+9';
    left: React.ReactNode;
    right: React.ReactNode;
    children?: undefined;
    verticalSpace?: VerticalSpace;
    dataAttributes?: DataAttributes;
};

type PropsTemplate10 = {
    template: '10';
    children: React.ReactNode;
    verticalSpace?: VerticalSpace;
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
    const dataAttributes = getPrefixedDataAttributes(props.dataAttributes);
    const {isMobile, isTablet} = useScreenSize();

    const getContainerType = (containerType: ContainerType) =>
        isMobile ? 'mobile-column' : isTablet ? 'tablet-column' : containerType;

    const spanStyles = (n: number) => ({
        className: styles.span,
        style: assignInlineVars({[styles.colSpan]: String(n)}),
    });

    const gridStyles = {
        className: styles.grid,
        style: assignInlineVars({
            [styles.verticalSpace]: props.verticalSpace ? `${props.verticalSpace}px` : '',
        }),
    };

    if (props.template === '6+6') {
        return (
            <div {...gridStyles} {...dataAttributes}>
                <ContainerTypeContext.Provider value={getContainerType('desktop-medium-column')}>
                    <div {...spanStyles(6)}>{props.left}</div>
                </ContainerTypeContext.Provider>
                <ContainerTypeContext.Provider value={getContainerType('desktop-medium-column')}>
                    <div {...spanStyles(6)}>{props.right}</div>
                </ContainerTypeContext.Provider>
            </div>
        );
    }

    if (props.template === '8+4') {
        return (
            <div {...gridStyles} {...dataAttributes}>
                <ContainerTypeContext.Provider value={getContainerType('desktop-medium-column')}>
                    <div {...spanStyles(8)}>{props.left}</div>
                </ContainerTypeContext.Provider>
                <ContainerTypeContext.Provider value={getContainerType('desktop-small-column')}>
                    <div {...spanStyles(4)}>{props.right}</div>
                </ContainerTypeContext.Provider>
            </div>
        );
    }

    if (props.template === '4+6') {
        return (
            <div {...gridStyles} {...dataAttributes}>
                <ContainerTypeContext.Provider value={getContainerType('desktop-small-column')}>
                    <div {...spanStyles(4)}>{props.left}</div>
                </ContainerTypeContext.Provider>
                <div {...spanStyles(1)} />
                <ContainerTypeContext.Provider value={getContainerType('desktop-medium-column')}>
                    <div {...spanStyles(6)}>{props.right}</div>
                </ContainerTypeContext.Provider>
                <div {...spanStyles(1)} />
            </div>
        );
    }

    if (props.template === '5+4') {
        return (
            <div {...gridStyles} {...dataAttributes}>
                <div {...spanStyles(1)} />
                <ContainerTypeContext.Provider value={getContainerType('desktop-small-column')}>
                    <div {...spanStyles(5)}>{props.left}</div>
                </ContainerTypeContext.Provider>
                <div {...spanStyles(1)} />
                <ContainerTypeContext.Provider value={getContainerType('desktop-small-column')}>
                    <div {...spanStyles(4)}>{props.right}</div>
                </ContainerTypeContext.Provider>
                <div {...spanStyles(1)} />
            </div>
        );
    }

    if (props.template === '3+9') {
        return (
            <div {...gridStyles} {...dataAttributes}>
                <ContainerTypeContext.Provider value={getContainerType('desktop-small-column')}>
                    <div {...spanStyles(3)}>{props.left}</div>
                </ContainerTypeContext.Provider>
                <ContainerTypeContext.Provider value={getContainerType('desktop-medium-column')}>
                    <div {...spanStyles(9)}>{props.right}</div>
                </ContainerTypeContext.Provider>
            </div>
        );
    }

    if (props.template === '10') {
        return (
            <div {...gridStyles} {...dataAttributes}>
                <div {...spanStyles(1)} />
                <ContainerTypeContext.Provider value={getContainerType('desktop-wide-column')}>
                    <div {...spanStyles(10)}>{props.children}</div>
                </ContainerTypeContext.Provider>
                <div {...spanStyles(1)} />
            </div>
        );
    }

    return (
        <div {...gridStyles} {...dataAttributes}>
            {props.children}
        </div>
    );
};

export default GridLayout;
