import * as React from 'react';
import {InternalCard} from './card-internal';

import type {Variant} from './theme-variant-context';
import type {
    CardSize,
    SlotAlignment,
    CardAspectRatio,
    TopActionsArray,
    MaybeTouchableCard,
    CardActionButtonLink,
    CardActionButtonPrimary,
    CardActionButtonSecondary,
} from './card-internal';
import type Tag from './tag';
import type {RendersNullableElement} from './utils/renders-element';
import type {HeadingType, DataAttributes} from './utils/types';

type DataCardProps = {
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
    size?: CardSize;
    width?: number | string;
    height?: number | string;
    backgroundColor?: string;
    variant?: Variant;
    asset?: React.ReactElement;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleAs?: HeadingType;
    pretitleLinesMax?: number;
    title?: string;
    titleAs?: HeadingType;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    dataAttributes?: DataAttributes;
    slot?: React.ReactNode;
    slotAlignment?: SlotAlignment;
    aspectRatio?: CardAspectRatio;
    buttonPrimary?: CardActionButtonPrimary;
    buttonSecondary?: CardActionButtonSecondary;
    buttonLink?: CardActionButtonLink;
    onClose?: () => unknown;
    closeButtonLabel?: string;
    topActions?: TopActionsArray;
    showFooter?: boolean;
    footerBackgroundColor?: string;
    footerVariant?: 'default' | 'brand' | 'inverse';
    footerSlot?: React.ReactNode;
    footerDivider?: boolean;
};

export const DataCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<DataCardProps>>(
    ({dataAttributes, size = 'default', buttonPrimary, slot, topActions, variant, ...rest}, ref) => {
        return (
            <InternalCard
                type="data"
                size={size}
                dataAttributes={{
                    'component-name': 'DataCard',
                    testid: 'DataCard',
                    ...dataAttributes,
                }}
                ref={ref}
                buttonPrimary={buttonPrimary}
                topActions={topActions}
                slot={slot}
                variant={variant || 'default'}
                {...rest}
            />
        );
    }
);
