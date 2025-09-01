import * as React from 'react';
import {InternalCard} from './card-internal';

import type {MediaCardProps} from './card-media';
import type {MaybeTouchableCard} from './card-internal';

type NakedCardProps = Omit<MediaCardProps, 'footerBackgroundColor'>;

export const NakedCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<NakedCardProps>>(
    (
        {size = 'default', slot, extra, topActions, actions, button, buttonPrimary, dataAttributes, ...rest},
        ref
    ) => {
        return (
            <InternalCard
                dataAttributes={{
                    'component-name': 'NakedCard',
                    testid: 'NakedCard',
                    ...dataAttributes,
                }}
                variant="default"
                type="naked"
                size={size}
                slot={slot || extra}
                topActions={topActions || actions}
                buttonPrimary={buttonPrimary || button}
                ref={ref}
                {...rest}
            />
        );
    }
);

type SmallNakedCardProps = Omit<NakedCardProps, 'size'>;

/**
 * @deprecated use <NakedCard size="snap" /> instead
 */
export const SmallNakedCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<SmallNakedCardProps>>(
    ({dataAttributes, slotAlignment = 'bottom', ...rest}, ref) => {
        return (
            <NakedCard
                dataAttributes={{
                    'component-name': 'SmallNakedCard',
                    testid: 'SmallNakedCard',
                    ...dataAttributes,
                }}
                slotAlignment={slotAlignment}
                size="snap"
                ref={ref}
                {...rest}
            />
        );
    }
);
