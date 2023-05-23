import * as React from 'react';
import {Boxed} from './boxed';
import {sprinkles} from './sprinkles.css';
import Stack from './stack';
import * as styles from './data-card-advanced.css';
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
import Touchable from './touchable';

import type {
    ValueBlock,
    InformationBlock,
    ProgressBlock,
    HighlightedValueBlock,
    RowBlock,
    SimpleBlock,
} from './advanced-slots';
import type {ButtonPrimary, ButtonLink} from './button';
import type {DataAttributes, IconProps} from './utils/types';
import type {RendersNullableElement} from './utils/renders-element';

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
            <Stack space={4}>
                {(headline || pretitle || title || subtitle) && (
                    <header>
                        <Stack space={4}>
                            {renderHeadline()}
                            <Stack space={4}>
                                {pretitle && (
                                    <Text2
                                        color={vars.colors.textPrimary}
                                        truncate={pretitleLinesMax}
                                        as="div"
                                        regular
                                        hyphens="auto"
                                    >
                                        {pretitle}
                                    </Text2>
                                )}
                                <Text
                                    color={vars.colors.textPrimary}
                                    mobileSize={20}
                                    mobileLineHeight="28px"
                                    desktopSize={20}
                                    desktopLineHeight="28px"
                                    truncate={titleLinesMax}
                                    weight={textPresets.cardTitle.weight}
                                    as="h3"
                                    hyphens="auto"
                                >
                                    {title}
                                </Text>
                                <Text2
                                    color={vars.colors.textPrimary}
                                    truncate={subtitleLinesMax}
                                    as="div"
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
    footerImage?: string;
    footerText?: string;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardFooter: React.FC<CardFooterProps> = ({button, footerImage, footerText, buttonLink}) => {
    const hasButton = !!button;
    const hasFooterImage = !!footerImage;
    const hasFooterText = !!footerText;
    const hasButtonLink = !!buttonLink;

    const margin = {marginLeft: '16px'};
    return (
        <div>
            <NegativeBox>
                <Divider />
            </NegativeBox>

            <div className={styles.actions}>
                {hasButton && (
                    <div
                        aria-hidden="true"
                        className={sprinkles({
                            display: 'flex',
                        })}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {button}
                    </div>
                )}
                {hasFooterImage && (
                    <div
                        style={hasButton ? margin : {}}
                        className={sprinkles({alignItems: 'center', display: 'flex'})}
                    >
                        <Image height={40} src={footerImage} />
                    </div>
                )}

                {hasFooterText && (
                    <div style={hasButton || hasFooterImage ? margin : {}} className={styles.footerText}>
                        <Text2 regular>{footerText}</Text2>
                    </div>
                )}
                {hasButtonLink && (
                    <div
                        aria-hidden="true"
                        className={sprinkles({
                            display: 'flex',
                        })}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {buttonLink}
                    </div>
                )}
            </div>
        </div>
    );
};

type slotsTypeof =
    | typeof ProgressBlock
    | typeof RowBlock
    | typeof ValueBlock
    | typeof InformationBlock
    | typeof HighlightedValueBlock
    | typeof SimpleBlock;

interface DataCardAdvancedProps {
    cardOnPress?: () => void;

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

    slots?: Array<RendersNullableElement<slotsTypeof>>;
    small?: boolean;

    button?: RendersNullableElement<typeof ButtonPrimary>;
    footerImage?: string;
    footerText?: string;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;

    dataAttributes?: DataAttributes;
    actions?: Array<CardAction>;
    'aria-label'?: string;
    onClose?: () => void;
}

const DataCardAdvanced = React.forwardRef<HTMLDivElement, DataCardAdvancedProps>(
    (
        {
            cardOnPress,

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

            slots,
            small,

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

        const hasFooter = !!button || !!footerImage || !!footerText || !!buttonLink;
        const footerProps = {button, footerImage, footerText, buttonLink};

        const slotSpaceSize = small ? 8 : 24;

        const topActionsStylesWithIcon = {position: 'absolute', top: 8, right: 8, zIndex: 2} as const;
        const cardContentStyle = sprinkles({
            display: 'flex',
            paddingBottom: hasFooter || slots ? 24 : 0,
        });

        return (
            <section aria-label={ariaLabel} style={{height: '100%', position: 'relative'}}>
                <Touchable
                    onPress={() => {
                        if (cardOnPress) {
                            cardOnPress();
                        }
                    }}
                    className={sprinkles({height: '100%', position: 'relative'})}
                >
                    <Boxed
                        className={styles.boxed}
                        dataAttributes={{'component-name': 'DataCard', ...dataAttributes}}
                        ref={ref}
                        width="100%"
                        height="100%"
                    >
                        <div className={styles.dataCard}>
                            <div className={cardContentStyle}>
                                <div
                                    className={sprinkles({
                                        paddingTop: 8,
                                    })}
                                >
                                    <Stack space={8} className={sprinkles({flex: 1})}>
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

                            <div style={{marginTop: 'auto'}}>
                                {slots && slots?.length ? (
                                    <div className={styles.slots}>
                                        {slots.map((slot, index) => {
                                            return (
                                                <div>
                                                    <div>{slot}</div>

                                                    {index + 1 !== slots.length && (
                                                        <div
                                                            className={sprinkles({
                                                                paddingY: slotSpaceSize,
                                                            })}
                                                        >
                                                            <Divider />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : null}

                                {hasFooter && <CardFooter {...footerProps} />}
                            </div>
                        </div>
                    </Boxed>
                </Touchable>
            </section>
        );
    }
);

export default DataCardAdvanced;
