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
    /** @deprecated use variant */
    isInverse?: boolean;
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
    extraAlignment?: SlotAlignment;
    /** @deprecated use slot */
    extra?: React.ReactNode;
    slot?: React.ReactNode;
    slotAlignment?: SlotAlignment;
    aspectRatio?: CardAspectRatio;
    /** @deprecated use buttonPrimary or buttonSecondary */
    button?: CardActionButtonPrimary;
    buttonPrimary?: CardActionButtonPrimary;
    buttonSecondary?: CardActionButtonSecondary;
    buttonLink?: CardActionButtonLink;
    onClose?: () => unknown;
    closeButtonLabel?: string;
    /** @deprecated use topActions */
    actions?: TopActionsArray;
    topActions?: TopActionsArray;
    showFooter?: boolean;
    footerBackgroundColor?: string;
    footerVariant?: 'default' | 'inverse';
    footerSlot?: React.ReactNode;
};

export const DataCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<DataCardProps>>(
    (
        {
            dataAttributes,
            size = 'default',
            button,
            buttonPrimary,
            extra,
            slot,
            actions,
            topActions,
            isInverse,
            variant,
            ...rest
        },
        ref
    ) => {
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
                buttonPrimary={buttonPrimary || button}
                topActions={topActions || actions}
                slot={slot || extra}
                variant={variant || (isInverse ? 'inverse' : 'default') || 'default'}
                {...rest}
            />
        );
    }
);

type FixedSizeDataCardProps = Omit<DataCardProps, 'size'>;

/**
 * @deprecated use <Datacard size="snap" /> instead
 */
export const SnapCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<FixedSizeDataCardProps>>(
    ({dataAttributes, slotAlignment = 'bottom', ...rest}, ref) => {
        return (
            <DataCard
                size="snap"
                dataAttributes={{
                    'component-name': 'SnapCard',
                    testid: 'SnapCard',
                    ...dataAttributes,
                }}
                ref={ref}
                slotAlignment={slotAlignment}
                {...rest}
            />
        );
    }
);

type DisplayDataCardProps = FixedSizeDataCardProps & {
    /** @deprecated use buttonSecondary */
    secondaryButton?: CardActionButtonPrimary;
};

/**
 * @deprecated use <Datacard size="display" /> instead
 */
export const DisplayDataCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<DisplayDataCardProps>>(
    ({dataAttributes, buttonSecondary, slotAlignment = 'bottom', secondaryButton, ...rest}, ref) => {
        return (
            <DataCard
                size="display"
                dataAttributes={{
                    'component-name': 'DisplayDataCard',
                    testid: 'DisplayDataCard',
                    ...dataAttributes,
                }}
                buttonSecondary={buttonSecondary || secondaryButton}
                slotAlignment={slotAlignment}
                ref={ref}
                {...rest}
            />
        );
    }
);
