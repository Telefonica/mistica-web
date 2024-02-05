'use client';
import * as React from 'react';
import {BaseTooltip} from './tooltip';
import Inline from './inline';
import Stack from './stack';
import {Text2, Text3} from './text';
import Box from './box';
import * as styles from './popover.css';
import {vars as skinVars} from './skins/skin-contract.css';

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
    title,
    description,
    asset,
    ...props
}) => {
    return (
        <BaseTooltip
            content={
                <Box className={styles.content}>
                    <Stack space={4}>
                        {(title || description || asset) && (
                            <Box paddingRight={16}>
                                <Inline space={16}>
                                    {asset}
                                    <Stack space={4}>
                                        {title && <Text3 regular>{title}</Text3>}
                                        {description && (
                                            <Text2 regular color={skinVars.colors.textSecondary}>
                                                {description}
                                            </Text2>
                                        )}
                                    </Stack>
                                </Inline>
                            </Box>
                        )}

                        {extra ?? children}
                    </Stack>
                </Box>
            }
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
