import * as React from 'react';
import {InternalCard} from './card-internal';

import type {MediaCardProps} from './card-media';
import type {MaybeTouchableCard} from './card-internal';

export const NakedCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<MediaCardProps>>(
    (
        {
            size = 'default',
            slot,
            extra,
            topActions,
            actions,
            button,
            primaryAction,
            buttonLink,
            secondaryAction,
            dataAttributes,
            ...rest
        },
        ref
    ) => {
        return (
            <InternalCard
                dataAttributes={{'component-name': 'MediaCard', testid: 'MediaCard'}}
                type="naked"
                size={size}
                slot={slot || extra}
                topActions={topActions || actions}
                primaryAction={primaryAction || button}
                secondaryAction={secondaryAction || buttonLink}
                ref={ref}
                {...rest}
            />
        );
    }
);

type NakedCardProps = Omit<MediaCardProps, 'size'>;

/**
 * @deprecated use <NakedCard size="snap" /> instead
 */
export const SmallNakedCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<NakedCardProps>>(
    ({...rest}, ref) => {
        return <NakedCard size="snap" ref={ref} {...rest} />;
    }
);
