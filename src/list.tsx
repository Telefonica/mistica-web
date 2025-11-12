/*
 * Specs:
 *   - Structure: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A2
 *   - Behavior: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A608
 *   - Assets: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A1
 */

'use client';
import * as React from 'react';
import classNames from 'classnames';
import {BaseTouchable} from './touchable';
import {Text, Text2, Text1} from './text';
import Box from './box';
import Stack from './stack';
import Badge from './badge';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import IconChevronRightFilled from './generated/mistica-icons/icon-chevron-right-filled';
import Switch from './switch-component';
import RadioButton, {useRadioContext} from './radio-button';
import Checkbox from './checkbox';
import {InternalBoxed} from './boxed';
import Divider from './divider';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './list.css';
import * as mediaStyles from './image.css';
import {vars} from './skins/skin-contract.css';
import {applyCssVars} from './utils/css';
import {IconButton, ToggleIconButton} from './icon-button';
import ScreenReaderOnly from './screen-reader-only';
import {useTheme} from './hooks';

import type {IconButtonProps, ToggleIconButtonProps} from './icon-button';
import type {TouchableElement, TouchableProps} from './touchable';
import type {DataAttributes, TrackingEvent, IconProps} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';

type Right = (({centerY}: {centerY: boolean}) => React.ReactNode) | React.ReactNode;

interface CommonProps {
    children?: void; // no children allowed
    headline?: string | React.ReactNode;
    title: string;
    titleAs?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string | null;
    descriptionLinesMax?: number;
    detail?: string;
    asset?: React.ReactNode;
    badge?: boolean | number;
    role?: string;
    touchableRole?: string;
    extra?: React.ReactNode;
    dataAttributes?: DataAttributes;
    disabled?: boolean;
    withChevron?: boolean;
    'aria-label'?: string;
    right?: Right;
    danger?: boolean;
    tabIndex?: number;
}

const renderRight = (right: Right, centerY: boolean) => {
    if (typeof right === 'function') return right?.({centerY});

    return centerY ? (
        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            <div>{right}</div>
        </div>
    ) : (
        right
    );
};

interface ContentProps extends CommonProps {
    headlineRef?: React.Ref<HTMLDivElement>;
    rightRef?: React.Ref<HTMLDivElement>;
    extraRef?: React.Ref<HTMLDivElement>;
    control?: React.ReactNode;
    /** This id is to link the title with the related control */
    labelId?: string;
}

export const Content = ({
    withChevron,
    headline,
    headlineRef,
    extraRef,
    title,
    titleAs,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    detail,
    asset,
    danger,
    badge,
    right,
    rightRef,
    extra,
    labelId,
    disabled,
    control,
}: ContentProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const numTextLines = [headline, title, subtitle, description, extra].filter(Boolean).length;
    const centerY = numTextLines === 1;
    const {textPresets} = useTheme();

    return (
        <div className={styles.content} id={labelId}>
            {asset && (
                <div
                    className={classNames(styles.assetContainer, {
                        [styles.center]: centerY,
                        [styles.disabled]: disabled,
                    })}
                    // We don't want asset to be readable by screen readers
                    aria-hidden
                    data-testid="asset"
                >
                    <div
                        className={styles.asset}
                        style={applyCssVars({
                            color: danger
                                ? isInverse
                                    ? vars.colors.textErrorInverse
                                    : vars.colors.textError
                                : isInverse
                                  ? vars.colors.textPrimaryInverse
                                  : vars.colors.textPrimary,
                            [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                        })}
                    >
                        {asset}
                    </div>
                </div>
            )}

            <div
                className={classNames(styles.rowBody, {[styles.disabled]: disabled})}
                style={{justifyContent: centerY ? 'center' : 'flex-start'}}
            >
                <Text
                    mobileSize={textPresets.text3.size.mobile}
                    desktopSize={textPresets.text3.size.desktop}
                    mobileLineHeight={textPresets.text3.lineHeight.mobile}
                    desktopLineHeight={textPresets.text3.lineHeight.desktop}
                    weight={textPresets.rowTitle.weight}
                    color={danger ? vars.colors.textError : vars.colors.textPrimary}
                    truncate={titleLinesMax}
                    hyphens="auto"
                    as={titleAs}
                    dataAttributes={{testid: 'title'}}
                >
                    {title}
                </Text>
                {headline && (
                    <div ref={headlineRef} style={{order: -1, paddingBottom: 4}}>
                        <Text1
                            regular
                            color={vars.colors.textPrimary}
                            hyphens="auto"
                            dataAttributes={{testid: 'headline'}}
                        >
                            {headline}
                        </Text1>
                    </div>
                )}
                {subtitle && (
                    <Box paddingTop={2}>
                        <Text2
                            regular
                            color={vars.colors.textPrimary}
                            truncate={subtitleLinesMax}
                            hyphens="auto"
                            dataAttributes={{testid: 'subtitle'}}
                        >
                            {subtitle}
                        </Text2>
                    </Box>
                )}
                {description && (
                    <Box paddingTop={2}>
                        <Text2
                            regular
                            color={vars.colors.textSecondary}
                            truncate={descriptionLinesMax}
                            hyphens="auto"
                            dataAttributes={{testid: 'description'}}
                        >
                            {description}
                        </Text2>
                    </Box>
                )}
                {extra && (
                    <Box ref={extraRef} paddingTop={2} dataAttributes={{testid: 'slot'}}>
                        {extra}
                    </Box>
                )}
            </div>

            {badge && (
                <Box paddingLeft={16}>
                    <div className={classNames(styles.badge, {[styles.disabled]: disabled})}>
                        <Badge value={badge === true ? undefined : badge} />
                    </div>
                </Box>
            )}

            {(detail || right || withChevron || control) && (
                <div className={classNames(styles.rightContent, {[styles.rightRestrictedWidth]: !!detail})}>
                    {detail && (
                        <div className={classNames(styles.detail, {[styles.disabled]: disabled})}>
                            <Text2
                                regular
                                color={vars.colors.textSecondary}
                                hyphens="auto"
                                dataAttributes={{testid: 'detail'}}
                            >
                                {detail}
                            </Text2>
                        </div>
                    )}

                    {right && (
                        <div
                            className={classNames({
                                [styles.detailRight]: !!detail,
                                [styles.disabled]: disabled,
                            })}
                            ref={rightRef}
                            data-testid="endSlot"
                        >
                            {renderRight(right, centerY)}
                        </div>
                    )}

                    {withChevron && (
                        <div
                            style={{paddingLeft: detail || right ? 4 : 0}}
                            className={classNames(styles.center, {[styles.disabled]: disabled})}
                            data-testid="chevron"
                        >
                            <IconChevronRightFilled
                                size={16}
                                color={isInverse ? vars.colors.inverse : vars.colors.neutralMedium}
                            />
                        </div>
                    )}

                    {control && (
                        <div style={{paddingLeft: detail || right ? 8 : 0}} className={styles.center}>
                            {control}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

type ControlProps = {
    name?: string;
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
};

interface BasicRowContentProps extends CommonProps {
    atomicReading?: boolean;
}

interface SwitchRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;

    switch: ControlProps | undefined;
}

interface CheckboxRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;

    checkbox: ControlProps | undefined;
}

interface RadioRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;

    radioValue: string;
}

interface IconButtonRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;

    iconButton: ExclusifyUnion<IconButtonProps | ToggleIconButtonProps> | undefined;
}

type TouchableCommonProps = {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    'aria-current'?: React.AriaAttributes['aria-current'];
};

interface HrefRowContentProps extends CommonProps, TouchableCommonProps {
    href: string | undefined;
    newTab?: boolean;
    loadOnTop?: boolean;
    onNavigate?: () => void | Promise<void>;
}

interface ToRowContentProps extends CommonProps, TouchableCommonProps {
    to: string | undefined;
    newTab?: boolean;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    onNavigate?: () => void | Promise<void>;
}

interface OnPressRowContentProps extends CommonProps, TouchableCommonProps {
    onPress: (() => void) | undefined;
}

type RowContentProps = ExclusifyUnion<
    | BasicRowContentProps
    | SwitchRowContentProps
    | RadioRowContentProps
    | IconButtonRowContentProps
    | CheckboxRowContentProps
    | HrefRowContentProps
    | ToRowContentProps
    | OnPressRowContentProps
>;

const useControlState = ({
    value,
    defaultValue,
    onChange,
}: {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (isChecked: boolean) => void;
}): [boolean, () => void] => {
    const isControlledByParent = value !== undefined;
    const [isChecked, setIsChecked] = React.useState<boolean>(!!defaultValue);

    const toggle = () => {
        if (!isControlledByParent) {
            setIsChecked(!isChecked);
        }
        onChange?.(isControlledByParent ? !value : !isChecked);
    };

    return [isControlledByParent ? !!value : isChecked, toggle];
};

const hasControlProps = (
    obj: any
): obj is
    | SwitchRowContentProps
    | CheckboxRowContentProps
    | RadioRowContentProps
    | IconButtonRowContentProps => {
    return ['switch', 'checkbox', 'radioValue', 'iconButton'].some((prop) => obj[prop] !== undefined);
};

const RowContent = React.forwardRef<TouchableElement, RowContentProps>((props, ref) => {
    const titleId = React.useId();
    const isInverse = useIsInverseOrMediaVariant();
    const {
        asset,
        headline,
        title,
        titleAs,
        titleLinesMax,
        subtitle,
        subtitleLinesMax,
        description,
        descriptionLinesMax,
        detail,
        danger,
        badge,
        role,
        touchableRole,
        extra,
        withChevron,
        dataAttributes,
        right,
        'aria-label': ariaLabelProp,
        tabIndex,
        atomicReading,
    } = props;

    const [headlineText, setHeadlineText] = React.useState<string>('');
    const [extraText, setExtraText] = React.useState<string>('');
    const [rightText, setRightText] = React.useState<string>('');

    // iOS voiceover reads links with multiple lines as separate links. By setting aria-label and marking content as aria-hidden, we can make it read the whole row as one link.
    const computedAriaLabel = [title, headlineText, subtitle, description, extraText, detail, rightText]
        .filter(Boolean)
        .join(' ');

    const ariaLabel = ariaLabelProp ?? (props.href || props.to ? computedAriaLabel : undefined);

    const radioContext = useRadioContext();
    const disabled = props.disabled || (props.radioValue !== undefined && radioContext.disabled);
    const hasHoverDefault = !disabled && !isInverse;
    const hasHoverInverse = !disabled && isInverse;
    const hasControl = hasControlProps(props);
    const isInteractive = !!props.onPress || !!props.href || !!props.to;
    const hasChevron = hasControl ? false : withChevron ?? isInteractive;

    const interactiveProps = {
        href: props.href,
        newTab: props.newTab,
        loadOnTop: props.loadOnTop,

        to: props.to,
        fullPageOnWebView: props.fullPageOnWebView,
        replace: props.replace,

        onNavigate: props.onNavigate,
        onPress: props.onPress,
        trackingEvent: props.trackingEvent,

        'aria-label': ariaLabel,
        'aria-labelledby': props['aria-labelledby'],
        'aria-description': props['aria-description'],
        'aria-describedby': props['aria-describedby'],
        'aria-current': props['aria-current'],
    } as TouchableProps;

    const [isChecked, toggle] = useControlState(props.switch || props.checkbox || {});

    const renderContent = (contentProps?: {control?: React.ReactNode; labelId?: string; role?: string}) => (
        <Content
            asset={asset}
            headline={headline}
            headlineRef={(node) => {
                if (node) {
                    setHeadlineText(node.textContent || '');
                }
            }}
            title={title}
            titleAs={titleAs}
            subtitle={subtitle}
            description={description}
            badge={badge}
            titleLinesMax={titleLinesMax}
            subtitleLinesMax={subtitleLinesMax}
            descriptionLinesMax={descriptionLinesMax}
            detail={detail}
            danger={danger}
            right={right}
            rightRef={(node) => {
                if (node) {
                    // jsdom doesn't support innerText so we fallback to textContent https://github.com/jsdom/jsdom/issues/1245
                    setRightText(node.innerText || node.textContent || '');
                }
            }}
            control={contentProps?.control}
            role={contentProps?.role}
            extra={extra}
            extraRef={(node) => {
                if (node) {
                    setExtraText(node.innerText || node.textContent || '');
                }
            }}
            labelId={contentProps?.labelId}
            disabled={disabled}
            withChevron={hasChevron}
        />
    );

    if (isInteractive && !hasControl) {
        return (
            <BaseTouchable
                ref={ref}
                className={classNames(styles.rowContent, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                    [styles.pointer]: !disabled,
                })}
                {...interactiveProps}
                role={touchableRole}
                dataAttributes={dataAttributes}
                disabled={disabled}
                tabIndex={tabIndex}
            >
                <Box paddingX={16} aria-hidden={!!props.to || !!props.href || undefined}>
                    {renderContent({role})}
                </Box>
            </BaseTouchable>
        );
    }

    const renderRowWithDoubleInteraction = (control: React.ReactNode) => (
        <div
            className={styles.dualActionContainer}
            ref={ref as React.Ref<HTMLDivElement>}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <BaseTouchable
                disabled={disabled}
                {...interactiveProps}
                role={touchableRole}
                className={classNames(styles.dualActionLeft, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                })}
                tabIndex={tabIndex}
            >
                {renderContent({labelId: titleId, role})}
            </BaseTouchable>

            <div className={styles.dualActionDivider} />

            {control}
        </div>
    );

    const renderRowWithSingleControl = (content: React.ReactNode, isContentInsideControl?: boolean) => (
        <div
            className={classNames(styles.rowContent, {
                [styles.touchableBackground]: hasHoverDefault && isContentInsideControl,
                [styles.touchableBackgroundInverse]: hasHoverInverse && isContentInsideControl,
                [styles.pointer]: !disabled && isContentInsideControl,
            })}
            ref={ref as React.Ref<HTMLDivElement>}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {content}
        </div>
    );

    if (props.switch || props.checkbox) {
        const Control = props.switch ? Switch : Checkbox;
        const name = props.switch?.name ?? props.checkbox?.name ?? titleId;

        return isInteractive
            ? renderRowWithDoubleInteraction(
                  <Control
                      disabled={disabled}
                      name={name}
                      checked={isChecked}
                      aria-label={ariaLabel}
                      aria-labelledby={titleId}
                      onChange={toggle}
                      render={({controlElement}) => (
                          <div className={styles.dualActionRight}>{controlElement}</div>
                      )}
                  />
              )
            : renderRowWithSingleControl(
                  <Control
                      disabled={disabled}
                      name={name}
                      checked={isChecked}
                      aria-label={ariaLabel}
                      aria-labelledby={titleId}
                      onChange={toggle}
                      render={({controlElement, labelId}) => (
                          <Box paddingX={16} role={role}>
                              {renderContent({
                                  labelId,
                                  control: <Stack space="around">{controlElement}</Stack>,
                              })}
                          </Box>
                      )}
                  />,
                  true
              );
    }

    if (props.radioValue) {
        return isInteractive
            ? renderRowWithDoubleInteraction(
                  <RadioButton
                      value={props.radioValue}
                      aria-label={ariaLabel}
                      aria-labelledby={titleId}
                      render={({controlElement}) => (
                          <Stack space="around">
                              <Box paddingX={16}>{controlElement}</Box>
                          </Stack>
                      )}
                  />
              )
            : renderRowWithSingleControl(
                  <RadioButton
                      value={props.radioValue}
                      aria-label={ariaLabel}
                      aria-labelledby={titleId}
                      render={({controlElement}) => (
                          <Box paddingX={16} role={role}>
                              {renderContent({
                                  labelId: titleId,
                                  control: <Stack space="around">{controlElement}</Stack>,
                              })}
                          </Box>
                      )}
                  />,
                  true
              );
    }

    if (props.iconButton) {
        return isInteractive
            ? renderRowWithDoubleInteraction(
                  <Box padding={16}>
                      <Stack space="around">
                          {props.iconButton.Icon ? (
                              <IconButton {...props.iconButton} disabled={props.disabled} />
                          ) : (
                              <ToggleIconButton {...props.iconButton} disabled={props.disabled} />
                          )}
                      </Stack>
                  </Box>
              )
            : renderRowWithSingleControl(
                  <Box paddingX={16}>
                      {renderContent({
                          labelId: titleId,
                          control: (
                              <Stack space="around">
                                  {props.iconButton.Icon ? (
                                      <IconButton
                                          {...props.iconButton}
                                          disabled={props.disabled}
                                          role={role}
                                      />
                                  ) : (
                                      <ToggleIconButton
                                          {...props.iconButton}
                                          disabled={props.disabled}
                                          role={role}
                                      />
                                  )}
                              </Stack>
                          ),
                      })}
                  </Box>
              );
    }

    const shouldRenderScreenReaderOnly = !!ariaLabelProp || atomicReading;

    return (
        <div role={role}>
            <div
                className={classNames(styles.rowContent, styles.rowContentPadding)}
                // role="text" makes VoiceOver read the whole div as a single text block. This is needed for VoiceOver rectangle to
                // cover the whole row, otherwise it only covers the text inside ScreenReaderOnly
                role={shouldRenderScreenReaderOnly ? 'text' : undefined}
                {...getPrefixedDataAttributes(dataAttributes)}
                ref={ref as React.Ref<HTMLDivElement>}
                tabIndex={tabIndex}
            >
                <div aria-hidden={shouldRenderScreenReaderOnly}>{renderContent({role})}</div>
                {shouldRenderScreenReaderOnly && (
                    <ScreenReaderOnly>
                        <span>{ariaLabelProp ?? computedAriaLabel}</span>
                    </ScreenReaderOnly>
                )}
            </div>
        </div>
    );
});

export const Row = React.forwardRef<TouchableElement, RowContentProps>(
    ({dataAttributes, role = 'listitem', ...props}, ref) => (
        <div role={role} className={styles.row}>
            <RowContent
                {...props}
                ref={ref}
                dataAttributes={{'component-name': 'Row', testid: 'Row', ...dataAttributes}}
            />
        </div>
    )
);

type CommonAccessibilityProps = {
    'aria-live'?: 'polite' | 'off' | 'assertive';
    'aria-atomic'?: boolean;
};

type RowListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    dataAttributes?: DataAttributes;
} & CommonAccessibilityProps;

export const RowList = ({
    children,
    ariaLabelledby,
    role = 'list',
    'aria-live': ariaLive = 'off',
    'aria-atomic': ariaAtomic = false,
    dataAttributes,
}: RowListProps): JSX.Element => {
    const childrenContent = React.Children.toArray(children).filter(Boolean);
    const lastIndex = childrenContent.length - 1;

    return (
        <div
            role={role}
            aria-labelledby={ariaLabelledby}
            aria-live={ariaLive}
            aria-atomic={ariaAtomic}
            {...getPrefixedDataAttributes(dataAttributes, 'RowList')}
        >
            {childrenContent.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                    {index < lastIndex && (
                        <Box paddingX={16}>
                            <Divider />
                        </Box>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// danger + isInverse is not allowed
type CommonBoxedRowProps =
    | {
          isInverse?: false;
          danger: true;
      }
    | {
          isInverse?: boolean;
          danger?: false;
      }
    | {
          isInverse?: false;
          danger: boolean;
      };

type BoxedRowProps = ExclusifyUnion<
    | BasicRowContentProps
    | SwitchRowContentProps
    | RadioRowContentProps
    | IconButtonRowContentProps
    | CheckboxRowContentProps
    | HrefRowContentProps
    | ToRowContentProps
    | OnPressRowContentProps
> &
    CommonBoxedRowProps;

export const BoxedRow = React.forwardRef<HTMLDivElement, BoxedRowProps>(({dataAttributes, ...props}, ref) => (
    <InternalBoxed
        overflow="visible"
        className={styles.boxed}
        variant={props.isInverse ? 'inverse' : 'default'}
        ref={ref}
        dataAttributes={{'component-name': 'BoxedRow', testid: 'BoxedRow', ...dataAttributes}}
    >
        <RowContent {...props} />
    </InternalBoxed>
));

type BoxedRowListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    dataAttributes?: DataAttributes;
} & CommonAccessibilityProps;

export const BoxedRowList = ({
    children,
    ariaLabelledby,
    role = 'list',
    dataAttributes,
    'aria-live': ariaLive = 'off',
    'aria-atomic': ariaAtomic = false,
}: BoxedRowListProps): JSX.Element => (
    <Stack
        space={16}
        role={role}
        aria-labelledby={ariaLabelledby}
        aria-live={ariaLive}
        aria-atomic={ariaAtomic}
        dataAttributes={{'component-name': 'BoxedRowList', testid: 'BoxedRowList', ...dataAttributes}}
    >
        {children}
    </Stack>
);

type UnorderedListProps = {
    children: React.ReactNode;
    'aria-label'?: string;
    'aria-labelledby'?: string;
};

type OrderedListProps = UnorderedListProps;

export const UnorderedList = ({
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: UnorderedListProps): JSX.Element => {
    return (
        // role="list" is needed for accesibility in Safari+VoiceOver. See: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul role="list" className={styles.ul} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
            {children}
        </ul>
    );
};

export const OrderedList = ({
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: OrderedListProps): JSX.Element => {
    return (
        // role="list" is needed for accesibility in Safari+VoiceOver. See: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ol role="list" className={styles.ul} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
            {children}
        </ol>
    );
};

type ListItemProps = {
    children: React.ReactNode;
    Icon?: (props: IconProps) => JSX.Element;
    icon?: JSX.Element;
    withMarker?: boolean;
};

export const ListItem = ({children, Icon, icon, withMarker = true}: ListItemProps): JSX.Element => {
    return !withMarker ? (
        <li className={styles.liWithoutMarker}>
            <div className={styles.liContent}>{children}</div>
        </li>
    ) : Icon || icon ? (
        <li className={styles.liWithCustomIcon}>
            <Box paddingRight={{mobile: 8, desktop: 16}}>
                {Icon ? <Icon size="1em" color="currentColor" /> : icon}
            </Box>
            <div className={styles.liContent}>{children}</div>
        </li>
    ) : (
        <li className={styles.li}>{children}</li>
    );
};
