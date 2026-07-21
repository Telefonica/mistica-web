'use client';
import * as React from 'react';
import {InternalCard} from './card-internal';
import {useThemeVariant} from './theme-variant-context';

import type {MediaCardProps} from './card-media';
import type {MaybeTouchableCard} from './card-internal';

type NakedCardProps = Omit<MediaCardProps, 'footerBackgroundColor' | 'variant' | 'footerVariant'>;

export const NakedCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<NakedCardProps>>(
    ({size = 'default', slot, topActions, buttonPrimary, dataAttributes, ...rest}, ref) => {
        const variant = useThemeVariant();
        return (
            <InternalCard
                dataAttributes={{
                    testid: 'NakedCard',
                    ...dataAttributes,
                }}
                variant={variant}
                type="naked"
                size={size}
                slot={slot}
                topActions={topActions}
                buttonPrimary={buttonPrimary}
                ref={ref}
                {...rest}
            />
        );
    }
);
