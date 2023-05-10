import * as React from 'react';
import {Boxed} from './boxed';
import {sprinkles} from './sprinkles.css';
import Stack from './stack';
import * as styles from './advanced-card.css';
import Image from './image';
import Divider from './divider';
import NegativeBox from './negative-box';
import Text, {Text2} from './text';
import Tag from './tag';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import Inline from './inline';

import type {RendersNullableElement} from './utils/renders-element';
import type {DataAttributes, IconProps} from './utils/types';
import type {ButtonPrimary, ButtonLink} from './button';

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
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
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
}) => {
    const {textPresets} = useTheme();
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
        <div>
            <Stack space={8}>
                {(headline || pretitle || title || subtitle) && (
                    <header>
                        <Stack space={8}>
                            {renderHeadline()}
                            <Stack space={4}>
                                {pretitle && (
                                    <Text2 truncate={pretitleLinesMax} as="div" regular hyphens="auto">
                                        {pretitle}
                                    </Text2>
                                )}
                                <Text
                                    mobileSize={18}
                                    mobileLineHeight="24px"
                                    desktopSize={20}
                                    desktopLineHeight="28px"
                                    truncate={titleLinesMax}
                                    weight={textPresets.cardTitle.weight}
                                    as="h3"
                                    hyphens="auto"
                                >
                                    {title}
                                </Text>
                                <Text2 truncate={subtitleLinesMax} as="div" regular hyphens="auto">
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

interface AdvancedCardProps {
    cardImage?: string;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;

    slot?: React.ReactNode;

    button?: RendersNullableElement<typeof ButtonPrimary>;
    footerImage?: string;
    footerText?: string;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;

    dataAttributes?: DataAttributes;
    actions?: Array<CardAction>;
    'aria-label'?: string;
    onClose?: () => void;
}

const AdvancedCard = React.forwardRef<HTMLDivElement, AdvancedCardProps>(
    (
        {
            cardImage,
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,

            slot,

            button,
            footerImage,
            footerText,
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
        const hascardImage = !!cardImage;
        const hasButton = !!button;
        const hasFooterImage = !!footerImage;
        const hasFooterText = !!footerText;
        const hasButtonLink = !!buttonLink;
        const hasFooter = hasButton || hasFooterImage || hasFooterText || hasButtonLink;

        const margin = {marginLeft: '16px'};
        const topActionsStylesWithIcon = {position: 'absolute', top: 8, right: 8, zIndex: 2} as const;

        return (
            <section aria-label={ariaLabel} style={{height: '100%', position: 'relative'}}>
                <Boxed
                    className={styles.boxed}
                    dataAttributes={{'component-name': 'DataCard', ...dataAttributes}}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <div className={styles.dataCard}>
                        <div
                            className={sprinkles({
                                display: 'flex',
                                paddingBottom: 8,
                            })}
                        >
                            <div
                                className={sprinkles({
                                    paddingTop: 8,
                                })}
                            >
                                <Stack space={16} className={sprinkles({flex: 1})}>
                                    {hascardImage ? <Image height={40} src={cardImage} /> : null}
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
                                    />
                                </Stack>
                            </div>
                            {hasAcations && (
                                <div style={topActionsStylesWithIcon}>
                                    <CardActionsGroup actions={finalActions} />
                                </div>
                            )}
                        </div>

                        <div
                            className={sprinkles({
                                paddingTop: 8,
                            })}
                        >
                            <div
                                className={sprinkles({
                                    paddingY: 24,
                                })}
                            >
                                {slot && <div>{slot}</div>}
                            </div>
                        </div>

                        {hasFooter && (
                            <NegativeBox>
                                <Divider />
                            </NegativeBox>
                        )}

                        <div className={styles.actions}>
                            {hasButton && button}
                            {hasFooterImage && (
                                <div
                                    style={hasButton ? margin : {}}
                                    className={sprinkles({alignItems: 'center', display: 'flex'})}
                                >
                                    <Image height={40} src={footerImage} />
                                </div>
                            )}
                            {hasFooterText && (
                                <div
                                    style={hasButton || hasFooterImage ? margin : {}}
                                    className={styles.footerText}
                                >
                                    <Text2 medium>{footerText}</Text2>
                                </div>
                            )}
                            {hasButtonLink && buttonLink}
                        </div>
                    </div>
                </Boxed>
            </section>
        );
    }
);

export default AdvancedCard;
