import * as React from 'react';
import {Boxed} from '../boxed';
import {sprinkles} from '../sprinkles.css';
import Stack from '../stack';
import * as styles from './advanced-data-card.css';
import Divider from '../divider';
import {Text2, Text4} from '../text';
import {useTheme} from '../hooks';
import {vars} from '../skins/skin-contract.css';
import IconCloseRegular from '../generated/mistica-icons/icon-close-regular';
import IconButton from '../icon-button';
import Inline from '../inline';
import Box from '../box';
import Touchable from '../touchable';
import classNames from 'classnames';

import type StackingGroup from '../stacking-group';
import type Image from '../image';
import type {ButtonPrimary, ButtonLink} from '../button';
import type {DataAttributes, IconProps} from '../utils/types';
import type {RendersNullableElement} from '../utils/renders-element';
import type Tag from '../tag';

type CardAction = {
    label: string;
    onPress: () => void;
    Icon?: React.FC<IconProps>;
    iconSize?: number;
    iconColor?: string;
    iconBackground?: string;
    iconBackgroundInverse?: string;
};

type CardActionsGroupProps = {
    actions: Array<CardAction>;
    isInverse?: boolean;
};

const CardActionsGroup = ({actions, isInverse}: CardActionsGroupProps): JSX.Element => {
    return (
        <Inline space={0}>
            {actions.map(
                (
                    {
                        onPress,
                        label,
                        Icon,
                        iconSize = 20,
                        iconColor = vars.colors.neutralHigh,
                        iconBackground = styles.cardAction,
                        iconBackgroundInverse = styles.cardActionInverse,
                    },
                    index
                ) =>
                    Icon ? (
                        <IconButton
                            size={48}
                            key={index}
                            onPress={onPress}
                            aria-label={label}
                            className={styles.cardActionIconButton}
                            style={{display: 'flex'}}
                        >
                            <div className={isInverse ? iconBackgroundInverse : iconBackground}>
                                <Icon color={iconColor} size={iconSize} />
                            </div>
                        </IconButton>
                    ) : (
                        <div key={index} className={styles.cardActionIconButton} />
                    )
            )}
        </Inline>
    );
};

const useTopActions = (actions?: Array<CardAction>, onClose?: () => void) => {
    const {texts} = useTheme();
    const finalActions = actions ? [...actions] : [];

    if (onClose) {
        finalActions.push({
            label: texts.closeButtonLabel,
            onPress: onClose,
            Icon: IconCloseRegular,
        });
    }

    return finalActions;
};

type CardContentProps = {
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleAs?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleAs?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    pretitle,
    pretitleAs = 'p',
    pretitleLinesMax,
    title,
    titleAs = 'h3',
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
}) => {
    return (
        <div>
            <Stack space={4}>
                {(headline || pretitle || title || subtitle) && (
                    <header>
                        <Stack space={4}>
                            {headline}
                            <Stack space={4}>
                                {pretitle && (
                                    <Text2
                                        color={vars.colors.textPrimary}
                                        truncate={pretitleLinesMax}
                                        as={pretitleAs}
                                        regular
                                        hyphens="auto"
                                    >
                                        {pretitle}
                                    </Text2>
                                )}
                                <Text4
                                    color={vars.colors.textPrimary}
                                    truncate={titleLinesMax}
                                    weight="regular"
                                    as={titleAs}
                                    hyphens="auto"
                                >
                                    {title}
                                </Text4>
                                <Text2
                                    color={vars.colors.textPrimary}
                                    truncate={subtitleLinesMax}
                                    as="p"
                                    regular
                                    hyphens="auto"
                                >
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
                        hyphens="auto"
                    >
                        {description}
                    </Text2>
                )}
            </Stack>
        </div>
    );
};

type CardFooterProps = {
    button?: RendersNullableElement<typeof ButtonPrimary>;
    footerImage?: RendersNullableElement<typeof Image>;
    footerText?: string;
    footerTextLinesMax?: number;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardFooter: React.FC<CardFooterProps> = ({
    button,
    footerImage,
    footerText,
    footerTextLinesMax,
    buttonLink,
}) => {
    const hasButton = !!button;
    const hasFooterImage = !!footerImage;
    const hasFooterText = !!footerText;
    const hasButtonLink = !!buttonLink;
    const hasAllItens = hasButton && (hasFooterImage || hasFooterText) && hasButtonLink;

    const maxWidth = hasButtonLink && !hasAllItens ? '178px' : '';

    return (
        <div>
            <div className={styles.adjustmentDivider}>
                <Divider />
            </div>

            <div
                className={classNames(
                    styles.actions,
                    styles.actionsVariants[hasAllItens ? 'mobile' : 'default']
                )}
            >
                {hasButton && (
                    <div
                        tabIndex={-1}
                        className={classNames(
                            sprinkles({
                                display: 'flex',
                            }),
                            styles.marginTopButton
                        )}
                        style={{
                            marginRight: '16px',
                            position: 'relative',
                        }}
                    >
                        {button}
                    </div>
                )}
                <div
                    className={hasAllItens ? styles.marginRightAuto : ''}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: hasAllItens ? 8 : 16,
                        flexWrap: 'wrap',
                    }}
                >
                    {hasFooterImage && (
                        <div
                            style={{marginRight: '16px'}}
                            className={sprinkles({alignItems: 'center', display: 'flex'})}
                        >
                            {footerImage}
                        </div>
                    )}

                    {hasFooterText && (
                        <div style={{maxWidth}} className={styles.footerText}>
                            <Text2 truncate={footerTextLinesMax} regular>
                                {footerText}
                            </Text2>
                        </div>
                    )}
                </div>
                {hasButtonLink && (
                    <div
                        tabIndex={-1}
                        className={classNames(
                            sprinkles({
                                display: 'flex',
                            }),
                            hasAllItens ? styles.marginTop : styles.marginTopButton
                        )}
                        style={{
                            position: 'relative',
                            marginLeft: -12,
                            marginRight: -12,
                        }}
                    >
                        {buttonLink}
                    </div>
                )}
            </div>
        </div>
    );
};

type ExtraTypeof = typeof StackingGroup;

type TextAs = 'h1' | 'h2' | 'h3' | 'h4';

interface AdvancedDataCardProps {
    onPress?: () => void;
    stackingGroup?: RendersNullableElement<typeof StackingGroup>;
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    pretitleAs?: TextAs;
    title?: string;
    titleLinesMax?: number;
    titleAs?: TextAs;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: Array<RendersNullableElement<ExtraTypeof>>;
    smallSlotSpace?: boolean;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    footerImage?: RendersNullableElement<typeof Image>;
    footerText?: string;
    footerTextLinesMax?: number;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
    actions?: Array<CardAction>;
    'aria-label'?: string;
    onClose?: () => void;
}

export const AdvancedDataCard = React.forwardRef<HTMLDivElement, AdvancedDataCardProps>(
    (
        {
            onPress,

            stackingGroup,
            headline,
            pretitle,
            pretitleAs,
            pretitleLinesMax,
            title,
            titleAs,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,

            extra,
            smallSlotSpace,

            button,
            footerImage,
            footerText,
            footerTextLinesMax,
            buttonLink,

            dataAttributes,
            actions,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        const finalActions = useTopActions(actions, onClose);
        const hasAcations = finalActions?.length > 0;

        const footerProps = {button, footerImage, footerText, footerTextLinesMax, buttonLink};

        const extraSpaceSize = smallSlotSpace ? 8 : 24;

        const topActionsStylesWithIcon = {position: 'absolute', top: 8, right: 8, zIndex: 2} as const;

        const hasFooter = !!button || !!footerImage || !!footerText || !!buttonLink;

        return (
            <section
                aria-label={ariaLabel}
                className={sprinkles({
                    position: 'relative',
                    height: '100%',
                })}
            >
                <Boxed
                    className={styles.boxed}
                    dataAttributes={{'component-name': 'AdvancedDataCard', ...dataAttributes}}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <div className={styles.dataCard}>
                        <Touchable
                            onPress={onPress}
                            tabIndex={0}
                            maybe
                            className={sprinkles({
                                position: 'relative',
                                height: '100%',
                            })}
                        >
                            <div className={onPress ? styles.interaction : ''}>
                                <div
                                    className={classNames(
                                        styles.cardContentStyle,
                                        !hasFooter && !extra ? styles.minHeight : ''
                                    )}
                                >
                                    <div
                                        className={sprinkles({
                                            paddingTop: 8,
                                        })}
                                    >
                                        <Stack space={8} className={sprinkles({flex: 1})}>
                                            {stackingGroup && (
                                                <div
                                                    className={sprinkles({
                                                        display: 'flex',
                                                        width: '100%',
                                                    })}
                                                >
                                                    <div
                                                        className={sprinkles({
                                                            width: '100%',
                                                        })}
                                                    >
                                                        {stackingGroup}
                                                    </div>
                                                </div>
                                            )}
                                            <CardContent
                                                headline={headline}
                                                pretitle={pretitle}
                                                pretitleAs={pretitleAs}
                                                pretitleLinesMax={pretitleLinesMax}
                                                title={title}
                                                titleAs={titleAs}
                                                titleLinesMax={titleLinesMax}
                                                subtitle={subtitle}
                                                subtitleLinesMax={subtitleLinesMax}
                                                description={description}
                                                descriptionLinesMax={descriptionLinesMax}
                                            />
                                        </Stack>
                                    </div>
                                    {hasAcations && (
                                        <div style={topActionsStylesWithIcon}>
                                            <CardActionsGroup actions={finalActions} />
                                        </div>
                                    )}
                                </div>
                                <div style={{marginTop: 'auto', width: '100%'}}>
                                    {extra && extra?.length ? (
                                        <Box paddingTop={16} paddingBottom={24}>
                                            {extra.map((ex, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div
                                                            className={sprinkles({
                                                                display: 'flex',
                                                                width: '100%',
                                                            })}
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    sprinkles({width: '100%'}),
                                                                    styles.paddingX
                                                                )}
                                                            >
                                                                {ex}
                                                            </div>
                                                        </div>

                                                        {index + 1 !== extra.length && (
                                                            <Box paddingY={extraSpaceSize}>
                                                                <Divider />
                                                            </Box>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </Box>
                                    ) : null}
                                </div>
                            </div>
                        </Touchable>
                        {hasFooter && <CardFooter {...footerProps} />}
                    </div>
                </Boxed>
            </section>
        );
    }
);

export default AdvancedDataCard;
