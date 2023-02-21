import * as React from 'react';
import Tag from './tag';
import Stack from './stack';
import Box from './box';
import {Text2, Text3, Text4, Text6} from './text';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import {Boxed, InternalBoxed} from './boxed';
import ButtonGroup from './button-group';
import Video from './video';
import Image, {DisableBorderRadiusProvider} from './image';
import MaybeDismissable, {useIsDismissable} from './maybe-dismissable';
import {BaseTouchable} from './touchable';
import {vars} from './skins/skin-contract.css';
import * as styles from './card.css';
import {useTheme} from './hooks';
import {sprinkles} from './sprinkles.css';
import Inline from './inline';
import IconButton from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';

import type {ExclusifyUnion} from './utils/utility-types';
import type {
    DataAttributes,
    IconProps,
    RendersElement,
    RendersNullableElement,
    TrackingEvent,
} from './utils/types';

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
            <div>
                <Stack space={8}>
                    {(headline || pretitle || title || subtitle) && (
                        <header>
                            <Stack space={8}>
                                {renderHeadline()}
                                <Stack space={4}>
                                    {pretitle && (
                                        <Text2 truncate={pretitleLinesMax} as="div" regular>
                                            {pretitle}
                                        </Text2>
                                    )}
                                    <Text4 truncate={titleLinesMax} as="h3" regular>
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
            </div>

            {(button || buttonLink) && (
                <div className={styles.actions}>
                    <ButtonGroup primaryButton={button} link={buttonLink} />
                </div>
            )}
        </div>
    );
};

const HasActionsContext = React.createContext<boolean>(false);

type MaybeSectionProps = {
    children: React.ReactNode;
    'aria-label'?: string;
    className?: string;
    style?: React.CSSProperties;
};

const MaybeSection = ({'aria-label': ariaLabel, className, style, children}: MaybeSectionProps) => {
    const isDismissable = useIsDismissable();
    const hasActions = React.useContext(HasActionsContext);
    if (isDismissable || hasActions) {
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    } else {
        return (
            <section className={className} style={style} aria-label={ariaLabel}>
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
                    dataAttributes={{'component-name': 'MediaCard', ...dataAttributes}}
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
                    dataAttributes={{'component-name': 'DataCard', ...dataAttributes}}
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
                dataAttributes={{'component-name': 'SnapCard', ...dataAttributes}}
                ref={ref}
                isInverse={isInverse}
                width="100%"
                height="100%"
            >
                <BaseTouchable
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
                                    <Text2 truncate={titleLinesMax} as="h3" regular>
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
                        {extra && <div>{extra}</div>}
                    </section>
                </BaseTouchable>
            </Boxed>
        );
    }
);

type CardAction = {
    label: string;
    onPress: () => void;
    Icon: React.FC<IconProps>;
};

type CardActionsGroupProps = {
    actions: Array<CardAction>;
    isInverse?: boolean;
};

const CardActionsGroup = ({actions, isInverse}: CardActionsGroupProps): JSX.Element => {
    return (
        <Inline space={0}>
            {actions.map(({onPress, label, Icon}, index) => (
                <IconButton
                    size={48}
                    key={index}
                    onPress={onPress}
                    aria-label={label}
                    className={styles.cardActionIconButton}
                    style={{display: 'flex'}}
                >
                    <div className={isInverse ? styles.cardActionInverse : styles.cardAction}>
                        <Icon color={vars.colors.neutralHigh} />
                    </div>
                </IconButton>
            ))}
        </Inline>
    );
};

type MaybeWithActionsProps = {
    children: React.ReactNode;
    width?: string;
    actions?: Array<CardAction>;
    onClose?: () => void;
    isInverse?: boolean;
    'aria-label'?: string;
};

const MaybeWithActions = ({
    children,
    width,
    actions,
    onClose,
    isInverse,
    'aria-label': ariaLabel,
}: MaybeWithActionsProps): JSX.Element => {
    const {texts} = useTheme();
    const finalActions = actions ? [...actions] : [];
    if (onClose) {
        finalActions.push({
            label: texts.closeButtonLabel,
            onPress: onClose,
            Icon: IconCloseRegular,
        });
    }

    if (!finalActions.length) {
        return <>{children}</>;
    }

    return (
        <section aria-label={ariaLabel} style={{width: width || '100%', position: 'relative'}}>
            <HasActionsContext.Provider value>{children}</HasActionsContext.Provider>
            <div style={{position: 'absolute', right: 8, top: 8}}>
                <CardActionsGroup actions={finalActions} isInverse={isInverse} />
            </div>
        </section>
    );
};

interface CommonDisplayCardProps {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement;
    actions?: Array<CardAction>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
    headline?: React.ReactComponentElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title: string;
    titleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    button?: React.ReactComponentElement<typeof ButtonPrimary>;
    secondaryButton?: React.ReactComponentElement<typeof ButtonSecondary>;
    buttonLink?: React.ReactComponentElement<typeof ButtonLink>;
    'aria-label'?: string;
}

interface DisplayMediaCardProps extends CommonDisplayCardProps {
    backgroundImage?: string;
}

interface DisplayDataCardProps extends CommonDisplayCardProps {
    extra?: React.ReactNode;
    isInverse?: boolean;
}

type GenericDisplayCardProps = ExclusifyUnion<
    (DisplayMediaCardProps & {isInverse: true}) | DisplayDataCardProps
>;

const DisplayCard = React.forwardRef<HTMLDivElement, GenericDisplayCardProps>(
    (
        {
            isInverse,
            backgroundImage,
            icon,
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            button,
            secondaryButton,
            onClose,
            actions,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        return (
            <MaybeWithActions
                onClose={onClose}
                actions={actions}
                aria-label={ariaLabel}
                isInverse={isInverse}
            >
                <InternalBoxed
                    borderRadius={16}
                    className={styles.boxed}
                    dataAttributes={dataAttributes}
                    ref={ref}
                    width="100%"
                    height="100%"
                    isInverse={isInverse}
                >
                    <MaybeSection
                        className={styles.displayCard}
                        style={{
                            backgroundImage: backgroundImage
                                ? `url("${CSS.escape(backgroundImage)}")`
                                : undefined,
                        }}
                        aria-label={ariaLabel}
                    >
                        {icon ? (
                            <Box paddingBottom={40} paddingX={24}>
                                {icon}
                            </Box>
                        ) : (
                            <Box paddingBottom={actions?.length || onClose ? 64 : 0} />
                        )}
                        <Box
                            paddingX={24}
                            paddingBottom={24}
                            className={backgroundImage ? styles.displayCardGradient : undefined}
                        >
                            <Stack space={24}>
                                <Stack space={0}>
                                    <Stack space={8}>
                                        {(headline || pretitle || title) && (
                                            <header>
                                                <Stack space={16}>
                                                    {headline}
                                                    <Stack space={4}>
                                                        {pretitle && (
                                                            <Text2
                                                                forceMobileSizes
                                                                truncate={pretitleLinesMax}
                                                                as="div"
                                                                regular
                                                            >
                                                                {pretitle}
                                                            </Text2>
                                                        )}
                                                        <Text6
                                                            forceMobileSizes
                                                            truncate={titleLinesMax}
                                                            as="h3"
                                                        >
                                                            {title}
                                                        </Text6>
                                                    </Stack>
                                                </Stack>
                                            </header>
                                        )}

                                        {description && (
                                            <Text3
                                                forceMobileSizes
                                                truncate={descriptionLinesMax}
                                                as="p"
                                                regular
                                                color={vars.colors.textSecondary}
                                            >
                                                {description}
                                            </Text3>
                                        )}
                                    </Stack>
                                    {extra}
                                </Stack>
                                {(button || secondaryButton || buttonLink) && (
                                    <ButtonGroup
                                        primaryButton={button}
                                        secondaryButton={secondaryButton}
                                        link={buttonLink}
                                    />
                                )}
                            </Stack>
                        </Box>
                    </MaybeSection>
                </InternalBoxed>
            </MaybeWithActions>
        );
    }
);

export const DisplayMediaCard = React.forwardRef<HTMLDivElement, DisplayMediaCardProps>(
    ({dataAttributes, ...props}, ref) => (
        <DisplayCard
            {...props}
            ref={ref}
            isInverse
            dataAttributes={{...dataAttributes, 'component-name': 'DisplayMediaCard'}}
        />
    )
);

export const DisplayDataCard = React.forwardRef<HTMLDivElement, DisplayDataCardProps>(
    ({dataAttributes, ...props}, ref) => (
        <DisplayCard
            {...props}
            ref={ref}
            dataAttributes={{...dataAttributes, 'component-name': 'DisplayDataCard'}}
        />
    )
);
