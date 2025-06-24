'use client';
import * as React from 'react';
import * as styles from './cards2.css';
import {Text} from './text';
import {useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
import Tag from './tag';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes, HeadingType, RendersNullableElement, TrackingEvent} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';
import type {PressHandler} from './touchable';

export type AspectRatio = '1:1' | '16:9' | '7:10' | '9:10' | 'auto';

type CardSize = 'snap' | 'default' | 'display';

type ContainerProps = {
    cardSize: CardSize;
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
};

type TextContentProps = {
    headline?: string | RendersNullableElement<typeof Tag>;
    cardSize: CardSize;
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
};

type AssetProps = {
    cardSize: CardSize;
    asset?: React.ReactElement;
};

type CardProps = {
    // container props
    cardSize: CardSize;
    dataAttributes?: DataAttributes;

    // asset props
    asset?: React.ReactElement;

    // text content props
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
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({children, cardSize, dataAttributes}, ref): JSX.Element => {
        return (
            <div
                ref={ref}
                className={styles.containerVariants[cardSize]}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                {children}
            </div>
        );
    }
);

const Asset = ({cardSize, asset}: AssetProps): JSX.Element | null => {
    if (!asset) {
        return null;
    }

    // Content-Follows Spacing
    if (cardSize === 'snap') {
        return (
            <div data-testid="asset" style={{paddingBottom: 16}}>
                {asset}
            </div>
        );
    }

    return null;
};

const TextContent = ({
    cardSize: size,
    headline,
    title,
    titleAs = 'h3',
    titleLinesMax,
    pretitle,
    pretitleAs,
    pretitleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
}: TextContentProps): JSX.Element => {
    const {textPresets, colorValues} = useTheme();
    const themeVariant = useThemeVariant();

    const commonProps = {
        hyphens: 'auto',
    } as const;

    const colorVariants = {
        default: {
            pretitle: colorValues.textPrimary,
            title: colorValues.textPrimary,
            subtitle: colorValues.textPrimary,
            description: colorValues.textSecondary,
        },
        inverse: {
            pretitle: colorValues.textPrimaryInverse,
            title: colorValues.textPrimaryInverse,
            subtitle: colorValues.textPrimaryInverse,
            description: colorValues.textSecondaryInverse,
        },
        media: {
            pretitle: colorValues.textPrimaryInverse,
            title: colorValues.textPrimaryInverse,
            subtitle: colorValues.textPrimaryInverse,
            description: colorValues.textSecondaryInverse,
        },
    } as const;

    const textVariants = {
        snap: {
            pretitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            title: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: textPresets.cardTitle.weight,
            },
            subtitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            description: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
        },
        default: {
            pretitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            title: {
                mobileSize: textPresets.text4.size.mobile,
                desktopSize: textPresets.text4.size.desktop,
                mobileLineHeight: textPresets.text4.lineHeight.mobile,
                desktopLineHeight: textPresets.text4.lineHeight.desktop,
                weight: textPresets.cardTitle.weight,
            },
            subtitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            description: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
        },
        display: {
            pretitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            title: {
                mobileSize: textPresets.text6.size.mobile,
                desktopSize: textPresets.text6.size.desktop,
                mobileLineHeight: textPresets.text6.lineHeight.mobile,
                desktopLineHeight: textPresets.text6.lineHeight.desktop,
                weight: textPresets.text6.weight,
            },
            subtitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            description: {
                mobileSize: textPresets.text3.size.mobile,
                desktopSize: textPresets.text3.size.desktop,
                mobileLineHeight: textPresets.text3.lineHeight.mobile,
                desktopLineHeight: textPresets.text3.lineHeight.desktop,
                weight: 'regular',
            },
        },
    } as const;

    const colors = colorVariants[themeVariant as keyof typeof colorVariants] || colorVariants.default;
    const textVariant = textVariants[size] || textVariants.default;

    return (
        <div>
            {headline && (
                <div style={{paddingBottom: size === 'display' ? 16 : 8}} data-testid="headline">
                    {typeof headline === 'string' ? <Tag type="promo">{headline}</Tag> : headline}
                </div>
            )}
            {pretitle && (
                <div style={{paddingBottom: 4}} data-testid="pretitle">
                    <Text
                        {...commonProps}
                        {...textVariant.pretitle}
                        as={pretitleAs || 'p'}
                        truncate={pretitleLinesMax}
                        color={colors.pretitle}
                    >
                        {pretitle}
                    </Text>
                </div>
            )}
            {title && (
                <div style={{paddingBottom: 4}} data-testid="title">
                    <Text
                        {...commonProps}
                        {...textVariant.title}
                        as={titleAs}
                        truncate={titleLinesMax}
                        color={colors.title}
                    >
                        {title}
                    </Text>
                </div>
            )}
            {subtitle && (
                <div style={{paddingBottom: 0}} data-testid="subtitle">
                    <Text
                        {...commonProps}
                        {...textVariant.subtitle}
                        as="p"
                        truncate={subtitleLinesMax}
                        color={colors.subtitle}
                    >
                        {subtitle}
                    </Text>
                </div>
            )}
            {description && (
                <div style={{paddingTop: 4}} data-testid="description">
                    <Text
                        {...commonProps}
                        {...textVariant.description}
                        as="p"
                        truncate={descriptionLinesMax}
                        color={colors.description}
                    >
                        {description}
                    </Text>
                </div>
            )}
        </div>
    );
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            cardSize,
            asset,
            headline,
            title,
            titleAs = 'h3',
            titleLinesMax,
            pretitle,
            pretitleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            dataAttributes,
        },
        ref
    ): JSX.Element => {
        return (
            <Container cardSize={cardSize} dataAttributes={dataAttributes} ref={ref}>
                <Asset cardSize={cardSize} asset={asset} />
                <TextContent
                    cardSize={cardSize}
                    headline={headline}
                    pretitle={pretitle}
                    pretitleLinesMax={pretitleLinesMax}
                    title={title}
                    titleAs={titleAs}
                    titleLinesMax={titleLinesMax}
                    subtitle={subtitle}
                    subtitleLinesMax={subtitleLinesMax}
                    description={description}
                    descriptionLinesMax={descriptionLinesMax}
                />
            </Container>
        );
    }
);

Card.displayName = 'Card';

export default Card;

type TouchableProps = {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    role?: string;
    'aria-current'?: React.AriaAttributes['aria-current'];
} & ExclusifyUnion<
    | {
          href: string | undefined;
          newTab?: boolean;
          loadOnTop?: boolean;
          onNavigate?: () => void | Promise<void>;
      }
    | {
          to: string | undefined;
          newTab?: boolean;
          fullPageOnWebView?: boolean;
          replace?: boolean;
          onNavigate?: () => void | Promise<void>;
      }
    | {onPress: PressHandler | undefined}
>;

type TouchableCard<T> = T & TouchableProps;
type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

type SnapCardProps = MaybeTouchableCard<{
    asset?: React.ReactElement;
    title?: string;
    titleAs?: HeadingType;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    extra?: React.ReactNode;
    isInverse?: boolean;
    aspectRatio?: AspectRatio | number;
    children?: void;
}>;

export const SnapCard = React.forwardRef<HTMLDivElement, SnapCardProps>(
    (
        {
            asset,
            title,
            titleAs = 'h3',
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            dataAttributes,
            // 'aria-label': ariaLabelProp,
            // 'aria-labelledby': ariaLabeledByProp,
            // 'aria-description': ariaDescriptionProp,
            // 'aria-describedby': ariaDescribedByProp,
            // extra,
            // isInverse = false,
            // aspectRatio,
            // ...touchableProps
        },
        ref
    ) => {
        return (
            <Card
                cardSize="snap"
                ref={ref}
                asset={asset}
                title={title}
                titleAs={titleAs}
                titleLinesMax={titleLinesMax}
                subtitle={subtitle}
                subtitleLinesMax={subtitleLinesMax}
                description={description}
                descriptionLinesMax={descriptionLinesMax}
                dataAttributes={{'component-name': 'SnapCard', testid: 'SnapCard', ...dataAttributes}}
                // aria-label={ariaLabelProp}
                // aria-labelledby={ariaLabeledByProp}
                // aria-description={ariaDescriptionProp}
                // aria-describedby={ariaDescribedByProp}
                // extra={extra}
                // isInverse={isInverse}
                // aspectRatio={aspectRatio}
                // {...touchableProps}
            />
        );
    }
);
