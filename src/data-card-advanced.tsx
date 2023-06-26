import * as React from 'react';
import {Boxed} from './boxed';
import {sprinkles} from './sprinkles.css';
import Stack from './stack';
import * as styles from './data-card-advanced.css';
import Divider from './divider';
import Text, {Text2} from './text';
import Tag from './tag';
import {useScreenSize, useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import Inline from './inline';
import Box from './box';
import Touchable from './touchable';
import classNames from 'classnames';

import type StackingGroup from './stacking-group';
import type Image from './image';
// import type {
//     ValueBlock,
//     InformationBlock,
//     ProgressBlock,
//     HighlightedValueBlock,
//     RowBlock,
//     SimpleBlock,
// } from './advanced-slots';
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
                                        aria-label="Texto"
                                        color={vars.colors.textPrimary}
                                        truncate={pretitleLinesMax}
                                        as={pretitleAs}
                                        regular
                                        hyphens="auto"
                                    >
                                        {pretitle}
                                    </Text2>
                                )}
                                <Text
                                    aria-label="Texto"
                                    color={vars.colors.textPrimary}
                                    mobileSize={20}
                                    mobileLineHeight="28px"
                                    desktopSize={20}
                                    desktopLineHeight="28px"
                                    truncate={titleLinesMax}
                                    weight={textPresets.cardTitle.weight}
                                    as={titleAs}
                                    hyphens="auto"
                                >
                                    {title}
                                </Text>
                                <Text2
                                    aria-label="Texto"
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
                        aria-label="Texto"
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
    const {isMobile, isTabletOrBigger} = useScreenSize();

    const hasButton = !!button;
    const hasFooterImage = !!footerImage;
    const hasFooterText = !!footerText;
    const hasButtonLink = !!buttonLink;
    const hasAllItens = hasButton && (hasFooterImage || hasFooterText) && hasButtonLink;

    const footerCondition = hasAllItens && isMobile;

    const flexDirection = footerCondition ? 'column' : 'row';
    const marginRight = footerCondition ? '' : 'auto';
    const alignItems = footerCondition ? 'start' : 'center';
    const marginTop = hasAllItens ? '8px' : '16px';
    const marginTopTabletOrBigger = isTabletOrBigger ? '8px' : '';
    const marginTopButton = isMobile ? '16px' : '8px';
    const maxWidth = hasButtonLink && !hasAllItens ? '178px' : '';

    return (
        <div>
            <div style={{marginLeft: -24, marginRight: -24}}>
                <Divider />
            </div>

            <div
                className={styles.actions}
                style={{flexDirection, alignItems, marginTop: marginTopTabletOrBigger}}
            >
                {hasButton && (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                        aria-label="button"
                        tabIndex={-1}
                        onClick={(event) => event.stopPropagation()}
                        className={sprinkles({
                            display: 'flex',
                        })}
                        style={{
                            marginTop: marginTopButton,
                            marginRight: '16px',
                            position: 'relative',
                            zIndex: '2',
                        }}
                    >
                        {button}
                    </div>
                )}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop,
                        flexWrap: 'wrap',
                        marginRight,
                    }}
                >
                    {hasFooterImage && (
                        <div
                            style={{marginRight: '16px', zIndex: '0'}}
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
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                        aria-label="link"
                        tabIndex={-1}
                        className={sprinkles({
                            display: 'flex',
                        })}
                        onClick={(event) => event.stopPropagation()}
                        style={{
                            marginTop: isMobile ? marginTop : marginTopButton,
                            position: 'relative',
                            zIndex: '2',
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

interface DataCardAdvancedProps {
    onPress?: () => void;
    stackingGroup?: RendersNullableElement<typeof StackingGroup>;
    headline?: string | RendersNullableElement<typeof Tag>;
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

export const DataCardAdvanced = React.forwardRef<HTMLDivElement, DataCardAdvancedProps>(
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
        const hasStackingGroup = !!stackingGroup;

        const hasFooter = !!button || !!footerImage || !!footerText || !!buttonLink;
        const footerProps = {button, footerImage, footerText, footerTextLinesMax, buttonLink};

        const extraSpaceSize = smallSlotSpace ? 8 : 24;

        const topActionsStylesWithIcon = {position: 'absolute', top: 8, right: 8, zIndex: 2} as const;
        const cardContentStyle = sprinkles({
            display: 'flex',
            paddingBottom: hasFooter || extra ? 24 : 0,
        });

        return (
            <section aria-label={ariaLabel} style={{height: '100%', position: 'relative'}}>
                <Touchable
                    onPress={onPress}
                    tabIndex={0}
                    maybe
                    style={{height: '100%', position: 'relative'}}
                >
                    <Boxed
                        className={classNames(styles.boxed, onPress ? styles.interaction : '')}
                        dataAttributes={{'component-name': 'AdvancedDataCard', ...dataAttributes}}
                        ref={ref}
                        width="100%"
                        height="100%"
                    >
                        <div className={styles.dataCard}>
                            {/* {onPress && (
                            <a
                                tabIndex={0}
                                aria-label={ariaLabel}
                                href="javascript:void(0)"
                                className={styles.anchorCard}
                                onClick={() => {
                                    onPress();
                                }}
                            />
                        )} */}

                            <div className={cardContentStyle}>
                                <div
                                    className={sprinkles({
                                        paddingTop: 8,
                                    })}
                                >
                                    <Stack space={8} className={sprinkles({flex: 1})}>
                                        {hasStackingGroup && (
                                            <div style={{display: 'flex', width: '100%'}}>
                                                <div style={{zIndex: '0', width: '100%'}}>
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
                                                        style={{
                                                            display: 'flex',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <div style={{zIndex: '0', width: '100%'}}>{ex}</div>
                                                    </div>

                                                    {index + 1 !== extra.length && (
                                                        <div
                                                            className={sprinkles({
                                                                paddingY: extraSpaceSize,
                                                            })}
                                                        >
                                                            <Divider />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </Box>
                                ) : null}
                            </div>

                            {hasFooter && <CardFooter {...footerProps} />}
                        </div>
                    </Boxed>
                </Touchable>
            </section>
        );
    }
);

export default DataCardAdvanced;
