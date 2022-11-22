import * as React from 'react';
import Tag from './tag';
import Stack from './stack';
import Box from './box';
import {Text1, Text2, Text4} from './text';
import {ButtonLink, ButtonPrimary} from './button';
import {Boxed} from './boxed';
import ButtonGroup from './button-group';
import Video from './video';
import Image, {DisableBorderRadiusProvider} from './image';
import MaybeDismissable, {useIsDismissable} from './maybe-dismissable';
import Touchable from './touchable';
import {vars} from './skins/skin-contract.css';
import * as styles from './card.css';
import {useTheme} from './hooks';
import {sprinkles} from './sprinkles.css';

import type {DataAttributes, RendersElement, RendersNullableElement, TrackingEvent} from './utils/types';

type CardContentProps = {
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    pretitle,
    pretitleLinesMax,
    title,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    extra,
    button,
    buttonLink,
}) => {
    const renderHeadline = () => {
        if (!headline) {
            return null;
        }
        if (typeof headline === 'string') {
            return <Tag type="promo">{headline}</Tag>;
        }
        return headline;
    };
    return (
        <div
            className={sprinkles({
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
            })}
        >
            <Stack space={16}>
                <Stack space={8}>
                    {(headline || pretitle || title || subtitle) && (
                        <header>
                            <Stack space={8}>
                                {renderHeadline()}
                                <Stack space={4}>
                                    {pretitle && (
                                        <Text1
                                            truncate={pretitleLinesMax}
                                            as="div"
                                            regular
                                            transform="uppercase"
                                        >
                                            {pretitle}
                                        </Text1>
                                    )}
                                    <Text4 truncate={titleLinesMax} as="h1" regular>
                                        {title}
                                    </Text4>
                                    <Text2 truncate={subtitleLinesMax} as="div" regular>
                                        {subtitle}
                                    </Text2>
                                </Stack>
                            </Stack>
                        </header>
                    )}

                    {description && (
                        <Text2
                            truncate={descriptionLinesMax}
                            as="p"
                            regular
                            color={vars.colors.textSecondary}
                        >
                            {description}
                        </Text2>
                    )}
                </Stack>

                {extra && <div>{extra}</div>}
            </Stack>

            {(button || buttonLink) && (
                <div className={styles.actions}>
                    <ButtonGroup primaryButton={button} link={buttonLink} />
                </div>
            )}
        </div>
    );
};

type MaybeSectionProps = {
    children: React.ReactNode;
    'aria-label'?: string;
    className?: string;
};

const MaybeSection = ({'aria-label': ariaLabel, className, children}: MaybeSectionProps) => {
    const isDismissable = useIsDismissable();
    if (isDismissable) {
        return <div className={className}>{children}</div>;
    } else {
        return (
            <section className={className} aria-label={ariaLabel}>
                {children}
            </section>
        );
    }
};

type MediaCardProps = {
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    children?: void;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    onClose?: () => void;
};

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
    (
        {
            media,
            headline,
            pretitle,
            pretitleLinesMax,
            subtitle,
            subtitleLinesMax,
            title,
            titleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        return (
            <MaybeDismissable onClose={onClose} aria-label={ariaLabel}>
                <Boxed
                    className={styles.boxed}
                    dataAttributes={dataAttributes}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <MaybeSection className={styles.mediaCard} aria-label={ariaLabel}>
                        <DisableBorderRadiusProvider>{media}</DisableBorderRadiusProvider>
                        <div className={styles.mediaCardContent}>
                            <CardContent
                                headline={headline}
                                pretitle={pretitle}
                                pretitleLinesMax={pretitleLinesMax}
                                title={title}
                                titleLinesMax={titleLinesMax}
                                subtitle={subtitle}
                                subtitleLinesMax={subtitleLinesMax}
                                description={description}
                                descriptionLinesMax={descriptionLinesMax}
                                extra={extra}
                                button={button}
                                buttonLink={buttonLink}
                            />
                        </div>
                    </MaybeSection>
                </Boxed>
            </MaybeDismissable>
        );
    }
);

interface DataCardProps {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    children?: void;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    onClose?: () => void;
}

export const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
    (
        {
            icon,
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        return (
            <MaybeDismissable aria-label={ariaLabel} onClose={onClose}>
                <Boxed
                    className={styles.boxed}
                    dataAttributes={dataAttributes}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <MaybeSection className={styles.dataCard} aria-label={ariaLabel}>
                        {icon && <Box paddingBottom={16}>{icon}</Box>}
                        <CardContent
                            headline={headline}
                            pretitle={pretitle}
                            pretitleLinesMax={pretitleLinesMax}
                            title={title}
                            titleLinesMax={titleLinesMax}
                            subtitle={subtitle}
                            subtitleLinesMax={subtitleLinesMax}
                            description={description}
                            descriptionLinesMax={descriptionLinesMax}
                            extra={extra}
                            button={button}
                            buttonLink={buttonLink}
                        />
                    </MaybeSection>
                </Boxed>
            </MaybeDismissable>
        );
    }
);

interface SnapCardBaseProps {
    icon?: React.ReactElement;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    extra?: React.ReactNode;
    isInverse?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    children?: void;
}

interface SnapCardToProps extends SnapCardBaseProps {
    to?: string;
    fullPageOnWebView?: boolean;
    href?: undefined;
    onPress?: undefined;
}

interface SnapCardHrefProps extends SnapCardBaseProps {
    href?: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
}

interface SnapCardOnPressProps extends SnapCardBaseProps {
    onPress?: () => void;
    href?: undefined;
    to?: undefined;
}

type SnapCardProps = SnapCardToProps | SnapCardHrefProps | SnapCardOnPressProps;

export const SnapCard = React.forwardRef<HTMLDivElement, SnapCardProps>(
    (
        {
            icon,
            title,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            dataAttributes,
            'aria-label': ariaLabel,
            extra,
            isInverse = false,
            ...touchableProps
        },
        ref
    ) => {
        const {isDarkMode} = useTheme();
        const isTouchable = Boolean(touchableProps.to || touchableProps.href || touchableProps.onPress);

        return (
            <Boxed
                className={styles.boxed}
                dataAttributes={dataAttributes}
                ref={ref}
                isInverse={isInverse}
                width="100%"
                height="100%"
            >
                <Touchable
                    maybe
                    {...touchableProps}
                    className={
                        // @todo: define hover background color for inverse and for dark mode
                        isTouchable && !isInverse && !isDarkMode
                            ? styles.snapCardTouchableHover
                            : styles.snapCardTouchableHoverTransparent
                    }
                    aria-label={ariaLabel}
                >
                    <section className={styles.snapCard}>
                        <div>
                            {icon && <Box paddingBottom={16}>{icon}</Box>}
                            <Stack space={4}>
                                {title && (
                                    <Text2 truncate={titleLinesMax} as="h1" regular>
                                        {title}
                                    </Text2>
                                )}
                                {subtitle && (
                                    <Text2
                                        truncate={subtitleLinesMax}
                                        regular
                                        color={vars.colors.textSecondary}
                                        as="p"
                                    >
                                        {subtitle}
                                    </Text2>
                                )}
                            </Stack>
                        </div>
                        {extra && <Box paddingTop={16}>{extra}</Box>}
                    </section>
                </Touchable>
            </Boxed>
        );
    }
);
