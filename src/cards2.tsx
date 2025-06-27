// spec: https://www.figma.com/design/tKdPOfcUALzVIh5oizFbm7
'use client';
import * as React from 'react';
import * as styles from './cards2.css';
import {Text} from './text';
import {useInnerText, useTheme} from './hooks';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import Tag from './tag';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {Boxed} from './boxed';
import {BaseTouchable, type PressHandler} from './touchable';
import {aspectRatioToNumber} from './utils/aspect-ratio-support';
import classnames from 'classnames';
import {vars as skinVars} from './skins/skin-contract.css';
import Stack from './stack';
import Inline from './inline';
import {IconButton, ToggleIconButton} from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import * as tokens from './text-tokens';

import type {
    DataAttributes,
    HeadingType,
    IconProps,
    RendersNullableElement,
    TrackingEvent,
} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';

export type AspectRatio = '1:1' | '16:9' | '7:10' | '9:10' | 'auto' | number;

type CardType = 'snap' | 'default' | 'display';
type ActionButton =
    | RendersNullableElement<typeof ButtonPrimary>
    | RendersNullableElement<typeof ButtonSecondary>
    | RendersNullableElement<typeof ButtonLink>
    | undefined;

export type SlotAlignment = 'content' | 'bottom';

type ContainerProps = {
    type: CardType;
    isInverse?: boolean;
    width?: string | number;
    height?: string | number;
    aspectRatio?: AspectRatio;
    children?: React.ReactNode;
    dataAttributes?: DataAttributes;
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
    onClose?: () => void;
    closeButtonLabel?: string;
};

type TextContentProps = {
    type: CardType;
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

type AssetProps = {
    type: CardType;
    asset?: React.ReactElement;
};

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

type SlotProps = {
    slot?: React.ReactNode;
    slotAlignment?: SlotAlignment;
};

type CardProps = ContainerProps &
    TextContentProps &
    AssetProps &
    TouchableProps &
    ActionsProps &
    TopActionsProps &
    SlotProps &
    FooterProps;

type TouchableCard<T> = T & TouchableProps;
type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            children,
            width,
            height,
            aspectRatio,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            'aria-description': ariaDescription,
            'aria-describedby': ariaDescribedby,
            dataAttributes,
            isInverse,
        },
        ref
    ): JSX.Element => {
        const aspectRatioValue = width && height ? undefined : aspectRatioToNumber(aspectRatio);
        const aspectRatioStyle = aspectRatioValue
            ? applyCssVars({[styles.vars.aspectRatio]: String(aspectRatioValue)})
            : {};

        return (
            // aria-description should be vaild, but this eslint rule is complaining about it
            // eslint-disable-next-line jsx-a11y/role-supports-aria-props
            <section
                ref={ref}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                aria-description={ariaDescription}
                aria-describedby={ariaDescribedby}
                className={classnames(styles.container)}
                {...getPrefixedDataAttributes(dataAttributes)}
                style={{
                    width: width || '100%',
                    height: height || '100%',
                    ...aspectRatioStyle,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        position: 'relative',
                        minHeight: '100%',
                    }}
                >
                    <Boxed
                        // Without setting the width here, the component fails to get the correct width in some cases
                        // even if we set the 100% width style in the boxed class
                        width="100%"
                        height="100%"
                        variant={isInverse ? 'inverse' : 'default'}
                        className={classnames(styles.boxed)}
                    >
                        {children}
                    </Boxed>
                </div>
            </section>
        );
    }
);

const Filler = () => <div style={{flexGrow: 1}} />;

const Asset = ({type, asset}: AssetProps): JSX.Element | null => {
    if (!asset) {
        return null;
    }

    // Content-Follows Spacing (mode C according to specs)
    if (type === 'snap' || type === 'default') {
        return (
            <div data-testid="asset" style={{paddingBottom: 16}}>
                {asset}
            </div>
        );
    }

    return null;
};

type FooterProps = {
    type: CardType;
    isInverse?: boolean;
    showFooter?: boolean;
    footerSlot?: React.ReactNode;
};

const Footer = ({
    type,
    isInverse,
    footerSlot,
    primaryAction,
    secondaryAction,
}: FooterProps & ActionsProps): JSX.Element => {
    const hasActions = !!(primaryAction || secondaryAction);
    return (
        <>
            <Filler />
            <div
                data-testid="footer"
                style={{
                    padding: `16px ${type === 'display' ? 24 : 16}px`,
                    borderTop: `1px solid ${isInverse ? skinVars.colors.dividerInverse : skinVars.colors.divider}`,
                }}
            >
                <Stack space={16}>
                    {footerSlot}
                    {hasActions && (
                        <Inline space="between" alignItems="center">
                            {primaryAction}
                            {secondaryAction}
                        </Inline>
                    )}
                </Stack>
            </div>
        </>
    );
};

type ActionsProps = {
    type: CardType;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
};

const Actions = ({type, primaryAction, secondaryAction}: ActionsProps): JSX.Element => {
    return (
        <div
            style={{
                paddingTop: type === 'display' ? 24 : 16,
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
            }}
        >
            {primaryAction}
            {secondaryAction}
        </div>
    );
};

type BaseIconButtonAction = {
    Icon: (props: IconProps) => JSX.Element;
    label: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    'aria-current'?: React.AriaAttributes['aria-current'];
};

type IconButtonAction = BaseIconButtonAction &
    ExclusifyUnion<
        | {href: string; newTab?: boolean}
        | {
              to: string;
              newTab?: boolean;
              fullPageOnWebView?: boolean;
              replace?: boolean;
          }
        | {onPress: () => void}
    >;

type ToggleIconButtonAction = {
    checkedProps: BaseIconButtonAction;
    uncheckedProps: BaseIconButtonAction;
    onChange?: (checked: boolean) => void | undefined | Promise<void>;
    checked?: boolean;
    defaultChecked?: boolean;
};

export type CardAction = {
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
} & ExclusifyUnion<IconButtonAction | ToggleIconButtonAction>;

type TopActionsArray = ReadonlyArray<CardAction | React.ReactElement>;

export const CardActionIconButton = (props: CardAction): JSX.Element => {
    const variant = useThemeVariant();

    if (props.Icon) {
        return <IconButton {...props} aria-label={props.label} type="neutral" backgroundType="transparent" />;
    }

    const {checkedProps, uncheckedProps, ...rest} = props;
    return (
        <ToggleIconButton
            {...rest}
            checkedProps={{
                ...checkedProps,
                'aria-label': props.checkedProps.label,
                type: variant === 'media' ? 'neutral' : 'brand',
                backgroundType: 'solid',
            }}
            uncheckedProps={{
                ...uncheckedProps,
                'aria-label': props.uncheckedProps.label,
                type: 'neutral',
                backgroundType: 'transparent',
            }}
        />
    );
};

type TopActionsProps = {
    type?: CardType;
    isInverse?: boolean;
    onClose?: () => void;
    closeButtonLabel?: string;
    topActions?: TopActionsArray;
};

const TopActions = ({onClose, closeButtonLabel, topActions, isInverse}: TopActionsProps): JSX.Element => {
    const {texts, t} = useTheme();
    const actions = topActions ? [...topActions] : [];

    if (onClose) {
        actions.push({
            label: closeButtonLabel || texts.closeButtonLabel || t(tokens.closeButtonLabel),
            onPress: onClose,
            Icon: IconCloseRegular,
        });
    }

    if (actions.length === 0) {
        return <></>;
    }

    // TODO: complete for other cases
    const variant = isInverse ? 'inverse' : 'default';

    return (
        <ThemeVariant variant={variant}>
            <div className={styles.topActionsContainer}>
                {actions.map((action, index) => {
                    if ('Icon' in action || 'checkedProps' in action) {
                        return <CardActionIconButton key={index} {...action} />;
                    }
                    return action;
                })}
            </div>
        </ThemeVariant>
    );
};

const TextContent = ({
    type: size,
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
            type,
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
            isInverse,
            width,
            height,
            aspectRatio,
            slot,
            slotAlignment = 'content',
            primaryAction,
            secondaryAction,
            showFooter,
            footerSlot,
            topActions,
            onClose,
            closeButtonLabel,
            ...touchableProps
        },
        ref
    ): JSX.Element => {
        const {text: slotText, ref: slotRef} = useInnerText();
        const hasActions = !!(primaryAction || secondaryAction);
        const hasAssetOrHeadline = !!(asset || headline);
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const overlayStyle = isInverse ? styles.touchableCardOverlayInverse : styles.touchableCardOverlay;
        const shouldShowFooter = showFooter && (hasActions || !!footerSlot);
        const showActionsInBody = !shouldShowFooter && hasActions;
        const topActionsLength = (topActions ? topActions.length : 0) + (onClose ? 1 : 0);

        console.log('TODO A11Y', {slotText, slotAlignment});

        return (
            <Container
                type={type}
                dataAttributes={dataAttributes}
                ref={ref}
                isInverse={isInverse}
                width={width}
                height={height}
                aspectRatio={aspectRatio}
            >
                <TopActions
                    onClose={onClose}
                    closeButtonLabel={closeButtonLabel}
                    topActions={topActions}
                    isInverse={isInverse}
                />
                <BaseTouchable
                    maybe
                    className={classnames(styles.touchable, styles.touchableContainer)}
                    {...touchableProps}
                >
                    {isTouchable && <div className={overlayStyle} />}
                    <div
                        data-testid="body"
                        className={classnames(styles.touchable, styles.containerPaddingsVariants[type])}
                        style={{
                            // with a footer, the bottom padding for the body is always 16px
                            paddingBottom: shouldShowFooter ? 16 : undefined,
                        }}
                    >
                        <div className={styles.contentContainer}>
                            <div className={styles.assetAndTextContent}>
                                <Asset type={type} asset={asset} />
                                <TextContent
                                    type={type}
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
                            </div>
                            {!hasAssetOrHeadline && (
                                <div style={{flexShrink: 0, width: topActionsLength * 48 - 16}} />
                            )}
                        </div>
                        {slotAlignment === 'bottom' && <Filler />}
                        {slot && (
                            <div ref={slotRef} data-testid="slot">
                                {slot}
                            </div>
                        )}
                        {slotAlignment === 'content' && showActionsInBody && <Filler />}
                        {showActionsInBody && (
                            <Actions
                                type={type}
                                primaryAction={primaryAction}
                                secondaryAction={secondaryAction}
                            />
                        )}
                    </div>
                </BaseTouchable>
                {shouldShowFooter && (
                    <Footer
                        isInverse={isInverse}
                        type={type}
                        footerSlot={footerSlot}
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                    />
                )}
            </Container>
        );
    }
);

type DataCardProps = {
    type?: CardType;
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
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
    extraAlignment?: SlotAlignment;
    /** @deprecated use slot */
    extra?: React.ReactNode;
    slot?: React.ReactNode;
    slotAlignment?: SlotAlignment;
    isInverse?: boolean;
    aspectRatio?: AspectRatio;
    children?: undefined;
    /** @deprecated use primaryAction */
    button?: ActionButton;
    /** @deprecated use secondaryAction */
    buttonLink?: ActionButton;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
    onClose?: () => void;
    closeButtonLabel?: string;
    /** @deprecated use topActions */
    actions?: TopActionsArray;
    topActions?: TopActionsArray;
    showFooter?: boolean;
    footerSlot?: React.ReactNode;
};

export const DataCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<DataCardProps>>(
    (
        {
            dataAttributes,
            type = 'default',
            // handle deprecations
            button,
            primaryAction,
            buttonLink,
            secondaryAction,
            extra,
            slot,
            actions,
            topActions,
            // pass through props
            ...rest
        },
        ref
    ) => {
        return (
            <Card
                type={type}
                dataAttributes={{
                    'component-name': 'DataCard',
                    testid: 'DataCard',
                    ...dataAttributes,
                }}
                ref={ref}
                primaryAction={primaryAction || button}
                secondaryAction={secondaryAction || buttonLink}
                topActions={topActions || actions}
                slot={slot || extra}
                {...rest}
            />
        );
    }
);

type SnapCardProps = Omit<DataCardProps, 'type'>;

/**
 * @deprecated use <Datacard type="snap" /> instead
 */
export const SnapCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<SnapCardProps>>(
    ({dataAttributes, ...rest}, ref) => {
        return (
            <DataCard
                type="snap"
                dataAttributes={{
                    'component-name': 'SnapCard',
                    testid: 'SnapCard',
                    ...dataAttributes,
                }}
                ref={ref}
                {...rest}
            />
        );
    }
);
