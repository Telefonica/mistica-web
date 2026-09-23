'use client';
import * as React from 'react';
import {InternalCard} from './card-internal';
import {useRawThemeVariant} from './theme-variant-context';

import type {MediaCardProps} from './card-media';
import type {CardInteractionProps} from './card-internal';

type NakedCardProps = Omit<MediaCardProps, 'footerBackgroundColor' | 'variant' | 'footerVariant'>;

export const NakedCard = React.forwardRef<HTMLDivElement, CardInteractionProps<NakedCardProps>>(
    ({size = 'default', slot, buttonPrimary, dataAttributes, ...rest}, ref) => {
        const variant = useRawThemeVariant();
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
                buttonPrimary={buttonPrimary}
                ref={ref}
                {...rest}
            />
        );
    }
);
