'use client';
import * as React from 'react';
import {BaseTooltip} from './tooltip';

import type {TrackingEvent, DataAttributes} from './utils/types';

type Position = 'top' | 'bottom' | 'left' | 'right';

type Props = {
    description?: string;
    target: React.ReactNode;
    title?: string;
    asset?: React.ReactNode;
    onClose?: () => void;
    position?: Position;
    width?: number;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    open?: boolean;
    children?: React.ReactNode;
    extra?: React.ReactNode;
    dataAttributes?: DataAttributes;
    /**
     * @deprecated This field is deprecated, use open instead.
     */
    isVisible?: boolean;
};

const Popover: React.FC<Props> = ({
    open,
    isVisible,
    extra,
    children,
    onClose = () => {},
    dataAttributes,
    trackingEvent,
    ...props
}) => {
    return (
        <BaseTooltip
            content={extra ?? children}
            centerContent={false}
            open={open ?? isVisible}
            hasPointerInteractionOnly
            delay={false}
            onClose={onClose}
            trackingEvent={trackingEvent}
            dataAttributes={{'component-name': 'Popover', ...dataAttributes}}
            {...props}
        />
    );
};

export default Popover;
